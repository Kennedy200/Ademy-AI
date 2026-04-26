import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, UserPlus, GraduationCap, ArrowLeft, Sparkles, ShieldCheck } from 'lucide-react';

const AuthChoice = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-100/50 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[120px] -z-10 -translate-x-1/3 translate-y-1/3" />

      {/* Back Button */}
      <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-black uppercase tracking-widest text-[10px] transition-colors group">
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
      </Link>

      <div className="max-w-4xl w-full">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
            <motion.div 
                initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
                className="w-20 h-20 bg-indigo-600 text-white rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl shadow-indigo-200"
            >
                <GraduationCap size={40} />
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">Instructor Portal</h1>
                <p className="text-slate-500 font-medium mt-2 max-w-lg mx-auto">Access advanced pedagogical tools, AI performance monitoring, and real-time class analytics.</p>
            </motion.div>
        </div>

        {/* Choice Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* OPTION 1: LOGIN */}
            <motion.button
                whileHover={{ y: -10, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                onClick={() => navigate('/instructor/login')}
                className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 text-left group relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                    <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-500">
                        <LogIn size={32} />
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight mb-3">Welcome Back</h3>
                    <p className="text-slate-500 font-medium mb-8 leading-relaxed">Sign in to your faculty account to resume monitoring student performance.</p>
                    <div className="flex items-center gap-2 text-indigo-600 font-black uppercase tracking-widest text-[10px]">
                        Access Dashboard <ArrowRight size={14} />
                    </div>
                </div>
            </motion.button>

            {/* OPTION 2: SIGNUP */}
            <motion.button
                whileHover={{ y: -10, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                onClick={() => navigate('/instructor/signup')}
                className="bg-slate-900 p-10 rounded-[3.5rem] shadow-2xl text-left group relative overflow-hidden"
            >
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-tl-full" />
                <div className="relative z-10">
                    <div className="w-16 h-16 bg-white/10 text-indigo-400 rounded-3xl flex items-center justify-center mb-8 border border-white/10 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-500">
                        <UserPlus size={32} />
                    </div>
                    <h3 className="text-3xl font-black text-white tracking-tight mb-3">Join Faculty</h3>
                    <p className="text-slate-400 font-medium mb-8 leading-relaxed">Register as an instructor to start building courses and deploying AI assessments.</p>
                    <div className="flex items-center gap-2 text-indigo-400 font-black uppercase tracking-widest text-[10px]">
                        Create Account <ArrowRight size={14} />
                    </div>
                </div>
            </motion.button>

        </div>

        {/* Security Footer */}
        <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            className="mt-16 flex items-center justify-center gap-8 text-slate-400"
        >
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                <ShieldCheck size={16} className="text-indigo-400" /> Secure Encryption
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                <Sparkles size={16} className="text-indigo-400" /> AI-Powered Analysis
            </div>
        </motion.div>
      </div>
    </div>
  );
};

const ArrowRight = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);

export default AuthChoice;