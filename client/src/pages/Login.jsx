import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { Divider } from 'primereact/divider';
import useAuthStore from '../store/authStore';
import { Heart, Brain, Sparkles, ShieldCheck } from 'lucide-react';

export default function Login() {
    const navigate = useNavigate();
    const {login, isLoading, error, clearError} = useAuthStore();

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        // Clear error when component unmounts
        return () => clearError();
    }, [clearError]);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.username.trim()) {
            newErrors.username = 'Username harus diisi';
        }

        if (!formData.password) {
            newErrors.password = 'Password harus diisi';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const result = await login(formData);

        if (result.success) {
            navigate('/dashboard');
        }
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
        clearError();
    };

    return (
        <div className="auth-container">
            <div className="auth-card grid grid-nogutter fade-in">
                {/* Illustration Side */}
                <div className="col-12 lg:col-6 illustration-side">
                    <div className="illustration-content text-center">
                        {/* Floating Icons */}
                        <div className="floating-hearts" style={{top: '10%', left: '10%'}}>
                            <Heart size={40}/>
                        </div>
                        <div className="floating-hearts" style={{top: '60%', right: '15%', animationDelay: '1s'}}>
                            <Sparkles size={35}/>
                        </div>
                        <div className="floating-hearts" style={{bottom: '20%', left: '20%', animationDelay: '2s'}}>
                            <Brain size={38}/>
                        </div>

                        {/* Main Icon */}
                        <div className="mental-health-icon">
                            <Brain size={60} strokeWidth={1.5}/>
                        </div>

                        {/* Title */}
                        <h1 className="text-5xl font-bold mb-3">Ruang Rona</h1>
                        <p className="text-xl opacity-90 mb-4">
                            Tempat Aman untuk Kesehatan Mentalmu
                        </p>

                        <Divider className="my-4" style={{borderColor: 'rgba(255,255,255,0.3)'}}/>

                        {/* Features */}
                        <div className="mt-5">
                            <div className="flex align-items-center gap-3 mb-3">
                                <ShieldCheck size={24}/>
                                <span className="text-left">100% Anonim & Privat</span>
                            </div>
                            <div className="flex align-items-center gap-3 mb-3">
                                <Heart size={24}/>
                                <span className="text-left">Dukungan Emosional 24/7</span>
                            </div>
                            <div className="flex align-items-center gap-3">
                                <Sparkles size={24}/>
                                <span className="text-left">Latihan & Tools Interaktif</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Side */}
                <div className="col-12 lg:col-6 form-side slide-in-right">
                    <div className="max-w-md mx-auto">
                        {/* Header */}
                        <div className="text-center mb-5">
                            <h2 className="text-4xl font-bold text-gray-800 mb-2">
                                Selamat Datang Kembali
                            </h2>
                            <p className="text-gray-600">
                                Masuk ke akunmu untuk melanjutkan perjalanan
                            </p>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <Message
                                severity="error"
                                text={error}
                                className="w-full mb-4"
                            />
                        )}

                        {/* Login Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Username Field */}
                            <div className="field">
                                <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
                                    Username
                                </label>
                                <span className="p-input-icon-left w-full">
                  <i className="pi pi-user"/>
                  <InputText
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Masukkan username kamu"
                      className={`w-full ${errors.username ? 'p-invalid' : ''}`}
                      disabled={isLoading}
                  />
                </span>
                                {errors.username && (
                                    <small className="text-red-500 mt-1 block">{errors.username}</small>
                                )}
                            </div>

                            {/* Password Field */}
                            <div className="field">
                                <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                                    Password
                                </label>
                                <Password
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Masukkan password kamu"
                                    toggleMask
                                    feedback={false}
                                    className={`w-full ${errors.password ? 'p-invalid' : ''}`}
                                    inputClassName="w-full"
                                    disabled={isLoading}
                                />
                                {errors.password && (
                                    <small className="text-red-500 mt-1 block">{errors.password}</small>
                                )}
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                label={isLoading ? 'Memproses...' : 'Masuk'}
                                icon={isLoading ? 'pi pi-spin pi-spinner' : 'pi pi-sign-in'}
                                className="w-full p-button-lg p-button-primary mt-4"
                                disabled={isLoading}
                            />
                        </form>

                        {/* Divider */}
                        <Divider className="my-5">
                            <span className="text-gray-500 text-sm">ATAU</span>
                        </Divider>

                        {/* Register Link */}
                        <div className="text-center">
                            <p className="text-gray-600">
                                Belum punya akun?{' '}
                                <Link
                                    to="/register"
                                    className="text-primary-500 font-semibold hover:text-primary-700 transition-colors"
                                >
                                    Daftar Sekarang
                                </Link>
                            </p>
                        </div>

                        {/* Info Box */}
                        <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-primary-500">
                            <div className="flex gap-3">
                                <i className="pi pi-info-circle text-primary-500 mt-1"></i>
                                <div>
                                    <p className="text-sm text-gray-700">
                                        <strong>Privasi Terjamin:</strong> Kami tidak akan pernah membagikan
                                        informasi akunmu. Username kamu sepenuhnya anonim.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}