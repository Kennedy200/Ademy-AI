import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Zap, Mail } from 'lucide-react';

const CTA = () => {
  return (
    <footer className="relative bg-slate-50 pt-32 pb-12 overflow-hidden font-sans border-t border-slate-200/50">
      
      {/* Background Mesh Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-emerald-200/40 rounded-full blur-[100px]" />
        <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-blue-200/40 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Massive Floating CTA Card */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-slate-900 rounded-[3rem] p-8 md:p-16 lg:p-20 relative overflow-hidden mb-24 shadow-2xl shadow-slate-900/20"
        >
          {/* Inner Glows for the dark card */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/3" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
            
            <div className="flex-1 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 text-emerald-300 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                <Zap size={16} className="text-emerald-400" /> Ready to deploy
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tighter mb-6">
                Transform your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">
                  learning outcomes.
                </span>
              </h2>
              <p className="text-lg text-slate-400 font-medium">
                Join institutions that are already using Ademy's predictive AI to monitor performance and guarantee academic success.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <button className="bg-emerald-500 text-white px-8 py-5 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-emerald-400 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/30">
                Request Access <ArrowRight size={20} />
              </button>
              <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-5 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-white/20 transition-all active:scale-95">
                View Documentation
              </button>
            </div>

          </div>

          {/* Mini Trust Badges */}
          <div className="relative z-10 mt-16 pt-8 border-t border-white/10 flex flex-wrap justify-center lg:justify-start gap-8">
            <div className="flex items-center gap-2 text-slate-400 text-sm font-bold">
              <ShieldCheck size={18} className="text-emerald-400" /> Enterprise Security
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-sm font-bold">
              <ShieldCheck size={18} className="text-emerald-400" /> GDPR Compliant
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-sm font-bold">
              <ShieldCheck size={18} className="text-emerald-400" /> 99.9% Uptime SLA
            </div>
          </div>
        </motion.div>

        {/* Minimal Footer Layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-slate-200">
                <img src="/logo.png" alt="Ademy Logo" className="w-full h-full object-cover" />
              </div>
              <span className="text-xl font-black tracking-tighter text-slate-900">Ademy.</span>
            </div>
            <p className="text-slate-500 font-medium leading-relaxed max-w-sm mb-6">
              An intelligent, web-based e-learning system designed to monitor, predict, and enhance academic performance.
            </p>
            <div className="flex items-center gap-4 text-slate-400">
              <a href="#" className="hover:text-emerald-600 transition-colors"><Mail size={20} /></a>
            </div>
          </div>

          {/* Link Columns */}
          <div>
            <h4 className="text-slate-900 font-black mb-6 uppercase tracking-widest text-xs">Platform</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-slate-500 font-medium hover:text-emerald-600 transition-colors">Students</a></li>
              <li><a href="#" className="text-slate-500 font-medium hover:text-emerald-600 transition-colors">Instructors</a></li>
              <li><a href="#" className="text-slate-500 font-medium hover:text-emerald-600 transition-colors">Institutions</a></li>
              <li><a href="#" className="text-slate-500 font-medium hover:text-emerald-600 transition-colors">Analytics</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 font-black mb-6 uppercase tracking-widest text-xs">Resources</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-slate-500 font-medium hover:text-emerald-600 transition-colors">Documentation</a></li>
              <li><a href="#" className="text-slate-500 font-medium hover:text-emerald-600 transition-colors">API Reference</a></li>
              <li><a href="#" className="text-slate-500 font-medium hover:text-emerald-600 transition-colors">Blog</a></li>
              <li><a href="#" className="text-slate-500 font-medium hover:text-emerald-600 transition-colors">Case Studies</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 font-black mb-6 uppercase tracking-widest text-xs">Legal</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-slate-500 font-medium hover:text-emerald-600 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-500 font-medium hover:text-emerald-600 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-slate-500 font-medium hover:text-emerald-600 transition-colors">Cookie Policy</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-medium text-slate-400">
          <p>© {new Date().getFullYear()} Ademy Platform. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built for Academic Excellence
          </p>
        </div>

      </div>
    </footer>
  );
};

export default CTA;