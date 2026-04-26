import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Search, Filter, PlayCircle, GraduationCap, 
  Loader2, ChevronRight, Clock, CheckCircle2 
} from 'lucide-react';

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80";

const Courses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/courses');
        setCourses(response.data);
      } catch (err) { 
        console.error("Error fetching courses", err); 
      } finally { 
        setLoading(false); 
      }
    };
    fetchCourses();
  }, []);

  const filtered = courses.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return (
    <div className="h-96 flex flex-col items-center justify-center text-slate-400 gap-4">
      <Loader2 className="animate-spin text-emerald-500" size={48} />
      <p className="font-black uppercase tracking-widest text-xs font-sans">Syncing Academic Catalog...</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-20 px-4 font-sans">
      
      {/* 1. HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">My Library</h1>
          <p className="text-slate-500 font-medium mt-1">Showing all {courses.length} specialized technical tracks.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative group flex items-center bg-white border border-slate-200 rounded-2xl px-4 py-3 w-full md:w-80 shadow-sm focus-within:ring-4 focus-within:ring-emerald-500/10 transition-all">
            <Search className="text-slate-400 mr-3" size={20} />
            <input 
              type="text" 
              placeholder="Search curriculum..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none w-full text-sm font-bold text-slate-700 placeholder:text-slate-300"
            />
          </div>
          <button className="p-4 bg-white border border-slate-200 rounded-2xl text-slate-600 shadow-sm hover:bg-slate-50 transition-colors">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* 2. HERO SECTION - FEATURED COURSE */}
      {filtered.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-slate-900 rounded-[3rem] p-8 md:p-12 overflow-hidden shadow-2xl mx-2 group"
        >
          <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-500/10 blur-[120px] pointer-events-none group-hover:bg-emerald-500/20 transition-all duration-700" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-500/30">
                <PlayCircle size={14} /> Resume Recent Activity
              </div>
              <h2 className="text-3xl md:text-6xl font-black text-white leading-tight tracking-tighter">
                {filtered[0].title}
              </h2>
              <div className="flex gap-8 text-slate-400 text-sm font-bold">
                <span className="flex items-center gap-2"><Clock size={18} /> 2.5h Remaining</span>
                <span className="flex items-center gap-2 text-emerald-500"><CheckCircle2 size={18} /> {filtered[0].total_modules} Specialized Units</span>
              </div>
              <button 
                onClick={() => navigate(`/dashboard/courses/${filtered[0].id}`)}
                className="bg-white text-slate-900 px-12 py-5 rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 hover:bg-emerald-500 hover:text-white transition-all transform active:scale-95 shadow-xl w-full sm:w-auto"
              >
                Jump to Classroom <ChevronRight size={24} />
              </button>
            </div>
            <div className="hidden lg:block w-1/3">
                <img 
                    src={filtered[0].thumbnail || DEFAULT_IMAGE} 
                    className="rounded-[3rem] shadow-2xl border-4 border-white/10 aspect-square object-cover transition-transform duration-500 group-hover:scale-[1.02]" 
                    alt={filtered[0].title} 
                />
            </div>
          </div>
        </motion.div>
      )}

      {/* 3. FULL GRID - ALL COURSES */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-2">
        {filtered.map((course) => (
          <motion.div 
            key={course.id}
            whileHover={{ y: -12 }}
            className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden group hover:shadow-2xl transition-all duration-500 flex flex-col"
          >
            {/* Thumbnail Area */}
            <div className="relative h-64 overflow-hidden">
                <img 
                  src={course.thumbnail || DEFAULT_IMAGE} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  alt={course.title} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-emerald-500 scale-0 group-hover:scale-100 transition-transform duration-300 shadow-2xl">
                        <PlayCircle size={36} />
                    </div>
                </div>
                <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 shadow-sm border border-slate-100">
                    {course.category}
                </div>
            </div>

            {/* Content Area */}
            <div className="p-10 flex-1 flex flex-col">
              <div className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">
                <GraduationCap size={16} className="text-emerald-500" /> {course.instructor}
              </div>
              
              <h3 className="text-2xl font-black text-slate-900 leading-tight mb-4 group-hover:text-emerald-600 transition-colors">
                {course.title}
              </h3>
              
              <p className="text-slate-500 text-sm font-medium line-clamp-2 mb-10 leading-relaxed">
                {course.description}
              </p>
              
              {/* Card Footer */}
              <div className="mt-auto pt-8 border-t border-slate-50 flex justify-between items-center">
                <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Curriculum</span>
                    <span className="text-base font-black text-slate-900">{course.total_modules} Modules</span>
                </div>
                <button 
                  onClick={() => navigate(`/dashboard/courses/${course.id}`)}
                  className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-xs hover:bg-emerald-600 transition-all shadow-xl active:scale-95 uppercase tracking-widest"
                >
                  Enter Course
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Courses;