import { motion, type Variants } from 'framer-motion';
import { Database, Cpu, BrainCircuit, Activity } from 'lucide-react';

const Workflow = () => {
  const steps = [
    {
      icon: <Database size={24} />,
      title: "Data Ingestion",
      description: "The system silently collects engagement metrics: time spent on modules, quiz scores, and login frequencies without disrupting the learning experience.",
      stat: "50+ Data Points Tracked",
      color: "emerald"
    },
    {
      icon: <Cpu size={24} />,
      title: "Pattern Processing",
      description: "Raw data is cleaned and structured. Our backend architecture processes these metrics in real-time to establish a baseline for every individual student.",
      stat: "Real-time Processing",
      color: "blue"
    },
    {
      icon: <BrainCircuit size={24} />,
      title: "AI Prediction Engine",
      description: "Machine learning models compare current student behavior against historical datasets to predict academic outcomes and identify risk factors.",
      stat: "92.4% Prediction Accuracy",
      color: "indigo"
    },
    {
      icon: <Activity size={24} />,
      title: "Actionable Intervention",
      description: "The system triggers early warning alerts to educators and automatically suggests personalized, adaptive learning paths to the struggling student.",
      stat: "Automated Workflows",
      color: "emerald"
    }
  ];

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="py-24 md:py-32 bg-slate-900 relative overflow-hidden font-sans">
      
      {/* Abstract Tech Background Elements */}
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <motion.div 
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-3xl mx-auto mb-20 md:mb-32"
        >
          <div className="inline-flex items-center gap-2 bg-slate-800 text-slate-300 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-slate-700">
            System Architecture
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white leading-[1.1] tracking-tighter mb-6">
            From raw data to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
              academic success.
            </span>
          </h2>
          <p className="text-lg text-slate-400 font-medium">
            How our intelligent engine processes millions of data points to predict and improve learning outcomes.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative max-w-5xl mx-auto">
          
          {/* Central Line (Desktop) / Left Line (Mobile) */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-slate-800 rounded-full md:-translate-x-1/2 overflow-hidden">
            <motion.div 
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="w-full bg-gradient-to-b from-emerald-500 via-blue-500 to-indigo-500"
            />
          </div>

          {/* Timeline Steps */}
          <div className="space-y-12 md:space-y-24">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <div key={index} className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Timeline Node (Icon) */}
                  <div className="absolute left-6 md:left-1/2 w-12 h-12 bg-slate-900 rounded-full border-4 border-slate-800 flex items-center justify-center md:-translate-x-1/2 -translate-x-1/2 z-10">
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3, type: "spring" }}
                      className={`w-full h-full rounded-full flex items-center justify-center ${
                        step.color === 'emerald' ? 'bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.4)]' :
                        step.color === 'blue' ? 'bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.4)]' :
                        'bg-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.4)]'
                      } text-white`}
                    >
                      {step.icon}
                    </motion.div>
                  </div>

                  {/* Empty space for alternating layout on desktop */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Content Card */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-full pl-16 md:pl-0 md:w-1/2"
                  >
                    <div className="bg-slate-800/50 backdrop-blur-md p-8 rounded-[2rem] border border-slate-700/50 hover:bg-slate-800 hover:border-slate-600 transition-all duration-300 group">
                      <div className={`text-[10px] font-black uppercase tracking-widest mb-4 ${
                        step.color === 'emerald' ? 'text-emerald-400' :
                        step.color === 'blue' ? 'text-blue-400' : 'text-indigo-400'
                      }`}>
                        Phase 0{index + 1}
                      </div>
                      
                      <h3 className="text-2xl font-black text-white mb-4 tracking-tight">
                        {step.title}
                      </h3>
                      
                      <p className="text-slate-400 leading-relaxed font-medium mb-6">
                        {step.description}
                      </p>

                      <div className="inline-flex items-center gap-2 bg-slate-900/80 px-4 py-2 rounded-xl text-xs font-bold text-slate-300 border border-slate-700">
                        <div className={`w-2 h-2 rounded-full ${
                          step.color === 'emerald' ? 'bg-emerald-500' :
                          step.color === 'blue' ? 'bg-blue-500' : 'bg-indigo-500'
                        } animate-pulse`} />
                        {step.stat}
                      </div>
                    </div>
                  </motion.div>

                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Workflow;