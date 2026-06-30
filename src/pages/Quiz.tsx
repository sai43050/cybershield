import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Clock, Award, ChevronRight, RotateCcw, Layers, Zap, Download } from 'lucide-react';
import { quizQuestions } from '../data/quizQuestions';

export default function Quiz() {
  const [started, setStarted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(quizQuestions.map(q => q.category)));
    return ['all', ...cats];
  }, []);

  const filteredQuestions = useMemo(() => {
    if (selectedCategory === 'all') return quizQuestions;
    return quizQuestions.filter(q => q.category === selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    let timer: any;
    if (started && !isFinished && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && started && !isFinished) {
      setIsFinished(true);
    }
    return () => clearInterval(timer);
  }, [started, isFinished, timeLeft]);

  const handleStart = () => {
    setStarted(true);
    setScore(0);
    setCurrentQuestion(0);
    setTimeLeft(filteredQuestions.length * 45); // 45 seconds per question
    setIsFinished(false);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const handleAnswerSelect = (index: number) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
    if (index === filteredQuestions[currentQuestion].answer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < filteredQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setIsFinished(true);
      const finalScorePct = Math.round((score / filteredQuestions.length) * 100);
      localStorage.setItem('cybershield_avg_score', `${finalScorePct}%`);

      let xpReward = 50;
      if (finalScorePct >= 80) {
        localStorage.setItem('cybershield_passed_quiz', 'true');
        xpReward = 300; // Bonus for passing and earning certificate
      }

      const currentXp = parseInt(localStorage.getItem('cybershield_xp') || '1340', 10);
      localStorage.setItem('cybershield_xp', (currentXp + xpReward).toString());

      // Save activity log
      const activities = JSON.parse(localStorage.getItem('cybershield_activities') || '[]');
      const newActivity = {
        id: Date.now(),
        action: finalScorePct >= 80 ? `Earned CyberShield Certificate` : `Completed Quiz (${finalScorePct}%)`,
        date: 'Just now',
        icon: 'award',
        xp: `+${xpReward} XP`
      };
      localStorage.setItem('cybershield_activities', JSON.stringify([newActivity, ...activities].slice(0, 5)));
    }
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const pct = filteredQuestions.length > 0 ? Math.round((score / filteredQuestions.length) * 100) : 0;

  const downloadCertificate = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1000;
    canvas.height = 700;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background Gradient
    const grad = ctx.createLinearGradient(0, 0, 1000, 700);
    grad.addColorStop(0, '#0f172a');
    grad.addColorStop(1, '#020617');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1000, 700);

    // Dotted mesh overlay
    ctx.fillStyle = 'rgba(59, 130, 246, 0.08)';
    for (let x = 30; x < 970; x += 25) {
      for (let y = 30; y < 670; y += 25) {
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Double borders
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 10;
    ctx.strokeRect(35, 35, 930, 630);

    ctx.strokeStyle = '#22d3ee';
    ctx.lineWidth = 2;
    ctx.strokeRect(50, 50, 900, 600);

    // Decorative corner notches
    const corners = [
      { x: 50, y: 50, dx: 1, dy: 1 },
      { x: 950, y: 50, dx: -1, dy: 1 },
      { x: 50, y: 650, dx: 1, dy: -1 },
      { x: 950, y: 650, dx: -1, dy: -1 },
    ];
    ctx.fillStyle = '#22d3ee';
    corners.forEach(c => {
      ctx.fillRect(c.x, c.y, c.dx * 20, c.dy * 4);
      ctx.fillRect(c.x, c.y, c.dx * 4, c.dy * 20);
    });

    // Content headers
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('CYBERSHIELD ACADEMY', 500, 130);

    ctx.fillStyle = '#06b6d4';
    ctx.font = 'bold 16px monospace';
    ctx.fillText('VERIFIED CYBER AWARENESS COMPLIANCE', 500, 175);

    // Divider line
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(350, 200);
    ctx.lineTo(650, 200);
    ctx.stroke();

    // Body
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'italic 18px serif';
    ctx.fillText('This is proudly awarded to', 500, 250);

    ctx.fillStyle = '#22d3ee';
    ctx.font = 'bold 38px sans-serif';
    ctx.fillText('DEMO DEFENDER', 500, 315);

    ctx.fillStyle = '#e2e8f0';
    ctx.font = '16px sans-serif';
    ctx.fillText('for successful completion of the intensive security syllabus and passing the validation quiz', 500, 385);
    ctx.fillText(`with a performance rating of ${score} / ${filteredQuestions.length} (${pct}%)`, 500, 415);

    // Authenticity Stamp
    ctx.fillStyle = '#22c55e';
    ctx.font = 'bold 14px monospace';
    ctx.fillText('✓ SECURE COMPLIANT STATUS ACTIVE', 500, 480);

    // Issued metadata
    ctx.fillStyle = '#64748b';
    ctx.font = '12px monospace';
    const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    ctx.fillText(`DATE ISSUED: ${dateStr.toUpperCase()}`, 280, 560);

    const hash = 'CS-' + Math.random().toString(36).substring(2, 10).toUpperCase();
    ctx.fillText(`VALIDATION ID: ${hash}`, 720, 560);

    // Signatures
    ctx.fillStyle = '#3b82f6';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText('CyberShield Education Council', 500, 620);

    // Download trigger
    const link = document.createElement('a');
    link.download = `cybershield_certificate_${hash.toLowerCase()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  // ─── Start Screen ────────────────────────────────────────────────────────
  if (!started) {
    return (
      <div className="min-h-screen py-16 px-4 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full glass-dark p-10 rounded-3xl text-center border border-white/10 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyber-primary via-cyber-secondary to-cyber-neon" />
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-cyber-primary to-cyber-secondary rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
            <Shield className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Cyber Security Challenge</h1>
          <p className="text-gray-400 mb-8">
            {quizQuestions.length} questions across {categories.length - 1} categories.
            Score 80%+ to earn your <span className="text-cyber-neon font-bold">CyberShield Certificate</span>!
          </p>

          {/* Category Selector */}
          <div className="mb-8">
            <p className="text-sm text-gray-400 mb-3 flex items-center justify-center gap-2">
              <Layers className="h-4 w-4" /> Select a category or take the full quiz
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-cyber-primary text-white shadow-[0_0_10px_rgba(59,130,246,0.3)]'
                      : 'glass text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {cat === 'all' ? `All (${quizQuestions.length})` : `${cat} (${quizQuestions.filter(q => q.category === cat).length})`}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 text-sm text-gray-400 mb-8">
            <span className="flex items-center gap-1"><Zap className="h-4 w-4 text-cyber-neon" /> {filteredQuestions.length} questions</span>
            <span className="flex items-center gap-1"><Clock className="h-4 w-4 text-cyber-primary" /> {formatTime(filteredQuestions.length * 45)}</span>
            <span className="flex items-center gap-1"><Award className="h-4 w-4 text-yellow-400" /> 80% to pass</span>
          </div>

          <button
            onClick={handleStart}
            disabled={filteredQuestions.length === 0}
            className="px-10 py-4 rounded-full bg-gradient-to-r from-cyber-primary to-cyber-secondary text-white font-bold text-lg shadow-[0_0_25px_rgba(59,130,246,0.4)] hover:shadow-[0_0_35px_rgba(139,92,246,0.5)] transition-all disabled:opacity-40"
          >
            Start Quiz
          </button>
        </motion.div>
      </div>
    );
  }

  // ─── Results Screen ──────────────────────────────────────────────────────
  if (isFinished) {
    const passed = pct >= 80;
    return (
      <div className="min-h-screen py-16 px-4 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl w-full glass-dark p-10 rounded-3xl text-center border border-white/10 relative overflow-hidden"
        >
          {passed && <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 via-cyber-primary to-cyber-neon" />}

          <div className="mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-6" style={{ background: passed ? 'linear-gradient(135deg, rgba(34,211,238,0.2), rgba(59,130,246,0.2))' : 'rgba(239,68,68,0.1)' }}>
            {passed ? <Award className="h-14 w-14 text-yellow-400" /> : <Shield className="h-14 w-14 text-red-400" />}
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-2">{passed ? "Congratulations! 🎉" : "Keep Learning!"}</h2>
          <p className="text-xl text-gray-300 mb-2">You scored <span className="text-cyber-neon font-bold">{score}</span> out of <span className="font-bold">{filteredQuestions.length}</span></p>
          <p className={`text-lg font-bold mb-8 ${passed ? 'text-green-400' : 'text-red-400'}`}>{pct}% correct</p>

          {passed ? (
            <div className="bg-black/40 p-8 rounded-2xl border border-cyber-primary/30 mb-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyber-primary/5 to-cyber-secondary/5" />
              <div className="relative">
                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.1 }}>
                      <Award className="h-6 w-6 text-yellow-400" />
                    </motion.div>
                  ))}
                </div>
                <h3 className="text-2xl font-bold text-cyber-neon mb-2">Certificate of Achievement</h3>
                <p className="text-gray-400 mb-4">This certifies completion of the CyberShield Security Awareness Challenge</p>
                <div className="inline-block px-6 py-2 border-2 border-cyber-primary text-cyber-primary rounded-full font-bold">
                  Cyber Resilient ✓
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-red-500/10 p-6 rounded-2xl border border-red-500/30 mb-8">
              <p className="text-red-200">You need at least 80% to earn the certificate. Review the <a href="/learn" className="text-cyber-neon underline">Learn modules</a> and try again!</p>
            </div>
          )}

          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => { setStarted(false); setSelectedCategory('all'); }}
              className="px-6 py-3 rounded-xl glass hover:bg-white/10 flex items-center gap-2 font-bold transition-all"
            >
              <RotateCcw className="h-5 w-5" /> Retake Quiz
            </button>
            {passed && (
              <button
                onClick={downloadCertificate}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyber-primary to-cyber-secondary hover:opacity-90 flex items-center gap-2 font-bold transition-all text-white shadow-[0_0_15px_rgba(59,130,246,0.4)]"
              >
                <Download className="h-5 w-5" /> Download Certificate (PNG)
              </button>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  // ─── Question Screen ─────────────────────────────────────────────────────
  const question = filteredQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / filteredQuestions.length) * 100;

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <span className="glass px-3 py-1.5 rounded-lg font-bold text-sm text-cyber-neon">
              {currentQuestion + 1} / {filteredQuestions.length}
            </span>
            <span className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded-full">{question.category}</span>
          </div>
          <div className={`glass px-3 py-1.5 rounded-lg font-bold text-sm flex items-center gap-2 ${timeLeft < 60 ? 'text-red-400 animate-pulse' : 'text-gray-300'}`}>
            <Clock className="h-4 w-4" /> {formatTime(timeLeft)}
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-white/10 rounded-full mb-6 overflow-hidden">
          <motion.div
            animate={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-cyber-primary to-cyber-neon rounded-full"
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass-dark p-8 rounded-2xl border border-white/10"
          >
            <h2 className="text-xl md:text-2xl font-bold mb-8 leading-relaxed">{question.question}</h2>

            <div className="space-y-3 mb-8">
              {question.options.map((option, idx) => {
                let btnClass = "w-full text-left p-4 rounded-xl border transition-all ";
                if (!showExplanation) {
                  btnClass += selectedAnswer === idx
                    ? "border-cyber-primary bg-cyber-primary/15 text-white"
                    : "border-white/10 hover:border-white/30 hover:bg-white/5 bg-black/40 text-gray-300";
                } else {
                  if (idx === question.answer) btnClass += "border-green-500 bg-green-500/15 text-white";
                  else if (idx === selectedAnswer) btnClass += "border-red-500 bg-red-500/15 text-gray-300";
                  else btnClass += "border-white/5 bg-black/40 opacity-40 text-gray-500";
                }
                return (
                  <button key={idx} onClick={() => handleAnswerSelect(idx)} disabled={showExplanation} className={btnClass}>
                    <span className="font-bold mr-3 text-gray-500">{String.fromCharCode(65 + idx)}.</span>
                    {option}
                  </button>
                );
              })}
            </div>

            <AnimatePresence>
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-cyber-primary/10 border border-cyber-primary/30 p-5 rounded-xl mb-6"
                >
                  <p className="text-sm font-bold text-cyber-primary mb-1">
                    {selectedAnswer === question.answer ? '✅ Correct!' : '❌ Incorrect'}
                  </p>
                  <p className="text-gray-300 text-sm leading-relaxed">{question.explanation}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">Score: <span className="text-cyber-neon font-bold">{score}</span></p>
              {showExplanation && (
                <button
                  onClick={handleNext}
                  className="px-6 py-3 bg-gradient-to-r from-cyber-primary to-cyber-secondary rounded-xl font-bold flex items-center gap-2 text-white shadow-[0_0_10px_rgba(59,130,246,0.3)] hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all"
                >
                  {currentQuestion < filteredQuestions.length - 1 ? 'Next' : 'Finish'} <ChevronRight className="h-5 w-5" />
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
