const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const STORY_LOG_SUBTITLES = {
    CREATE_STORY: 'Membuat cerita',
    GIVE_SUPPORT: 'Memberikan dukungan',
    REMOVE_SUPPORT: 'Menghapus dukungan',
    CREATE_REPLY: 'Membalas cerita',
    DELETE_REPLY: 'Menghapus balasan',
    VOTE_REPLY: 'Memberikan vote pada balasan'
};

const createStoryLog = async (userId, subtitle, storyId = null, replyId = null) => {
    try {
        await prisma.storyLog.create({
            data: {
                userId,
                type: 'story',
                title: 'Dinding Cerita',
                subtitle,
                storyId,
                replyId
            }
        });
    } catch (error) {
        console.error('Failed to create story log:', error);
        // Don't throw error to prevent blocking main operations
    }
};

module.exports = {
    STORY_LOG_SUBTITLES,
    createStoryLog
};
