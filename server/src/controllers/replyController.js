const { PrismaClient } = require('@prisma/client');
const {createStoryLog, STORY_LOG_SUBTITLES} = require("../utils/storyLogger");
const prisma = new PrismaClient();

// Get replies for a story
exports.getReplies = async (req, res) => {
    try {
        const { storyId } = req.params;
        const { sortBy = 'newest' } = req.query; // newest, oldest, most_upvoted, most_downvoted

        let orderBy = { createdAt: 'desc' };

        if (sortBy === 'oldest') {
            orderBy = { createdAt: 'asc' };
        } else if (sortBy === 'most_upvoted') {
            orderBy = { upvoteCount: 'desc' };
        } else if (sortBy === 'most_downvoted') {
            orderBy = { downvoteCount: 'desc' };
        }

        const replies = await prisma.storyReply.findMany({
            where: { storyId },
            include: {
                user: {
                    select: { username: true }
                },
                votes: {
                    select: {
                        userId: true,
                        voteType: true
                    }
                }
            },
            orderBy
        });

        res.json({
            success: true,
            data: replies
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Gagal mengambil balasan'
        });
    }
};

// Create reply
exports.createReply = async (req, res) => {
    try {
        const { storyId } = req.params;
        const { content, isAnonymous = true } = req.body;
        const userId = req.user.id;

        if (!content || content.trim().length === 0) {
            return res.status(400).json({
                success: false,
                error: 'Konten balasan wajib diisi'
            });
        }

        // Check if story exists
        const story = await prisma.story.findUnique({
            where: { id: storyId }
        });
        console.log(story)
        console.log(storyId)

        if (!story) {
            return res.status(404).json({
                success: false,
                error: 'Cerita tidak ditemukan'
            });
        }

        const reply = await prisma.storyReply.create({
            data: {
                storyId,
                userId,
                content,
                isAnonymous
            },
            include: {
                user: {
                    select: { username: true }
                }
            }
        });

        // Log the activity
        await createStoryLog(userId, STORY_LOG_SUBTITLES.CREATE_REPLY, storyId, reply.id);

        res.status(201).json({
            success: true,
            data: reply,
            message: 'Balasan berhasil ditambahkan'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Gagal membuat balasan'
        });
    }
};

// Toggle vote on reply
exports.toggleVote = async (req, res) => {
    try {
        const { replyId } = req.params;
        const { voteType } = req.body; // "upvote" or "downvote"
        const userId = req.user.id;

        if (!['upvote', 'downvote'].includes(voteType)) {
            return res.status(400).json({
                success: false,
                error: 'Tipe vote tidak valid'
            });
        }

        // Check if reply exists
        const reply = await prisma.storyReply.findUnique({
            where: { id: replyId }
        });

        if (!reply) {
            return res.status(404).json({
                success: false,
                error: 'Balasan tidak ditemukan'
            });
        }

        // Check existing vote
        const existingVote = await prisma.replyVote.findUnique({
            where: {
                replyId_userId: {
                    replyId,
                    userId
                }
            }
        });

        if (existingVote) {
            if (existingVote.voteType === voteType) {
                // Remove vote
                await prisma.replyVote.delete({
                    where: { id: existingVote.id }
                });

                await prisma.storyReply.update({
                    where: { id: replyId },
                    data: {
                        [voteType === 'upvote' ? 'upvoteCount' : 'downvoteCount']: {
                            decrement: 1
                        }
                    }
                });

                return res.json({
                    success: true,
                    message: 'Vote dihapus',
                    action: 'removed'
                });
            } else {
                // Change vote type
                await prisma.replyVote.update({
                    where: { id: existingVote.id },
                    data: { voteType }
                });

                await prisma.storyReply.update({
                    where: { id: replyId },
                    data: {
                        upvoteCount: {
                            [voteType === 'upvote' ? 'increment' : 'decrement']: 1
                        },
                        downvoteCount: {
                            [voteType === 'downvote' ? 'increment' : 'decrement']: 1
                        }
                    }
                });

                // Log the activity
                await createStoryLog(userId, STORY_LOG_SUBTITLES.VOTE_REPLY, reply.storyId, replyId);

                return res.json({
                    success: true,
                    message: 'Vote berhasil diubah',
                    action: 'changed'
                });
            }
        } else {
            // Add new vote
            await prisma.replyVote.create({
                data: {
                    replyId,
                    userId,
                    voteType
                }
            });

            await prisma.storyReply.update({
                where: { id: replyId },
                data: {
                    [voteType === 'upvote' ? 'upvoteCount' : 'downvoteCount']: {
                        increment: 1
                    }
                }
            });

            // Log the activity
            await createStoryLog(userId, STORY_LOG_SUBTITLES.VOTE_REPLY, reply.storyId, replyId);

            res.json({
                success: true,
                message: 'Vote berhasil ditambahkan',
                action: 'added'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Gagal memberikan vote'
        });
    }
};

// Delete reply (only owner)
exports.deleteReply = async (req, res) => {
    try {
        const { replyId } = req.params;
        const userId = req.user.id;

        const reply = await prisma.storyReply.findUnique({
            where: { id: replyId }
        });

        if (!reply) {
            return res.status(404).json({
                success: false,
                error: 'Balasan tidak ditemukan'
            });
        }

        if (reply.userId !== userId) {
            return res.status(403).json({
                success: false,
                error: 'Anda tidak memiliki izin untuk menghapus balasan ini'
            });
        }

        // Log the activity before deletion
        await createStoryLog(userId, STORY_LOG_SUBTITLES.DELETE_REPLY, reply.storyId, replyId);

        await prisma.storyReply.delete({
            where: { id: replyId }
        });

        res.json({
            success: true,
            message: 'Balasan berhasil dihapus'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Gagal menghapus balasan'
        });
    }
};
