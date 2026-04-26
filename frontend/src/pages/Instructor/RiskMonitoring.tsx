import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { 
  ShieldAlert, AlertTriangle, MessageSquare, 
  ArrowRight, Loader2, Sparkles, User, Mail, Zap, CheckCircle2 
} from 'lucide-react';

const RiskMonitoring = () => {
  const [riskData, setRiskData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sendingId, setSendingId] = useState<string | null>(null);

  const getAuthHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/instructor/risk-analysis', getAuthHeader());
        setRiskData(res.data);
      } catch (err) {
        console.error("Risk Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // --- LOGIC: SEND EMAIL GUIDANCE ---
  const handleSendGuidance = async (email: string, name: string) => {
    setSendingId(email);
    try {
        await axios.post(`http://localhost:8000/api/instructor/send-guidance?student_email=${email}&student_name=${name}`, {}, getAuthHeader());
        
        // Sleek Success Toast
        toast.success(`Guidance sent to ${name.split(' ')[0]}!`, {
            duration: 4000,
            position: 'top-right',
            style: {
                background: '#0f172a',
                color: '#fff',
                borderRadius: '20px',
                padding: '20px',
                fontWeight: 'bold',
                border: '1px solid #1e293b'
            },
            iconTheme: { primary: '#10b981', secondary: '#fff' }
        });
    } catch (err) {
        toast.error("Failed to connect to email server.");
    } finally {
        setSendingId(null);
    }
  };

  if (loading) return (
    <div className="h-96 flex flex-col items-center justify-center gap-4">
      <Loader2 className="animate-spin text-rose-600" size={48} />
      <p className="font-black text-slate-400 uppercase tracking-widest text-xs">AI Risk Processing active...</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-20 font-sans px-4">
      <Toaster /> {/* Required for notifications */}
      
      {/* 1. HERO SECTION */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="relative bg-slate-900 rounded-[3.5rem] p-10 md:p-16 overflow-hidden shadow-2xl"
      >
        <div className="absolute top-0 right-0 w-[500px] h-full bg-rose-500/10 blur-[120px] pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="w-24 h-24 bg-rose-500 text-white rounded-[2rem] flex items-center justify-center shadow-2xl shadow-rose-500/20">
                <ShieldAlert size={48} />
            </div>
            <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 bg-rose-500/20 text-rose-400 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                    Neural Engine Monitoring
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">
                    Intervention Control
                </h1>
                <p className="text-slate-400 mt-6 text-lg max-w-2xl leading-relaxed font-medium">
                    Automated analysis has identified <span className="text-rose-400 font-bold">{riskData.length} students</span> requiring pedagogical support. Send guidance directly to their institutional inbox.
                </p>
            </div>
        </div>
      </motion.div>

      {/* 2. RISK ANALYSIS GRID */}
      <div className="space-y-8">
        <div className="flex items-center justify-between px-4">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Priority Flags</h3>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                <Sparkles size={14} className="text-rose-500" /> Confidence: High
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-2">
            {riskData.length === 0 ? (
                <div className="md:col-span-2 py-20 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
                    <CheckCircle2 size={48} className="mx-auto text-emerald-500 mb-4 opacity-30" />
                    <p className="font-black text-slate-300 uppercase tracking-widest text-xs">Environment Stable. No High-Risk Patterns Found.</p>
                </div>
            ) : (
                riskData.map((item, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-8 bg-white rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 group relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-rose-50 rounded-bl-full opacity-50 -z-0" />
                        
                        <div className="relative z-10 flex items-center justify-between mb-8">
                            <div className="flex items-center gap-5">
                                <div className="w-16 h-16 rounded-3xl overflow-hidden border-2 border-white shadow-md group-hover:scale-105 transition-transform">
                                    <img src={item.avatar} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-black text-slate-900 leading-tight">{item.student_name}</h4>
                                    <div className="flex items-center gap-2 text-slate-400 mt-1">
                                        <Mail size={12}/>
                                        <span className="text-[10px] font-bold uppercase tracking-widest">{item.email}</span>
                                    </div>
                                </div>
                            </div>
                            <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                                item.risk_level === 'High' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-orange-50 text-orange-600 border-orange-100'
                            }`}>
                                {item.risk_level} Risk
                            </span>
                        </div>

                        <div className="relative z-10 bg-slate-50 p-6 rounded-[2rem] border border-slate-100 mb-8">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Model Probability</span>
                                <span className="text-xl font-black text-rose-600">{item.pass_probability}%</span>
                            </div>
                            <div className="h-2 bg-white rounded-full overflow-hidden">
                                <motion.div 
                                    initial={{ width: '100%' }} animate={{ width: `${item.pass_probability}%` }}
                                    className="h-full bg-rose-500 rounded-full"
                                />
                            </div>
                            <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                <AlertTriangle size={14} className="text-rose-500" /> {item.reason}
                            </div>
                        </div>

                        <div className="relative z-10 flex gap-3">
                            <button 
                                onClick={() => handleSendGuidance(item.email, item.student_name)}
                                disabled={sendingId === item.email}
                                className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-rose-600 transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 disabled:opacity-50"
                            >
                                {sendingId === item.email ? <Loader2 className="animate-spin" size={18}/> : <><MessageSquare size={18}/> Send Guidance</>}
                            </button>
                            <button className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all border border-slate-100 group shadow-sm">
                                <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </motion.div>
                ))
            )}
        </div>
      </div>
    </div>
  );
};

export default RiskMonitoring;