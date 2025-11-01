const { PrismaClient } = require('@prisma/client');
const {createStoryLog, STORY_LOG_SUBTITLES} = require("../utils/storyLogger");
const prisma = new PrismaClient();

// Kata kunci berbahaya untuk moderasi
const FLAGGED_KEYWORDS = [
    'bunuh diri', 'mengakhiri hidup', 'ingin mati', 'suicide',
    'cutting', 'self harm', 'menyakiti diri',
    'kekerasan', 'bullying', 'abuse', 'pelecehan'
];

// Fungsi untuk memeriksa kata kunci berbahaya
const checkFlaggedKeywords = (text) => {
    const lowerText = text.toLowerCase();
    const found = FLAGGED_KEYWORDS.filter(keyword =>
        lowerText.includes(keyword.toLowerCase())
    );
    return found.length > 0 ? found : null;
};

// Get all approved stories
exports.getAllStories = async (req, res) => {
    try {
        const { category, page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;

        const where = {
            isApproved: true,
            ...(category && category !== 'all' && { category })
        };

        const [stories, total] = await Promise.all([
            prisma.story.findMany({
                where,
                include: {
                    user: {
                        select: { username: true }
                    },
                    supports: true,
                    _count: {
                        select: { supports: true, replies: true }
                    }
                },
                orderBy: { createdAt: 'desc' },
                skip: parseInt(skip),
                take: parseInt(limit)
            }),
            prisma.story.count({ where })
        ]);

        res.json({
            success: true,
            data: stories,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Gagal mengambil cerita'
        });
    }
};

// Get single story
exports.getStory = async (req, res) => {
    try {
        const { id } = req.params;

        const story = await prisma.story.findUnique({
            where: { id },
            include: {
                user: {
                    select: { username: true }
                },
                votes: true,
                supports: {
                    select: {
                        userId: true,
                        createdAt: true
                    }
                },
                _count: {
                    select: { supports: true, votes: true }
                }
            },
            orderBy: { createdAt: 'desc' },
            take: 5
        });

        if (!story) {
            return res.status(404).json({
                success: false,
                error: 'Cerita tidak ditemukan'
            });
        }

        res.json({
            success: true,
            data: story
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Gagal mengambil cerita'
        });
    }
};

// Create new story
exports.createStory = async (req, res) => {
    try {
        const { category, title, content, isAnonymous = true } = req.body;
        const userId = req.user.id;

        // Validasi
        if (!category || !title || !content) {
            return res.status(400).json({
                success: false,
                error: 'Kategori, judul, dan konten wajib diisi'
            });
        }

        // Cek kata kunci berbahaya
        const flaggedKeywords = checkFlaggedKeywords(`${title} ${content}`);
        const isModerated = flaggedKeywords !== null;

        const story = await prisma.story.create({
            data: {
                userId,
                category,
                title,
                content,
                isAnonymous,
                isModerated,
                isApproved: !isModerated, // Auto-approve jika tidak ada kata kunci berbahaya
                flaggedKeywords: flaggedKeywords || []
            }
        });

        // Log the activity
        await createStoryLog(userId, STORY_LOG_SUBTITLES.CREATE_STORY, story.id);

        res.status(201).json({
            success: true,
            data: story,
            message: isModerated
                ? 'Cerita Anda sedang ditinjau karena mengandung konten sensitif'
                : 'Cerita berhasil dipublikasikan'
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            error: 'Gagal membuat cerita'
        });
    }
};

// Toggle support for story
exports.toggleSupport = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        // Cek apakah story exists
        const story = await prisma.story.findUnique({
            where: { id }
        });

        if (!story) {
            return res.status(404).json({
                success: false,
                error: 'Cerita tidak ditemukan'
            });
        }

        // Cek apakah user sudah support
        const existingSupport = await prisma.storySupport.findUnique({
            where: {
                storyId_userId: {
                    storyId: id,
                    userId
                }
            }
        });

        if (existingSupport) {
            // Hapus support
            await prisma.storySupport.delete({
                where: { id: existingSupport.id }
            });

            await prisma.story.update({
                where: { id },
                data: { supportCount: { decrement: 1 } }
            });

            // Log the activity
            await createStoryLog(userId, STORY_LOG_SUBTITLES.REMOVE_SUPPORT, id);

            res.json({
                success: true,
                message: 'Dukungan dihapus',
                supported: false
            });
        } else {
            // Tambah support
            await prisma.storySupport.create({
                data: {
                    storyId: id,
                    userId
                }
            });

            await prisma.story.update({
                where: { id },
                data: { supportCount: { increment: 1 } }
            });

            // Log the activity
            await createStoryLog(userId, STORY_LOG_SUBTITLES.GIVE_SUPPORT, id);

            res.json({
                success: true,
                message: 'Dukungan diberikan',
                supported: true
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Gagal memberikan dukungan'
        });
    }
};

// Get user's stories
exports.getMyStories = async (req, res) => {
    try {
        const userId = req.user.id;

        const stories = await prisma.story.findMany({
            where: { userId },
            include: {
                _count: {
                    select: { supports: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        res.json({
            success: true,
            data: stories
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Gagal mengambil cerita Anda'
        });
    }
};

// Delete story (only owner can delete)
exports.deleteStory = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const story = await prisma.story.findUnique({
            where: { id }
        });

        if (!story) {
            return res.status(404).json({
                success: false,
                error: 'Cerita tidak ditemukan'
            });
        }

        if (story.userId !== userId) {
            return res.status(403).json({
                success: false,
                error: 'Anda tidak memiliki izin untuk menghapus cerita ini'
            });
        }

        await prisma.story.delete({
            where: { id }
        });

        res.json({
            success: true,
            message: 'Cerita berhasil dihapus'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Gagal menghapus cerita'
        });
    }
};
