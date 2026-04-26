import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Trophy, Loader2, ArrowRight, Timer, Sparkles, X } from 'lucide-react';

const QuizPage = () => {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState(900); // 15:00

  const getAuthHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/modules/${moduleId}/quiz`, getAuthHeader());
        setQuestions(res.data);
      } catch (err) { 
        console.error(err); 
      } finally { 
        setLoading(false); 
      }
    };
    fetchQuiz();
  }, [moduleId]);

  useEffect(() => {
    if (timeLeft <= 0 || result) return;
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, result]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelect = (option: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentIdx] = option;
    setUserAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const res = await axios.post(`http://localhost:8000/api/modules/${moduleId}/quiz/submit`, userAnswers, getAuthHeader());
      setResult(res.data);
    } catch (err) { 
      console.error(err); 
    } finally { 
      setIsSubmitting(false); 
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center bg-slate-900"><Loader2 className="animate-spin text-emerald-500" size={48} /></div>;

  if (result) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-6">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white p-12 rounded-[3.5rem] shadow-2xl text-center max-w-md w-full relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500" />
        <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-lg">
          <Trophy size={48} />
        </div>
        <h2 className="text-4xl font-black text-slate-900 mb-2">Evaluation Complete!</h2>
        <p className="text-slate-500 font-medium mb-10 tracking-tight text-sm">Your AI Performance Model has been updated.</p>
        
        <div className="bg-slate-50 rounded-[2.5rem] p-10 mb-10 border border-slate-100">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Final Proficiency Score</p>
            <h3 className="text-6xl font-black text-slate-900">{result.score}%</h3>
            <p className="text-xs font-bold text-emerald-600 mt-4 uppercase tracking-widest">{result.correct} of {result.total} Correct Answers</p>
        </div>

        <button onClick={() => navigate('/dashboard')} className="w-full bg-slate-900 text-white py-5 rounded-3xl font-black text-lg shadow-2xl hover:bg-emerald-600 transition-all active:scale-95">
            View Dashboard
        </button>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans p-6 md:p-12 flex flex-col items-center overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="w-full max-w-4xl flex items-center justify-between mb-12 relative z-10">
        <div className="flex items-center gap-6">
            <Link to="/dashboard/courses" className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-white/10 transition-colors border border-white/10">
                <X size={20} />
            </Link>
            <div className="space-y-1">
                <div className="flex items-center gap-2 text-emerald-500 mb-1">
                    <Sparkles size={16} />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">AI Module Analysis</span>
                </div>
                <h2 className="text-2xl font-black tracking-tight">Active Evaluation</h2>
            </div>
        </div>
        <div className={`flex items-center gap-4 px-6 py-3 rounded-2xl border ${timeLeft < 60 ? 'bg-red-500/10 border-red-500/50 text-red-500 animate-pulse' : 'bg-white/5 border-white/10 text-emerald-400'}`}>
          <Timer size={20} />
          <span className="font-mono text-xl font-black tracking-widest">{formatTime(timeLeft)}</span>
        </div>
      </div>

      <div className="w-full max-w-4xl h-3 bg-white/5 rounded-full mb-20 overflow-hidden relative z-10 border border-white/5">
        <motion.div 
            animate={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
            className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.5)]" 
        />
      </div>

      <div className="w-full max-w-3xl relative z-10">
        <AnimatePresence mode="wait">
          <motion.div key={currentIdx} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} className="space-y-14">
            <div className="space-y-4">
                <p className="text-emerald-500 text-xs font-black uppercase tracking-widest px-2">Question {currentIdx + 1} of {questions.length}</p>
                <h3 className="text-3xl md:text-5xl font-black leading-[1.05] tracking-tighter">{questions[currentIdx].question}</h3>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {questions[currentIdx].options.map((opt: string) => (
                <button
                  key={opt} onClick={() => handleSelect(opt)}
                  className={`w-full text-left p-7 rounded-[2.5rem] border-2 transition-all font-bold text-lg md:text-xl flex items-center justify-between group ${
                    userAnswers[currentIdx] === opt 
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 shadow-2xl' 
                    : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:bg-white/[0.08]'
                  }`}
                >
                  <span className="flex-1 pr-4">{opt}</span>
                  <div className={`w-10 h-10 rounded-2xl border-2 flex items-center justify-center transition-all ${
                    userAnswers[currentIdx] === opt ? 'bg-emerald-500 border-emerald-500' : 'border-white/20'
                  }`}>
                    {userAnswers[currentIdx] === opt && <CheckCircle2 size={24} className="text-white" />}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-24 flex items-center justify-between border-t border-white/5 pt-12 mb-10">
          <button disabled={currentIdx === 0} onClick={() => setCurrentIdx(currentIdx - 1)} className="text-slate-500 font-black uppercase tracking-[0.2em] text-[10px] hover:text-white transition-colors disabled:opacity-0">Previous</button>
          
          {currentIdx === questions.length - 1 ? (
            <button onClick={handleSubmit} disabled={!userAnswers[currentIdx] || isSubmitting} className="bg-emerald-500 text-white px-14 py-5 rounded-[2rem] font-black text-xl shadow-2xl hover:bg-emerald-400 active:scale-95 transition-all flex items-center gap-4 disabled:opacity-50">
              {isSubmitting ? <Loader2 className="animate-spin" size={24} /> : <>Complete Evaluation <CheckCircle2 size={28} /></>}
            </button>
          ) : (
            <button disabled={!userAnswers[currentIdx]} onClick={() => setCurrentIdx(currentIdx + 1)} className="bg-white text-slate-950 px-14 py-5 rounded-[2rem] font-black text-xl flex items-center gap-4 hover:bg-emerald-400 hover:text-white transition-all shadow-2xl active:scale-95">
              Next Question <ArrowRight size={28} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;