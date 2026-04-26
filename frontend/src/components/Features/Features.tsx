import { motion, type Variants } from 'framer-motion';
import { AlertTriangle, TrendingUp, CheckCircle2, Route, Sparkles, LineChart } from 'lucide-react';

const Features = () => {
  const headerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const bentoVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section id="features" className="py-24 md:py-32 bg-slate-50 font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <motion.div 
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 shadow-sm border border-emerald-200">
            <Sparkles size={14} /> Core Capabilities
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tighter mb-6">
            Everything you need to <span className="text-emerald-500">predict success.</span>
          </h2>
          <p className="text-lg text-slate-500 font-medium">
            Powerful tools for both students and instructors, seamlessly integrated into one intelligent dashboard.
          </p>
        </motion.div>

        {/* Bento Box Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Early Warning System (Spans 2 columns on large screens) */}
          <motion.div 
            variants={bentoVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="lg:col-span-2 bg-slate-900 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group border border-slate-800 shadow-2xl"
          >
            {/* Abstract Background Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3" />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-14 h-14 bg-red-500/20 text-red-400 rounded-2xl flex items-center justify-center mb-8 border border-red-500/30">
                <AlertTriangle size={28} />
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-4 tracking-tight">AI Early Warning System</h3>
              <p className="text-slate-400 font-medium max-w-md mb-10">
                Instantly identify at-risk students based on engagement metrics, quiz scores, and login frequency before they fail.
              </p>
              
              {/* Fake UI Element */}
              <div className="mt-auto bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4 backdrop-blur-sm group-hover:-translate-y-2 transition-transform duration-500">
                <div className="flex items-center justify-between mb-3 border-b border-slate-700 pb-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Flagged Students</span>
                  <span className="text-xs font-black text-red-400 bg-red-400/10 px-2 py-1 rounded-lg">High Risk</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden">
                    <img src="https://i.pravatar.cc/150?img=47" alt="Student" className="w-full h-full object-cover opacity-80" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Sarah Jenkins</p>
                    <p className="text-[10px] text-slate-400">Engagement dropped by 40% this week</p>
                  </div>
                  <button className="ml-auto bg-white text-slate-900 text-xs font-bold px-4 py-2 rounded-xl hover:bg-emerald-400 transition-colors">
                    Intervene
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Automated Assessments */}
          <motion.div 
            variants={bentoVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group border border-slate-200 shadow-xl shadow-slate-200/40"
          >
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-8">
              <CheckCircle2 size={28} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Smart Grading</h3>
            <p className="text-slate-500 font-medium mb-8">
              Automated grading for quizzes and assignments with instant feedback generation.
            </p>
            
            {/* Fake UI */}
            <div className="space-y-3 mt-auto">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100 group-hover:scale-[1.02] transition-transform" style={{ transitionDelay: `${i * 100}ms` }}>
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <CheckCircle2 size={16} />
                  </div>
                  <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${100 - (i * 15)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card 3: Adaptive Learning Paths */}
          <motion.div 
            variants={bentoVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group border border-slate-200 shadow-xl shadow-slate-200/40"
          >
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-8">
              <Route size={28} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Adaptive Paths</h3>
            <p className="text-slate-500 font-medium mb-8">
              Content delivery tailors itself to individual student pace and comprehension levels.
            </p>
            
            {/* Fake UI Map */}
            <div className="relative h-24 mt-auto flex items-center justify-between px-2">
              <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2" />
              <div className="absolute top-1/2 left-0 w-2/3 h-1 bg-blue-500 -translate-y-1/2 group-hover:w-full transition-all duration-1000 ease-out" />
              
              <div className="relative z-10 w-6 h-6 rounded-full bg-blue-500 border-4 border-white shadow-md" />
              <div className="relative z-10 w-8 h-8 rounded-full bg-blue-500 border-4 border-white shadow-md flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-ping" />
              </div>
              <div className="relative z-10 w-6 h-6 rounded-full bg-slate-200 border-4 border-white" />
            </div>
          </motion.div>

          {/* Card 4: Real-time Analytics (Spans 2 columns) */}
          <motion.div 
            variants={bentoVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 bg-emerald-500 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group border border-emerald-400 shadow-xl shadow-emerald-200/50"
          >
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-emerald-400 rounded-full blur-[40px] group-hover:scale-150 transition-transform duration-700" />
            
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center h-full">
              <div className="flex-1 text-white">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-md text-white rounded-2xl flex items-center justify-center mb-8 border border-white/30">
                  <LineChart size={28} />
                </div>
                <h3 className="text-2xl md:text-3xl font-black mb-4 tracking-tight">Institutional Analytics</h3>
                <p className="text-emerald-50 font-medium mb-6">
                  Comprehensive reporting tools for administrators. Track course effectiveness, student retention, and institutional metrics in real-time.
                </p>
                <button className="bg-white text-emerald-700 font-black px-6 py-3 rounded-xl hover:bg-emerald-50 transition-colors flex items-center gap-2">
                  View Dashboard <TrendingUp size={18} />
                </button>
              </div>
              
              {/* Fake UI Chart */}
              <div className="flex-1 w-full bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20">
                <div className="flex items-end justify-between h-32 gap-2">
                  {[40, 70, 45, 90, 65, 80, 100].map((h, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className="w-full bg-white/80 rounded-t-lg group-hover:bg-white transition-colors"
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Features;