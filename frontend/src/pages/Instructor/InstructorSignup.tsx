import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Mail, Lock, User, Eye, EyeOff, ArrowLeft, Sparkles, CheckCircle2, Loader2, AlertCircle, ShieldCheck } from 'lucide-react';

const InstructorSignup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:8000/api/signup', {
        full_name: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: "teacher"
      });

      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('role', response.data.role); 
      localStorage.setItem('full_name', response.data.full_name);

      // FIXED: Strictly navigate to instructor dashboard
      navigate('/instructor/dashboard');
      
    } catch (err: any) {
      setError(err.response?.data?.detail || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-white font-sans overflow-hidden">

      {/* LEFT PANEL - Branding & Copy */}
      <div className="hidden lg:flex w-1/2 bg-[#020617] relative flex-col justify-between p-12 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px]" />
        </div>

        {/* Top Logo */}
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-3 group w-max">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-700 group-hover:border-indigo-500 transition-colors shadow-xl">
              <img src="/logo.png" alt="Ademy Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-white italic">Ademy.</span>
          </Link>
        </div>

        {/* Middle Copy */}
        <div className="relative z-10 max-w-lg">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8">
            <Sparkles size={14} /> Faculty Access
          </div>
          <h1 className="text-5xl font-black text-white leading-[1.1] tracking-tighter mb-6">
            Architect the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">
              future of learning.
            </span>
          </h1>
          <p className="text-lg text-slate-400 font-medium leading-relaxed mb-10">
            Join the faculty network using Ademy's AI engine to monitor student success, deploy intelligent quizzes, and optimize curriculum effectiveness.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-slate-300 font-medium">
              <CheckCircle2 size={20} className="text-indigo-500" />
              <span>Automated module quiz generation</span>
            </div>
            <div className="flex items-center gap-3 text-slate-300 font-medium">
              <CheckCircle2 size={20} className="text-indigo-500" />
              <span>Real-time class proficiency tracking</span>
            </div>
            <div className="flex items-center gap-3 text-slate-300 font-medium">
              <CheckCircle2 size={20} className="text-indigo-500" />
              <span>AI-driven at-risk student detection</span>
            </div>
          </div>
        </div>

        {/* Bottom Badge */}
        <div className="relative z-10 flex items-center gap-3 border-t border-slate-800 pt-8 mt-8">
          <ShieldCheck size={20} className="text-indigo-500" />
          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">
            Faculty Security Tier Verified
          </p>
        </div>
      </div>

      {/* RIGHT PANEL - Sign Up Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 md:p-12 bg-slate-50 lg:bg-white relative">
        
        {/* Back Button Pinned Top Left */}
        <Link
            to="/instructor-auth"
            className="absolute top-10 left-10 flex items-center justify-center w-11 h-11 bg-white border border-slate-200 rounded-2xl text-slate-500 hover:text-indigo-600 hover:shadow-md transition-all active:scale-90 shadow-sm"
        >
            <ArrowLeft size={20} />
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md mt-16 lg:mt-0"
        >
          <div className="text-center lg:text-left mb-10">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Initialize Portal</h2>
            <p className="text-slate-500 font-medium text-lg">Step into the future of digital education.</p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl flex items-center gap-3 text-sm font-bold shadow-sm">
              <AlertCircle size={18} /> {error}
            </div>
          )}

          {/* Sign Up Form */}
          <form className="space-y-6" onSubmit={handleSignup}>

            {/* Full Name Field */}
            <div className="space-y-2">
              <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Academic Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Dr. Robert Smith"
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-[1.25rem] pl-14 pr-4 py-4.5 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold text-slate-900 placeholder:text-slate-300"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Work Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="faculty@university.edu"
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-[1.25rem] pl-14 pr-4 py-4.5 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold text-slate-900 placeholder:text-slate-300"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Portal Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a secure password"
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-[1.25rem] pl-14 pr-16 py-4.5 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold text-slate-900 placeholder:text-slate-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 text-white font-black py-5 rounded-[2rem] hover:bg-slate-900 transition-all active:scale-[0.98] shadow-2xl shadow-indigo-100 mt-4 flex items-center justify-center gap-3 disabled:opacity-70"
            >
              {isLoading ? (
                <><Loader2 size={24} className="animate-spin" /> Finalizing Portal...</>
              ) : (
                "Access Faculty Dashboard"
              )}
            </button>
          </form>

          <p className="text-center mt-12 text-sm font-bold text-slate-400">
            Already part of the faculty?{' '}
            <Link to="/instructor/login" className="text-indigo-600 hover:text-slate-900 transition-colors underline underline-offset-8 decoration-2 font-black">
              Sign in here
            </Link>
          </p>
        </motion.div>
      </div>

    </div>
  );
};

export default InstructorSignup;