import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { Divider } from 'primereact/divider';
import { Checkbox } from 'primereact/checkbox';
import useAuthStore from '../store/authStore';
import { Heart, Brain, Sparkles, UserPlus, ShieldCheck, Lock } from 'lucide-react';

export default function Register() {
    const navigate = useNavigate();
    const { register, isLoading, error, clearError } = useAuthStore();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });

    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        return () => clearError();
    }, [clearError]);

    const validateForm = () => {
        const newErrors = {};

        // Username validation
        if (!formData.username.trim()) {
            newErrors.username = 'Username harus diisi';
        } else if (formData.username.length < 3) {
            newErrors.username = 'Username minimal 3 karakter';
        } else if (formData.username.length > 20) {
            newErrors.username = 'Username maksimal 20 karakter';
        } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
            newErrors.username = 'Username hanya boleh huruf, angka, dan underscore';
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password harus diisi';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password minimal 6 karakter';
        }

        // Confirm password validation
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Konfirmasi password harus diisi';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Password tidak cocok';
        }

        // Terms agreement
        if (!agreedToTerms) {
            newErrors.terms = 'Kamu harus menyetujui syarat dan ketentuan';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const result = await register({
            username: formData.username,
            password: formData.password
        });

        if (result.success) {
            navigate('/dashboard');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
        clearError();
    };

    const passwordHeader = <div className="font-bold mb-3">Pilih Password yang Kuat</div>;
    const passwordFooter = (
        <>
            <Divider />
            <p className="mt-2 text-sm">Saran:</p>
            <ul className="pl-2 ml-2 mt-0 text-sm" style={{ lineHeight: '1.5' }}>
                <li>Minimal 6 karakter</li>
                <li>Kombinasi huruf dan angka</li>
                <li>Hindari informasi pribadi</li>
            </ul>
        </>
    );

    return (
        <div className="auth-container">
            <div className="auth-card grid grid-nogutter fade-in">
                {/* Illustration Side */}
                <div className="col-12 lg:col-6 illustration-side">
                    <div className="illustration-content text-center">
                        {/* Floating Icons */}
                        <div className="floating-hearts" style={{ top: '15%', left: '15%' }}>
                            <Sparkles size={40} />
                        </div>
                        <div className="floating-hearts" style={{ top: '55%', right: '10%', animationDelay: '1.5s' }}>
                            <Heart size={35} />
                        </div>
                        <div className="floating-hearts" style={{ bottom: '25%', left: '25%', animationDelay: '2.5s' }}>
                            <ShieldCheck size={38} />
                        </div>

                        {/* Main Icon */}
                        <div className="mental-health-icon">
                            <UserPlus size={60} strokeWidth={1.5} />
                        </div>

                        {/* Title */}
                        <h1 className="text-5xl font-bold mb-3">Mulai Perjalananmu</h1>
                        <p className="text-xl opacity-90 mb-4">
                            Bergabung dengan ribuan remaja lainnya di Ruang Rona
                        </p>

                        <Divider className="my-4" style={{ borderColor: 'rgba(255,255,255,0.3)' }} />

                        {/* Features */}
                        <div className="mt-5">
                            <div className="flex align-items-center gap-3 mb-3">
                                <Lock size={24} />
                                <span className="text-left">Registrasi Anonim & Cepat</span>
                            </div>
                            <div className="flex align-items-center gap-3 mb-3">
                                <Brain size={24} />
                                <span className="text-left">Akses Tools Kesehatan Mental</span>
                            </div>
                            <div className="flex align-items-center gap-3">
                                <Heart size={24} />
                                <span className="text-left">Komunitas yang Mendukung</span>
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
                                Daftar Akun Baru
                            </h2>
                            <p className="text-gray-600">
                                Cukup username dan password, tanpa data pribadi
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

                        {/* Register Form */}
                        <form onSubmit={handleSubmit}>
                            {/* Username Field */}
                            <div className="field mb-4">
                                <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
                                    Username <span className="text-red-500">*</span>
                                </label>
                                <span className="p-input-icon-left w-full">
                  <i className="pi pi-user" />
                  <InputText
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Pilih username unik (3-20 karakter)"
                      className={`w-full ${errors.username ? 'p-invalid' : ''}`}
                      disabled={isLoading}
                  />
                </span>
                                {errors.username && (
                                    <small className="text-red-500 mt-1 block">{errors.username}</small>
                                )}
                                <small className="text-gray-500 mt-1 block">
                                    Username ini akan menjadi identitas anonim kamu
                                </small>
                            </div>

                            {/* Password Field */}
                            <div className="field mb-4">
                                <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                                    Password <span className="text-red-500">*</span>
                                </label>
                                <Password
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Buat password (min. 6 karakter)"
                                    toggleMask
                                    header={passwordHeader}
                                    footer={passwordFooter}
                                    className={`w-full ${errors.password ? 'p-invalid' : ''}`}
                                    inputClassName="w-full"
                                    disabled={isLoading}
                                />
                                {errors.password && (
                                    <small className="text-red-500 mt-1 block">{errors.password}</small>
                                )}
                            </div>

                            {/* Confirm Password Field */}
                            <div className="field mb-4">
                                <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
                                    Konfirmasi Password <span className="text-red-500">*</span>
                                </label>
                                <Password
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Ketik ulang password kamu"
                                    toggleMask
                                    feedback={false}
                                    className={`w-full ${errors.confirmPassword ? 'p-invalid' : ''}`}
                                    inputClassName="w-full"
                                    disabled={isLoading}
                                />
                                {errors.confirmPassword && (
                                    <small className="text-red-500 mt-1 block">{errors.confirmPassword}</small>
                                )}
                            </div>

                            {/* Terms & Conditions */}
                            <div className="field-checkbox mb-4">
                                <Checkbox
                                    inputId="terms"
                                    checked={agreedToTerms}
                                    onChange={(e) => {
                                        setAgreedToTerms(e.checked);
                                        if (errors.terms) {
                                            setErrors(prev => ({ ...prev, terms: '' }));
                                        }
                                    }}
                                    className={errors.terms ? 'p-invalid' : ''}
                                    disabled={isLoading}
                                />
                                <label htmlFor="terms" className="ml-2 text-gray-700 text-sm">
                                    Saya setuju dengan{' '}
                                    <a href="#" className="text-primary-500 font-medium hover:underline">
                                        Syarat & Ketentuan
                                    </a>{' '}
                                    dan{' '}
                                    <a href="#" className="text-primary-500 font-medium hover:underline">
                                        Kebijakan Privasi
                                    </a>
                                </label>
                                {errors.terms && (
                                    <small className="text-red-500 block mt-1">{errors.terms}</small>
                                )}
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                label={isLoading ? 'Mendaftar...' : 'Daftar Sekarang'}
                                icon={isLoading ? 'pi pi-spin pi-spinner' : 'pi pi-user-plus'}
                                className="w-full p-button-lg p-button-primary mt-4"
                                disabled={isLoading}
                            />
                        </form>

                        {/* Divider */}
                        <Divider className="my-5">
                            <span className="text-gray-500 text-sm">ATAU</span>
                        </Divider>

                        {/* Login Link */}
                        <div className="text-center">
                            <p className="text-gray-600">
                                Sudah punya akun?{' '}
                                <Link
                                    to="/login"
                                    className="text-primary-500 font-semibold hover:text-primary-700 transition-colors"
                                >
                                    Masuk Sekarang
                                </Link>
                            </p>
                        </div>

                        {/* Privacy Notice */}
                        <div className="mt-6 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                            <div className="flex gap-3">
                                <i className="pi pi-shield text-green-600 mt-1"></i>
                                <div>
                                    <p className="text-sm text-gray-700">
                                        <strong>100% Anonim:</strong> Kami tidak meminta email, nomor HP,
                                        atau data pribadi apapun. Username kamu adalah identitas anonimmu.
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