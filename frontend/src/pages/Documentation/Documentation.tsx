import { motion } from 'framer-motion';
import { 
  Book, Code, Cpu, ShieldCheck, 
  Terminal, Database, Globe, BrainCircuit,
  Layers, Zap, FileText, ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Documentation = () => {
  const sections = [
    {
      title: "System Overview",
      icon: <Globe className="text-emerald-500" />,
      content: "Ademy is a full-stack intelligent e-learning ecosystem designed to bridge the gap between traditional learning and data-driven academic success. By combining modern web technologies with machine learning, Ademy monitors student engagement and predicts performance outcomes in real-time."
    },
    {
      title: "The AI Engine",
      icon: <BrainCircuit className="text-indigo-500" />,
      content: "The heart of Ademy is a Random Forest Classifier trained on student behavioral datasets. It analyzes quiz scores, module completion speed, and engagement frequency to calculate a 'Pass Probability' percentage, allowing for early academic intervention."
    },
    {
      title: "Backend Architecture",
      icon: <Terminal className="text-slate-600" />,
      content: "Built with FastAPI (Python), the backend ensures low-latency AI inference and high-speed data processing. It utilizes SQLAlchemy ORM for relational data management and JWT (JSON Web Tokens) for secure, role-based authentication."
    },
    {
      title: "Frontend & UX",
      icon: <Layers className="text-blue-500" />,
      content: "The interface is constructed using React 18 and TypeScript, styled with Tailwind CSS v4. It features a responsive dashboard layout that adapts to Student and Instructor roles, providing custom analytics and specialized tools for each user type."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      {/* 1. DOCUMENTATION HERO */}
      <section className="bg-slate-900 pt-32 pb-20 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px]" />
        <div className="max-w-7xl mx-auto relative z-10 text-center md:text-left">
          <Link to="/" className="inline-flex items-center gap-2 text-emerald-400 font-black uppercase tracking-[0.2em] text-[10px] mb-6 hover:text-white transition-colors">
            <Zap size={14} /> Documentation Home
          </Link>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none mb-6">
            Technical <br /><span className="text-emerald-500">Reference.</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl leading-relaxed">
            Everything you need to understand the architecture, algorithms, and integration protocols of the Ademy Intelligent System.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-12 -translate-y-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 2. SIDEBAR NAVIGATION */}
          <div className="hidden lg:block space-y-4 h-max sticky top-32">
            <h3 className="px-4 text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">Chapters</h3>
            <div className="bg-white p-4 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 space-y-2">
                {sections.map((s, i) => (
                    <button key={i} className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 text-slate-600 font-bold transition-all text-sm group">
                        {s.title} <ChevronRight size={16} className="text-slate-200 group-hover:text-emerald-500 transition-colors" />
                    </button>
                ))}
            </div>
            <div className="p-8 bg-indigo-600 rounded-[2.5rem] text-white shadow-xl shadow-indigo-200 relative overflow-hidden group">
                <ShieldCheck size={40} className="mb-4 opacity-50" />
                <p className="font-black text-lg leading-tight mb-2">Faculty Verified</p>
                <p className="text-xs text-indigo-100 font-medium opacity-80">This system meets Caleb University technical audit standards.</p>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
            </div>
          </div>

          {/* 3. MAIN DOCUMENTATION FEED */}
          <div className="lg:col-span-2 space-y-8">
            {sections.map((section, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 md:p-12 rounded-[3.5rem] border border-slate-100 shadow-sm group hover:shadow-xl transition-all duration-500"
              >
                <div className="flex items-center gap-6 mb-8">
                    <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center border border-slate-100 shadow-inner group-hover:scale-110 transition-transform duration-500">
                        {section.icon}
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none">{section.title}</h2>
                </div>
                <p className="text-lg text-slate-500 leading-[1.8] font-medium mb-8">
                    {section.content}
                </p>
                
                {/* Tech Stack Pills */}
                {index === 2 && (
                    <div className="flex flex-wrap gap-3 pt-6 border-t border-slate-50">
                        {['FastAPI', 'PostgreSQL', 'SQLAlchemy', 'JWT'].map(tech => (
                            <span key={tech} className="px-4 py-1.5 bg-slate-100 text-slate-500 rounded-full text-[10px] font-black uppercase tracking-widest">{tech}</span>
                        ))}
                    </div>
                )}
                {index === 1 && (
                    <div className="bg-slate-950 p-6 rounded-3xl overflow-hidden relative group/code">
                        <Terminal className="absolute top-4 right-4 text-white/10" size={40} />
                        <code className="text-emerald-400 text-xs font-mono block leading-relaxed">
                            # AI Model Inference Loop<br/>
                            prob = model.predict_proba(input_features)<br/>
                            risk_status = "AT_RISK" if prob[0][1] &lt; 0.5 else "ON_TRACK"
                        </code>
                    </div>
                )}
              </motion.div>
            ))}

            {/* 4. FOOTER CALL-TO-ACTION */}
            <div className="bg-slate-900 p-12 rounded-[4rem] text-center space-y-6 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-indigo-500 to-blue-500" />
                <h3 className="text-3xl font-black text-white tracking-tight">Need further clarity?</h3>
                <p className="text-slate-400 font-medium">Connect with our engineering support team for integration assistance.</p>
                <button className="bg-emerald-500 text-white px-10 py-4 rounded-2xl font-black shadow-xl shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all">
                    Open Support Hub
                </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Documentation;