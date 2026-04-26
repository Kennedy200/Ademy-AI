import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell 
} from 'recharts';
import { 
  BarChart3, Activity, ArrowUpRight, 
  Loader2, Download, Filter, Trophy, Target, AlertCircle
} from 'lucide-react';

const ClassAnalytics = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const getAuthHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/instructor/class-analytics', getAuthHeader());
        setData(res.data);
      } catch (err) {
        console.error("Faculty Analytics Sync Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  // --- PDF EXPORT LOGIC ---
  const handleExportPDF = () => {
    if (!data) return;
    const doc = new jsPDF();
    const dateStr = new Date().toLocaleString();
    const instructorName = localStorage.getItem('full_name') || 'Faculty Member';

    // 1. Professional Header
    doc.setFillColor(30, 41, 59); // Deep Slate
    doc.rect(0, 0, 210, 50, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(26);
    doc.setFont("helvetica", "bold");
    doc.text("ADEMY FACULTY REPORT", 15, 30);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("CURRICULUM EFFECTIVENESS & CLASS PROFICIENCY ANALYSIS", 15, 40);

    // 2. Executive Summary
    doc.setTextColor(30, 41, 59);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Executive Summary", 15, 65);
    doc.line(15, 68, 195, 68);

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(`Instructor: ${instructorName}`, 15, 78);
    doc.text(`Report Generated: ${dateStr}`, 15, 84);

    // 3. Risk Distribution Table
    autoTable(doc, {
      startY: 95,
      head: [['Risk Category', 'Student Count']],
      body: data.risk_dist.map((r: any) => [r.name, r.value]),
      theme: 'grid',
      headStyles: { fillColor: [79, 70, 229] } // Indigo
    });

    // 4. Module Performance Table
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Curriculum Mastery Details", 15, (doc as any).lastAutoTable.finalY + 20);
    
    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 25,
      head: [['Specialized Unit / Module', 'Average Class Score (%)']],
      body: data.module_performance.map((m: any) => [m.module, `${m.avg}%`]),
      theme: 'striped',
      headStyles: { fillColor: [30, 41, 59] }
    });

    // 5. Verification Footer
    const finalY = (doc as any).lastAutoTable.finalY + 30;
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text("This report is an automated output from Ademy's Intelligent Monitoring Engine.", 15, finalY);

    doc.save(`Ademy_Class_Analytics_${new Date().getTime()}.pdf`);
  };

  if (loading) return (
    <div className="h-96 flex flex-col items-center justify-center gap-4">
      <Loader2 className="animate-spin text-indigo-600" size={48} />
      <p className="font-black text-slate-400 uppercase tracking-widest text-xs">Generating Class Heatmap...</p>
    </div>
  );

  // Derived Insights
  const topModule = data?.module_performance.reduce((prev: any, current: any) => (prev.avg > current.avg) ? prev : current);
  const bottleneck = data?.module_performance.find((m: any) => m.avg < 50);

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-20 font-sans px-4">
      
      {/* 1. HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">Class Analytics</h1>
          <p className="text-slate-500 font-medium mt-1 text-lg">Predictive metrics and curriculum effectiveness mapping.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none p-4 bg-white border border-slate-200 rounded-2xl text-slate-600 hover:bg-slate-50 shadow-sm transition-all"><Filter size={20}/></button>
            <button 
                onClick={handleExportPDF}
                className="flex-[2] md:flex-none flex items-center justify-center gap-3 bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-100 hover:bg-slate-900 transition-all active:scale-95"
            >
                Export Report <Download size={18}/>
            </button>
        </div>
      </div>

      {/* 2. MAIN CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Module Performance Bar Chart */}
        <div className="bg-white p-8 md:p-12 rounded-[3.5rem] border border-slate-100 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-50 rounded-bl-full opacity-50 transition-transform group-hover:scale-110" />
            <div className="flex items-center justify-between mb-12 relative z-10">
                <div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">Curriculum Mastery</h3>
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mt-1">Mean Score % per Specialized Unit</p>
                </div>
                <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shadow-sm border border-indigo-100"><BarChart3 size={28}/></div>
            </div>
            
            <div className="h-[400px] w-full relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data?.module_performance}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="module" hide />
                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700, fill: '#94a3b8'}} />
                        <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.15)', padding: '20px'}} />
                        <Bar dataKey="avg" radius={[12, 12, 0, 0]} barSize={55}>
                            {data?.module_performance.map((entry: any, index: number) => (
                                <Cell key={`cell-${index}`} fill={entry.avg < 50 ? '#f43f5e' : '#4f46e5'} className="hover:opacity-80 transition-opacity cursor-pointer" />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Risk Distribution Pie Chart */}
        <div className="bg-white p-8 md:p-12 rounded-[3.5rem] border border-slate-100 shadow-sm flex flex-col items-center group relative overflow-hidden">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight self-start mb-12">Risk Distribution</h3>
            <div className="h-[320px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie data={data?.risk_dist} innerRadius={95} outerRadius={125} paddingAngle={15} dataKey="value" stroke="none">
                            {data?.risk_dist.map((entry: any, index: number) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none translate-y-[-10px]">
                    <Activity size={36} className="text-slate-200 mb-2 animate-pulse" />
                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Neural<br/>Status</span>
                </div>
            </div>
            
            <div className="w-full grid grid-cols-2 gap-4 mt-12">
                {data?.risk_dist.map((item: any) => (
                    <div key={item.name} className="p-6 rounded-[2.5rem] border border-slate-50 bg-slate-50/50 flex flex-col items-center hover:bg-white hover:shadow-lg transition-all duration-300">
                        <div className="w-3.5 h-3.5 rounded-full mb-3 shadow-sm" style={{ backgroundColor: item.color }} />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.name}</span>
                        <span className="text-4xl font-black text-slate-900 mt-1">{item.value}</span>
                    </div>
                ))}
            </div>
        </div>

      </div>

      {/* 3. PERFORMANCE INSIGHT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <InsightCard 
            icon={<Trophy size={20}/>}
            title="Highest Proficiency" 
            module={topModule?.module || "General Systems"} 
            score={`${topModule?.avg || 0}%`}
            color="indigo" 
        />
        <InsightCard 
            icon={<AlertCircle size={20}/>}
            title="Critical Bottleneck" 
            module={bottleneck?.module || "None Identified"} 
            score={`${bottleneck?.avg || '--'}%`}
            color="rose" 
        />
        <InsightCard 
            icon={<Target size={20}/>}
            title="Avg Participation" 
            module="User Engagement" 
            score="92.4%" 
            color="emerald" 
        />
      </div>

    </div>
  );
};

const InsightCard = ({ icon, title, module, score, color }: any) => (
    <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
        <div className={`absolute top-0 right-0 w-28 h-28 bg-${color}-50 rounded-bl-full opacity-50 -z-0 group-hover:scale-125 transition-transform duration-700`} />
        <div className="relative z-10 space-y-5">
            <div className={`w-12 h-12 bg-${color}-50 text-${color}-600 rounded-xl flex items-center justify-center border border-${color}-100 shadow-sm`}>
                {icon}
            </div>
            <div>
                <p className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 mb-1">{title}</p>
                <h4 className="text-xl font-black text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">{module}</h4>
            </div>
            <div className="flex items-baseline gap-2">
                <span className={`text-5xl font-black text-${color}-600 tracking-tighter`}>{score}</span>
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Efficiency</span>
            </div>
        </div>
    </div>
);

export default ClassAnalytics;