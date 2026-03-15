import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiCalendar, FiUser, FiLock, FiArrowLeft, FiCheckCircle } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

import { addNotification } from '../utils/watchlistUtils';

const ForgotPassword: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Verify, 2: Reset
    const [verifyType, setVerifyType] = useState('email');
    const [verifyValue, setVerifyValue] = useState('');
    const [foundUser, setFoundUser] = useState<any>(null);
    const [newPasswords, setNewPasswords] = useState({
        new: '',
        confirm: ''
    });

    const handleVerify = (e: React.FormEvent) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem('wealthharbor_users') || '[]');
        const user = users.find((u: any) => {
            if (verifyType === 'email') return u.email.toLowerCase() === verifyValue.toLowerCase();
            if (verifyType === 'dob') return u.dob === verifyValue;
            if (verifyType === 'username') return u.username.toLowerCase() === verifyValue.toLowerCase();
            return false;
        });

        if (user) {
            setFoundUser(user);
            setStep(2);
            toast.success('Identity verified! Please set your new password.');
        } else {
            toast.error(`No user found with this ${verifyType}.`);
        }
    };

    const handleReset = (e: React.FormEvent) => {
        e.preventDefault();
        if (newPasswords.new.length < 6) {
            toast.error('Password must be at least 6 characters.');
            return;
        }
        if (newPasswords.new !== newPasswords.confirm) {
            toast.error('Passwords do not match.');
            return;
        }

        const users = JSON.parse(localStorage.getItem('wealthharbor_users') || '[]');
        const updatedUsers = users.map((u: any) => 
            u.email === foundUser.email ? { ...u, password: newPasswords.new } : u
        );

        localStorage.setItem('wealthharbor_users', JSON.stringify(updatedUsers));
        
        // Add notification for the user
        if (foundUser?.email) {
            addNotification(foundUser.email, 'Your password was successfully reset via the recovery flow.');
        }

        toast.success('Password reset successfully! Please login.');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-[#F8FAFF] flex items-center justify-center p-0 md:p-4">
            <div className="w-full md:max-w-md h-screen md:h-auto bg-white md:rounded-[2.5rem] shadow-2xl shadow-indigo-100 p-6 md:p-12 relative overflow-y-auto">
                <Link to="/login" className="absolute left-8 top-8 text-indigo-400 hover:text-indigo-600 transition-colors">
                    <FiArrowLeft size={24} />
                </Link>

                <div className="text-center mb-10 mt-4">
                    <h1 className="text-3xl font-black text-indigo-950 tracking-tighter mb-2 uppercase">Reset Password</h1>
                    <p className="text-indigo-900/40 font-bold text-xs uppercase tracking-widest">
                        {step === 1 ? 'Verify your identity to proceed' : 'Set your new secure password'}
                    </p>
                </div>

                {step === 1 ? (
                    <form onSubmit={handleVerify} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-indigo-900/40 uppercase tracking-widest ml-1">Verification Method</label>
                            <select 
                                value={verifyType}
                                onChange={(e) => {
                                    setVerifyType(e.target.value);
                                    setVerifyValue('');
                                }}
                                className="w-full px-6 py-4 bg-indigo-50/50 border-2 border-transparent focus:border-indigo-500 rounded-2xl outline-none transition-all font-bold text-indigo-950"
                            >
                                <option value="email">Email Address</option>
                                <option value="dob">Date of Birth</option>
                                <option value="username">Username</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-indigo-900/40 uppercase tracking-widest ml-1">
                                {verifyType === 'email' ? 'Enter Email' : verifyType === 'dob' ? 'Enter Date of Birth' : 'Enter Username'}
                            </label>
                            <div className="relative group">
                                {verifyType === 'email' && <FiMail className="absolute left-5 top-1/2 -translate-y-1/2 text-indigo-300" />}
                                {verifyType === 'dob' && <FiCalendar className="absolute left-5 top-1/2 -translate-y-1/2 text-indigo-300" />}
                                {verifyType === 'username' && <FiUser className="absolute left-5 top-1/2 -translate-y-1/2 text-indigo-300" />}
                                <input
                                    type={verifyType === 'dob' ? 'date' : 'text'}
                                    required
                                    value={verifyValue}
                                    onChange={(e) => setVerifyValue(e.target.value)}
                                    className="w-full pl-14 pr-6 py-4 bg-white border-2 border-indigo-50 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-bold text-indigo-950 placeholder:text-indigo-200"
                                    placeholder={verifyType === 'email' ? 'example@mail.com' : verifyType === 'dob' ? '' : 'your_username'}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all active:scale-95 uppercase tracking-widest"
                        >
                            Verify Identity
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleReset} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-indigo-900/40 uppercase tracking-widest ml-1">New Password</label>
                            <div className="relative group">
                                <FiLock className="absolute left-5 top-1/2 -translate-y-1/2 text-indigo-300" />
                                <input
                                    type="password"
                                    required
                                    value={newPasswords.new}
                                    onChange={(e) => setNewPasswords({ ...newPasswords, new: e.target.value })}
                                    className="w-full pl-14 pr-6 py-4 bg-white border-2 border-indigo-50 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-bold text-indigo-950 placeholder:text-indigo-200"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-indigo-900/40 uppercase tracking-widest ml-1">Confirm Password</label>
                            <div className="relative group">
                                <FiLock className="absolute left-5 top-1/2 -translate-y-1/2 text-indigo-300" />
                                <input
                                    type="password"
                                    required
                                    value={newPasswords.confirm}
                                    onChange={(e) => setNewPasswords({ ...newPasswords, confirm: e.target.value })}
                                    className="w-full pl-14 pr-6 py-4 bg-white border-2 border-indigo-50 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-bold text-indigo-950 placeholder:text-indigo-200"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-5 bg-emerald-500 text-white rounded-2xl font-black hover:bg-emerald-600 shadow-xl shadow-emerald-200 transition-all active:scale-95 uppercase tracking-widest flex items-center justify-center gap-2"
                        >
                            <FiCheckCircle size={20} /> Reset Password
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
