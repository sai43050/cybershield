import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { learnTopics } from '../data/learnTopics';
import type { LearnTopic } from '../data/learnTopics';
import * as Icons from 'lucide-react';
import { Link } from 'react-router-dom';

// Preloaded modules if none exist in storage
const DEFAULT_COMPLETED = ['phishing', 'password-security', 'two-factor-auth'];

// ─── Simulations Database ─────────────────────────────────────────────────────
interface SimChoice {
  text: string;
  next: string;
}
interface SimStep {
  text: string;
  choices?: SimChoice[];
  status?: 'success' | 'fail';
  explanation?: string;
}
interface Simulation {
  id: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  description: string;
  steps: Record<string, SimStep>;
}

const simulations: Simulation[] = [
  {
    id: "ceo-invoice",
    title: "Mission: The CEO's Urgent Wire Transfer",
    difficulty: "Intermediate",
    category: "Social Engineering",
    description: "You receive an urgent late-Friday request from the CEO demanding a confidential payment to close a vendor contract. Success depends on your response choices.",
    steps: {
      start: {
        text: "It is Friday at 4:30 PM. Your email inbox pings. It's from 'Robert Vance <ceo.vance@company-support-hub.com>' with subject 'URGENT: Outstanding Vendor Settlement'. It says: 'Hey, I'm in a boarding terminal. Need you to settle invoice #48201 ($24,500) to our new service vendor immediately. Keep this confidential. Do it in 30 minutes.' What do you do?",
        choices: [
          { text: "Reply immediately to the email asking for confirmation and wiring details.", next: "reply_email" },
          { text: "Cross-check the email address and contact the CEO directly on his verified phone number.", next: "call_ceo" },
          { text: "Forward the email to the accounting group and execute the payment to avoid vendor delays.", next: "pay_immediately" }
        ]
      },
      reply_email: {
        text: "You reply to the email. The 'CEO' replies instantly: 'No time for bureaucracy. I am getting on a flight. Wire it to account 394029302-IN right away. I expect this completed before I land.' What is your next move?",
        choices: [
          { text: "Process the bank transfer immediately to show efficiency.", next: "hacked_pay" },
          { text: "Call the company CFO or finance directory using the internal staff phonebook to verify the transaction authorization.", next: "call_cfo" }
        ]
      },
      pay_immediately: {
        text: "You authorize the transfer of $24,500 from the company's ledger. On Monday morning, CEO Robert Vance enters the office and has no knowledge of any invoice. The email address was spoofed, and the funds are gone.",
        status: "fail",
        explanation: "FAILED: You fell for Business Email Compromise (BEC). Attackers often exploit late Friday afternoons, artificial urgency, and power dynamics to bypass payment verification rules."
      },
      hacked_pay: {
        text: "You transfer the $24,500. The transaction completes instantly. On Monday morning, you find out the CEO was actually in a planning meeting at the headquarters all weekend and never sent any email. The money is lost to overseas laundering accounts.",
        status: "fail",
        explanation: "FAILED: Business Email Compromise. Replied correspondence with the attacker's email only verifies it with the criminal. Out-of-band communication is critical."
      },
      call_ceo: {
        text: "You call the CEO on his personal phone number. He answers, surprised: 'I'm at home preparing for dinner. I haven't sent any emails. Forward that to the IT security desk immediately.' What is the result?",
        status: "success",
        explanation: "SUCCESS! (+100 XP) You prevented a Business Email Compromise (BEC) scam. Always verify out-of-band when dealing with urgent financial instructions from executives."
      },
      call_cfo: {
        text: "You call the CFO. The CFO checks the database: 'Invoice #48201 doesn't match any vendor. Good catch. Let's report this to the IT security desk.' You block the transaction.",
        status: "success",
        explanation: "SUCCESS! (+100 XP) You saved the company $24,500 by following proper validation channels. Well done!"
      }
    }
  },
  {
    id: "airport-wifi",
    title: "Mission: The Airport Wi-Fi Check-in",
    difficulty: "Beginner",
    category: "Network Security",
    description: "Your flight is delayed, and your laptop is low on mobile data. You need to make a quick flight seat upgrade purchase. How will you connect securely?",
    steps: {
      start: {
        text: "You are sitting at the boarding terminal. Your phone lists several Wi-Fi networks: 'AirPort_Free_HighSpeed', 'Official_Airport_Pass', and 'Boingo_Wireless_5G'. The 'AirPort_Free_HighSpeed' requires no login page or password. What do you do?",
        choices: [
          { text: "Connect to 'AirPort_Free_HighSpeed' immediately since it is fast and convenient.", next: "connect_open" },
          { text: "Connect using your mobile phone's cellular hotspot or ensure your secure VPN is fully active before browsing.", next: "use_secure" }
        ]
      },
      connect_open: {
        text: "You connect to 'AirPort_Free_HighSpeed'. You navigate to your airline page, but a popup tells you to re-verify your credit card credentials to buy the seat upgrade. What do you do?",
        choices: [
          { text: "Enter card details—the page looks identical to the airline checkout page.", next: "enter_card" },
          { text: "Immediately disconnect from the Wi-Fi network and check if the connection is encrypted.", next: "disconnect_wifi" }
        ]
      },
      enter_card: {
        text: "The network was a rogue 'Evil Twin' access point operated by an attacker sitting nearby. They sniffed your traffic, served a fake clone of the airline checkout page, and captured your CVV and credit card. Minutes later, your card gets charged $1,200.",
        status: "fail",
        explanation: "FAILED: Rogue Wi-Fi interception. Open Wi-Fi networks without encryption are easily hijacked by attackers executing Man-in-the-Middle (MitM) attacks."
      },
      disconnect_wifi: {
        text: "You disconnect. You double-check your browser and notice the URL lacked HTTPS and showed a 'Not Secure' warning. You saved your credentials from being sniffed.",
        status: "success",
        explanation: "SUCCESS! (+100 XP) Disconnecting prevented the credentials from being sent over an unencrypted, hijacked channel."
      },
      use_secure: {
        text: "You boot up your VPN client before making the transaction, or use your phone's cellular network. The connection is fully encrypted. Even if an attacker was hosting the network, your packets are unreadable.",
        status: "success",
        explanation: "SUCCESS! (+100 XP) Using a VPN or a dedicated cellular hotspot is the best protection against public Wi-Fi packet sniffing and Evil Twin attacks."
      }
    }
  }
];

// ─── Difficulty Badge ─────────────────────────────────────────────────────────
function DifficultyBadge({ level }: { level: string }) {
  const config: Record<string, { bg: string; text: string }> = {
    Beginner: { bg: 'bg-green-500/15 border-green-500/30', text: 'text-green-400' },
    Intermediate: { bg: 'bg-yellow-500/15 border-yellow-500/30', text: 'text-yellow-400' },
    Advanced: { bg: 'bg-red-500/15 border-red-500/30', text: 'text-red-400' },
  };
  const c = config[level] || config.Beginner;
  return (
    <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${c.bg} ${c.text}`}>
      {level}
    </span>
  );
}

// ─── Expanded Topic Card (Full Detail View) ───────────────────────────────────
function TopicDetail({ topic, onClose, onComplete, isAlreadyCompleted }: { topic: LearnTopic; onClose: () => void; onComplete: (id: string) => void; isAlreadyCompleted: boolean }) {
  const Icon = (Icons as any)[topic.icon] || Icons.Shield;
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [showQuizResults, setShowQuizResults] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 backdrop-blur-sm overflow-y-auto py-8 px-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-white/10"
        style={{ background: 'linear-gradient(180deg, #0d1117 0%, #0a0a14 100%)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative p-8 border-b border-white/10 bg-gradient-to-r from-cyber-primary/10 via-cyber-secondary/10 to-transparent">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
          >
            <Icons.X className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-cyber-primary/20 rounded-2xl">
              <Icon className="h-8 w-8 text-cyber-neon" />
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-white">{topic.title}</h2>
              <div className="flex items-center gap-3 mt-2 flex-wrap">
                <DifficultyBadge level={topic.difficulty} />
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Icons.Clock className="h-3 w-3" /> {topic.duration} read
                </span>
                {isAlreadyCompleted && (
                  <span className="text-xs font-bold text-cyber-neon flex items-center gap-1 bg-cyber-primary/10 px-2 py-0.5 rounded-full border border-cyber-primary/30">
                    <Icons.CheckCircle2 className="h-3.5 w-3.5" /> Completed
                  </span>
                )}
              </div>
            </div>
          </div>
          {/* Stats Row */}
          <div className="flex flex-wrap gap-3 mt-4">
            {topic.stats.map((stat, i) => (
              <div key={i} className="px-4 py-2 rounded-xl bg-black/40 border border-white/10">
                <span className="font-black text-cyber-neon text-lg">{stat.value}</span>
                <span className="text-gray-400 text-xs ml-2">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="p-8 space-y-10">
          {/* Explanation */}
          <section>
            <h3 className="text-lg font-bold text-cyber-primary flex items-center gap-2 mb-3">
              <Icons.Info className="h-5 w-5" /> What is it?
            </h3>
            <p className="text-gray-300 leading-relaxed">{topic.explanation}</p>
          </section>

          {/* How it Works */}
          <section>
            <h3 className="text-lg font-bold text-cyber-secondary flex items-center gap-2 mb-3">
              <Icons.Settings className="h-5 w-5" /> How It Works
            </h3>
            <div className="space-y-3">
              {topic.howItWorks.map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-cyber-secondary/20 border border-cyber-secondary/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-cyber-secondary">{i + 1}</span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Types / Variants */}
          <section>
            <h3 className="text-lg font-bold text-cyber-accent flex items-center gap-2 mb-3">
              <Icons.Layers className="h-5 w-5" /> Types & Variants
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {topic.typesOrVariants.map((t, i) => (
                <div key={i} className="p-4 bg-black/40 rounded-xl border border-white/5 hover:border-cyber-accent/30 transition-colors">
                  <p className="font-bold text-white text-sm mb-1">{t.name}</p>
                  <p className="text-gray-400 text-xs leading-relaxed">{t.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Real Life Examples */}
          <section>
            <h3 className="text-lg font-bold text-orange-400 flex items-center gap-2 mb-3">
              <Icons.BookOpen className="h-5 w-5" /> Real-Life Examples
            </h3>
            <div className="space-y-4">
              {topic.realLifeExamples.map((ex, i) => (
                <div key={i} className="p-5 bg-orange-500/5 border border-orange-500/20 rounded-xl">
                  <p className="font-bold text-orange-300 text-sm mb-2">{ex.title}</p>
                  <p className="text-gray-300 text-sm leading-relaxed italic">{ex.story}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Warning Signals */}
          <section>
            <h3 className="text-lg font-bold text-red-400 flex items-center gap-2 mb-3">
              <Icons.AlertTriangle className="h-5 w-5" /> Warning Signals
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {topic.warningSignals.map((w, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-gray-300 p-2 rounded-lg bg-red-500/5">
                  <Icons.AlertCircle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <span>{w}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Prevention */}
          <section>
            <h3 className="text-lg font-bold text-green-400 flex items-center gap-2 mb-3">
              <Icons.Shield className="h-5 w-5" /> Prevention & Protection
            </h3>
            <ul className="space-y-2">
              {topic.prevention.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                  <Icons.CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Do's and Don'ts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="p-5 bg-green-500/5 border border-green-500/20 rounded-xl">
              <h3 className="font-bold text-green-400 flex items-center gap-2 mb-3">
                <Icons.ThumbsUp className="h-5 w-5" /> Do's ✅
              </h3>
              <ul className="space-y-2">
                {topic.dos.map((d, i) => (
                  <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">✓</span> {d}
                  </li>
                ))}
              </ul>
            </section>
            <section className="p-5 bg-red-500/5 border border-red-500/20 rounded-xl">
              <h3 className="font-bold text-red-400 flex items-center gap-2 mb-3">
                <Icons.ThumbsDown className="h-5 w-5" /> Don'ts ❌
              </h3>
              <ul className="space-y-2">
                {topic.donts.map((d, i) => (
                  <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">✗</span> {d}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Module Quiz */}
          <section className="p-6 bg-cyber-primary/5 border border-cyber-primary/20 rounded-2xl">
            <h3 className="text-lg font-bold text-cyber-primary flex items-center gap-2 mb-4">
              <Icons.HelpCircle className="h-5 w-5" /> Quick Knowledge Check
            </h3>
            <div className="space-y-6">
              {topic.quiz.map((q, qi) => (
                <div key={qi}>
                  <p className="font-medium text-white text-sm mb-3">{qi + 1}. {q.question}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt, oi) => {
                      const isSelected = quizAnswers[qi] === oi;
                      const isCorrect = oi === q.answer;
                      let optClass = "p-3 rounded-xl border text-left text-sm transition-all cursor-pointer ";
                      if (showQuizResults) {
                        if (isCorrect) optClass += "border-green-500 bg-green-500/15 text-white";
                        else if (isSelected && !isCorrect) optClass += "border-red-500 bg-red-500/15 text-gray-300";
                        else optClass += "border-white/5 bg-black/20 text-gray-500";
                      } else {
                        optClass += isSelected
                          ? "border-cyber-primary bg-cyber-primary/15 text-white"
                          : "border-white/10 bg-black/20 text-gray-400 hover:border-white/30 hover:text-white";
                      }
                      return (
                        <button
                          key={oi}
                          onClick={() => { if (!showQuizResults) setQuizAnswers(p => ({ ...p, [qi]: oi })); }}
                          className={optClass}
                        >
                          <span className="font-bold mr-2 text-gray-500">{String.fromCharCode(65 + oi)}.</span>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => {
                setShowQuizResults(true);
                const numCorrect = topic.quiz.filter((q, i) => quizAnswers[i] === q.answer).length;
                if (numCorrect === topic.quiz.length) {
                  onComplete(topic.id);
                }
              }}
              disabled={Object.keys(quizAnswers).length < topic.quiz.length}
              className="mt-6 w-full py-3 rounded-xl bg-cyber-primary hover:bg-cyber-primary/80 disabled:opacity-30 disabled:cursor-not-allowed text-white font-bold transition-all"
            >
              {showQuizResults
                ? `Score: ${topic.quiz.filter((q, i) => quizAnswers[i] === q.answer).length} / ${topic.quiz.length}`
                : 'Check Answers'}
            </button>
            {showQuizResults && (
              <div className="mt-4 text-center">
                {topic.quiz.filter((q, i) => quizAnswers[i] === q.answer).length === topic.quiz.length ? (
                  <p className="text-green-400 font-bold text-sm">🎉 Perfect! Module completed. +150 XP rewarded!</p>
                ) : (
                  <p className="text-yellow-400 text-sm">Get all answers correct to complete the module and earn XP.</p>
                )}
              </div>
            )}
          </section>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Persona Paths (Demographic Guides) ───────────────────────────────────────
interface PersonaPath {
  id: string;
  role: string;
  icon: string;
  tagline: string;
  topThreats: { name: string; desc: string }[];
  checklist: string[];
  recommendedModules: string[];
}

const personaPaths: PersonaPath[] = [
  {
    id: "students",
    role: "Students & Teens",
    icon: "GraduationCap",
    tagline: "Secure your academic portals, protect social profiles, and avoid app store/game traps.",
    topThreats: [
      { name: "Fake Homework/Mod Apps", desc: "Study assistants or game modifications (e.g. Minecraft mods) that secretly package credentials-stealing spyware." },
      { name: "Cyberbullying & Blackmail", desc: "Harassment or extortion stemming from private photos shared in trust with online accounts." },
      { name: "Student Loan & Scholarship Scams", desc: "Fake academic grant letters demanding payment processing fees to register." }
    ],
    checklist: [
      "Never install app packages (.apks) shared over unofficial channels (Discord, Telegram).",
      "Set social media accounts to Private and block DMs from strangers.",
      "Compartmentalize accounts: use distinct emails for gaming and school files.",
      "Report extortion immediately to a trusted school authority or parent. Do not pay scammers."
    ],
    recommendedModules: ["social-media-safety", "mobile-safety", "password-security"]
  },
  {
    id: "parents",
    role: "Parents & Guardians",
    icon: "Home",
    tagline: "Protect your child's data footprints, secure home devices, and audit payments.",
    topThreats: [
      { name: "Sharenting Privacy Leaks", desc: "Oversharing child data (names, school times, birthdays) that brokers mine to create target profiles." },
      { name: "Predatory Game Chatrooms", desc: "Scammers posing as other children in lobbies (Roblox, Fortnite) to extract location details." },
      { name: "Accidental In-App Spend", desc: "Linked credit cards that let children spend large sums without PIN verification." }
    ],
    checklist: [
      "Enable age-appropriate filter profiles on all home tablets and screens.",
      "Require password prompts/biometrics for every payment transaction in App Stores.",
      "Educate kids to never share schedules or school uniform images on video logs.",
      "Update default passwords on baby monitors, routers, and smart speakers."
    ],
    recommendedModules: ["social-media-safety", "iot-cloud", "safe-online-shopping"]
  },
  {
    id: "seniors",
    role: "Senior Citizens",
    icon: "Heart",
    tagline: "Block tech support popups, safeguard pension assets, and verify voice call clones.",
    topThreats: [
      { name: "Tech Support Scams", desc: "Fake browser popups claiming 'VIRUS FOUND!' instructing you to call remote-access scammers." },
      { name: "Grandchild Voice Clones", desc: "AI-synthesized voice calls pleading for immediate money for a medical or bail crisis." },
      { name: "Utility Threat Impersonation", desc: "Threats to disconnect electricity, gas, or banking cards unless security OTPs are read over the phone." }
    ],
    checklist: [
      "If a computer page locks with an alert, restart your browser. Legitimate support never contacts you first.",
      "Never read codes (OTPs) sent to your mobile phone to anyone over the voice line.",
      "Create a family verification code word to test callers claiming to be relatives.",
      "Never download remote-control tools (AnyDesk, TeamViewer) at the request of an incoming caller."
    ],
    recommendedModules: ["ai-threats", "banking-fraud", "identity-theft"]
  },
  {
    id: "professionals",
    role: "Working Professionals",
    icon: "Briefcase",
    tagline: "Protect business networks, secure endpoints while traveling, and identify social manipulation.",
    topThreats: [
      { name: "Business Email Compromise (BEC)", desc: "Spoofed executive emails instructing finance workers to clear confidential transfers." },
      { name: "Unencrypted Public Network Sniffing", desc: "Accessing corporate assets from hotels/cafes without a VPN, allowing traffic harvesting." },
      { name: "Targeted LinkedIn Campaigns", desc: "Fake job recruiters sharing file links containing corporate data hijackers." }
    ],
    checklist: [
      "Always call your manager on their verified office extension to double-check wire transfers.",
      "Activate enterprise VPN tunnels on all shared Wi-Fi networks.",
      "Keep private data storage isolated: never mix work files on home tablets.",
      "Be skeptical of unsolicited PDFs or zip archives shared by recruiters."
    ],
    recommendedModules: ["social-engineering", "wifi-network-security", "two-factor-auth"]
  }
];

// ─── Main Learn Page ──────────────────────────────────────────────────────────
export default function Learn() {
  const [expandedTopic, setExpandedTopic] = useState<LearnTopic | null>(null);
  const [completedIds, setCompletedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('cybershield_completed_modules');
    return saved ? JSON.parse(saved) : DEFAULT_COMPLETED;
  });

  const [subTab, setSubTab] = useState<'modules' | 'simulations' | 'personas'>('modules');
  const [activeSimId, setActiveSimId] = useState<string>('ceo-invoice');
  const [activeSimStep, setActiveSimStep] = useState<string>('start');
  const [simCompleted, setSimCompleted] = useState<Record<string, boolean>>({});
  const [activePersonaId, setActivePersonaId] = useState<string>('students');

  const handleModuleComplete = (id: string) => {
    if (completedIds.includes(id)) return;
    const nextCompleted = [...completedIds, id];
    setCompletedIds(nextCompleted);
    localStorage.setItem('cybershield_completed_modules', JSON.stringify(nextCompleted));

    // Reward XP
    const currentXp = parseInt(localStorage.getItem('cybershield_xp') || '1340', 10);
    const nextXp = currentXp + 150;
    localStorage.setItem('cybershield_xp', nextXp.toString());

    // Log activity
    const activities = JSON.parse(localStorage.getItem('cybershield_activities') || '[]');
    const newActivity = {
      id: Date.now(),
      action: `Completed Module: ${learnTopics.find(t => t.id === id)?.title || id}`,
      date: 'Just now',
      xp: '+150 XP'
    };
    localStorage.setItem('cybershield_activities', JSON.stringify([newActivity, ...activities].slice(0, 5)));
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-primary/10 border border-cyber-primary/30 text-cyber-primary text-xs font-bold mb-4"
          >
            <Icons.BookOpen className="h-3.5 w-3.5" />
            {learnTopics.length} SECURITY MODULES
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold mb-4"
          >
            Learn <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-primary to-cyber-neon">Cyber Safety</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            Comprehensive, structured modules covering every aspect of digital safety. Click any module to explore in-depth knowledge.
          </motion.p>

          {/* Progress */}
          <div className="max-w-md mx-auto mt-6">
            <div className="flex justify-between text-xs text-gray-400 mb-2">
              <span>{completedIds.length} of {learnTopics.length} modules completed</span>
              <span>{Math.round((completedIds.length / learnTopics.length) * 100)}%</span>
            </div>
            <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(completedIds.length / learnTopics.length) * 100}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-gradient-to-r from-cyber-primary to-cyber-neon rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Sub Navigation Tabs */}
        <div className="flex justify-center gap-4 mb-10">
          <button
            onClick={() => setSubTab('modules')}
            className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all flex items-center gap-2 ${
              subTab === 'modules'
                ? 'bg-gradient-to-r from-cyber-primary to-cyber-secondary text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                : 'glass text-gray-400 hover:text-white'
            }`}
          >
            <Icons.BookOpen className="h-4 w-4" /> Learning Curriculum
          </button>
          <button
            onClick={() => setSubTab('simulations')}
            className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all flex items-center gap-2 ${
              subTab === 'simulations'
                ? 'bg-gradient-to-r from-cyber-primary to-cyber-secondary text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                : 'glass text-gray-400 hover:text-white'
            }`}
          >
            <Icons.Compass className="h-4 w-4" /> Simulation Missions
          </button>
          <button
            onClick={() => setSubTab('personas')}
            className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all flex items-center gap-2 ${
              subTab === 'personas'
                ? 'bg-gradient-to-r from-cyber-primary to-cyber-secondary text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                : 'glass text-gray-400 hover:text-white'
            }`}
          >
            <Icons.Users className="h-4 w-4" /> Targeted Guides
          </button>
        </div>

        {subTab === 'modules' && (
          /* Module Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {learnTopics.map((topic, i) => {
              const Icon = (Icons as any)[topic.icon] || Icons.Shield;
              const isCompleted = completedIds.includes(topic.id);

              return (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -4, transition: { duration: 0.15 } }}
                  onClick={() => setExpandedTopic(topic)}
                  className={`glass-dark rounded-2xl overflow-hidden flex flex-col border cursor-pointer transition-all duration-200 group ${
                    isCompleted
                      ? 'border-cyber-primary/30 hover:border-cyber-primary/60'
                      : 'border-white/5 hover:border-white/20'
                  }`}
                >
                  {/* Card Header */}
                  <div className="p-5 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl transition-colors ${isCompleted ? 'bg-cyber-primary/20 text-cyber-neon' : 'bg-white/5 text-gray-400 group-hover:bg-cyber-primary/10 group-hover:text-cyber-primary'}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h2 className="text-base font-bold leading-tight">{topic.title}</h2>
                        <div className="flex items-center gap-2 mt-1">
                          <DifficultyBadge level={topic.difficulty} />
                          <span className="text-[10px] text-gray-500">{topic.duration}</span>
                        </div>
                      </div>
                    </div>
                    {isCompleted && (
                      <span className="flex-shrink-0 p-1 rounded-full bg-cyber-primary/20 border border-cyber-primary/40">
                        <Icons.CheckCircle2 className="h-3.5 w-3.5 text-cyber-primary" />
                      </span>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex flex-col flex-grow">
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-4">{topic.explanation}</p>

                    {/* Stats mini */}
                    <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                      {topic.stats.slice(0, 2).map((s, si) => (
                        <div key={si} className="px-2 py-1 bg-black/30 rounded-lg border border-white/5">
                          <span className="text-cyber-neon font-bold text-xs">{s.value}</span>
                          <span className="text-gray-500 text-[10px] ml-1">{s.label.substring(0, 30)}...</span>
                        </div>
                      ))}
                    </div>

                    {/* Content Summary */}
                    <div className="flex items-center gap-3 text-[10px] text-gray-500 border-t border-white/5 pt-3">
                      <span className="flex items-center gap-1"><Icons.Layers className="h-3 w-3" />{topic.typesOrVariants.length} types</span>
                      <span className="flex items-center gap-1"><Icons.BookOpen className="h-3 w-3" />{topic.realLifeExamples.length} examples</span>
                      <span className="flex items-center gap-1"><Icons.HelpCircle className="h-3 w-3" />{topic.quiz.length} quiz Q's</span>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-5 py-3 border-t border-white/5 bg-black/20 flex items-center justify-between">
                    <span className="text-cyber-primary text-xs font-bold group-hover:text-cyber-neon transition-colors flex items-center gap-1">
                      Explore Module <Icons.ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {subTab === 'simulations' && (
          /* Simulations Panel */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Missions List */}
            <div className="space-y-4">
              <div className="p-4 border-b border-white/10 bg-white/[0.02] text-xs font-bold text-gray-400 uppercase tracking-wider rounded-t-xl">
                Active Simulation Missions
              </div>
              <div className="space-y-3">
                {simulations.map(sim => {
                  const isSelected = activeSimId === sim.id;
                  const isDone = simCompleted[sim.id];

                  return (
                    <button
                      key={sim.id}
                      onClick={() => {
                        setActiveSimId(sim.id);
                        setActiveSimStep('start');
                      }}
                      className={`w-full text-left p-4 rounded-xl border flex flex-col gap-1 transition-all ${
                        isSelected
                          ? 'bg-cyber-primary/10 border-cyber-neon shadow-[0_0_10px_rgba(34,211,238,0.15)]'
                          : 'glass-dark border-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className="flex justify-between items-center w-full">
                        <span className="font-bold text-sm text-white">{sim.title}</span>
                        {isDone && (
                          <span className="text-[10px] bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-0.5 rounded-full font-bold">
                            COMPLETED
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mt-1 line-clamp-2">{sim.description}</p>
                      <div className="flex items-center gap-2 mt-3 text-[10px] text-gray-500">
                        <span className="bg-white/5 px-2 py-0.5 rounded border border-white/5 text-gray-400 font-bold">{sim.difficulty.toUpperCase()}</span>
                        <span>•</span>
                        <span>{sim.category}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Mission Viewer */}
            {(() => {
              const sim = simulations.find(s => s.id === activeSimId)!;
              const step = sim.steps[activeSimStep] || sim.steps.start;

              return (
                <div className="lg:col-span-2 glass-dark border border-white/10 rounded-2xl p-6 flex flex-col justify-between min-h-[350px]">
                  <div>
                    <div className="border-b border-white/10 pb-4 mb-4 flex justify-between items-center">
                      <div>
                        <span className="text-[10px] font-bold text-cyber-neon tracking-wider uppercase">{sim.category}</span>
                        <h3 className="font-bold text-white text-lg mt-0.5">{sim.title}</h3>
                      </div>
                      <span className="text-xs text-gray-400">Step: {activeSimStep.toUpperCase()}</span>
                    </div>

                    <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line font-sans">
                      {step.text}
                    </p>
                  </div>

                  {/* Decisions Pane */}
                  <div className="mt-8 pt-4 border-t border-white/10">
                    {step.choices ? (
                      <div className="flex flex-col gap-2">
                        <span className="text-xs font-bold text-gray-400 mb-1">Make your decision:</span>
                        {step.choices.map((choice, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              setActiveSimStep(choice.next);
                              const targetStep = sim.steps[choice.next];
                              if (targetStep && targetStep.status === 'success') {
                                setSimCompleted(prev => ({ ...prev, [sim.id]: true }));
                                const curXp = parseInt(localStorage.getItem('cybershield_xp') || '1340', 10);
                                localStorage.setItem('cybershield_xp', (curXp + 100).toString());
                              }
                            }}
                            className="w-full text-left p-3 rounded-xl bg-black/40 border border-white/5 hover:border-cyber-primary/40 hover:bg-white/[0.02] text-xs text-gray-300 font-semibold transition-all flex items-center gap-3 group"
                          >
                            <span className="w-5 h-5 rounded-full bg-cyber-primary/20 text-cyber-neon border border-cyber-primary/30 flex items-center justify-center font-bold text-[10px] shrink-0 group-hover:bg-cyber-neon group-hover:text-black group-hover:border-cyber-neon transition-all">
                              {String.fromCharCode(65 + i)}
                            </span>
                            <span>{choice.text}</span>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-5 rounded-xl border ${
                          step.status === 'success'
                            ? 'bg-green-500/10 border-green-500/30 text-green-400'
                            : 'bg-red-500/10 border-red-500/30 text-red-400'
                        }`}
                      >
                        <p className="font-bold text-base mb-1">
                          {step.status === 'success' ? '✓ Mission Accomplished (+100 XP)' : '✗ Mission Compromised'}
                        </p>
                        <p className="text-xs text-gray-300 mt-1 leading-relaxed">{step.explanation}</p>
                        <button
                          onClick={() => setActiveSimStep('start')}
                          className="mt-4 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white font-bold text-xs transition-all border border-white/10 flex items-center gap-1"
                        >
                          <Icons.RotateCcw className="h-3.5 w-3.5" /> Restart Mission
                        </button>
                      </motion.div>
                    )}
                  </div>
                </div>
              );
            })()}
          </motion.div>
        )}

        {subTab === 'personas' && (
          /* Targeted Guides Panel */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-4 gap-6"
          >
            {/* Roles Sidebar */}
            <div className="flex flex-col gap-3">
              <div className="p-3 border-b border-white/10 bg-white/[0.02] text-xs font-bold text-gray-400 uppercase tracking-wider rounded-t-xl">
                Select Your Profile
              </div>
              {personaPaths.map(p => {
                const isSelected = activePersonaId === p.id;
                const Icon = (Icons as any)[p.icon] || Icons.Users;

                return (
                  <button
                    key={p.id}
                    onClick={() => setActivePersonaId(p.id)}
                    className={`w-full text-left p-4 rounded-xl border flex items-center gap-3 transition-all ${
                      isSelected
                        ? 'bg-cyber-primary/10 border-cyber-neon text-white shadow-[0_0_10px_rgba(34,211,238,0.15)]'
                        : 'glass-dark border-white/5 hover:border-white/20 text-gray-400 hover:text-white'
                    }`}
                  >
                    <Icon className="h-5 w-5 text-cyber-neon" />
                    <span className="font-bold text-xs">{p.role}</span>
                  </button>
                );
              })}
            </div>

            {/* Role Profile Viewer */}
            {(() => {
              const persona = personaPaths.find(p => p.id === activePersonaId)!;

              return (
                <div className="lg:col-span-3 space-y-6">
                  {/* Hero Box */}
                  <div className="glass-dark border border-white/10 p-6 rounded-2xl">
                    <span className="text-[10px] font-bold text-cyber-neon tracking-wider uppercase">Targeted Awareness Guide</span>
                    <h3 className="text-xl font-bold text-white mt-1 mb-2">{persona.role} Path</h3>
                    <p className="text-xs text-gray-300 leading-relaxed font-sans">{persona.tagline}</p>
                  </div>

                  {/* Body Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Top Threats */}
                    <div className="glass-dark border border-white/10 p-5 rounded-2xl space-y-4">
                      <h4 className="font-bold text-red-400 text-sm flex items-center gap-2 border-b border-white/5 pb-2">
                        <Icons.AlertTriangle className="h-4 w-4" /> Top Focus Threats
                      </h4>
                      <div className="space-y-3">
                        {persona.topThreats.map((threat, idx) => (
                          <div key={idx} className="p-3 bg-red-500/5 border border-red-500/10 rounded-xl">
                            <span className="font-bold text-xs text-white block mb-0.5">{threat.name}</span>
                            <span className="text-[11px] text-gray-400 leading-relaxed font-sans block">{threat.desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Checklist */}
                    <div className="glass-dark border border-white/10 p-5 rounded-2xl space-y-4">
                      <h4 className="font-bold text-green-400 text-sm flex items-center gap-2 border-b border-white/5 pb-2">
                        <Icons.CheckCircle2 className="h-4 w-4" /> Safety Checklist
                      </h4>
                      <div className="space-y-3.5">
                        {persona.checklist.map((item, idx) => (
                          <div key={idx} className="flex gap-2 text-[11px] leading-relaxed font-sans text-gray-300">
                            <span className="text-green-400 shrink-0 font-bold">✓</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Recommended Courses */}
                  <div className="glass-dark border border-white/10 p-5 rounded-2xl">
                    <h4 className="font-bold text-white text-sm flex items-center gap-2 mb-4">
                      <Icons.Layers className="h-4 w-4 text-cyber-neon" /> Recommended Learning Modules
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {persona.recommendedModules.map((modId) => {
                        const recTopic = learnTopics.find(t => t.id === modId);
                        if (!recTopic) return null;
                        const TopicIcon = (Icons as any)[recTopic.icon] || Icons.Shield;

                        return (
                          <button
                            key={modId}
                            onClick={() => {
                              setSubTab('modules');
                              setExpandedTopic(recTopic);
                            }}
                            className="p-3 border border-white/5 hover:border-cyber-primary/40 rounded-xl text-left bg-black/40 hover:bg-white/[0.02] flex items-center gap-3 transition-all group"
                          >
                            <div className="p-2 bg-cyber-primary/10 rounded-lg text-cyber-neon group-hover:bg-cyber-primary/25">
                              <TopicIcon className="h-4 w-4" />
                            </div>
                            <div>
                              <span className="font-bold text-[11px] text-white block line-clamp-1">{recTopic.title}</span>
                              <span className="text-[9px] text-gray-500 uppercase font-bold">{recTopic.difficulty}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="glass border border-cyber-primary/20 p-10 rounded-3xl max-w-3xl mx-auto relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyber-primary via-cyber-secondary to-cyber-neon" />
            <Icons.Award className="h-12 w-12 text-cyber-neon mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-3">Ready to Earn Your Certificate?</h2>
            <p className="text-gray-400 mb-6">Complete the comprehensive quiz and score 80%+ to receive your CyberShield Security Certificate.</p>
            <Link
              to="/quiz"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-cyber-primary to-cyber-secondary text-white font-bold shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all"
            >
              Launch Quiz <Icons.ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Expanded Detail Modal */}
      <AnimatePresence>
        {expandedTopic && (
          <TopicDetail
            topic={expandedTopic}
            onClose={() => setExpandedTopic(null)}
            onComplete={handleModuleComplete}
            isAlreadyCompleted={completedIds.includes(expandedTopic.id)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
