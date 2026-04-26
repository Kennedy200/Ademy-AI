import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { 
  Users, Search, ArrowUpRight, AlertTriangle, 
  CheckCircle2, Mail, Loader2, Download 
} from 'lucide-react';

const StudentRoster = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const getAuthHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/instructor/students', getAuthHeader());
        // Safeguard: Only allow 'student' role in this list
        const filteredStudents = res.data.filter((s: any) => s.role.toLowerCase().includes('student'));
        setStudents(filteredStudents);
      } catch (err) {
        console.error("Roster Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const filtered = students.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));

  // --- PDF EXPORT LOGIC ---
  const handleExportPDF = () => {
    const doc = new jsPDF();
    const dateStr = new Date().toLocaleDateString();

    doc.setFillColor(30, 41, 59); // Slate-900
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text("ADEMY FACULTY RECORDS", 15, 25);
    doc.setFontSize(10);
    doc.text(`Official Student Roster - Generated on ${dateStr}`, 15, 33);

    const tableRows = filtered.map(s => [
        s.name, s.email, s.gpa.toString(), `${s.progress}%`, s.risk.toUpperCase()
    ]);

    autoTable(doc, {
      startY: 50,
      head: [['Full Name', 'Email', 'CGPA', 'Progress', 'AI Status']],
      body: tableRows,
      headStyles: { fillColor: [79, 70, 229] }, // Indigo
      styles: { fontSize: 9, cellPadding: 5 },
      alternateRowStyles: { fillColor: [248, 250, 252] }
    });

    doc.save(`Ademy_Student_Roster_${dateStr}.pdf`);
  };

  if (loading) return (
    <div className="h-96 flex flex-col items-center justify-center gap-4">
      <Loader2 className="animate-spin text-indigo-600" size={48} />
      <p className="font-black text-slate-400 uppercase tracking-widest text-xs">Syncing Faculty Database...</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-20 font-sans px-4">
      
      {/* 1. HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Student Roster</h1>
          <p className="text-slate-500 font-medium mt-1 text-lg">Monitoring {students.length} active learners in the system.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex-1 md:flex-none relative group flex items-center bg-white border border-slate-200 rounded-2xl px-5 py-3 shadow-sm focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all">
            <Search className="text-slate-300 mr-3" size={20} />
            <input 
              type="text" placeholder="Search students..." value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-none outline-none w-full text-sm font-bold text-slate-700 placeholder:text-slate-300" 
            />
          </div>
          <button 
            onClick={handleExportPDF}
            className="p-4 bg-indigo-600 text-white rounded-2xl shadow-xl shadow-indigo-100 hover:bg-slate-900 transition-all active:scale-95 flex items-center justify-center"
          >
            <Download size={24} />
          </button>
        </div>
      </div>

      {/* 2. TABLE (Desktop View) */}
      <div className="hidden lg:block bg-white rounded-[3.5rem] border border-slate-100 shadow-sm overflow-hidden relative">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="p-8 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100">Student Profile</th>
                <th className="p-8 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100">GPA</th>
                <th className="p-8 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100">Progress</th>
                <th className="p-8 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 text-center">AI Status</th>
                <th className="p-8 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 text-right">View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((student, i) => (
                <tr key={student.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="p-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-white shadow-sm transition-transform"><img src={student.avatar} className="w-full h-full object-cover" /></div>
                      <div>
                        <p className="font-black text-slate-900 leading-tight">{student.name}</p>
                        <p className="text-xs font-bold text-slate-400 mt-1 flex items-center gap-1"><Mail size={12}/> {student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-8"><span className="text-2xl font-black text-slate-900">{student.gpa}</span></td>
                  <td className="p-8 w-64">
                    <div className="space-y-2">
                        <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase"><span>Mastery</span><span>{student.progress}%</span></div>
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: `${student.progress}%` }} className="h-full bg-indigo-600 rounded-full" /></div>
                    </div>
                  </td>
                  <td className="p-8">
                    <div className="flex justify-center">
                        <span className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border flex items-center gap-2 ${student.risk === 'At Risk' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>
                            {student.risk === 'At Risk' ? <AlertTriangle size={12}/> : <CheckCircle2 size={12}/>} {student.risk}
                        </span>
                    </div>
                  </td>
                  <td className="p-8 text-right">
                    <button className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-indigo-600 hover:shadow-lg transition-all active:scale-95"><ArrowUpRight size={20} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. MOBILE CARDS (Small Screen Only) */}
      <div className="lg:hidden space-y-4 px-2">
        {filtered.map((student) => (
          <div key={student.id} className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center gap-4">
              <img src={student.avatar} className="w-16 h-16 rounded-3xl border-2 border-slate-50 shadow-sm" />
              <div className="flex-1">
                <p className="font-black text-slate-900 text-lg leading-tight">{student.name}</p>
                <p className="text-xs font-bold text-slate-400 truncate max-w-[150px]">{student.email}</p>
              </div>
              <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase border ${student.risk === 'At Risk' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>{student.risk}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-50">
                <div><p className="text-[10px] font-black text-slate-300 uppercase mb-1">GPA</p><p className="text-3xl font-black text-slate-900">{student.gpa}</p></div>
                <div><p className="text-[10px] font-black text-slate-300 uppercase mb-1">Mastery</p><p className="text-3xl font-black text-slate-900">{student.progress}%</p></div>
            </div>
            <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2">View Profile <ArrowUpRight size={16}/></button>
          </div>
        ))}
      </div>

    </div>
  );
};

export default StudentRoster;