import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, BarChart3, ShieldCheck, Loader2, AlertCircle } from 'lucide-react';

const InstructorLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e: any) => { setFormData({ ...formData, [e.target.name]: e.target.value }); setError(''); };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/api/login', formData);
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('role', response.data.role);
      localStorage.setItem('full_name', response.data.full_name);
      navigate('/dashboard');
    } catch (err: any) { setError("Faculty credentials invalid."); } finally { setIsLoading(false); }
  };

  return (
    <div className="min-h-screen w-full flex bg-white font-sans">
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 md:p-12 relative z-10">
        <Link to="/instructor-auth" className="absolute top-8 left-8 p-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-600 hover:bg-slate-100 transition-all"><ArrowLeft size={20} /></Link>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-md">
          <div className="text-center lg:text-left mb-10"><h2 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Faculty Sign In</h2><p className="text-slate-500 font-medium">Access your administrative learning dashboard.</p></div>
          {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl flex items-center gap-3 text-sm font-bold"><AlertCircle size={18} /> {error}</div>}
          <form className="space-y-6" onSubmit={handleLogin}>
            <div><label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Email Address</label><div className="relative"><Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} /><input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="faculty@ademy.com" className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-4 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold" required /></div></div>
            <div><label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Faculty Password</label><div className="relative"><Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} /><input name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-12 py-4 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold" required /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div></div>
            <button type="submit" disabled={isLoading} className="w-full bg-indigo-900 text-white font-black py-5 rounded-3xl hover:bg-black transition-all active:scale-[0.98] shadow-2xl shadow-indigo-100 flex items-center justify-center gap-3 text-lg">{isLoading ? <Loader2 className="animate-spin" size={24} /> : "Sign In to Portal"}</button>
          </form>
          <p className="text-center mt-10 text-sm font-bold text-slate-400">New to Ademy Faculty? <Link to="/instructor/signup" className="text-indigo-600 hover:text-slate-900 ml-1 underline decoration-2 underline-offset-4 transition-all">Register here</Link></p>
        </motion.div>
      </div>

      <div className="hidden lg:flex w-1/2 bg-indigo-950 relative flex-col justify-center p-20 overflow-hidden rounded-l-[5rem] shadow-[-20px_0_40px_rgba(0,0,0,0.2)]">
        <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-40"><div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500 rounded-full blur-[140px]" /></div>
        <div className="relative z-10 text-center space-y-8">
            <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-[2.5rem] border border-white/20 flex items-center justify-center text-indigo-300 mx-auto shadow-2xl"><BarChart3 size={48} /></div>
            <h1 className="text-5xl font-black text-white tracking-tighter leading-tight">Master the <span className="text-indigo-400">Class Performance.</span></h1>
            <p className="text-xl text-indigo-100/60 font-medium leading-relaxed max-w-md mx-auto">Real-time predictive analytics at your fingertips. See who's succeeding and who needs your intervention before the finals.</p>
        </div>
      </div>
    </div>
  );
};

export default InstructorLogin;