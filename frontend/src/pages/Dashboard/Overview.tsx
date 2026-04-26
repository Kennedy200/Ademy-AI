import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Sparkles, TrendingUp, BookOpen, Clock, ArrowUpRight, Loader2, AlertTriangle } from 'lucide-react';
import { 
  AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell 
} from 'recharts';

const Overview = () => {
  const [aiStatus, setAiStatus] = useState<any>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const [grades, setGrades] = useState<any[]>([]);
  const [progress, setProgress] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  // Helper to get Auth Headers
  const getAuthHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetching all real data
        const [aiRes, courseRes, gradeRes, progressRes] = await Promise.all([
          axios.get('http://localhost:8000/api/user/ai-status', getAuthHeader()),
          axios.get('http://localhost:8000/api/courses', getAuthHeader()),
          axios.get('http://localhost:8000/api/user/grades', getAuthHeader()),
          axios.get('http://localhost:8000/api/user/progress', getAuthHeader())
        ]);
        
        setAiStatus(aiRes.data);
        setCourses(courseRes.data);
        setGrades(gradeRes.data);
        setProgress(progressRes.data);
      } catch (err) {
        console.error("Dashboard Sync Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  // --- CALCULATIONS ---
  
  // 1. Calculate real CGPA (Average of all scores / 100 * 5.0)
  const calculateGPA = () => {
    if (!grades || grades.length === 0) return "0.00";
    const totalScore = grades.reduce((sum, item) => sum + item.score, 0);
    const average = totalScore / grades.length;
    return ((average / 100) * 5).toFixed(2);
  };

  // 2. NEW ENROLLED LOGIC: 
  // We determine enrollment by checking which courses the user has actually interacted with.
  // Since each course has 12 modules, we map module_ids to course_ids.
  const getEnrolledCourses = () => {
    const activeCourseIds = new Set<number>();
    
    // Check Quiz Grades
    grades.forEach(g => {
        const courseId = Math.ceil(g.module_id / 12);
        activeCourseIds.add(courseId);
    });

    // Check Lesson Progress (Using lesson IDs to find module, then course)
    // Note: Since each module has 4 lessons, Course 1 is lessons 1-48
    progress.forEach(lessonId => {
        const courseId = Math.ceil(lessonId / 48);
        activeCourseIds.add(courseId);
    });

    return Array.from(activeCourseIds);
  };

  const enrolledCourseIds = getEnrolledCourses();
  const enrolledCount = enrolledCourseIds.length;

  // 3. Format Momentum Chart Data (Last 7 quizzes)
  const chartData = grades.slice(0, 7).reverse().map((g, i) => ({
    name: `Quiz ${i + 1}`,
    score: g.score
  }));

  // 4. Format Course Health Data (Pie Chart)
  const pieData = [
    { name: 'Completed', value: grades.filter(g => g.score >= 50).length, color: '#10b981' },
    { name: 'Needs Review', value: grades.filter(g => g.score < 50).length, color: '#f59e0b' },
    { name: 'Enrolled', value: enrolledCount, color: '#3b82f6' },
  ];

  if (loading) return (
    <div className="h-96 flex flex-col items-center justify-center gap-4">
      <Loader2 className="animate-spin text-emerald-500" size={48} />
      <p className="font-black text-slate-400 uppercase tracking-widest text-xs">Syncing Intelligence Dashboard...</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-10 font-sans">
      
      {/* 1. WELCOME HEADER & AI STATUS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">Welcome back! 👋</h1>
          <p className="text-slate-500 font-medium mt-1">AI-Powered academic monitoring is active for your profile.</p>
        </div>

        {/* DYNAMIC AI BADGE */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`inline-flex items-center gap-4 px-6 py-4 rounded-3xl border shadow-xl ${
            aiStatus?.status === 'At Risk' 
            ? 'bg-red-50 text-red-700 border-red-100' 
            : 'bg-emerald-50 text-emerald-700 border-emerald-100'
          }`}
        >
          <div className={`p-2 rounded-xl ${aiStatus?.status === 'At Risk' ? 'bg-red-100' : 'bg-emerald-100'}`}>
            {aiStatus?.status === 'At Risk' ? <AlertTriangle size={20} className="animate-bounce" /> : <Sparkles size={20} className="animate-pulse" />}
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50 text-slate-900">System Prediction</span>
            <span className="text-base font-black uppercase tracking-widest">{aiStatus?.status || 'On Track'}</span>
          </div>
        </motion.div>
      </div>

      {/* 2. STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-2">
        <StatCard icon={<TrendingUp />} color="blue" title="Current CGPA" value={calculateGPA()} sub="/5.0" trend={grades.length > 0 ? "Real-time" : "No Data"} />
        <StatCard icon={<BookOpen />} color="indigo" title="Enrolled Courses" value={enrolledCount} />
        <StatCard icon={<Clock />} color="amber" title="Quiz Evaluations" value={grades.length} trend="Completed" />
        
        {/* PREDICTION CARD (FROM TRAINED MODEL) */}
        <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl text-white relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>
          <div className="relative z-10">
            <div className="w-14 h-14 bg-white/10 text-emerald-400 rounded-2xl flex items-center justify-center border border-white/10 mb-6">
                <Sparkles size={28} />
            </div>
            <p className="text-[10px] font-black text-slate-400 mb-1 uppercase tracking-[0.2em]">Pass Probability</p>
            <h3 className="text-5xl font-black text-white">{aiStatus?.pass_probability || '100'}%</h3>
            <p className="text-[11px] text-emerald-400 font-bold mt-4 uppercase tracking-widest leading-relaxed">
                {aiStatus?.recommendation || 'Maintain Consistency'}
            </p>
          </div>
        </div>
      </div>

      {/* 3. CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-2">
        
        {/* Area Chart: Score Trends */}
        <div className="lg:col-span-2 bg-white p-8 md:p-12 rounded-[3.5rem] border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Academic Momentum</h3>
            <div className="bg-slate-50 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] border border-slate-100">Performance Log</div>
          </div>
          <div className="h-[350px] w-full">
            {grades.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                    <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 800, fill: '#94a3b8'}} dy={20} />
                    <Tooltip contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)', padding: '20px' }} />
                    <Area type="monotone" dataKey="score" stroke="#10b981" strokeWidth={6} fillOpacity={1} fill="url(#colorScore)" />
                </AreaChart>
                </ResponsiveContainer>
            ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-300 gap-4">
                    <TrendingUp size={64} strokeWidth={1} opacity={0.3} />
                    <p className="font-black uppercase tracking-widest text-xs">Awaiting evaluation data...</p>
                </div>
            )}
          </div>
        </div>

        {/* Pie Chart: Completion Distribution */}
        <div className="bg-white p-8 md:p-12 rounded-[3.5rem] border border-slate-100 shadow-sm flex flex-col items-center">
          <h3 className="text-2xl font-black text-slate-900 tracking-tight self-start mb-8">Course Health</h3>
          <div className="h-[280px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} innerRadius={85} outerRadius={110} paddingAngle={12} dataKey="value" stroke="none">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none translate-y-[-5px]">
                <span className="text-5xl font-black text-slate-900">{enrolledCount}</span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">Tracks</span>
            </div>
          </div>
          
          <div className="w-full space-y-4 mt-12">
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center justify-between p-4 rounded-3xl bg-slate-50/50 border border-slate-100/50">
                <div className="flex items-center gap-3">
                  <div className="w-3.5 h-3.5 rounded-full shadow-sm" style={{ backgroundColor: item.color }} />
                  <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">{item.name}</span>
                </div>
                <span className="text-sm font-black text-slate-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 4. ACTIVE CURRICULUM GRID */}
      <div className="bg-white p-8 md:p-14 rounded-[4rem] border border-slate-100 shadow-sm px-2">
        <div className="flex items-center justify-between mb-12 px-2">
          <h3 className="text-3xl font-black text-slate-900 tracking-tight">Active Curriculum</h3>
          <button className="bg-slate-900 text-white px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.25em] hover:bg-emerald-600 transition-all flex items-center gap-3 shadow-xl shadow-slate-200">
            View All Courses <ArrowUpRight size={16} />
          </button>
        </div>
        
        {enrolledCount > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-2">
                {courses.filter(c => enrolledCourseIds.includes(c.id)).map((course) => (
                    <div key={course.id} className="p-8 bg-slate-50 rounded-[3.5rem] border border-slate-100 group hover:bg-white hover:shadow-2xl transition-all duration-500 cursor-pointer">
                        <div className="flex items-center gap-5 mb-8">
                            <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform border border-slate-50">
                                <BookOpen className="text-emerald-500" size={32} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mb-1">{course.category}</p>
                                <p className="text-sm font-black text-slate-900 leading-tight">{course.instructor}</p>
                            </div>
                        </div>
                        <h4 className="text-xl font-black text-slate-900 mb-8 group-hover:text-emerald-600 transition-colors line-clamp-2 leading-snug">{course.title}</h4>
                        <div className="flex items-center justify-between pt-8 border-t border-slate-200/50">
                            <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{course.total_modules} Modules</span>
                            <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center group-hover:bg-emerald-500 transition-all shadow-lg">
                                <ArrowUpRight size={20} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <div className="text-center py-20 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
                <BookOpen size={48} className="mx-auto text-slate-300 mb-4" />
                <p className="font-black text-slate-400 uppercase tracking-widest text-xs">No active courses yet. Visit the Library to begin.</p>
            </div>
        )}
      </div>

    </div>
  );
};

// --- HELPER COMPONENT: STAT CARD ---
const StatCard = ({ icon, color, title, value, sub, trend }: any) => (
  <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
    <div className={`absolute top-0 right-0 w-32 h-32 bg-${color}-50 rounded-bl-full -z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
    <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
        <div className={`w-16 h-16 bg-${color}-50 text-${color}-600 rounded-[1.5rem] flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm border border-${color}-100/50`}>
            {icon}
        </div>
        {trend && (
            <span className={`text-[10px] font-black px-5 py-2 rounded-full border ${trend.includes('+') || trend === 'Real-time' || trend === 'Completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-50 text-slate-400 border-slate-100'} uppercase tracking-[0.2em]`}>
            {trend}
            </span>
        )}
        </div>
        <p className="text-[11px] font-black text-slate-400 mb-2 uppercase tracking-[0.25em]">{title}</p>
        <h3 className="text-5xl font-black text-slate-900 tracking-tighter">
        {value}
        {sub && <span className="text-xl text-slate-300 ml-1 font-bold">{sub}</span>}
        </h3>
    </div>
  </div>
);

export default Overview;