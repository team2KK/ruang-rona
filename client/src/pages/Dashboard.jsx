// `client/src/pages/Dashboard.jsx`
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import { Badge } from 'primereact/badge';
import useAuthStore from '../store/authStore';
import { Brain, Heart, MessageCircle, TrendingUp, Award, Calendar } from 'lucide-react';

export default function Dashboard() {
    const navigate = useNavigate();
    const { user } = useAuthStore();

    const quickActions = [
        {
            title: 'Jelajah Diri',
            description: 'Kenali pola emosi dan stressor kamu',
            icon: <Brain size={40} className="text-blue-600" />,
            path: '/jelajah-diri',
            color: 'bg-blue-50',
            badge: 'Baru'
        },
        {
            title: 'Latihan Harian',
            description: '5 menit meditasi untuk ketenangan',
            icon: <Heart size={40} className="text-red-500" />,
            path: '/latihan',
            color: 'bg-red-50'
        },
        {
            title: 'Dinding Cerita',
            description: 'Baca cerita dari teman sebaya',
            icon: <MessageCircle size={40} className="text-green-500" />,
            path: '/dinding-cerita',
            color: 'bg-green-50',
            badge: '3 Baru'
        }
    ];

    const userStreak = 7; // Example streak days
    const completedExercises = 12;
    const totalExercises = 20;
    const progressPercentage = (completedExercises / totalExercises) * 100;

    return (
        <div className="max-w-6xl mx-auto px-6 py-6">
            {/* Welcome Header */}
            <div className="mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                            Selamat Datang Kembali, {user?.username}! 👋
                        </h1>
                        <p className="text-gray-600 text-lg">Bagaimana perasaanmu hari ini?</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="text-center p-3 bg-orange-50 rounded-lg">
                            <Calendar size={24} className="text-orange-500 mb-1" />
                            <div className="font-bold text-orange-600">{userStreak} Hari</div>
                            <div className="text-xs text-gray-600">Streak</div>
                        </div>
                        <div className="text-center p-3 bg-purple-50 rounded-lg">
                            <Award size={24} className="text-purple-500 mb-1" />
                            <div className="font-bold text-purple-600">Level 3</div>
                            <div className="text-xs text-gray-600">Pemula</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Progress Card */}
            <Card className="mb-5 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <TrendingUp size={24} className="text-blue-600" />
                        <h3 className="text-xl font-semibold text-gray-800 m-0">Progress Minggu Ini</h3>
                    </div>
                    <Badge value={`${completedExercises}/${totalExercises}`} severity="info" />
                </div>
                <ProgressBar value={progressPercentage} className="mb-3" />
                <p className="text-gray-600 m-0">
                    Kamu sudah menyelesaikan {completedExercises} dari {totalExercises} latihan minggu ini. Pertahankan! 🎉
                </p>
            </Card>

            {/* Quick Actions */}
            <div className="mb-5">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Mulai Hari Ini</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {quickActions.map((action, index) => (
                        <div key={index}>
                            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer rounded-2xl h-full" onClick={() => navigate(action.path)}>
                                <div className="flex flex-col items-center text-center gap-3 p-6">
                                    <div className={`p-3 rounded-xl ${action.color}`}>
                                        {action.icon}
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-center gap-2 mb-2">
                                            <h4 className="text-xl font-semibold text-gray-800 m-0">{action.title}</h4>
                                            {action.badge && <Badge value={action.badge} severity="success" />}
                                        </div>
                                        <p className="text-gray-600 m-0">{action.description}</p>
                                    </div>
                                    <Button label="Mulai" icon="pi pi-arrow-right" className="p-button-text mt-4" />
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Activity */}
            <Card className="rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Aktivitas Terakhir</h3>
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                        <i className="pi pi-check-circle text-primary-500" style={{ fontSize: '1.5rem' }}></i>
                        <div className="flex-1">
                            <p className="font-medium text-gray-800 m-0">Latihan Pernapasan</p>
                            <p className="text-sm text-gray-600 m-0">Selesai - 2 jam yang lalu</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                        <i className="pi pi-heart text-green-500" style={{ fontSize: '1.5rem' }}></i>
                        <div className="flex-1">
                            <p className="font-medium text-gray-800 m-0">Dinding Cerita</p>
                            <p className="text-sm text-gray-600 m-0">Memberikan dukungan - Kemarin</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                        <i className="pi pi-compass text-purple-500" style={{ fontSize: '1.5rem' }}></i>
                        <div className="flex-1">
                            <p className="font-medium text-gray-800 m-0">Assessment Jelajah Diri</p>
                            <p className="text-sm text-gray-600 m-0">Selesai - 3 hari yang lalu</p>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
