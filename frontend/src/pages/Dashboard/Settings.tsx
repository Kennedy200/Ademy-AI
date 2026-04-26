import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  User, Mail, Shield, Bell,
  Moon, Globe, CheckCircle2,
  Camera, ArrowRight, Code,
  ExternalLink, CreditCard
} from 'lucide-react';

const Settings = () => {
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [userAvatar, setUserAvatar] = useState('');

  // Local state for UI toggles (Visual only as per instructions)
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Retrieve data saved during Login/Signup
    const name = localStorage.getItem('full_name') || 'Ademy User';
    const role = localStorage.getItem('role') || 'student';
    
    setUserName(name);
    setUserRole(role.toUpperCase());
    
    // Generate avatar based on name
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=10b981&color=fff&bold=true`;
    setUserAvatar(avatarUrl);
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20 font-sans px-4">
      
      {/* 1. HEADER SECTION */}
      <div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Settings</h1>
        <p className="text-slate-500 font-medium mt-1">Manage your account preferences and profile information.</p>
      </div>

      {/* 2. PROFILE HERO CARD */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[3rem] p-8 md:p-12 border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-8 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full opacity-50" />
        
        <div className="relative">
            <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden border-4 border-white shadow-xl">
                <img src={userAvatar} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <button className="absolute -bottom-2 -right-2 bg-slate-900 text-white p-3 rounded-2xl shadow-lg hover:bg-emerald-600 transition-colors">
                <Camera size={18} />
            </button>
        </div>

        <div className="text-center md:text-left space-y-2">
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                Verified Account
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">{userName}</h2>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs flex items-center justify-center md:justify-start gap-2">
                <Shield size={14} className="text-emerald-500" /> {userRole} Access
            </p>
        </div>
      </motion.div>

      {/* 3. SETTINGS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Account Details */}
        <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                <User size={22} className="text-emerald-500" /> Public Profile
            </h3>
            
            <div className="space-y-6">
                <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Display Name</label>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 font-bold text-slate-700">
                        {userName}
                    </div>
                </div>
                <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Primary Role</label>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 font-bold text-slate-700 uppercase tracking-widest">
                        {userRole}
                    </div>
                </div>
            </div>
        </div>

        {/* Preferences */}
        <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                <Bell size={22} className="text-blue-500" /> Preferences
            </h3>
            
            <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                            <Mail size={18} className="text-slate-400" />
                        </div>
                        <span className="text-sm font-black text-slate-700">AI Alerts</span>
                    </div>
                    <button 
                        onClick={() => setNotifications(!notifications)}
                        className={`w-12 h-6 rounded-full transition-colors relative ${notifications ? 'bg-emerald-500' : 'bg-slate-300'}`}
                    >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${notifications ? 'left-7' : 'left-1'}`} />
                    </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                            <Moon size={18} className="text-slate-400" />
                        </div>
                        <span className="text-sm font-black text-slate-700"> All Prefences</span>
                    </div>
                    <button 
                        onClick={() => setDarkMode(!darkMode)}
                        className={`w-12 h-6 rounded-full transition-colors relative ${darkMode ? 'bg-emerald-500' : 'bg-slate-300'}`}
                    >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${darkMode ? 'left-7' : 'left-1'}`} />
                    </button>
                </div>
            </div>
        </div>

      </div>

      {/* 4. SYSTEM INFO SECTION */}
      <div className="bg-slate-900 rounded-[3rem] p-10 md:p-14 text-white relative overflow-hidden group">
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="space-y-4 max-w-md text-center md:text-left">
                <div className="inline-flex items-center gap-2 text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em]">
                    System Status <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                </div>
                <h3 className="text-3xl font-black tracking-tight leading-tight">Ademy Intelligent Platform v4.0.2</h3>
                <p className="text-slate-400 font-medium">Your account is synced with the local database. Real-time monitoring and AI analysis are active.</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
                <button className="bg-white/5 border border-white/10 p-5 rounded-3xl hover:bg-white/10 transition-all text-center">
                    <Globe className="mx-auto mb-3 text-blue-400" size={24} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Network</span>
                </button>
                <button className="bg-white/5 border border-white/10 p-5 rounded-3xl hover:bg-white/10 transition-all text-center">
                    <Code className="mx-auto mb-3 text-emerald-400" size={24} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Source</span>
                </button>
            </div>
        </div>
      </div>

    </div>
  );
};

export default Settings;