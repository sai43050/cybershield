import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, User, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  isTyping?: boolean;
}

const knowledgeBase: { keywords: string[]; response: string }[] = [
  {
    keywords: ['phishing', 'phish', 'email scam'],
    response: "🎣 **Phishing** is when attackers send fake emails pretending to be a trusted entity (like your bank or Google). Key red flags:\n• Sender email doesn't match the domain\n• Urgency like \"Your account will be suspended!\"\n• Suspicious links — hover before clicking\n• Requests for passwords or OTPs\n\nAlways verify through official channels!"
  },
  {
    keywords: ['password', 'passwords', 'passcode'],
    response: "🔑 **Strong Password Tips:**\n• Use 16+ characters minimum\n• Mix uppercase, lowercase, numbers, symbols\n• Avoid dictionary words or personal info\n• Never reuse passwords across sites\n• Use a **password manager** like Bitwarden or 1Password\n\nOur Password Pro tool can check yours right now!"
  },
  {
    keywords: ['malware', 'virus', 'trojan', 'worm'],
    response: "🦠 **Malware** is malicious software designed to damage or gain unauthorized access. Types include:\n• **Viruses** — self-replicating code\n• **Trojans** — disguised as legitimate software\n• **Spyware** — secretly monitors your activity\n• **Keyloggers** — records keystrokes\n\nProtect yourself: keep software updated, use antivirus, and only download from official sources."
  },
  {
    keywords: ['ransomware', 'encrypt', 'ransom'],
    response: "🔒 **Ransomware** encrypts your files and demands payment to restore access. Key facts:\n• Never pay the ransom — it doesn't guarantee recovery\n• Maintain offline backups of critical data\n• Never click unknown email attachments\n• The #1 delivery method is phishing emails\n\nIf infected: disconnect from network immediately and contact authorities."
  },
  {
    keywords: ['2fa', 'two factor', 'mfa', 'authentication'],
    response: "✅ **Two-Factor Authentication (2FA)** adds an extra security layer beyond your password. Even if someone steals your password, they can't log in without your second factor.\n\nBest 2FA methods (ranked):\n1. **Hardware key** (YubiKey) — Most secure\n2. **Authenticator app** (Google Authenticator, Authy)\n3. **SMS OTP** — Convenient but vulnerable to SIM swapping\n\nEnable 2FA on all important accounts today!"
  },
  {
    keywords: ['upi', 'banking', 'payment', 'fraud', 'scam'],
    response: "💳 **UPI & Banking Fraud** is rampant! Key rules:\n• You **NEVER** enter your UPI PIN to *receive* money\n• Never share OTPs with anyone, ever\n• QR codes are only for payments, not receipts\n• If asked to scan a code to receive money — it's a SCAM\n• Legitimate banks never call asking for PINs\n\nIf you're a victim: call **1930** (National Cyber Crime Helpline) immediately!"
  },
  {
    keywords: ['vpn', 'virtual private network'],
    response: "🌐 **VPN (Virtual Private Network)** encrypts your internet traffic and hides your IP address.\n\n**When to use a VPN:**\n• On public Wi-Fi (coffee shops, airports)\n• To protect privacy from ISPs\n• When accessing sensitive work accounts remotely\n\nRecommended VPNs: ProtonVPN (free tier available), Mullvad, ExpressVPN"
  },
  {
    keywords: ['social engineering', 'social'],
    response: "🎭 **Social Engineering** is manipulating people psychologically rather than hacking systems. Tactics include:\n• **Pretexting** — creating a fake scenario\n• **Baiting** — offering something enticing\n• **Tailgating** — following someone into a secured area\n• **Vishing** — voice/phone phishing\n\nThe best defence is skepticism and verification — always confirm identities through official channels."
  },
  {
    keywords: ['hello', 'hi', 'hey', 'help', 'start'],
    response: "👋 Hello! I'm your **CyberShield AI Assistant**. I can help you with:\n\n• Understanding cyber threats (phishing, malware, ransomware)\n• Password security tips\n• Banking & UPI fraud prevention\n• Setting up 2FA\n• VPN guidance\n\nWhat would you like to know about staying safe online?"
  },
];

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const entry of knowledgeBase) {
    if (entry.keywords.some(k => lower.includes(k))) {
      return entry.response;
    }
  }
  return "🤔 That's a great question! I'm running on a curated knowledge base currently. Try asking me about:\n• Phishing attacks\n• Password security\n• Ransomware\n• 2FA / MFA\n• UPI & Banking fraud\n• VPNs\n• Social Engineering";
}

function TypingDots() {
  return (
    <div className="flex gap-1 items-center py-1">
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          className="w-2 h-2 bg-cyber-primary rounded-full"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

function FormattedMessage({ content }: { content: string }) {
  const lines = content.split('\n');
  return (
    <div className="text-sm space-y-1">
      {lines.map((line, i) => {
        if (line.startsWith('•')) {
          return <div key={i} className="pl-2 text-gray-300">{line}</div>;
        }
        // Bold text between **
        const parts = line.split(/\*\*(.*?)\*\*/g);
        return (
          <div key={i}>
            {parts.map((part, j) =>
              j % 2 === 1
                ? <span key={j} className="font-bold text-white">{part}</span>
                : <span key={j}>{part}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: '0', type: 'bot', content: "👋 Hello! I'm your **CyberShield AI Assistant**. Ask me anything about cyber security — phishing, passwords, banking fraud, VPNs, and more!" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim() || isTyping) return;
    const userMsg: Message = { id: Date.now().toString(), type: 'user', content: input.trim() };
    const response = getResponse(input);
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate realistic typing delay based on response length
    const delay = Math.min(Math.max(response.length * 12, 800), 2500);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: response,
      }]);
    }, delay);
  };

  const quickReplies = ['Phishing?', 'Password tips', 'UPI Fraud', 'What is 2FA?'];

  return (
    <>
      {/* FAB */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: 'spring' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-2xl bg-gradient-to-br from-cyber-primary to-cyber-secondary text-white shadow-[0_0_25px_rgba(59,130,246,0.5)] z-50 transition-all ${isOpen ? 'hidden' : 'flex'} items-center gap-2`}
      >
        <Sparkles className="h-5 w-5" />
        <span className="font-bold text-sm hidden sm:inline">Ask AI</span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.85 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 w-80 sm:w-96 h-[560px] flex flex-col rounded-2xl overflow-hidden z-50 shadow-2xl border border-white/10"
            style={{ background: 'linear-gradient(160deg, #0d1117 0%, #0a0a14 100%)' }}
          >
            {/* Header */}
            <div className="px-4 py-3 flex justify-between items-center border-b border-white/10" style={{ background: 'linear-gradient(90deg, rgba(59,130,246,0.15), rgba(139,92,246,0.15))' }}>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="p-2 bg-gradient-to-br from-cyber-primary to-cyber-secondary rounded-xl">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-cyber-dark" />
                </div>
                <div>
                  <p className="font-bold text-white text-sm">CyberShield AI</p>
                  <p className="text-xs text-green-400">Online • Security Expert</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-end gap-2 ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${msg.type === 'user' ? 'bg-cyber-secondary' : 'bg-gradient-to-br from-cyber-primary to-cyber-secondary'}`}>
                    {msg.type === 'user' ? <User className="h-3.5 w-3.5 text-white" /> : <Bot className="h-3.5 w-3.5 text-white" />}
                  </div>
                  <div className={`max-w-[78%] p-3 rounded-2xl ${msg.type === 'user' ? 'bg-cyber-secondary text-white rounded-br-sm' : 'bg-white/8 text-gray-200 rounded-bl-sm border border-white/10'}`}>
                    {msg.type === 'bot' ? <FormattedMessage content={msg.content} /> : <p className="text-sm">{msg.content}</p>}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-end gap-2"
                >
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-cyber-primary to-cyber-secondary flex items-center justify-center">
                    <Bot className="h-3.5 w-3.5 text-white" />
                  </div>
                  <div className="bg-white/8 border border-white/10 p-3 rounded-2xl rounded-bl-sm">
                    <TypingDots />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {quickReplies.map(r => (
                  <button
                    key={r}
                    onClick={() => { setInput(r); }}
                    className="px-3 py-1.5 rounded-full text-xs bg-white/5 border border-white/10 hover:border-cyber-primary/50 hover:bg-cyber-primary/10 text-gray-300 hover:text-white transition-all"
                  >
                    {r}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-3 border-t border-white/10 bg-black/30">
              <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about cyber security..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-cyber-primary transition-colors placeholder-gray-500"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="p-2.5 rounded-xl bg-gradient-to-br from-cyber-primary to-cyber-secondary text-white disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-all flex-shrink-0"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
