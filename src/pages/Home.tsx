import { motion } from 'framer-motion';
import { ShieldAlert, Lock, Search, BookOpen, ArrowRight, TrendingUp, Globe, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Legend
} from 'recharts';

const threatData = [
  { month: 'Jan', phishing: 4200, malware: 2400, ransomware: 1800 },
  { month: 'Feb', phishing: 5800, malware: 2800, ransomware: 2200 },
  { month: 'Mar', phishing: 4900, malware: 3100, ransomware: 1900 },
  { month: 'Apr', phishing: 7200, malware: 3600, ransomware: 2800 },
  { month: 'May', phishing: 6500, malware: 4200, ransomware: 3100 },
  { month: 'Jun', phishing: 9100, malware: 5100, ransomware: 4400 },
];

const attackTypeData = [
  { name: 'Phishing', value: 38, fill: '#3b82f6' },
  { name: 'Malware', value: 22, fill: '#8b5cf6' },
  { name: 'Ransomware', value: 18, fill: '#06b6d4' },
  { name: 'Social Eng.', value: 14, fill: '#22d3ee' },
  { name: 'Other', value: 8, fill: '#94a3b8' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-dark p-4 rounded-xl border border-white/20 text-sm">
        <p className="text-white font-bold mb-2">{label}</p>
        {payload.map((entry: any, i: number) => (
          <p key={i} style={{ color: entry.color }} className="capitalize">
            {entry.name}: <span className="font-bold">{entry.value.toLocaleString()}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Home() {
  const features = [
    { title: "Structured Learning", description: "Explore curated modules on phishing, malware, and advanced threats.", icon: <BookOpen className="h-6 w-6 text-cyber-primary" />, link: "/learn", badge: "9 Modules" },
    { title: "Password Pro", description: "Real-time entropy analysis. Find out exactly how long it takes to crack your password.", icon: <Lock className="h-6 w-6 text-cyber-secondary" />, link: "/tools", badge: "AI Powered" },
    { title: "Scam Detector", description: "Analyze suspicious emails, SMS, or URLs for phishing markers instantly.", icon: <Search className="h-6 w-6 text-cyber-accent" />, link: "/tools", badge: "Multi-Vector" },
    { title: "Security Quiz", description: "30+ questions. Earn your CyberShield Certificate and track your scores.", icon: <ShieldAlert className="h-6 w-6 text-cyber-neon" />, link: "/quiz", badge: "Certificate" },
  ];

  const stats = [
    { value: "43%", label: "of attacks target small businesses", icon: <TrendingUp className="h-5 w-5 text-red-400" /> },
    { value: "$6.9B", label: "lost to internet scams in 2021", icon: <Globe className="h-5 w-5 text-orange-400" /> },
    { value: "95%", label: "of breaches are caused by human error", icon: <Zap className="h-5 w-5 text-yellow-400" /> },
  ];

  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      {/* Hero */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        {/* Animated grid background */}
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.05) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
        <div className="absolute inset-0 bg-gradient-to-b from-cyber-dark/30 via-transparent to-cyber-dark" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-cyber-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-40 right-1/4 w-80 h-80 bg-cyber-secondary/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="text-center max-w-5xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-cyber-primary/30 text-cyber-neon text-sm font-medium mb-8"
            >
              <Zap className="h-4 w-4" />
              Free Community Cyber Security Platform
            </motion.div>

            <h1 className="text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-tight mb-6 leading-none">
              Stay{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-primary via-cyber-secondary to-cyber-neon">
                Safe
              </span>{' '}
              Online
            </h1>
            <p className="text-lg md:text-2xl text-gray-300 mb-10 leading-relaxed max-w-3xl mx-auto">
              Empowering students, senior citizens, and the general public with knowledge, tools, and intelligence to defend against modern cyber threats.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/learn"
                className="px-8 py-4 rounded-full bg-gradient-to-r from-cyber-primary to-cyber-secondary text-white font-bold text-lg transition-all shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] flex items-center justify-center gap-2 group"
              >
                Start Learning <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/tools"
                className="px-8 py-4 rounded-full glass border border-white/20 hover:border-cyber-primary/50 hover:bg-white/10 text-white font-bold text-lg transition-all flex items-center justify-center"
              >
                Try Our Tools
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-cyber-darker border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex items-center gap-4 p-6 glass-dark rounded-xl border border-white/5"
              >
                <div className="p-3 bg-white/5 rounded-xl flex-shrink-0">{stat.icon}</div>
                <div>
                  <div className="text-3xl font-black text-white">{stat.value}</div>
                  <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Threat Intelligence Charts */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold mb-4"
            >
              <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse inline-block" />
              LIVE THREAT INTELLIGENCE
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Global <span className="text-cyber-primary">Cyber Threat</span> Activity
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Simulated real-time intelligence showing the scale and evolution of cyber threats worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Area Chart - 2/3 width */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 glass-dark p-6 rounded-2xl border border-white/10"
            >
              <h3 className="font-bold text-lg mb-1">Threats Over Time (2026)</h3>
              <p className="text-gray-400 text-sm mb-6">Reported incidents per month by category</p>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={threatData}>
                  <defs>
                    <linearGradient id="phishingGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="malwareGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="ransomwareGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ color: '#94a3b8', fontSize: '12px' }} />
                  <Area type="monotone" dataKey="phishing" stroke="#3b82f6" strokeWidth={2} fill="url(#phishingGrad)" />
                  <Area type="monotone" dataKey="malware" stroke="#8b5cf6" strokeWidth={2} fill="url(#malwareGrad)" />
                  <Area type="monotone" dataKey="ransomware" stroke="#06b6d4" strokeWidth={2} fill="url(#ransomwareGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Bar Chart - 1/3 width */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-dark p-6 rounded-2xl border border-white/10"
            >
              <h3 className="font-bold text-lg mb-1">Attack Breakdown</h3>
              <p className="text-gray-400 text-sm mb-6">% share by attack type</p>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={attackTypeData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} unit="%" />
                  <YAxis dataKey="name" type="category" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} width={75} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                    {attackTypeData.map((entry, index) => (
                      <rect key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-cyber-darker/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to <span className="text-cyber-primary">Protect Yourself</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Interactive tools and curated content to build your complete cyber resilience.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="relative glass-dark p-6 rounded-2xl border border-white/5 hover:border-cyber-primary/40 transition-colors group flex flex-col"
              >
                <div className="absolute top-4 right-4 px-2 py-0.5 rounded-full bg-cyber-primary/10 border border-cyber-primary/30 text-cyber-primary text-xs font-bold">
                  {feature.badge}
                </div>
                <div className="p-3 bg-white/5 rounded-xl inline-block mb-5 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 text-sm mb-6 flex-grow">{feature.description}</p>
                <Link to={feature.link} className="text-cyber-neon font-medium flex items-center gap-1 hover:gap-2 transition-all text-sm">
                  Explore <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
