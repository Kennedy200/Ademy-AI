import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, HelpCircle, ChevronDown, MessageCircle, 
  Mail, Phone, ArrowLeft, BrainCircuit, ShieldCheck, 
  GraduationCap, Globe 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Support = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  const faqs = [
    {
      category: "Student Portal",
      questions: [
        { q: "How is my CGPA calculated?", a: "Ademy calculates your GPA based on the results of your Module Quizzes. It is normalized on a 5.0 scale following Caleb University standards." },
        { q: "How do I mark a lesson as complete?", a: "At the bottom of each lesson page, click the 'Mark as Completed' button. This will update your progress bar and trigger a checkmark in the syllabus." }
      ]
    },
    {
      category: "AI & Predictions",
      questions: [
        { q: "What does 'At Risk' status mean?", a: "Our AI model flags accounts as 'At Risk' if the pass probability drops below 50% based on recent quiz scores and engagement frequency." },
        { q: "How are recommendations generated?", a: "The AI analyzes modules where you scored less than 50% and automatically suggests them for review in your 'AI Recommendations' tab." }
      ]
    },
    {
      category: "Faculty Support",
      questions: [
        { q: "How do I send guidance to a student?", a: "In the Risk Monitoring dashboard, click 'Send Guidance' on any flagged student card to issue a real-time email alert." },
        { q: "Can I export my class data?", a: "Yes, use the 'Export Report' button in Class Analytics or the 'Syllabus Audit' button in the Curriculum Manager for PDF exports." }
      ]
    }
  ];

  const filteredFaqs = faqs.map(cat => ({
    ...cat,
    questions: cat.questions.filter(q => q.q.toLowerCase().includes(searchQuery.toLowerCase()))
  })).filter(cat => cat.questions.length > 0);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="bg-slate-900 pt-32 pb-24 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px]" />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-400 font-black uppercase tracking-[0.2em] text-[10px] mb-8 hover:text-indigo-400 transition-colors">
            <ArrowLeft size={14} /> Back to Dashboard
          </Link>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8">
            How can we <span className="text-indigo-400">help?</span>
          </h1>
          
          <div className="relative group max-w-2xl mx-auto">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={24} />
            <input 
              type="text" 
              placeholder="Search for answers, guides, or features..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-[2rem] py-6 pl-16 pr-8 text-white text-lg font-medium outline-none focus:bg-white/10 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-600 shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* 2. HELP CATEGORIES */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 -translate-y-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <CategoryCard icon={<BrainCircuit className="text-emerald-500" />} title="AI Insights" desc="Understanding predictions and risk models." />
            <CategoryCard icon={<GraduationCap className="text-indigo-500" />} title="Academic Tools" desc="Course management and evaluation help." />
            <CategoryCard icon={<ShieldCheck className="text-blue-500" />} title="Security & Auth" desc="Login issues and account privacy." />
        </div>

        {/* 3. FAQ ACCORDION */}
        <div className="max-w-3xl mx-auto space-y-12">
            <div className="text-center">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Frequently Asked Questions</h2>
                <p className="text-slate-500 font-medium mt-2">Quick answers to common inquiries.</p>
            </div>

            <div className="space-y-8">
                {filteredFaqs.map((cat, catIdx) => (
                    <div key={catIdx} className="space-y-4">
                        <h4 className="px-4 text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">{cat.category}</h4>
                        <div className="space-y-3">
                            {cat.questions.map((q, qIdx) => {
                                const id = catIdx * 10 + qIdx;
                                return (
                                    <div key={qIdx} className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                                        <button 
                                            onClick={() => setActiveAccordion(activeAccordion === id ? null : id)}
                                            className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
                                        >
                                            <span className="font-bold text-slate-800 pr-4">{q.q}</span>
                                            <ChevronDown size={20} className={`text-slate-300 transition-transform duration-300 ${activeAccordion === id ? 'rotate-180 text-indigo-500' : ''}`} />
                                        </button>
                                        <AnimatePresence>
                                            {activeAccordion === id && (
                                                <motion.div 
                                                    initial={{ height: 0, opacity: 0 }} 
                                                    animate={{ height: 'auto', opacity: 1 }} 
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="px-6 pb-6 text-slate-500 font-medium leading-relaxed"
                                                >
                                                    {q.a}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* 4. CONTACT SECTION */}
        <div className="mt-24 bg-indigo-600 rounded-[3.5rem] p-10 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-indigo-200">
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
                <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-white rounded-full blur-[100px]" />
            </div>
            
            <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter">Still need help?</h3>
                <p className="text-indigo-100 text-lg font-medium opacity-80 leading-relaxed">
                    Our technical support team is available for one-on-one sessions to resolve complex integration issues.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

const CategoryCard = ({ icon, title, desc }: any) => (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 group hover:shadow-2xl hover:border-indigo-100 transition-all duration-500">
        <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform">
            {icon}
        </div>
        <h3 className="text-xl font-black text-slate-900 mb-2">{title}</h3>
        <p className="text-sm font-medium text-slate-500 leading-relaxed">{desc}</p>
    </div>
);

export default Support;