// src/middleware/auth.js
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const auth = async (req, res, next) => {
    try {
        // Ambil token dari header Authorization atau cookie
        const token = req.headers.authorization?.replace('Bearer ', '') || req.cookies.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                error: 'Akses ditolak. Silakan login terlebih dahulu.'
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId || decoded.id;
        
        // Cari user berdasarkan ID dari token
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                username: true,
                role: true,
                createdAt: true
            }
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                error: 'User tidak ditemukan.'
            });
        }

        // Attach user ke request
        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                error: 'Token tidak valid.'
            });
        }

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                error: 'Token sudah kadaluarsa. Silakan login kembali.'
            });
        }

        return res.status(500).json({
            success: false,
            error: 'Terjadi kesalahan saat verifikasi token.'
        });
    }
};

module.exports = auth;