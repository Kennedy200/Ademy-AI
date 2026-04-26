import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { 
  BookOpen, Layers, FileText, Download, 
  Settings, ChevronRight, Loader2, Search,
  ArrowUpRight, BarChart, MoreVertical, ShieldCheck
} from 'lucide-react';

const ManageCurriculum = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const getAuthHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/instructor/curriculum-overview', getAuthHeader());
        setCourses(res.data);
      } catch (err) {
        console.error("Curriculum Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // --- PDF EXPORT LOGIC (No Backend Needed) ---
  const handleExportSyllabus = () => {
    const doc = new jsPDF();
    const dateStr = new Date().toLocaleDateString();
    const instructorName = localStorage.getItem('full_name') || 'Faculty Admin';

    // 1. Header Design
    doc.setFillColor(30, 41, 59); // Deep Slate
    doc.rect(0, 0, 210, 45, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text("ADEMY ACADEMIC AUDIT", 15, 25);
    doc.setFontSize(10);
    doc.text(`Official Syllabus Overview - ${dateStr}`, 15, 33);

    // 2. Metadata
    doc.setTextColor(30, 41, 59);
    doc.setFontSize(12);
    doc.text(`Auditor: ${instructorName}`, 15, 55);
    doc.text(`Total Active Courses: ${courses.length}`, 15, 62);

    // 3. Table of Courses
    const tableRows = courses.map(c => [
        c.category,
        c.title,
        c.instructor,
        c.modules_count,
        c.lessons_count
    ]);

    autoTable(doc, {
      startY: 75,
      head: [['CAT', 'COURSE TITLE', 'HEAD INSTRUCTOR', 'UNITS', 'LESSONS']],
      body: tableRows,
      headStyles: { fillColor: [79, 70, 229] }, // Indigo
      alternateRowStyles: { fillColor: [248, 250, 252] },
      styles: { fontSize: 8, halign: 'center' }
    });

    // 4. Footer
    const finalY = (doc as any).lastAutoTable.finalY + 20;
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text("Authorized by Ademy Intelligent Curriculum Management System.", 15, finalY);

    doc.save(`Ademy_Curriculum_Audit_${new Date().getTime()}.pdf`);
  };

  const filtered = courses.filter(c => c.title.toLowerCase().includes(search.toLowerCase()));

  if (loading) return (
    <div className="h-96 flex flex-col items-center justify-center gap-4">
      <Loader2 className="animate-spin text-indigo-600" size={48} />
      <p className="font-black text-slate-400 uppercase tracking-widest text-xs">Parsing Syllabus Metadata...</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-20 font-sans px-4">
      
      {/* 1. HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-tight">Curriculum Manager</h1>
          <p className="text-slate-500 font-medium mt-1 text-lg leading-tight">Audit course structures, units, and learning materials across the platform.</p>
        </div>
        <button 
            onClick={handleExportSyllabus}
            className="flex items-center justify-center gap-3 bg-indigo-600 text-white px-10 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-2xl shadow-indigo-200 hover:bg-slate-900 transition-all active:scale-95"
        >
          Export Syllabus Audit <Download size={18}/>
        </button>
      </div>

      {/* 2. STATS SUMMARY BAR */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-[3rem] border border-slate-100 flex items-center gap-6 shadow-sm group hover:shadow-xl transition-all duration-500">
            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center border border-indigo-100"><BookOpen size={28}/></div>
            <div><p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.25em]">Active Tracks</p><p className="text-3xl font-black text-slate-900">{courses.length}</p></div>
          </div>
          <div className="bg-white p-8 rounded-[3rem] border border-slate-100 flex items-center gap-6 shadow-sm group hover:shadow-xl transition-all duration-500">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center border border-blue-100"><Layers size={28}/></div>
            <div><p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.25em]">Global Units</p><p className="text-3xl font-black text-slate-900">{courses.length * 12}</p></div>
          </div>
          <div className="bg-white p-8 rounded-[3rem] border border-slate-100 flex items-center gap-6 shadow-sm group hover:shadow-xl transition-all duration-500">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center border border-emerald-100"><FileText size={28}/></div>
            <div><p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.25em]">Total Lessons</p><p className="text-3xl font-black text-slate-900">{courses.length * 48}</p></div>
          </div>
      </div>

      {/* 3. CURRICULUM LIST */}
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-4">
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">Academic Catalog</h3>
            <div className="relative flex items-center bg-white border border-slate-200 rounded-2xl px-6 py-4 w-full md:w-96 shadow-sm focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all">
                <Search size={20} className="text-slate-300 mr-3" />
                <input type="text" placeholder="Search academic tracks..." value={search} onChange={(e)=>setSearch(e.target.value)} className="bg-transparent border-none outline-none text-sm font-bold text-slate-700 w-full" />
            </div>
        </div>

        <div className="grid grid-cols-1 gap-6 px-2">
            {filtered.map((course, i) => (
                <motion.div 
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="group bg-white p-8 md:p-10 rounded-[4rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col md:flex-row items-center justify-between gap-10"
                >
                    <div className="flex flex-col md:flex-row items-center gap-10 flex-1">
                        <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden border-4 border-slate-50 shadow-md group-hover:scale-105 transition-transform shrink-0">
                            <img src={course.thumbnail} className="w-full h-full object-cover" alt="Course Cover" />
                        </div>
                        <div className="text-center md:text-left space-y-3">
                            <span className="px-5 py-2 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100">{course.category}</span>
                            <h4 className="text-3xl font-black text-slate-900 leading-tight tracking-tight group-hover:text-indigo-600 transition-colors">{course.title}</h4>
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center md:justify-start gap-2">
                                <ShieldCheck size={14} className="text-emerald-500" /> Head: {course.instructor}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-10 md:gap-16 shrink-0 pt-6 md:pt-0 border-t md:border-t-0 border-slate-50 w-full md:w-auto justify-center">
                        <div className="text-center">
                            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-2">Modules</p>
                            <p className="text-3xl font-black text-slate-900 leading-none">{course.modules_count}</p>
                        </div>
                        <div className="text-center border-x border-slate-100 px-10">
                            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-2">Lessons</p>
                            <p className="text-3xl font-black text-slate-900 leading-none">{course.lessons_count}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="p-5 bg-slate-50 rounded-3xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all active:scale-90 border border-transparent hover:border-indigo-100"><Settings size={24}/></button>
                            <button className="p-5 bg-slate-900 text-white rounded-3xl shadow-xl shadow-slate-200 hover:bg-indigo-600 transition-all active:scale-95 group">
                                <ArrowUpRight size={28} className="group-hover:rotate-12 transition-transform" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
      </div>

    </div>
  );
};

export default ManageCurriculum;