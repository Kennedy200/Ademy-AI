// Notice the "type" keyword added before Variants below
import { motion, type Variants } from 'framer-motion';
import { BrainCircuit, Target, Activity, ArrowUpRight } from 'lucide-react';

const About = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  const pillars = [
    {
      icon: <BrainCircuit size={28} />,
      title: "Predictive AI Models",
      description: "We don't just show grades. Our algorithms analyze learning patterns to predict academic outcomes and identify at-risk students before they fall behind.",
      color: "emerald"
    },
    {
      icon: <Activity size={28} />,
      title: "Real-Time Monitoring",
      description: "Continuous tracking of assignment submissions, quiz scores, and participation rates transformed into actionable insights for educators.",
      color: "blue"
    },
    {
      icon: <Target size={28} />,
      title: "Adaptive Learning",
      description: "Moving away from the 'one-size-fits-all' approach by recommending personalized learning resources tailored to individual student pacing.",
      color: "indigo"
    }
  ];

  return (
    <section id="about" className="py-24 md:py-32 bg-white relative overflow-hidden font-sans">
      
      {/* Background Subtle Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="absolute -right-64 top-20 w-96 h-96 bg-slate-50 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Top Split Section */}
        <div className="flex flex-col lg:flex-row gap-16 items-start mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex-1"
          >
            <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-600 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.25em] mb-6">
              About The Platform
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tighter">
              Beyond Traditional <br />
              <span className="text-slate-400">E-Learning.</span>
            </h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 lg:pt-12"
          >
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium mb-8">
              Despite the proliferation of e-learning platforms, many lack the comprehensive tools needed to provide actionable insights. 
              <strong className="text-slate-900 font-black"> Ademy bridges this gap.</strong> We transform raw educational data into meaningful, intelligent feedback to enhance teaching effectiveness and student success.
            </p>
          </motion.div>
        </div>

        {/* 3-Pillar Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {pillars.map((pillar, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300 group hover:-translate-y-2 relative overflow-hidden"
            >
              {/* Card Hover Gradient Background */}
              <div className={`absolute top-0 right-0 w-32 h-32 rounded-bl-full -z-10 translate-x-10 -translate-y-10 group-hover:translate-x-0 group-hover:-translate-y-0 transition-transform duration-500 ${
                pillar.color === 'emerald' ? 'bg-emerald-100/50' : 
                pillar.color === 'blue' ? 'bg-blue-100/50' : 'bg-indigo-100/50'
              }`} />
              
              <div className={`w-16 h-16 rounded-3xl flex items-center justify-center mb-8 shadow-sm transition-colors duration-300 ${
                pillar.color === 'emerald' ? 'bg-emerald-100 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white' : 
                pillar.color === 'blue' ? 'bg-blue-100 text-blue-600 group-hover:bg-blue-500 group-hover:text-white' : 
                'bg-indigo-100 text-indigo-600 group-hover:bg-indigo-500 group-hover:text-white'
              }`}>
                {pillar.icon}
              </div>
              
              <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">
                {pillar.title}
              </h3>
              
              <p className="text-slate-500 leading-relaxed font-medium">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default About;