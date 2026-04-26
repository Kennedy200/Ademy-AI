import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, GraduationCap, LayoutDashboard, HelpCircle, BookOpen, UserCircle, ArrowRight, Sparkles, FileText, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll handler for navbar glass effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = {
    student: [
      { name: 'About', icon: <BookOpen size={18} />, href: '#about' },
      { name: 'Features', icon: <LayoutDashboard size={18} />, href: '#features' },
    ],
    teacher: [
      { name: 'Instructor Portal', icon: <GraduationCap size={18} />, href: '#teacher' },
      { name: 'Support', icon: <HelpCircle size={18} />, href: '#support' },
    ]
  };

  // Bar chart data with progressive green shading
  const performanceBars = [
    { height: 35, color: 'bg-emerald-100' },
    { height: 60, color: 'bg-emerald-200' },
    { height: 45, color: 'bg-emerald-300' },
    { height: 100, color: 'bg-emerald-400' },
    { height: 70, color: 'bg-emerald-500' },
    { height: 85, color: 'bg-emerald-600' },
    { height: 95, color: 'bg-gradient-to-t from-emerald-600 to-emerald-400 shadow-lg shadow-emerald-200' },
  ];

  return (
    <div className="relative min-h-screen w-full bg-slate-50 overflow-hidden font-sans">
      
      {/* BACKGROUND DECORATION */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-emerald-100/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[120px]" />
      </div>

      {/* NAVIGATION BAR */}
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200 py-3 shadow-md' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          
          {/* LOGO & TITLE - Circular Style */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-white shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
              <img 
                src="/logo.png" 
                alt="Ademy Logo" 
                className="w-full h-full object-cover" 
              />
            </div>
            <span className="text-2xl md:text-3xl font-black tracking-tighter text-slate-900 group-hover:text-emerald-600 transition-colors">
              Ademy<span className="text-emerald-500">.</span>
            </span>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center gap-10">
            <div className="flex items-center gap-8 border-r border-slate-200 pr-10">
              {navLinks.student.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-[13px] font-black uppercase tracking-widest text-slate-600 hover:text-emerald-600 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-8">
              {navLinks.teacher.map((link) => (
                <Link
                  key={link.name} 
                  to="/instructor-auth" 
                  className="text-[13px] font-black uppercase tracking-widest text-slate-400 hover:text-emerald-600 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <Link to="/login" className="ml-4 bg-slate-900 text-white px-8 py-3 rounded-2xl text-sm font-black hover:bg-emerald-600 transition-all flex items-center gap-2 shadow-xl shadow-slate-200 active:scale-95">
              <UserCircle size={18} /> SIGN IN
            </Link>
          </div>

          {/* MOBILE TOGGLE */}
          <button 
            className="lg:hidden p-3 bg-white shadow-sm border border-slate-100 rounded-2xl text-slate-900 active:scale-90 transition-transform" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-56 md:pb-32 px-6 md:px-12 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        
        {/* LEFT CONTENT */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200 text-emerald-600 px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] mb-8 shadow-sm">
            <Sparkles size={14} className="animate-pulse" /> Intelligent Learning
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black text-slate-900 leading-[1] tracking-tighter">
            Master Your <span className="text-emerald-500 relative">Growth.<div className="absolute -bottom-2 left-0 w-full h-3 bg-emerald-100 -z-10 rounded-full" /></span>
          </h1>
          
          <p className="mt-8 text-lg md:text-xl text-slate-500 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
            Next-gen academic monitoring powered by AI. Predict performance and optimize your path to success in real-time.
          </p>
          
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5">
            <Link to="/signup" className="w-full sm:w-auto bg-slate-900 text-white px-8 py-5 rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 hover:bg-emerald-600 transition-all shadow-2xl shadow-slate-300 hover:-translate-y-1 active:translate-y-0">
              Get Started <ArrowRight size={22} />
            </Link>
            <Link to="/documentation" className="w-full sm:w-auto bg-white border-2 border-slate-100 text-slate-700 px-8 py-5 rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 hover:bg-slate-50 transition-all">
              <FileText size={20} className="text-slate-500" /> Documentation
            </Link>
          </div>
        </motion.div>

        {/* RIGHT VISUAL - DASHBOARD */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 relative w-full"
        >
          <div className="relative z-10 bg-white p-8 md:p-12 rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)] border border-slate-50 overflow-hidden">
            <div className="flex justify-between items-start mb-12">
              <div className="space-y-2">
                <h3 className="font-black text-2xl text-slate-900 tracking-tight">Performance Flow</h3>
                <p className="text-sm text-slate-400 font-bold">Predictive Model v4.2</p>
              </div>
              <div className="bg-emerald-500 text-white p-4 rounded-3xl shadow-lg shadow-emerald-200">
                <BarChart3 size={28} />
              </div>
            </div>
            
            {/* Animated Bars (Progressive Green) */}
            <div className="flex items-end gap-4 h-64 mb-10">
              {performanceBars.map((bar, i) => (
                <motion.div 
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${bar.height}%` }}
                  transition={{ duration: 1.2, delay: 0.6 + (i * 0.1), ease: "circOut" }}
                  className={`flex-1 rounded-2xl ${bar.color} hover:opacity-80 transition-opacity cursor-pointer`}
                />
              ))}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-slate-50 p-6 rounded-[2.5rem] border border-slate-100 text-center">
                <p className="text-[10px] uppercase font-black text-slate-400 mb-2 tracking-[0.15em]">Accuracy</p>
                <p className="text-3xl font-black text-slate-900">92.4%</p>
              </div>
              <div className="bg-emerald-50 p-6 rounded-[2.5rem] border border-emerald-100 text-center">
                <p className="text-[10px] uppercase font-black text-emerald-600 mb-2 tracking-[0.15em]">AI Alert</p>
                <p className="text-sm font-black text-emerald-800">Clear Path</p>
              </div>
            </div>
          </div>

          {/* FLOATING STATUS CARD */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="absolute -top-10 -right-4 bg-white p-6 rounded-[2.5rem] shadow-2xl border border-slate-50 z-20 hidden md:flex items-center gap-5 min-w-[240px]"
          >
            <div className="w-14 h-14 bg-blue-600 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-blue-200">
              <Sparkles size={28} />
            </div>
            <div>
              <p className="text-base font-black text-slate-900">AI Monitor</p>
              <p className="text-xs text-slate-400 font-bold">Stable Growth</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* MOBILE SIDEBAR */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-[85%] max-w-sm bg-white z-[70] shadow-2xl p-10 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-16">
                 <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-100">
                  <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
                 </div>
                 <span className="text-2xl font-black tracking-tighter">Ademy</span>
                 <button onClick={() => setIsOpen(false)} className="ml-auto p-4 bg-slate-50 rounded-3xl">
                   <X size={24} />
                 </button>
              </div>
              
              <div className="space-y-12">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-300 mb-6 px-2">Main</p>
                  <div className="space-y-2">
                    {navLinks.student.map((link) => (
                      <Link key={link.name} to="/instructor-auth" className="flex items-center justify-between p-5 rounded-3xl hover:bg-emerald-50 text-slate-800 font-black transition-all group">
                        <div className="flex items-center gap-5">{link.icon} {link.name}</div>
                        <ChevronRight size={18} className="text-slate-300 group-hover:text-emerald-500" />
                      </Link>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-300 mb-6 px-2">Instructor Space</p>
                  <div className="space-y-2">
                    {navLinks.teacher.map((link) => (
                      <a key={link.name} href={link.href} className="flex items-center justify-between p-5 rounded-3xl hover:bg-slate-50 text-slate-800 font-black transition-all group">
                        <div className="flex items-center gap-5">{link.icon} {link.name}</div>
                        <ChevronRight size={18} className="text-slate-300 group-hover:text-slate-900" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              
              <button className="mt-auto w-full bg-slate-900 text-white py-6 rounded-[2rem] font-black shadow-2xl shadow-slate-300 text-lg active:scale-95 transition-transform">
                SIGN IN
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;