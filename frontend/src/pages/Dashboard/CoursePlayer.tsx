import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, BookOpen, CheckCircle2, PlayCircle, 
  Loader2, Sparkles, ArrowRight, Menu, X, CheckCircle 
} from 'lucide-react';

const CoursePlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<any>(null);
  const [activeLesson, setActiveLesson] = useState<any>(null);
  const [completedIds, setCompletedIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMarking, setIsMarking] = useState(false);

  // Helper to get Auth Headers
  const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [courseRes, progressRes] = await Promise.all([
          axios.get(`http://localhost:8000/api/courses/${id}`),
          axios.get(`http://localhost:8000/api/user/progress`, getAuthHeader())
        ]);
        
        setCourse(courseRes.data);
        setCompletedIds(progressRes.data);
        
        if (courseRes.data.modules && courseRes.data.modules.length > 0) {
            setActiveLesson(courseRes.data.modules[0].lessons[0]);
        }
      } catch (err: any) { 
        console.error("Sync Error:", err); 
        // If 401 Unauthorized, token is dead. Clear and login.
        if (err.response?.status === 401) {
            localStorage.clear();
            navigate('/login');
        }
      } finally { 
        setLoading(false); 
      }
    };
    fetchData();
  }, [id, navigate]);

  const getFlatLessons = () => {
    if (!course || !course.modules) return [];
    return course.modules.flatMap((m: any) => m.lessons);
  };

  const handleMarkComplete = async () => {
    if (!activeLesson || isMarking) return;
    setIsMarking(true);
    try {
      await axios.post(`http://localhost:8000/api/lessons/${activeLesson.id}/complete`, {}, getAuthHeader());
      if (!completedIds.includes(activeLesson.id)) {
        setCompletedIds([...completedIds, activeLesson.id]);
      }
      handleNext();
    } catch (err) { 
        console.error(err); 
    } finally { 
        setIsMarking(false); 
    }
  };

  const handleNext = () => {
    const flat = getFlatLessons();
    const idx = flat.findIndex((l: any) => l.id === activeLesson?.id);
    if (idx < flat.length - 1) {
      setActiveLesson(flat[idx + 1]);
      document.getElementById('content-area')?.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    const flat = getFlatLessons();
    const idx = flat.findIndex((l: any) => l.id === activeLesson?.id);
    if (idx > 0) {
      setActiveLesson(flat[idx - 1]);
      document.getElementById('content-area')?.scrollTo(0, 0);
    }
  };

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-white gap-4">
      <Loader2 className="animate-spin text-emerald-500" size={48} />
      <span className="font-black text-slate-400 uppercase tracking-widest text-xs">Syncing Academic Content...</span>
    </div>
  );

  // Safety check to prevent crash if data is missing
  if (!course) return <div className="p-20 text-center font-bold">Course not found.</div>;

  const currentIdx = getFlatLessons().findIndex((l: any) => l.id === activeLesson?.id);

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-140px)] bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-2xl font-sans relative">
      
      {/* 1. SYLLABUS SIDEBAR */}
      <motion.div 
        animate={{ width: sidebarOpen ? (window.innerWidth < 1024 ? '100%' : '380px') : '0px', opacity: sidebarOpen ? 1 : 0 }} 
        className="bg-slate-50 border-r border-slate-100 flex flex-col h-full overflow-hidden shrink-0 absolute lg:relative z-40 transition-all duration-300"
      >
        <div className="p-8 border-b border-slate-200 bg-white flex justify-between items-center sticky top-0 z-10">
          <div>
            <Link to="/dashboard/courses" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-emerald-600 mb-2 transition-colors"><ChevronLeft size={14} /> Library</Link>
            <h2 className="text-xl font-black text-slate-900 leading-tight">{course.title}</h2>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-2 text-slate-400"><X size={24} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-10 custom-scrollbar pb-20">
          {course.modules?.map((module: any, mIdx: number) => (
            <div key={module.id} className="space-y-4">
              <h4 className="px-2 text-[11px] font-black uppercase tracking-[0.25em] text-emerald-600">Module {mIdx + 1}</h4>
              <div className="space-y-2">
                {module.lessons.map((lesson: any) => {
                  const isDone = completedIds.includes(lesson.id);
                  return (
                    <button key={lesson.id} onClick={() => { setActiveLesson(lesson); if(window.innerWidth < 1024) setSidebarOpen(false); }} className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all text-left group ${activeLesson?.id === lesson.id ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-100' : 'hover:bg-white text-slate-600 hover:text-slate-900 border border-transparent hover:border-slate-100 shadow-sm'}`}>
                      <div className="flex items-center gap-4 truncate">
                        <div className={`p-2 rounded-lg ${activeLesson?.id === lesson.id ? 'bg-white/20' : 'bg-slate-100'}`}>
                            {activeLesson?.id === lesson.id ? <PlayCircle size={18} /> : <BookOpen size={18} />}
                        </div>
                        <span className="text-sm font-bold truncate">{lesson.title}</span>
                      </div>
                      {isDone && <CheckCircle size={18} className={activeLesson?.id === lesson.id ? "text-white" : "text-emerald-500"} />}
                    </button>
                  );
                })}
                <Link to={`/dashboard/quiz/${module.id}`} className="w-full flex items-center justify-between p-5 rounded-2xl border-2 border-dashed border-slate-200 text-slate-400 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 transition-all mt-4 group">
                  <div className="flex items-center gap-3">
                    <Sparkles size={20} className="group-hover:animate-pulse text-emerald-500" />
                    <span className="text-xs font-black uppercase tracking-widest">Module Quiz</span>
                  </div>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 2. READING AREA */}
      <div id="content-area" className="flex-1 overflow-y-auto bg-white relative custom-scrollbar scroll-smooth">
        {!sidebarOpen && <button onClick={() => setSidebarOpen(true)} className="absolute top-10 left-10 z-10 p-4 bg-slate-900 text-white rounded-2xl shadow-2xl lg:flex hidden"><Menu size={24} /></button>}
        
        <AnimatePresence mode="wait">
          {activeLesson ? (
            <motion.div key={activeLesson.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="max-w-4xl mx-auto p-8 md:p-20 pt-24">
                <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-10 border border-emerald-100 shadow-sm"><Sparkles size={14} className="text-emerald-500" /> Active Session</div>
                <h1 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tighter mb-16 leading-[1.05]">{activeLesson.title}</h1>
                <div className="lesson-content text-slate-600 leading-[1.8] text-xl font-medium prose-academic" dangerouslySetInnerHTML={{ __html: activeLesson.content }} />
                
                <div className="mt-24 pt-12 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-8 pb-10">
                <button disabled={currentIdx === 0} onClick={handlePrevious} className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px] hover:text-slate-900 flex items-center gap-3 transition-colors group disabled:opacity-20"><ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Previous Section</button>
                <button onClick={handleMarkComplete} disabled={isMarking} className="w-full sm:w-auto bg-slate-900 text-white px-12 py-5 rounded-[2rem] font-black text-lg flex items-center justify-center gap-4 hover:bg-emerald-600 transition-all shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:-translate-y-1 active:translate-y-0">
                    {isMarking ? <Loader2 className="animate-spin" size={24} /> : <>Mark as Completed <CheckCircle2 size={24} /></>}
                </button>
                </div>
            </motion.div>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-300 font-bold">Select a lesson to begin</div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        .prose-academic h3 { color: #0f172a; font-weight: 900; font-size: 2.25rem; margin-bottom: 2rem; margin-top: 5rem; letter-spacing: -0.05em; line-height: 1.1; border-left: 8px solid #10b981; padding-left: 1.5rem; }
        .prose-academic p { margin-bottom: 2.5rem; }
        .prose-academic strong { color: #0f172a; font-weight: 800; }
      `}</style>
    </div>
  );
};

export default CoursePlayer;