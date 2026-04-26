import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, BookOpen, FileEdit, LineChart, 
  Sparkles, Settings, LogOut, Menu, X, Search, Bell,
  Users, BarChart3, GraduationCap, ShieldAlert
} from 'lucide-react';

const DashboardLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userName, setUserName] = useState('Academic User');
  const [userRole, setUserRole] = useState('STUDENT');
  const [userAvatar, setUserAvatar] = useState('');
  
  const location = useLocation();
  const navigate = useNavigate();

  // Load User Data & Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);

    const storedName = localStorage.getItem('full_name') || 'User';
    const storedRole = (localStorage.getItem('role') || 'student').toLowerCase();
    
    setUserName(storedName);
    setUserRole(storedRole.toUpperCase()); 

    // --- ROLE REDIRECT GUARD ---
    // This ensures instructors can't accidentally land on student overview
    if (storedRole === 'teacher' && (location.pathname === '/dashboard' || location.pathname === '/dashboard/')) {
        navigate('/instructor/dashboard');
    }
    // Ensures students can't access instructor routes
    if (storedRole === 'student' && location.pathname.startsWith('/instructor')) {
        navigate('/dashboard');
    }
    
    // Choose dynamic theme color based on role
    const themeColor = storedRole === 'teacher' ? '4f46e5' : '10b981';
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(storedName)}&background=${themeColor}&color=fff&bold=true`;
    setUserAvatar(avatarUrl);
    
  }, [location.pathname, navigate]);

  // --- UPDATED LOGOUT LOGIC ---
  const handleLogout = () => {
    const role = localStorage.getItem('role') || 'student';
    
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('full_name');

    // Redirect to the appropriate portal login
    if (role.toLowerCase() === 'teacher') {
        navigate('/instructor/login');
    } else {
        navigate('/login');
    }
  };

  // --- DYNAMIC NAVIGATION LINKS ---
  const studentLinks = [
    { name: 'Overview', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'My Courses', path: '/dashboard/courses', icon: <BookOpen size={20} /> },
    { name: 'Assessments', path: '/dashboard/assessments', icon: <FileEdit size={20} /> },
    { name: 'Analytics', path: '/dashboard/analytics', icon: <LineChart size={20} /> },
    { name: 'AI Recommendations', path: '/dashboard/recommendations', icon: <Sparkles size={20} /> },
    { name: 'Settings', path: '/dashboard/settings', icon: <Settings size={20} /> },
  ];

  const instructorLinks = [
    { name: 'Faculty Overview', path: '/instructor/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Student Roster', path: '/instructor/students', icon: <Users size={20} /> },
    { name: 'Class Analytics', path: '/instructor/analytics', icon: <BarChart3 size={20} /> },
    { name: 'Manage Curriculum', path: '/instructor/curriculum', icon: <GraduationCap size={20} /> },
    { name: 'Risk Monitoring', path: '/instructor/reports', icon: <ShieldAlert size={20} /> },
    { name: 'Portal Settings', path: '/instructor/settings', icon: <Settings size={20} /> },
  ];

  const navLinks = userRole === 'TEACHER' ? instructorLinks : studentLinks;
  const activeBg = userRole === 'TEACHER' ? 'bg-indigo-50 text-indigo-600 shadow-indigo-100/50' : 'bg-emerald-50 text-emerald-600 shadow-emerald-100/50';
  const roleTextColor = userRole === 'TEACHER' ? 'text-indigo-600' : 'text-emerald-600';
  const glowColor = userRole === 'TEACHER' ? 'bg-indigo-50/50' : 'bg-emerald-50/50';

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white border-r border-slate-200 w-72 font-sans">
      {/* Brand */}
      <div className="h-20 flex items-center px-8 border-b border-slate-100">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 group-hover:border-indigo-500 transition-colors shadow-sm">
            <img src="/logo.png" alt="Ademy" className="w-full h-full object-cover" />
          </div>
          <span className="text-xl font-black tracking-tighter text-slate-900 group-hover:text-indigo-600 transition-colors">Ademy.</span>
        </Link>
      </div>

      <div className="flex-1 py-8 px-4 space-y-2 overflow-y-auto custom-scrollbar">
        <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 mb-6">{userRole} PORTAL</p>
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.name}
              to={link.path}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-200 ${
                isActive 
                  ? `${activeBg} font-bold shadow-sm` 
                  : 'text-slate-400 font-medium hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {link.icon}
              <span className="text-sm">{link.name}</span>
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-slate-100">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3.5 text-slate-400 font-bold hover:bg-rose-50 hover:text-rose-600 rounded-2xl transition-all group"
        >
          <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm">Log Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans">
      
      {/* --- DESKTOP SIDEBAR --- */}
      <div className="hidden lg:block fixed inset-y-0 left-0 z-20">
        <SidebarContent />
      </div>

      {/* --- MOBILE SIDEBAR (Framer Motion) --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Dark Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
            />
            {/* Sliding Sidebar */}
            <motion.div 
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-50 w-72 lg:hidden shadow-2xl"
            >
              <SidebarContent />
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-5 right-4 p-2 bg-slate-100 rounded-full text-slate-600 hover:bg-slate-200 transition-colors active:scale-95 shadow-sm"
              >
                <X size={20} />
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 flex flex-col min-h-screen lg:ml-72 transition-all duration-300">
        
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-10 flex items-center justify-between px-6 md:px-10">
          <div className="flex items-center gap-4 flex-1">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-xl lg:hidden transition-colors active:scale-95"
            >
              <Menu size={24} />
            </button>

            <div className="hidden sm:flex items-center bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 w-full max-w-md focus-within:ring-4 focus-within:ring-indigo-500/5 focus-within:border-slate-300 transition-all">
              <Search size={18} className="text-slate-300 mr-2" />
              <input 
                type="text" 
                placeholder={userRole === 'TEACHER' ? "Search student records..." : "Search modules..."} 
                className="bg-transparent border-none outline-none text-sm w-full font-medium text-slate-700 placeholder:text-slate-300"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <button className="relative p-2.5 text-slate-400 hover:bg-slate-50 rounded-full transition-all active:scale-95">
              <Bell size={22} />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full animate-pulse"></span>
            </button>
            
            <div className="w-px h-8 bg-slate-200 hidden md:block"></div>

            <button className="flex items-center gap-3 text-left group active:scale-95 transition-transform">
              <div className="w-10 h-10 rounded-2xl overflow-hidden border-2 border-slate-100 group-hover:border-indigo-500 shadow-sm transition-colors">
                <img 
                  src={userAvatar} 
                  alt={userName} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-black text-slate-900 leading-none mb-1">{userName}</p>
                <p className={`text-[9px] font-black uppercase tracking-[0.2em] ${roleTextColor}`}>{userRole}</p>
              </div>
            </button>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-10 overflow-x-hidden relative">
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 ${glowColor} rounded-full blur-[120px] -z-10 pointer-events-none`} />
          <Outlet /> 6
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;