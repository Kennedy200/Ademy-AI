import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { 
  Activity, Zap, Target, Award, ArrowUpRight, 
  Loader2, BrainCircuit, ShieldCheck, Flame 
} from 'lucide-react';

const Analytics = () => {
  const [perfData, setPerfData] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [grades, setGrades] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const getAuthHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [perfRes, statsRes, gradeRes] = await Promise.all([
          axios.get('http://localhost:8000/api/user/analytics/category-performance', getAuthHeader()),
          axios.get('http://localhost:8000/api/user/analytics/study-stats', getAuthHeader()),
          axios.get('http://localhost:8000/api/user/grades', getAuthHeader())
        ]);
        setPerfData(perfRes.data);
        setStats(statsRes.data);
        setGrades(gradeRes.data.slice(0, 8).reverse()); // Last 8 quizzes
      } catch (err) {
        console.error("Analytics Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-emerald-500" size={48} /></div>;

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-20 font-sans px-4">
      
      {/* 1. TOP HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter leading-tight">Learning Insights</h1>
          <p className="text-slate-500 font-medium mt-1">AI-driven analysis of your academic strengths and behavioral patterns.</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-600 rounded-xl font-black text-xs uppercase tracking-widest">
                <Flame size={16} /> {stats?.streak} Day Streak
            </div>
        </div>
      </div>

      {/* 2. CORE METRICS BENTO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard icon={<Zap />} color="emerald" label="Study Time" value={`${stats?.total_hours}h`} sub="Total Focused Hours" />
        <MetricCard icon={<Target />} color="blue" label="Curriculum" value={`${stats?.completion_rate}%`} sub="Overall Completion" />
        <MetricCard icon={<Award />} color="indigo" label="Accuracy" value={`${stats?.accuracy}%`} sub="Avg Quiz Precision" />
        <MetricCard icon={<Activity />} color="rose" label="Status" value="Active" sub="Profile Engagement" />
      </div>

      {/* 3. CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Radar Chart: Skill Distribution */}
        <div className="bg-white p-8 md:p-12 rounded-[3.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full opacity-50" />
          <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Skill Fingerprint</h3>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-10">Categorized Proficiency Level</p>
          
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={perfData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 800 }} />
                <Radar
                  name="Proficiency"
                  dataKey="A"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.5}
                />
                <Tooltip contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart: Recent Performance */}
        <div className="bg-white p-8 md:p-12 rounded-[3.5rem] border border-slate-100 shadow-sm">
          <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Evaluation Growth</h3>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-10">Last 8 Quiz Results</p>
          
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={grades}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="id" hide />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="score" fill="#10b981" radius={[10, 10, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* 4. PERFORMANCE BREAKDOWN TABLE */}
      <div className="bg-white p-8 md:p-14 rounded-[4rem] border border-slate-100 shadow-sm relative overflow-hidden">
        <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-8">Subject-Level Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {perfData.map((item, i) => (
                <div key={i} className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 group hover:bg-white hover:shadow-xl transition-all duration-500">
                    <div className="flex justify-between items-start mb-6">
                        <span className="px-4 py-1.5 bg-white rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest shadow-sm">Category 0{i+1}</span>
                        <ArrowUpRight size={20} className="text-slate-300 group-hover:text-emerald-500 transition-colors" />
                    </div>
                    <h4 className="text-xl font-black text-slate-900 mb-2">{item.subject}</h4>
                    <div className="flex items-end gap-2 mb-6">
                        <span className="text-4xl font-black text-slate-900">{Math.round(item.A)}%</span>
                        <span className="text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-widest tracking-tight">Mastery</span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                        <motion.div 
                            initial={{ width: 0 }} 
                            animate={{ width: `${item.A}%` }} 
                            transition={{ duration: 1, delay: i * 0.1 }}
                            className={`h-full ${item.A >= 70 ? 'bg-emerald-500' : item.A >= 40 ? 'bg-amber-500' : 'bg-rose-500'}`} 
                        />
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ icon, color, label, value, sub }: any) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group relative overflow-hidden">
    <div className={`absolute top-0 right-0 w-24 h-24 bg-${color}-50 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
    <div className="relative z-10">
        <div className={`w-14 h-14 bg-${color}-50 text-${color}-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-${color}-100/50 group-hover:scale-110 transition-transform`}>
            {icon}
        </div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{label}</p>
        <h3 className="text-4xl font-black text-slate-900 tracking-tight">{value}</h3>
        <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest">{sub}</p>
    </div>
  </div>
);

export default Analytics;