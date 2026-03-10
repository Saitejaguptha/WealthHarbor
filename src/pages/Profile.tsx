import React, { useState } from 'react';
import { FiUser, FiCalendar, FiLock, FiSave, FiEdit2, FiCheck } from 'react-icons/fi';

const Profile: React.FC = () => {
    const [isSaving, setIsSaving] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    // Profile State
    const [profile, setProfile] = useState({
        username: 'Saiteja Guptha',
        dob: '1995-05-15',
    });

    // Password State
    const [passwords, setPasswords] = useState({
        current: '',
        new: '',
        confirm: '',
    });

    const handleSaveProfile = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        // Simulate API call
        setTimeout(() => {
            setIsSaving(false);
            setIsSaved(true);
            setTimeout(() => setIsSaved(false), 3000);
        }, 1000);
    };

    return (
        <div className="p-4 md:p-10 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-1000 space-y-6 md:space-y-10">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 mb-4">
                <div className="relative group">
                    <div className="h-24 w-24 md:h-40 md:w-40 rounded-full bg-indigo-100 border-4 border-white flex items-center justify-center text-indigo-600 overflow-hidden shadow-2xl ring-4 ring-indigo-50/50 group-hover:ring-indigo-100 transition-all">
                        <img
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Lucky"
                            alt="Profile"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    </div>
                </div>
                <div className="text-center md:text-left">
                    <h1 className="text-3xl md:text-5xl font-black text-indigo-950 tracking-tighter mb-2">User Profile</h1>
                    <p className="text-indigo-900/60 font-medium text-sm md:text-base">Manage your personal information and security</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {/* Personal Information */}
                <div className="bg-white/70 backdrop-blur-xl border border-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-xl shadow-indigo-100/30 space-y-6 md:space-y-8">
                    <div className="flex items-center gap-3 pb-4 border-b border-indigo-50">
                        <div className="p-2.5 bg-indigo-600 text-white rounded-xl md:rounded-2xl shadow-lg shadow-indigo-600/20">
                            <FiUser className="text-lg md:text-xl" />
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-indigo-950 tracking-tight">Personal Details</h2>
                    </div>

                    <form onSubmit={handleSaveProfile} className="space-y-5 md:space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] md:text-sm font-black text-indigo-900/40 uppercase tracking-widest ml-1">Username</label>
                            <div className="relative group">
                                <FiEdit2 className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-300 group-focus-within:text-indigo-600 transition-colors" />
                                <input
                                    type="text"
                                    value={profile.username}
                                    onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                                    className="w-full pl-11 md:pl-12 pr-4 py-3.5 md:py-4 bg-white border-2 border-indigo-50 rounded-xl md:rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-semibold text-indigo-950 text-sm md:text-base"
                                    placeholder="Enter username"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] md:text-sm font-black text-indigo-900/40 uppercase tracking-widest ml-1">Date of Birth</label>
                            <div className="relative group">
                                <input
                                    type="date"
                                    value={profile.dob}
                                    onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
                                    className="w-full px-5 py-3.5 md:py-4 bg-white border-2 border-indigo-50 rounded-xl md:rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-semibold text-indigo-950 text-sm md:text-base"
                                />
                            </div>
                        </div>


                        <button
                            type="submit"
                            disabled={isSaving}
                            className={`w-full py-4 rounded-2xl font-black flex items-center justify-center gap-3 transition-all duration-300 shadow-lg ${isSaved
                                ? 'bg-emerald-500 text-white shadow-emerald-200'
                                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200 hover:shadow-indigo-300 active:scale-95'
                                }`}
                        >
                            {isSaving ? (
                                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : isSaved ? (
                                <><FiCheck className="text-xl" /> Saved Successfully</>
                            ) : (
                                <><FiSave className="text-xl" /> Save Profile Info</>
                            )}
                        </button>
                    </form>
                </div>

                {/* Security / Password */}
                <div className="bg-white/70 backdrop-blur-xl border border-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-xl shadow-indigo-100/30 space-y-6 md:space-y-8 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-3 pb-4 border-b border-indigo-50 mb-6 md:mb-8">
                            <div className="p-2.5 bg-indigo-600 text-white rounded-xl md:rounded-2xl shadow-lg shadow-indigo-600/20">
                                <FiLock className="text-lg md:text-xl" />
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold text-indigo-950 tracking-tight">Security</h2>
                        </div>

                        <div className="space-y-5 md:space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] md:text-sm font-black text-indigo-900/40 uppercase tracking-widest ml-1">Current Password</label>
                                <input
                                    type="password"
                                    value={passwords.current}
                                    onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                                    className="w-full px-5 md:px-6 py-3.5 md:py-4 bg-white border-2 border-indigo-50 rounded-xl md:rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-semibold text-indigo-950 text-sm md:text-base placeholder:text-indigo-200"
                                    placeholder="••••••••"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] md:text-sm font-black text-indigo-900/40 uppercase tracking-widest ml-1">New Password</label>
                                <input
                                    type="password"
                                    value={passwords.new}
                                    onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                                    className="w-full px-5 md:px-6 py-3.5 md:py-4 bg-white border-2 border-indigo-50 rounded-xl md:rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-semibold text-indigo-950 text-sm md:text-base placeholder:text-indigo-200"
                                    placeholder="••••••••"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] md:text-sm font-black text-indigo-900/40 uppercase tracking-widest ml-1">Confirm Password</label>
                                <input
                                    type="password"
                                    value={passwords.confirm}
                                    onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                                    className="w-full px-5 md:px-6 py-3.5 md:py-4 bg-white border-2 border-indigo-50 rounded-xl md:rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-semibold text-indigo-950 text-sm md:text-base placeholder:text-indigo-200"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>
                    </div>

                    <button className="w-full mt-6 md:mt-8 py-3.5 md:py-4 bg-indigo-600 text-white rounded-xl md:rounded-2xl font-black hover:bg-indigo-700 shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all active:scale-95 text-sm md:text-base">
                        Update Password
                    </button>
                </div>
            </div>

            <div className="bg-white/40 backdrop-blur-md border border-white p-6 rounded-[2rem] flex items-center gap-4 text-indigo-900/60 font-medium text-sm">
                <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                Your data is securely stored locally and encrypted for your safety.
            </div>
        </div>
    );
};

export default Profile;
