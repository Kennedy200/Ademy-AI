import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { 
  Users, GraduationCap, ShieldAlert, TrendingUp, 
  ArrowUpRight, MoreVertical, Sparkles, BrainCircuit, Loader2 
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Cell 
} from 'recharts';

const InstructorDashboard = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const getAuthHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/instructor/dashboard-stats', getAuthHeader());
        setStats(res.data);
      } catch (err) {
        console.error("Dashboard Stats Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return (
    <div className="h-96 flex flex-col items-center justify-center gap-4">
      <Loader2 className="animate-spin text-indigo-600" size={48} />
      <p className="font-black text-slate-400 uppercase tracking-widest text-xs">Syncing Class Intelligence...</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-20 font-sans">
      
      {/* 1. WELCOME HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">Faculty Overview</h1>
          <p className="text-slate-500 font-medium text-lg">AI monitoring is active for {stats.active_students} students.</p>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center gap-4 px-6 py-4 bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-indigo-100/20">
            <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
                <Sparkles size={24} />
            </div>
            <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Class Health</p>
                <p className="text-lg font-black text-slate-900 uppercase tracking-widest">Optimal</p>
            </div>
        </motion.div>
      </div>

      {/* 2. CORE KPI GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-2">
        <MetricCard icon={<Users />} color="indigo" label="Active Students" value={stats.active_students} sub="Registered Learners" />
        <MetricCard icon={<GraduationCap />} color="blue" label="Avg Proficiency" value={stats.avg_proficiency} sub="Class Mean Score" />
        <MetricCard icon={<ShieldAlert />} color="rose" label="At-Risk Alerts" value={stats.at_risk_alerts} trend="Requires Action" />
        
        <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl group-hover:scale-150 transition-all duration-700 pointer-events-none" />
            <div className="relative z-10">
                <div className="w-14 h-14 bg-white/10 text-emerald-400 rounded-2xl flex items-center justify-center border border-white/10 mb-6">
                    <BrainCircuit size={28} className="text-emerald-400" />
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Global Prediction</p>
                <h3 className="text-5xl font-black text-white">{stats.success_prediction}</h3>
                <p className="text-[11px] font-bold text-emerald-400 mt-4 uppercase tracking-widest">Projected Pass Rate</p>
            </div>
        </div>
      </div>

      {/* 3. ANALYTICS HUB */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-2">
        
        {/* Module Performance Bar Chart */}
        <div className="lg:col-span-2 bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-12">
                <div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">Bottleneck Identification</h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Class Avg % per Specialized Module</p>
                </div>
                <button className="p-3 bg-slate-50 rounded-2xl text-slate-400"><MoreVertical size={20} /></button>
            </div>
            
            <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stats.bottleneck_chart}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 900, fill: '#94a3b8'}} dy={15} />
                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 900, fill: '#94a3b8'}} />
                        <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}} />
                        <Bar dataKey="avg" radius={[12, 12, 0, 0]} barSize={45}>
                            {stats.bottleneck_chart.map((entry: any, index: number) => (
                                <Cell key={`cell-${index}`} fill={entry.avg < 50 ? '#f43f5e' : '#4f46e5'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Priority Intervention List */}
        <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm flex flex-col">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-8">Priority List</h3>
            <div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                {stats.priority_list.length > 0 ? stats.priority_list.map((student: any, i: number) => (
                    <div key={i} className="flex items-center justify-between p-5 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-300 group">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-white shadow-sm group-hover:scale-105 transition-transform">
                                <img src={student.img} className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <p className="text-sm font-black text-slate-900 leading-tight">{student.name.split(' ')[0]}</p>
                                <p className={`text-[10px] font-black uppercase ${student.risk === 'High' ? 'text-rose-500' : 'text-orange-500'}`}>{student.risk} Risk</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-xl font-black text-slate-900">{student.score}</p>
                            <button className="text-[9px] font-black uppercase text-indigo-600 hover:underline tracking-widest">Notify</button>
                        </div>
                    </div>
                )) : (
                    <div className="flex flex-col items-center justify-center h-full text-slate-300 gap-4">
                        <ShieldAlert size={48} opacity={0.3} />
                        <p className="font-bold text-xs uppercase tracking-widest text-center px-4">All students are performing within range.</p>
                    </div>
                )}
            </div>
            <button className="mt-8 w-full py-5 bg-slate-900 text-white rounded-3xl font-black text-[10px] uppercase tracking-[0.25em] shadow-xl hover:bg-indigo-600 transition-all">Full Monitoring Hub</button>
        </div>

      </div>

    </div>
  );
};

const MetricCard = ({ icon, color, label, value, sub, trend }: any) => (
    <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
        <div className={`absolute top-0 right-0 w-32 h-32 bg-${color}-50 rounded-bl-full opacity-0 group-hover:opacity-100 transition-all duration-500`} />
        <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
                <div className={`w-16 h-16 bg-${color}-50 text-${color}-600 rounded-[1.5rem] flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm border border-${color}-100/50`}>
                    {icon}
                </div>
                {trend && <span className="text-[10px] font-black px-4 py-1.5 rounded-full bg-rose-50 text-rose-600 border border-rose-100 uppercase tracking-widest">{trend}</span>}
            </div>
            <p className="text-[11px] font-black text-slate-400 mb-2 uppercase tracking-[0.25em]">{label}</p>
            <h3 className="text-5xl font-black text-slate-900 tracking-tighter">{value}</h3>
            {sub && <p className="text-[10px] font-bold text-slate-300 mt-3 uppercase tracking-widest">{sub}</p>}
        </div>
    </div>
);

export default InstructorDashboard;