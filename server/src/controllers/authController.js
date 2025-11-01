// src/controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Helper: Generate JWT Token
const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });
};

// Register - Pendaftaran Anonim
exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validasi input
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                error: 'Username dan password harus diisi.'
            });
        }

        if (username.length < 3 || username.length > 20) {
            return res.status(400).json({
                success: false,
                error: 'Username harus 3-20 karakter.'
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                error: 'Password minimal 6 karakter.'
            });
        }

        // Cek apakah username sudah digunakan
        const existingUser = await prisma.user.findUnique({
            where: { username }
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                error: 'Username sudah digunakan. Pilih username lain.'
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Buat user baru
        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword
            },
            select: {
                id: true,
                username: true,
                role: true,
                createdAt: true
            }
        });

        // Generate token
        const token = generateToken(user.id);

        res.status(201).json({
            success: true,
            message: 'Registrasi berhasil! Selamat datang di Ruang Rona.',
            data: {
                user,
                token
            }
        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({
            success: false,
            error: 'Terjadi kesalahan saat registrasi.'
        });
    }
};

// Login
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validasi input
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                error: 'Username dan password harus diisi.'
            });
        }

        // Cari user
        const user = await prisma.user.findUnique({
            where: { username }
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                error: 'Username atau password salah.'
            });
        }

        // Verifikasi password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                error: 'Username atau password salah.'
            });
        }

        // Generate token
        const token = generateToken(user.id);

        res.json({
            success: true,
            message: 'Login berhasil! Selamat datang kembali.',
            data: {
                user: {
                    id: user.id,
                    username: user.username,
                    role: user.role,
                    createdAt: user.createdAt
                },
                token
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            error: 'Terjadi kesalahan saat login.'
        });
    }
};

// Get Current User
exports.getCurrentUser = async (req, res) => {
    try {
        res.json({
            success: true,
            data: {
                user: req.user
            }
        });
    } catch (error) {
        console.error('Get current user error:', error);
        res.status(500).json({
            success: false,
            error: 'Terjadi kesalahan saat mengambil data user.'
        });
    }
};