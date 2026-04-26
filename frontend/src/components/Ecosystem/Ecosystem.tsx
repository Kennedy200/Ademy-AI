import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { User, GraduationCap, Building2, CheckCircle2, TrendingUp, AlertCircle } from 'lucide-react';

const Ecosystem = () => {
  const [activeTab, setActiveTab] = useState(0);

  const roles = [
    {
      id: 'students',
      tabTitle: 'For Students',
      icon: <User size={20} />,
      title: 'Take control of your learning journey.',
      description: 'A flexible, accessible, and personalized learning environment that adapts to your individual needs and pace. Get real-time feedback and actionable insights.',
      color: 'emerald',
      features: ['Personalized Learning Paths', 'Real-time Performance Insights', 'Peer Collaboration'],
      mockup: (
        <div className="space-y-4">
          <div className="flex justify-between items-end border-b border-slate-100 pb-4">
            <div>
              <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Current Standing</p>
              <p className="text-3xl font-black text-slate-900">Top 12%</p>
            </div>
            <div className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-lg flex items-center gap-1">
              <TrendingUp size={14} /> +4% this week
            </div>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <p className="text-xs font-bold text-slate-500 mb-2">Next Recommended Module</p>
            <div className="flex items-center justify-between">
              <p className="text-sm font-black text-slate-900">Advanced Data Structures</p>
              <button className="bg-emerald-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg">Start</button>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'educators',
      tabTitle: 'For Instructors',
      icon: <GraduationCap size={20} />,
      title: 'Focus efforts where they matter most.',
      description: 'A powerful tool for course delivery and assessment. Benefit from automated grading, comprehensive analytics, and early warning systems.',
      color: 'blue',
      features: ['Automated Grading System', 'At-Risk Student Identification', 'Curriculum Analytics'],
      mockup: (
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-100 p-4 rounded-2xl">
            <div className="flex items-center gap-2 text-red-600 mb-2">
              <AlertCircle size={16} />
              <p className="text-xs font-black uppercase tracking-widest">Early Warning Triggered</p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-red-200" />
                <p className="text-sm font-bold text-slate-900">2 Students At-Risk</p>
              </div>
              <button className="text-xs font-bold text-red-600 hover:text-red-700 underline">Review</button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <p className="text-[10px] font-bold text-slate-400">Class Average</p>
              <p className="text-xl font-black text-slate-900">76.4%</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <p className="text-[10px] font-bold text-slate-400">Ungraded</p>
              <p className="text-xl font-black text-slate-900">14</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'institutions',
      tabTitle: 'For Institutions',
      icon: <Building2 size={20} />,
      title: 'Drive evidence-based improvements.',
      description: 'Equip administrators with data-driven insights for quality assurance, strategic planning, and optimal resource allocation.',
      color: 'indigo',
      features: ['Program Effectiveness Reports', 'Student Retention Analytics', 'Resource Allocation Data'],
      mockup: (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-black text-slate-900">Institutional Health</p>
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>
          <div className="space-y-3">
            {[
              { label: 'Overall Retention', value: '94%', color: 'bg-emerald-500' },
              { label: 'Course Completion', value: '88%', color: 'bg-indigo-500' }
            ].map((stat, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-500">{stat.label}</span>
                  <span className="text-slate-900">{stat.value}</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: stat.value }}
                    transition={{ duration: 1 }}
                    className={`h-full ${stat.color} rounded-full`} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }
  ];

  const contentVariants: Variants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
  };

  return (
    <section className="py-24 md:py-32 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tighter mb-6">
            Empowering the entire <br />
            <span className="text-slate-400">educational ecosystem.</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          
          {/* Left Side - Interactive Tabs */}
          <div className="w-full lg:w-1/3 flex flex-col gap-4">
            {roles.map((role, index) => {
              const isActive = activeTab === index;
              return (
                <button
                  key={role.id}
                  onClick={() => setActiveTab(index)}
                  className={`relative flex items-center gap-4 p-5 rounded-3xl transition-all duration-300 text-left overflow-hidden ${
                    isActive 
                      ? 'bg-slate-900 text-white shadow-xl shadow-slate-200 border-transparent' 
                      : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-100 hover:text-slate-900'
                  }`}
                >
                  {/* Active Indicator Glow */}
                  {isActive && (
                    <motion.div 
                      layoutId="activeTabGlow"
                      className={`absolute right-0 top-1/2 -translate-y-1/2 w-24 h-24 blur-[40px] rounded-full opacity-50 ${
                        role.color === 'emerald' ? 'bg-emerald-500' : role.color === 'blue' ? 'bg-blue-500' : 'bg-indigo-500'
                      }`}
                    />
                  )}
                  
                  <div className={`relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                    isActive 
                      ? 'bg-white/10 text-white' 
                      : 'bg-white text-slate-400 shadow-sm'
                  }`}>
                    {role.icon}
                  </div>
                  <span className="relative z-10 font-black text-lg tracking-tight">{role.tabTitle}</span>
                </button>
              );
            })}
          </div>

          {/* Right Side - Dynamic Content Area */}
          <div className="w-full lg:w-2/3">
            <div className="bg-slate-50 rounded-[3rem] p-8 md:p-12 border border-slate-100 shadow-2xl shadow-slate-200/50 min-h-[450px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                >
                  {/* Dynamic Text */}
                  <div>
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 ${
                      roles[activeTab].color === 'emerald' ? 'bg-emerald-100 text-emerald-700' :
                      roles[activeTab].color === 'blue' ? 'bg-blue-100 text-blue-700' :
                      'bg-indigo-100 text-indigo-700'
                    }`}>
                      {roles[activeTab].tabTitle}
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight leading-tight">
                      {roles[activeTab].title}
                    </h3>
                    <p className="text-slate-500 font-medium mb-8 leading-relaxed">
                      {roles[activeTab].description}
                    </p>
                    <ul className="space-y-4">
                      {roles[activeTab].features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                          <CheckCircle2 size={18} className={`text-${roles[activeTab].color}-500`} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Dynamic Mockup UI */}
                  <div className="bg-white rounded-[2rem] p-6 shadow-xl border border-slate-100 relative">
                    <div className="absolute top-4 right-4 flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-slate-200" />
                      <div className="w-2 h-2 rounded-full bg-slate-200" />
                      <div className="w-2 h-2 rounded-full bg-slate-200" />
                    </div>
                    <div className="mt-4">
                      {roles[activeTab].mockup}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Ecosystem;