import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Key, Search, AlertTriangle, CheckCircle, XCircle, Copy, RefreshCw, Eye, EyeOff, Mail, Smartphone } from 'lucide-react';
import zxcvbn from 'zxcvbn';

// ─── Breach Database (simulated) ─────────────────────────────────────────────
const breachDatabase: Record<string, { service: string; year: number; data: string[]; severity: 'low' | 'medium' | 'high' }[]> = {
  'test@gmail.com': [
    { service: 'Adobe', year: 2013, data: ['Email', 'Password', 'Username'], severity: 'high' },
    { service: 'LinkedIn', year: 2016, data: ['Email', 'Password Hash'], severity: 'medium' },
  ],
  'demo@yahoo.com': [
    { service: 'Yahoo', year: 2016, data: ['Email', 'Phone', 'Password'], severity: 'high' },
  ],
  'user@example.com': [
    { service: 'Canva', year: 2019, data: ['Email', 'Username', 'City'], severity: 'low' },
    { service: 'Zynga', year: 2019, data: ['Email', 'Password Hash', 'Phone'], severity: 'medium' },
    { service: 'Twitter', year: 2022, data: ['Email', 'Phone'], severity: 'low' },
  ],
};

// ─── Password Generator ───────────────────────────────────────────────────────
const CHARS = {
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lower: 'abcdefghijklmnopqrstuvwxyz',
  digits: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
};
function generatePassword(length = 20): string {
  const all = CHARS.upper + CHARS.lower + CHARS.digits + CHARS.symbols;
  let pwd = [
    CHARS.upper[Math.floor(Math.random() * CHARS.upper.length)],
    CHARS.lower[Math.floor(Math.random() * CHARS.lower.length)],
    CHARS.digits[Math.floor(Math.random() * CHARS.digits.length)],
    CHARS.symbols[Math.floor(Math.random() * CHARS.symbols.length)],
  ];
  for (let i = pwd.length; i < length; i++) {
    pwd.push(all[Math.floor(Math.random() * all.length)]);
  }
  return pwd.sort(() => Math.random() - 0.5).join('');
}

// ─── Scam Detection Engine ────────────────────────────────────────────────────
type RiskLevel = 'safe' | 'low' | 'medium' | 'high';
interface ScamFlag { label: string; severity: RiskLevel; description: string }

function analyzeScam(input: string): { risk: RiskLevel; flags: ScamFlag[]; score: number } {
  const flags: ScamFlag[] = [];


  if (/https?:\/\//i.test(input) && !/https:\/\//i.test(input)) {
    flags.push({ label: 'HTTP (Not HTTPS)', severity: 'high', description: 'The link is unencrypted and insecure.' });
  }
  if (/\b(urgent|immediately|act now|limited time|expires|suspended|verify now|confirm now)\b/i.test(input)) {
    flags.push({ label: 'False Urgency', severity: 'high', description: 'Creates panic to bypass rational thinking.' });
  }
  if (/\b(otp|pin|password|cvv|account number|aadhaar)\b/i.test(input)) {
    flags.push({ label: 'Credential Request', severity: 'high', description: 'Legitimate services never ask for passwords or OTPs.' });
  }
  if (/\b(won|winner|lottery|prize|claim|reward|gift card|bitcoin|crypto)\b/i.test(input)) {
    flags.push({ label: 'Too-Good-To-Be-True Offer', severity: 'medium', description: 'Classic bait to lure victims.' });
  }
  if (/\b(bit\.ly|tinyurl|goo\.gl|t\.co|rb\.gy|short\.link)\b/i.test(input)) {
    flags.push({ label: 'Shortened URL', severity: 'medium', description: 'Masks the real destination of the link.' });
  }
  if (/\.xyz|\.top|\.click|\.loan|\.work|\.gq|\.ml|\.cf|\.tk/i.test(input)) {
    flags.push({ label: 'Suspicious Domain TLD', severity: 'medium', description: 'These domain extensions are commonly used in phishing.' });
  }
  if (/paypai|g00gle|amaz0n|netf1ix|m1crosoft|facebok/i.test(input)) {
    flags.push({ label: 'Typosquatting', severity: 'high', description: 'Domain mimics a well-known brand with subtle misspellings.' });
  }
  if (/\b(dear customer|dear user|valued member)\b/i.test(input)) {
    flags.push({ label: 'Generic Greeting', severity: 'low', description: 'Real companies use your name, not generic salutations.' });
  }

  const score = flags.reduce((sum, f) => {
    return sum + (f.severity === 'high' ? 40 : f.severity === 'medium' ? 20 : 10);
  }, 0);

  let risk: RiskLevel = 'safe';
  if (score >= 60) risk = 'high';
  else if (score >= 30) risk = 'medium';
  else if (score > 0) risk = 'low';

  return { risk, flags, score: Math.min(score, 100) };
}

// ─── Strength Meter ───────────────────────────────────────────────────────────
const strengthConfig = [
  { label: 'Very Weak', color: 'bg-red-500', text: 'text-red-500' },
  { label: 'Weak', color: 'bg-orange-500', text: 'text-orange-500' },
  { label: 'Fair', color: 'bg-yellow-500', text: 'text-yellow-400' },
  { label: 'Strong', color: 'bg-cyber-primary', text: 'text-cyber-primary' },
  { label: 'Very Strong', color: 'bg-green-500', text: 'text-green-400' },
];
const crackTimeLabels: Record<string, string> = {
  'less than a second': 'Instant',
  'seconds': '< 1 minute',
  'minutes': 'Minutes',
  'hours': 'Hours',
  'days': 'Days',
  'months': 'Months',
  'years': 'Years',
  'centuries': '100+ Years 🔒',
};
function prettyCrackTime(raw: string): string {
  for (const [key, val] of Object.entries(crackTimeLabels)) {
    if (raw.includes(key)) return val;
  }
  return raw;
}

// ─── Main Component ───────────────────────────────────────────────────────────
type Tab = 'password' | 'scam' | 'breach';

export default function Tools() {
  const [activeTab, setActiveTab] = useState<Tab>('password');

  // Password state
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [copied, setCopied] = useState(false);
  const analysis = useMemo(() => (password ? zxcvbn(password) : null), [password]);

  const generateAndSet = () => {
    setPassword(generatePassword());
    setShowPwd(true);
  };
  const copyPwd = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  // Scam state
  const [scamInput, setScamInput] = useState('');
  const [scamResult, setScamResult] = useState<ReturnType<typeof analyzeScam> | null>(null);

  // Breach state
  const [breachEmail, setBreachEmail] = useState('');
  const [breachResult, setBreachResult] = useState<{ checked: boolean; breaches: typeof breachDatabase[string] } | null>(null);

  const tabConfig = [
    { id: 'password' as Tab, label: 'Password Pro', icon: <Key className="h-4 w-4" /> },
    { id: 'scam' as Tab, label: 'Scam Detector', icon: <Search className="h-4 w-4" /> },
    { id: 'breach' as Tab, label: 'Breach Scanner', icon: <Mail className="h-4 w-4" /> },
  ];

  const riskConfig = {
    safe: { color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/30', icon: <CheckCircle className="h-5 w-5 text-green-400" />, label: 'Safe' },
    low: { color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/30', icon: <AlertTriangle className="h-5 w-5 text-yellow-400" />, label: 'Low Risk' },
    medium: { color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/30', icon: <AlertTriangle className="h-5 w-5 text-orange-400" />, label: 'Medium Risk' },
    high: { color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/30', icon: <XCircle className="h-5 w-5 text-red-400" />, label: 'High Risk ⚠️' },
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
            Cyber <span className="text-cyber-accent">Tools</span>
          </h1>
          <p className="text-gray-400 text-lg">Advanced tools to analyze, detect, and protect.</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {tabConfig.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-xl flex items-center gap-2 font-medium text-sm transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-cyber-primary to-cyber-secondary text-white shadow-[0_0_15px_rgba(59,130,246,0.4)]'
                  : 'glass text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab.icon}{tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* ── PASSWORD PRO ── */}
          {activeTab === 'password' && (
            <motion.div
              key="password"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="glass-dark rounded-2xl p-8 border border-white/10 shadow-2xl"
            >
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <Shield className="h-6 w-6 text-cyber-primary" /> Password Pro Analyzer
              </h2>
              <p className="text-gray-400 text-sm mb-6">
                Powered by <span className="text-cyber-primary font-medium">zxcvbn</span> — the same algorithm used by top security teams. We never store your password.
              </p>

              {/* Input */}
              <div className="relative mb-4">
                <input
                  type={showPwd ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Type or generate a password..."
                  className="w-full bg-black/50 border border-white/20 rounded-xl px-4 py-3.5 pr-24 text-white focus:outline-none focus:border-cyber-primary focus:ring-1 focus:ring-cyber-primary transition-all font-mono text-sm"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                  <button onClick={() => setShowPwd(!showPwd)} className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white">
                    {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                  <button onClick={copyPwd} disabled={!password} className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white disabled:opacity-30">
                    {copied ? <CheckCircle className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <button
                onClick={generateAndSet}
                className="w-full py-2.5 rounded-xl glass border border-white/20 hover:border-cyber-primary/50 text-sm font-medium flex items-center justify-center gap-2 mb-8 transition-all hover:bg-white/5"
              >
                <RefreshCw className="h-4 w-4 text-cyber-neon" /> Generate Strong Password
              </button>

              {/* Analysis */}
              {analysis && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {/* Strength bar */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-300">Strength</span>
                      <span className={`text-sm font-bold ${strengthConfig[analysis.score].text}`}>
                        {strengthConfig[analysis.score].label}
                      </span>
                    </div>
                    <div className="h-2.5 w-full bg-white/10 rounded-full overflow-hidden flex gap-1 p-0.5">
                      {strengthConfig.map((s, i) => (
                        <motion.div
                          key={i}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: i <= analysis.score ? 1 : 0 }}
                          className={`flex-1 rounded-full transition-all duration-500 origin-left ${i <= analysis.score ? s.color : 'bg-transparent'}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Stats cards */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                      <p className="text-xs text-gray-500 mb-1">Time to Crack</p>
                      <p className="font-bold text-white text-sm">{prettyCrackTime(String(analysis.crack_times_display.offline_slow_hashing_1e4_per_second))}</p>
                    </div>
                    <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                      <p className="text-xs text-gray-500 mb-1">Guesses needed</p>
                      <p className="font-bold text-white text-sm">
                        {analysis.guesses > 1e12 ? '1T+' : analysis.guesses > 1e9 ? `${(analysis.guesses / 1e9).toFixed(1)}B` : analysis.guesses > 1e6 ? `${(analysis.guesses / 1e6).toFixed(1)}M` : `${Math.round(analysis.guesses).toLocaleString()}`}
                      </p>
                    </div>
                  </div>

                  {/* Suggestions */}
                  {analysis.feedback.suggestions.length > 0 && (
                    <div className="bg-cyber-primary/5 border border-cyber-primary/20 p-4 rounded-xl mb-4">
                      <h4 className="text-cyber-primary font-semibold text-sm mb-2">💡 Suggestions</h4>
                      {analysis.feedback.suggestions.map((s, i) => (
                        <p key={i} className="text-gray-300 text-sm flex items-start gap-1.5 mt-1">
                          <span className="text-cyber-primary mt-0.5">→</span> {s}
                        </p>
                      ))}
                      {analysis.feedback.warning && (
                        <p className="text-orange-300 text-sm mt-2">⚠️ {analysis.feedback.warning}</p>
                      )}
                    </div>
                  )}

                  {/* Checklist */}
                  <div className="space-y-2">
                    {[
                      { label: 'Minimum 12 characters', ok: password.length >= 12 },
                      { label: 'Contains uppercase letter', ok: /[A-Z]/.test(password) },
                      { label: 'Contains lowercase letter', ok: /[a-z]/.test(password) },
                      { label: 'Contains number', ok: /\d/.test(password) },
                      { label: 'Contains special character', ok: /[^A-Za-z0-9]/.test(password) },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        {item.ok
                          ? <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                          : <XCircle className="h-4 w-4 text-gray-600 flex-shrink-0" />}
                        <span className={item.ok ? 'text-gray-300' : 'text-gray-600'}>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* ── SCAM DETECTOR ── */}
          {activeTab === 'scam' && (
            <motion.div
              key="scam"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="glass-dark rounded-2xl p-8 border border-white/10 shadow-2xl"
            >
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-cyber-accent" /> Advanced Scam Detector
              </h2>
              <p className="text-gray-400 text-sm mb-6">
                Paste any suspicious email, SMS, URL, or message to run it through our <span className="text-cyber-accent font-medium">multi-vector threat engine</span>.
              </p>

              <textarea
                value={scamInput}
                onChange={e => setScamInput(e.target.value)}
                placeholder="Paste suspicious content here...&#10;&#10;Example: 'URGENT: Your SBI account is suspended. Click http://sbi-verify.xyz to restore immediately.'"
                rows={5}
                className="w-full bg-black/50 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyber-accent focus:ring-1 focus:ring-cyber-accent transition-all resize-none mb-4 text-sm"
              />
              <button
                onClick={() => setScamResult(analyzeScam(scamInput))}
                disabled={!scamInput.trim()}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyber-accent to-cyber-secondary text-white font-bold transition-all disabled:opacity-40 shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] mb-6"
              >
                Run Threat Analysis
              </button>

              <AnimatePresence>
                {scamResult && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                    {/* Risk Badge */}
                    <div className={`p-4 rounded-xl border mb-4 flex items-center gap-3 ${riskConfig[scamResult.risk].bg}`}>
                      {riskConfig[scamResult.risk].icon}
                      <div>
                        <p className={`font-bold ${riskConfig[scamResult.risk].color}`}>
                          Risk Level: {riskConfig[scamResult.risk].label}
                        </p>
                        <p className="text-xs text-gray-400">Threat Score: {scamResult.score}/100</p>
                      </div>
                      {/* Score Bar */}
                      <div className="ml-auto w-24 h-2 bg-black/40 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${scamResult.score}%` }}
                          className={`h-full rounded-full ${scamResult.risk === 'high' ? 'bg-red-500' : scamResult.risk === 'medium' ? 'bg-orange-500' : scamResult.risk === 'low' ? 'bg-yellow-500' : 'bg-green-500'}`}
                        />
                      </div>
                    </div>

                    {/* Flags */}
                    {scamResult.flags.length > 0 ? (
                      <div className="space-y-2">
                        <h3 className="text-sm font-bold text-gray-300 mb-3">Detected Threats:</h3>
                        {scamResult.flags.map((flag, i) => (
                          <div key={i} className={`p-3 rounded-xl border flex items-start gap-3 ${
                            flag.severity === 'high' ? 'bg-red-500/5 border-red-500/20' :
                            flag.severity === 'medium' ? 'bg-orange-500/5 border-orange-500/20' :
                            'bg-yellow-500/5 border-yellow-500/20'
                          }`}>
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${
                              flag.severity === 'high' ? 'bg-red-500/20 text-red-400' :
                              flag.severity === 'medium' ? 'bg-orange-500/20 text-orange-400' :
                              'bg-yellow-500/20 text-yellow-400'
                            }`}>{flag.severity.toUpperCase()}</span>
                            <div>
                              <p className="text-white font-semibold text-sm">{flag.label}</p>
                              <p className="text-gray-400 text-xs mt-0.5">{flag.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-4 text-green-400 text-sm">
                        <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-400" />
                        No obvious threats detected. Always stay vigilant!
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* ── BREACH SCANNER ── */}
          {activeTab === 'breach' && (
            <motion.div
              key="breach"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="glass-dark rounded-2xl p-8 border border-white/10 shadow-2xl"
            >
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <Smartphone className="h-6 w-6 text-cyber-secondary" /> Data Breach Scanner
              </h2>
              <p className="text-gray-400 text-sm mb-4">
                Check if your email has appeared in known data breaches. This is a <span className="text-cyber-secondary font-medium">simulated demo</span> — try <span className="text-cyber-neon font-mono">test@gmail.com</span>, <span className="text-cyber-neon font-mono">demo@yahoo.com</span>, or <span className="text-cyber-neon font-mono">user@example.com</span>.
              </p>

              <div className="relative mb-4">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input
                  type="email"
                  value={breachEmail}
                  onChange={e => setBreachEmail(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      const result = breachDatabase[breachEmail.trim().toLowerCase()] || [];
                      setBreachResult({ checked: true, breaches: result });
                    }
                  }}
                  placeholder="your@email.com"
                  className="w-full bg-black/50 border border-white/20 rounded-xl pl-10 pr-4 py-3.5 text-white focus:outline-none focus:border-cyber-secondary focus:ring-1 focus:ring-cyber-secondary transition-all"
                />
              </div>
              <button
                onClick={() => {
                  const result = breachDatabase[breachEmail.trim().toLowerCase()] || [];
                  setBreachResult({ checked: true, breaches: result });
                }}
                disabled={!breachEmail.trim()}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyber-secondary to-cyber-primary text-white font-bold transition-all disabled:opacity-40 shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] mb-6"
              >
                Scan for Breaches
              </button>

              <AnimatePresence>
                {breachResult && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    {breachResult.breaches.length === 0 ? (
                      <div className="text-center py-8">
                        <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-3" />
                        <p className="text-green-400 font-bold text-lg">No Breaches Found!</p>
                        <p className="text-gray-400 text-sm mt-1">Your email wasn't found in our simulated database. Stay vigilant!</p>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <XCircle className="h-5 w-5 text-red-400" />
                          <p className="text-red-400 font-bold">Found in {breachResult.breaches.length} breach{breachResult.breaches.length > 1 ? 'es' : ''}!</p>
                        </div>
                        <div className="space-y-3">
                          {breachResult.breaches.map((breach, i) => (
                            <div key={i} className="bg-black/40 border border-white/10 p-4 rounded-xl">
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-bold text-white">{breach.service}</span>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-gray-400">{breach.year}</span>
                                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                                    breach.severity === 'high' ? 'bg-red-500/20 text-red-400' :
                                    breach.severity === 'medium' ? 'bg-orange-500/20 text-orange-400' :
                                    'bg-yellow-500/20 text-yellow-400'
                                  }`}>{breach.severity.toUpperCase()}</span>
                                </div>
                              </div>
                              <p className="text-xs text-gray-400">Exposed data:</p>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {breach.data.map((d, j) => (
                                  <span key={j} className="text-xs bg-white/5 border border-white/10 px-2 py-0.5 rounded-full text-gray-300">{d}</span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 p-4 bg-cyber-primary/10 border border-cyber-primary/30 rounded-xl">
                          <p className="text-sm text-cyber-primary font-bold mb-1">⚡ Immediate Actions:</p>
                          <ul className="text-sm text-gray-300 space-y-1">
                            <li>• Change passwords for these services immediately</li>
                            <li>• Enable 2FA on all accounts</li>
                            <li>• Check for suspicious account activity</li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
