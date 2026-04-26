import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { Mail, Lock, User, Eye, EyeOff, ArrowLeft, Sparkles, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Form States
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  // Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear error when user types
  };

  // 1. STANDARD SIGNUP LOGIC
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
        password: formData.password
      });

      // Save token to localStorage
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('role', response.data.role);

      localStorage.setItem('full_name', response.data.full_name);
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.detail || "An error occurred during signup.");
    } finally {
      setIsLoading(false);
    }
  };

  // 2. GOOGLE SIGNUP LOGIC
  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      setError('');
      try {
        // Send Google's access token to our FastAPI backend
        const response = await axios.post('http://localhost:8000/api/auth/google', {
          token: tokenResponse.access_token
        });

        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('role', response.data.role);
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
    <div className="min-h-screen w-full flex bg-white font-sans">
      
      {/* LEFT PANEL - Branding & Copy */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 relative flex-col justify-between p-12 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-3 group w-max">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-700 group-hover:border-emerald-500 transition-colors">
              <img src="/logo.png" alt="Ademy Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-white">Ademy.</span>
          </Link>
        </div>

        <div className="relative z-10 max-w-lg">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8">
            <Sparkles size={14} /> Student Portal
          </div>
          <h1 className="text-5xl font-black text-white leading-[1.1] tracking-tighter mb-6">
            Stop guessing. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">
              Start predicting.
            </span>
          </h1>
          <p className="text-lg text-slate-400 font-medium leading-relaxed mb-10">
            Join the intelligent e-learning platform that analyzes your study patterns to predict outcomes, identify weak points, and guarantee academic growth.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-slate-300 font-medium">
              <CheckCircle2 size={20} className="text-emerald-500" />
              <span>Real-time performance analytics</span>
            </div>
            <div className="flex items-center gap-3 text-slate-300 font-medium">
              <CheckCircle2 size={20} className="text-emerald-500" />
              <span>AI-driven early warning alerts</span>
            </div>
            <div className="flex items-center gap-3 text-slate-300 font-medium">
              <CheckCircle2 size={20} className="text-emerald-500" />
              <span>Personalized adaptive learning paths</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-4 border-t border-slate-800 pt-8 mt-8">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 overflow-hidden">
                <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="user" />
              </div>
            ))}
          </div>
          <p className="text-sm font-bold text-slate-400">
            Trusted by <span className="text-white">1,200+</span> students
          </p>
        </div>
      </div>

      {/* RIGHT PANEL - Sign Up Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 md:p-12 relative">
        <div className="absolute top-6 left-6 lg:hidden flex items-center justify-between w-[calc(100%-3rem)]">
          <Link to="/" className="w-10 h-10 flex items-center justify-center bg-slate-50 border border-slate-200 rounded-full text-slate-600 hover:bg-slate-100 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200">
            <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md mt-16 lg:mt-0"
        >
          <div className="text-center lg:text-left mb-10">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Create your account</h2>
            <p className="text-slate-500 font-medium">Enter your details to get started.</p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl flex items-center gap-3 text-sm font-bold">
              <AlertCircle size={18} /> {error}
            </div>
          )}

          {/* Google Auth Button */}
          <button 
            type="button"
            onClick={() => loginWithGoogle()}
            disabled={isLoading}
            className="w-full bg-white border-2 border-slate-200 text-slate-700 font-bold py-3.5 rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Sign up with Google
          </button>

          <div className="flex items-center my-8">
            <div className="flex-1 h-px bg-slate-200"></div>
            <span className="px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Or continue with</span>
            <div className="flex-1 h-px bg-slate-200"></div>
          </div>

          {/* Sign Up Form */}
          <form className="space-y-5" onSubmit={handleSignup}>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <User size={18} />
                </div>
                <input 
                  type="text" 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl pl-11 pr-4 py-3.5 outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Mail size={18} />
                </div>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@gmail.com"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl pl-11 pr-4 py-3.5 outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Lock size={18} />
                </div>
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl pl-11 pr-12 py-3.5 outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all font-medium"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-2">
              <input 
                type="checkbox" 
                id="terms" 
                required
                className="mt-1 w-4 h-4 rounded border-slate-300 text-emerald-500 focus:ring-emerald-500/20"
              />
              <label htmlFor="terms" className="text-sm font-medium text-slate-500 leading-tight">
                I agree to Ademy's <a href="#" className="text-emerald-600 font-bold hover:underline">Terms of Service</a> and <a href="#" className="text-emerald-600 font-bold hover:underline">Privacy Policy</a>.
              </label>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl hover:bg-emerald-600 transition-all active:scale-[0.98] shadow-xl shadow-slate-200 mt-4 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? <><Loader2 size={20} className="animate-spin" /> Processing...</> : "Create Account"}
            </button>
          </form>

          <p className="text-center mt-8 text-sm font-medium text-slate-500">
            Already have an account? <Link to="/login" className="text-slate-900 font-black hover:text-emerald-600 transition-colors ml-1">Sign in instead</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;