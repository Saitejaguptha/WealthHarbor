import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';
import { toast } from 'react-hot-toast';
import { FiMail, FiLock, FiLogIn, FiArrowRight } from 'react-icons/fi';
import { addNotification } from '../utils/watchlistUtils';

const Login: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/stocks';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            toast.error('Please fill in all fields');
            return;
        }

        const success = login(formData.email, formData.password);

        if (success) {
            addNotification(formData.email, 'Successful login detected. Welcome back!');
            toast.success('Logged in successfully!');
            navigate(from, { replace: true });
        } else {
            addNotification(formData.email, 'Failed login attempt detected for this email address.');
            toast.error('Invalid credentials. Redirecting to Signup...');
            setTimeout(() => navigate('/signup'), 2000);
        }
    };

    return (
        <div className="min-h-screen bg-indigo-50/30 flex items-center justify-center p-4">
        <div className="bg-white/70 backdrop-blur-xl border border-white p-6 md:p-8 rounded-[2.5rem] shadow-2xl shadow-indigo-100/50 w-full max-w-md animate-in fade-in zoom-in duration-500">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-3xl mx-auto mb-4 shadow-lg shadow-indigo-200">
                        <FiLogIn />
                    </div>
                    <h1 className="text-3xl font-black text-indigo-950 tracking-tight">Welcome Back</h1>
                    <p className="text-indigo-900/40 text-sm font-bold uppercase tracking-widest mt-1">Login to your account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                        <div className="relative group">
                            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-300 group-focus-within:text-indigo-600 transition-colors" />
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full pl-12 pr-4 py-3 bg-white border border-indigo-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-indigo-950 placeholder:text-indigo-200"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <div className="relative group">
                            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-300 group-focus-within:text-indigo-600 transition-colors" />
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full pl-12 pr-4 py-3 bg-white border border-indigo-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-indigo-950 placeholder:text-indigo-200"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 uppercase tracking-widest text-sm mt-4"
                    >
                        Login <FiArrowRight />
                    </button>
                </form>

                <p className="text-center mt-8 text-indigo-900/40 font-bold text-xs uppercase tracking-widest">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-indigo-600 hover:text-indigo-700">
                        Sign Up Now
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
