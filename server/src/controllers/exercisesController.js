// src/controllers/exerciseController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getOverallProgress = async (req, res) => {
  try {
    const userId = req.user?.id || req.query.userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    // total latihan yang pernah tercatat
    const total = await prisma.exerciseProgress.count({
      where: { userId: String(userId) },
    });

    // total yang selesai
    const completed = await prisma.exerciseProgress.count({
      where: {
        userId: String(userId),
        completed: true,
      },
    });

    // hindari NaN
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

    return res.json({
      success: true,
      data: {
        total,
        completed,
        percent,
      },
    });
  } catch (err) {
    console.error('getOverallProgress error:', err);
    return res.status(500).json({
      success: false,
      message: 'Gagal mengambil progress',
    });
  }
};
