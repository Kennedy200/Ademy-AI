import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import axios from '../../api/axios'; // Fixed: use relative path to axios instance
import { Mail, Lock, Eye, EyeOff, ArrowLeft, BarChart3, Quote, Loader2, AlertCircle } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Form States
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  // 1. STANDARD LOGIN LOGIC
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Please fill in both fields.");
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // FIXED: Removed hardcoded URL. The custom axios knows the BaseURL.
      const response = await axios.post('/api/login', {
        email: formData.email,
        password: formData.password
      });

      // FIXED: Saving all necessary fields to LocalStorage
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('role', response.data.role);
      localStorage.setItem('full_name', response.data.full_name);
      
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.detail || "Invalid email or password.");
    } finally {
      setIsLoading(false);
    }
  };

  // 2. GOOGLE LOGIN LOGIC
  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      setError('');
      try {
        const response = await axios.post('/api/auth/google', {
          token: tokenResponse.access_token
        });

        // SAVE EVERYTHING TO LOCAL STORAGE
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('role', response.data.role);
        localStorage.setItem('full_name', response.data.full_name);
        
        // Store the profile picture URL if available
        if (response.data.picture) {
            localStorage.setItem('user_picture', response.data.picture);
        }
        
        navigate('/dashboard');
      } catch (err: any) {
        setError("Google authentication failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    onError: () => setError("Google login failed.")
  });

  return (
    <div className="min-h-screen w-full flex bg-white font-sans overflow-hidden">
      
      {/* LEFT PANEL - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 md:p-12 relative z-10 bg-slate-50 lg:bg-white">
        
        <div className="absolute top-6 left-6 flex items-center justify-between w-[calc(100%-3rem)] lg:hidden">
          <Link to="/" className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-full text-slate-600 hover:bg-slate-100 transition-colors shadow-sm">
            <ArrowLeft size={20} />
          </Link>
          <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200 shadow-sm">
            <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md mt-16 lg:mt-0"
        >
          <div className="text-center lg:text-left mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-2">Welcome back</h2>
            <p className="text-slate-500 font-medium">Please enter your details to sign in.</p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl flex items-center gap-3 text-sm font-bold shadow-sm">
              <AlertCircle size={18} /> {error}
            </div>
          )}

          {/* Google Auth Button */}
          <button 
            type="button"
            onClick={() => loginWithGoogle()}
            disabled={isLoading}
            className="w-full bg-white border-2 border-slate-200 text-slate-700 font-bold py-3.5 rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Sign in with Google
          </button>

          <div className="flex items-center my-8">
            <div className="flex-1 h-px bg-slate-200"></div>
            <span className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Or authenticate via email</span>
            <div className="flex-1 h-px bg-slate-200"></div>
          </div>

          {/* Sign In Form */}
          <form className="space-y-5" onSubmit={handleLogin}>
            
            <div className="space-y-2">
              <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                  <Mail size={18} />
                </div>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@gmail.com"
                  className="w-full bg-slate-50 border-2 border-slate-100 text-slate-900 rounded-[1.25rem] pl-11 pr-4 py-4 outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all font-bold shadow-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">Account Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                  <Lock size={18} />
                </div>
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border-2 border-slate-100 text-slate-900 rounded-[1.25rem] pl-11 pr-12 py-4 outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all font-bold shadow-sm"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-emerald-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="remember" 
                  className="w-4 h-4 rounded border-slate-300 text-emerald-500 focus:ring-emerald-500/20"
                />
                <label htmlFor="remember" className="text-sm font-bold text-slate-600 cursor-pointer">
                  Keep me signed in
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-slate-900 text-white font-black py-5 rounded-[2rem] hover:bg-emerald-600 transition-all active:scale-[0.98] shadow-2xl shadow-slate-200 mt-6 flex items-center justify-center gap-3 disabled:opacity-70"
            >
              {isLoading ? <><Loader2 size={24} className="animate-spin" /> Verifying Session...</> : "Sign In to Dashboard"}
            </button>
          </form>

          <p className="text-center mt-12 text-sm font-bold text-slate-400">
            Don't have an account? <Link to="/signup" className="text-slate-900 font-black hover:text-emerald-600 transition-colors ml-1 underline underline-offset-8 decoration-2">Create one here</Link>
          </p>
        </motion.div>
      </div>

      {/* RIGHT PANEL - Branding & Copy (Hidden on Mobile) */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 relative flex-col justify-between p-12 overflow-hidden rounded-l-[4rem] shadow-[-20px_0_60px_rgba(0,0,0,0.2)]">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px]" />
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        </div>

        <div className="relative z-10 flex justify-end items-center w-full">
          <Link to="/" className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors text-[10px] font-black uppercase tracking-[0.3em] group bg-white/5 px-6 py-3 rounded-2xl border border-white/5">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to landing
          </Link>
        </div>

        <div className="relative z-10 max-w-lg mx-auto w-full text-center mt-10">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-[2.5rem] border border-white/20 flex items-center justify-center text-emerald-400 mx-auto mb-10 shadow-2xl"
          >
            <BarChart3 size={48} />
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-black text-white leading-[1] tracking-tighter mb-8 italic">
            Pick up where <br /><span className="text-emerald-400">you left off.</span>
          </h1>
          <p className="text-lg text-slate-400 font-medium leading-relaxed max-w-sm mx-auto">
            Access your personalized learning roadmap and real-time AI performance monitoring.
          </p>
        </div>

        <div className="relative z-10 bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[3rem] mt-12 max-w-lg mx-auto w-full group hover:bg-white/10 transition-all cursor-default">
          <Quote size={32} className="text-blue-500 mb-6 opacity-30" />
          <p className="text-slate-300 font-medium leading-relaxed text-lg mb-8 italic">
            "Ademy's predictive AI identifies bottlenecks before they impact your GPA. Experience a truly data-driven learning journey."
          </p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl overflow-hidden bg-slate-800 border-2 border-white/10 group-hover:border-emerald-500 transition-colors">
              <img src="https://i.pravatar.cc/150?img=32" alt="Student" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-sm font-black text-white">System Verified User</p>
              <p className="text-[10px] uppercase tracking-widest text-emerald-500 font-black">Active Learner</p>
            </div>
          </div>
        </div>

      </div>
      
    </div>
  );
};

export default Login;