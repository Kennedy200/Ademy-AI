import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Sparkles, BrainCircuit, PlayCircle, 
  Clock, AlertCircle, Loader2, Zap, CheckCircle 
} from 'lucide-react';

const Recommendations = () => {
  const navigate = useNavigate();
  const [recs, setRecs] = useState<any[]>([]);
  const [aiStatus, setAiStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Helper to get Auth Headers
  const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [recRes, aiRes] = await Promise.all([
          axios.get('http://localhost:8000/api/user/recommendations', getAuthHeader()),
          axios.get('http://localhost:8000/api/user/ai-status', getAuthHeader())
        ]);
        setRecs(recRes.data);
        setAiStatus(aiRes.data);
      } catch (err: any) {
        console.error("AI Sync Error:", err);
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
  }, [navigate]);

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-white gap-4">
      <Loader2 className="animate-spin text-emerald-500" size={48} />
      <span className="font-black text-slate-400 uppercase tracking-widest text-xs">Processing Neural Patterns...</span>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-20 font-sans px-4">
      
      {/* 1. AI INSIGHT HERO */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="relative bg-slate-900 rounded-[3.5rem] p-10 md:p-16 overflow-hidden shadow-2xl"
      >
        <div className="absolute top-0 right-0 w-[500px] h-full bg-emerald-500/10 blur-[120px] pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="w-24 h-24 bg-white/10 rounded-[2rem] flex items-center justify-center backdrop-blur-xl border border-white/10 shadow-2xl">
                <BrainCircuit size={48} className="text-emerald-400" />
            </div>
            <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                    Neural Insight Engine v1.0
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">
                    Hello, {localStorage.getItem('full_name')?.split(' ')[0]}. <br />
                    I've mapped your <span className="text-emerald-500">Learning Path.</span>
                </h1>
                <p className="text-slate-400 mt-6 text-lg max-w-2xl">
                    Based on your recent evaluation scores and study patterns, I have identified key areas for improvement to guarantee a <span className="text-white font-bold">{aiStatus?.pass_probability}% success rate</span> in your final exams.
                </p>
            </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* 2. CRITICAL ACTIONS */}
        <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between px-2">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Recommended Actions</h3>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-100 px-3 py-1 rounded-lg">{recs.length} Items</span>
            </div>

            <div className="space-y-4">
                {recs.map((item, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-emerald-100 transition-all duration-500 group"
                    >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="flex items-center gap-6">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.score < 50 ? 'bg-rose-50 text-rose-500' : 'bg-emerald-50 text-emerald-500'}`}>
                                    {item.score < 50 ? <AlertCircle size={28} /> : <Zap size={28} />}
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.course_title}</p>
                                    <h4 className="text-xl font-black text-slate-900 leading-tight">Review: {item.module_title}</h4>
                                    <p className="text-sm font-medium text-slate-500 mt-1">{item.reason}</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => navigate(`/dashboard/courses/${item.course_id}`)}
                                className="bg-slate-900 text-white px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest group-hover:bg-emerald-600 transition-all flex items-center justify-center gap-2"
                            >
                                Re-read Module <PlayCircle size={18} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>

        {/* 3. AI STUDY PLAN */}
        <div className="space-y-8">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight px-2">AI Study Plan</h3>
            
            <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden">
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-50 rounded-tl-full opacity-50 -z-0" />
                
                <div className="relative z-10 space-y-8">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shadow-sm">
                            <Clock size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Recommended Focus</p>
                            <p className="text-xl font-black text-slate-900">2.5 Hours / Day</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <p className="text-sm font-bold text-slate-600 border-b border-slate-50 pb-4">Daily Objectives:</p>
                        {[
                            { time: 'Morning', task: 'Review Weak Points' },
                            { time: 'Afternoon', task: 'Active Recall Quiz' },
                            { time: 'Evening', task: 'New Module Ingestion' }
                        ].map((obj, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <div className="w-2 h-10 bg-blue-500 rounded-full" />
                                <div>
                                    <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{obj.time}</p>
                                    <p className="text-sm font-bold text-slate-900">{obj.task}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="pt-6 border-t border-slate-50">
                        <div className="flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase tracking-widest mb-4">
                            <CheckCircle size={14} /> Schedule Synchronized
                        </div>
                        <p className="text-xs text-slate-400 font-medium leading-relaxed italic">
                            "This schedule is dynamic. Improving your scores in courses will reduce your required focus time."
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;