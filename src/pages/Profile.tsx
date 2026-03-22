import React, { useState, useEffect } from 'react';
import { FiUser, FiLock, FiSave, FiEdit2, FiCheck, FiPhone, FiAlertCircle, FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '../features/auth/AuthContext';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import PageShell from '../components/layout/PageShell';

import { addNotification } from '../utils/watchlistUtils';

const Profile: React.FC = () => {
    const { user, updateUser } = useAuth();
    const [isSaving, setIsSaving] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isPasswordVerified, setIsPasswordVerified] = useState(false);

    // Profile State
    const [profile, setProfile] = useState({
        username: user?.username || '',
        email: user?.email || '',
        mobile: user?.mobile || '',
        gender: user?.gender || '',
        dob: user?.dob || '',
    });

    // Password State
    const [passwords, setPasswords] = useState({
        current: '',
        new: '',
        confirm: '',
    });
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        if (user) {
            setProfile({
                username: user.username,
                email: user.email,
                mobile: user.mobile,
                gender: user.gender,
                dob: user.dob
            });
        }
    }, [user]);

    const handleVerifyPassword = () => {
        const users = JSON.parse(localStorage.getItem('wealthharbor_users') || '[]');
        const storedUser = users.find((u: any) => u.email === user?.email);
        
        if (storedUser && storedUser.password === passwords.current) {
            setIsPasswordVerified(true);
            toast.success('Password verified! You can now set a new password.');
        } else {
            toast.error('Incorrect current password.');
        }
    };

    const handleSaveProfile = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        
        const success = updateUser(profile);
        
        setTimeout(() => {
            setIsSaving(false);
            if (success) {
                setIsSaved(true);
                setIsEditing(false);
                if (user?.email) {
                    addNotification(user.email, 'Your profile information has been updated successfully.');
                }
                toast.success('Profile updated successfully!');
                setTimeout(() => setIsSaved(false), 3000);
            } else {
                toast.error('Failed to update profile. Email might already exist.');
            }
        }, 800);
    };

    const handleUpdatePassword = () => {
        if (passwords.new.length < 6) {
            toast.error('New password must be at least 6 characters.');
            return;
        }
        if (passwords.new !== passwords.confirm) {
            toast.error('Passwords do not match.');
            return;
        }

        const success = updateUser({ password: passwords.new });
        if (success) {
            if (user?.email) {
                addNotification(user.email, 'Your account password has been changed successfully.');
            }
            toast.success('Password updated successfully!');
            setPasswords({ current: '', new: '', confirm: '' });
            setIsPasswordVerified(false);
        } else {
            toast.error('Failed to update password.');
        }
    };

    return (
        <PageShell maxWidth="4xl" className="animate-in fade-in slide-in-from-bottom-6 duration-1000 space-y-6 md:space-y-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 mb-4">
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-center md:text-left">
                    <div className="relative group">
                        <div className="h-24 w-24 md:h-40 md:w-40 rounded-full bg-indigo-100 border-4 border-white flex items-center justify-center text-indigo-600 overflow-hidden shadow-2xl ring-4 ring-indigo-50/50 group-hover:ring-indigo-100 transition-all">
                            <img
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username}`}
                                alt="Profile"
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        </div>
                    </div>
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black text-indigo-950 tracking-tighter mb-1 uppercase">Profile</h1>
                        <p className="text-indigo-900/60 font-medium text-xs md:text-base uppercase tracking-widest">Account Settings</p>
                    </div>
                </div>

                {!isEditing && (
                    <button 
                        onClick={() => setIsEditing(true)}
                        className="w-full md:w-auto px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95 flex items-center justify-center gap-2 uppercase tracking-widest text-sm"
                    >
                        <FiEdit2 /> Edit Profile Info
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                {/* Personal Information */}
                <div className="bg-white/70 backdrop-blur-xl border border-white p-4 md:p-8 rounded-[1.25rem] md:rounded-[2.5rem] shadow-xl shadow-indigo-100/30 space-y-4 md:space-y-8 overflow-hidden relative">
                    {!isEditing && (
                        <div className="absolute inset-0 z-10 bg-white/10 cursor-not-allowed" />
                    )}
                    <div className="flex items-center gap-3 pb-3 border-b border-indigo-50">
                        <div className="p-2 bg-indigo-600 text-white rounded-lg md:rounded-2xl shadow-lg shadow-indigo-600/20 shrink-0">
                            <FiUser className="text-base md:text-xl" />
                        </div>
                        <h2 className="text-lg md:text-2xl font-bold text-indigo-950 tracking-tight truncate uppercase">Personal Details</h2>
                    </div>

                    <form onSubmit={handleSaveProfile} className="space-y-4 md:space-y-6">
                        <div className="space-y-2">
                            <label className="text-[9px] md:text-sm font-black text-indigo-900/40 uppercase tracking-widest ml-1">Username</label>
                            <div className="relative group">
                                <FiUser className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-indigo-300 group-focus-within:text-indigo-600 transition-colors text-xs md:text-base" />
                                <input
                                    type="text"
                                    disabled={!isEditing}
                                    value={profile.username}
                                    onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                                    className="w-full pl-9 md:pl-12 pr-4 py-3 md:py-4 bg-white border-2 border-indigo-50 rounded-xl md:rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-semibold text-indigo-950 text-xs md:text-base min-w-0 disabled:opacity-50"
                                    placeholder="Enter username"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[9px] md:text-sm font-black text-indigo-900/40 uppercase tracking-widest ml-1">Email Address</label>
                            <div className="relative group">
                                <div className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-indigo-300 group-focus-within:text-indigo-600 transition-colors text-xs md:text-base font-black">@</div>
                                <input
                                    type="email"
                                    disabled={!isEditing}
                                    value={profile.email}
                                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                    className="w-full pl-9 md:pl-12 pr-4 py-3 md:py-4 bg-white border-2 border-indigo-50 rounded-xl md:rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-semibold text-indigo-950 text-xs md:text-base min-w-0 disabled:opacity-50"
                                    placeholder="Enter email"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[9px] md:text-sm font-black text-indigo-900/40 uppercase tracking-widest ml-1">Mobile Number</label>
                            <div className="relative group">
                                <FiPhone className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-indigo-300 group-focus-within:text-indigo-600 transition-colors text-xs md:text-base" />
                                <input
                                    type="tel"
                                    disabled={!isEditing}
                                    value={profile.mobile}
                                    onChange={(e) => setProfile({ ...profile, mobile: e.target.value })}
                                    className="w-full pl-9 md:pl-12 pr-4 py-3 md:py-4 bg-white border-2 border-indigo-50 rounded-xl md:rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-semibold text-indigo-950 text-xs md:text-base min-w-0 disabled:opacity-50"
                                    placeholder="Enter mobile number"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[9px] md:text-sm font-black text-indigo-900/40 uppercase tracking-widest ml-1">Gender</label>
                                <select
                                    disabled={!isEditing}
                                    value={profile.gender}
                                    onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                                    className="w-full px-4 py-3 md:py-4 bg-white border-2 border-indigo-50 rounded-xl md:rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-semibold text-indigo-950 text-xs md:text-base disabled:opacity-50"
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[9px] md:text-sm font-black text-indigo-900/40 uppercase tracking-widest ml-1">Date of Birth</label>
                                <input
                                    type="date"
                                    disabled={!isEditing}
                                    value={profile.dob}
                                    onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
                                    className="w-full px-4 py-3 md:py-4 bg-white border-2 border-indigo-50 rounded-xl md:rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-semibold text-indigo-950 text-xs md:text-base disabled:opacity-50"
                                />
                            </div>
                        </div>

                        {isEditing && (
                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsEditing(false);
                                        setProfile({
                                            username: user?.username || '',
                                            email: user?.email || '',
                                            mobile: user?.mobile || '',
                                            gender: user?.gender || '',
                                            dob: user?.dob || ''
                                        });
                                    }}
                                    className="flex-1 py-4 bg-gray-50 text-indigo-400 rounded-2xl font-black hover:bg-gray-100 transition-all uppercase tracking-widest text-xs"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className={`flex-1 py-4 rounded-2xl font-black flex items-center justify-center gap-3 transition-all duration-300 shadow-lg ${isSaved
                                        ? 'bg-emerald-500 text-white shadow-emerald-200'
                                        : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200 hover:shadow-indigo-300 active:scale-95'
                                        }`}
                                >
                                    {isSaving ? (
                                        <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : isSaved ? (
                                        <><FiCheck size={20} /> Saved</>
                                    ) : (
                                        <><FiSave size={20} /> Update Info</>
                                    )}
                                </button>
                            </div>
                        )}
                    </form>
                </div>

                {/* Security / Password */}
                <div className="bg-white/70 backdrop-blur-xl border border-white p-4 md:p-8 rounded-[1.25rem] md:rounded-[2.5rem] shadow-xl shadow-indigo-100/30 space-y-4 md:space-y-8 flex flex-col justify-between overflow-hidden relative">
                    {!isEditing && (
                        <div className="absolute inset-0 z-10 bg-white/10 cursor-not-allowed" />
                    )}
                    <div>
                        <div className="flex items-center gap-3 pb-3 border-b border-indigo-50 mb-4 md:mb-8">
                            <div className="p-2 bg-indigo-600 text-white rounded-lg md:rounded-2xl shadow-lg shadow-indigo-600/20 shrink-0">
                                <FiLock className="text-base md:text-xl" />
                            </div>
                            <h2 className="text-lg md:text-2xl font-bold text-indigo-950 tracking-tight truncate uppercase">Security Settings</h2>
                        </div>

                        {!isPasswordVerified ? (
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[9px] md:text-sm font-black text-indigo-900/40 uppercase tracking-widest ml-1">Confirm Current Password</label>
                                    <div className="relative">
                                        <input
                                            type={showCurrentPassword ? "text" : "password"}
                                            disabled={!isEditing}
                                            value={passwords.current}
                                            onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                                            className="w-full px-4 md:px-6 py-3 md:py-4 bg-white border-2 border-indigo-50 rounded-xl md:rounded-2xl focus:border-indigo-500 outline-none transition-all font-semibold text-indigo-950 text-xs md:text-base placeholder:text-indigo-100 disabled:opacity-50"
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-indigo-300 hover:text-indigo-600 transition-colors"
                                        >
                                            {showCurrentPassword ? <FiEyeOff /> : <FiEye />}
                                        </button>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <button
                                        onClick={handleVerifyPassword}
                                        disabled={!isEditing || !passwords.current}
                                        className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all uppercase tracking-widest text-xs disabled:opacity-50"
                                    >
                                        Verify to Change Password
                                    </button>
                                    <Link 
                                        to="/forgot-password"
                                        className="text-center text-indigo-400 hover:text-indigo-600 font-bold transition-all text-[10px] md:text-xs flex items-center justify-center gap-1 uppercase tracking-widest"
                                    >
                                        <FiAlertCircle /> Forgot Password?
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4 md:space-y-6 animate-in slide-in-from-right-4 duration-500">
                                <div className="space-y-1">
                                    <label className="text-[9px] md:text-sm font-black text-indigo-900/40 uppercase tracking-widest ml-1">New Password</label>
                                    <div className="relative">
                                        <input
                                            type={showNewPassword ? "text" : "password"}
                                            value={passwords.new}
                                            onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                                            className="w-full px-4 md:px-6 py-3 md:py-4 bg-emerald-50/30 border-2 border-emerald-100 rounded-xl md:rounded-2xl focus:border-emerald-500 outline-none transition-all font-semibold text-indigo-950 text-xs md:text-base"
                                            placeholder="Min 6 characters"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-300 hover:text-emerald-600 transition-colors"
                                        >
                                            {showNewPassword ? <FiEyeOff /> : <FiEye />}
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[9px] md:text-sm font-black text-indigo-900/40 uppercase tracking-widest ml-1">Confirm New Password</label>
                                    <div className="relative">
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            value={passwords.confirm}
                                            onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                                            className="w-full px-4 md:px-6 py-3 md:py-4 bg-emerald-50/30 border-2 border-emerald-100 rounded-xl md:rounded-2xl focus:border-emerald-500 outline-none transition-all font-semibold text-indigo-950 text-xs md:text-base"
                                            placeholder="Confirm new password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-300 hover:text-emerald-600 transition-colors"
                                        >
                                            {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                                        </button>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <button 
                                        onClick={() => setIsPasswordVerified(false)}
                                        className="flex-1 py-4 bg-gray-50 text-indigo-400 rounded-2xl font-black hover:bg-gray-100 transition-all uppercase tracking-widest text-xs"
                                    >
                                        Back
                                    </button>
                                    <button 
                                        onClick={handleUpdatePassword}
                                        className="flex-[2] py-4 bg-emerald-500 text-white rounded-2xl font-black hover:bg-emerald-600 shadow-lg shadow-emerald-200 transition-all uppercase tracking-widest text-xs"
                                    >
                                        Update Password
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="bg-white/40 backdrop-blur-md border border-white p-4 md:p-6 rounded-[1.25rem] md:rounded-[2rem] flex items-center gap-3 text-indigo-900/60 font-medium text-[10px] md:text-sm">
                <div className="h-1.5 w-1.5 md:h-2 md:w-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)] shrink-0" />
                Security Check: Your information is safe and only accessible to you.
            </div>
        </PageShell>
    );
};

export default Profile;
