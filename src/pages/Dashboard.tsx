import { motion } from 'framer-motion';
import { User, Award, Shield, Clock, BookOpen, TrendingUp, Zap, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts';

const skillData = [
  { skill: 'Phishing', score: 85 },
  { skill: 'Malware', score: 70 },
  { skill: 'Passwords', score: 90 },
  { skill: 'Privacy', score: 60 },
  { skill: 'Networking', score: 55 },
  { skill: 'Social Eng.', score: 75 },
];

const progressHistory = [
  { week: 'Wk 1', score: 45 },
  { week: 'Wk 2', score: 60 },
  { week: 'Wk 3', score: 55 },
  { week: 'Wk 4', score: 72 },
  { week: 'Wk 5', score: 85 },
  { week: 'Wk 6', score: 80 },
  { week: 'Wk 7', score: 91 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-dark p-3 rounded-xl border border-white/20 text-xs">
        <p className="text-gray-400 mb-1">{label}</p>
        <p className="text-cyber-primary font-bold">{payload[0]?.value}%</p>
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const user = {
    name: "Demo User",
    email: "demo@cybershield.com",
    joined: "June 2026",
    level: "Cyber Defender",
    xp: 1340,
    maxXp: 2000,
    streak: 7,
  };

  const recentActivity = [
    { id: 1, action: "Passed Quiz: Phishing 101", date: "2 hours ago", icon: <Award className="h-4 w-4 text-yellow-400" />, xp: '+150 XP' },
    { id: 2, action: "Read: Malware Deep Dive", date: "Yesterday", icon: <BookOpen className="h-4 w-4 text-cyber-primary" />, xp: '+30 XP' },
    { id: 3, action: "Checked Password Strength", date: "3 days ago", icon: <Shield className="h-4 w-4 text-cyber-secondary" />, xp: '+10 XP' },
  ];

  const statCards = [
    { label: 'Avg Score', value: '85%', icon: <Target className="h-5 w-5 text-cyber-neon" />, color: 'text-cyber-neon' },
    { label: 'Modules Done', value: '4/9', icon: <BookOpen className="h-5 w-5 text-cyber-primary" />, color: 'text-cyber-primary' },
    { label: 'Certificates', value: '1', icon: <Award className="h-5 w-5 text-yellow-400" />, color: 'text-yellow-400' },
    { label: 'Day Streak', value: `${user.streak}🔥`, icon: <Zap className="h-5 w-5 text-orange-400" />, color: 'text-orange-400' },
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl md:text-4xl font-bold">
            My <span className="text-cyber-primary">Dashboard</span>
          </h1>
          <Link to="/quiz" className="px-4 py-2 rounded-xl bg-cyber-primary/10 border border-cyber-primary/30 text-cyber-primary hover:bg-cyber-primary/20 transition-all text-sm font-medium flex items-center gap-2">
            <TrendingUp className="h-4 w-4" /> Take Quiz
          </Link>
        </div>

        {/* Profile + XP Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-1 glass-dark rounded-2xl p-6 border border-white/10 flex flex-col items-center text-center"
          >
            <div className="relative mb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-cyber-primary to-cyber-secondary rounded-full flex items-center justify-center">
                <User className="h-10 w-10 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-cyber-dark flex items-center justify-center">
                <span className="text-black text-xs font-black">✓</span>
              </div>
            </div>
            <h2 className="text-lg font-bold text-white">{user.name}</h2>
            <p className="text-gray-500 text-xs mb-3">{user.email}</p>
            <div className="px-3 py-1 rounded-full bg-cyber-secondary/20 border border-cyber-secondary/40 text-cyber-secondary font-bold text-xs mb-4">
              🛡️ {user.level}
            </div>

            {/* XP Bar */}
            <div className="w-full">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>XP Progress</span>
                <span>{user.xp} / {user.maxXp}</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(user.xp / user.maxXp) * 100}%` }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-cyber-primary to-cyber-secondary rounded-full"
                />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3 flex items-center gap-1">
              <Clock className="h-3 w-3" /> Joined {user.joined}
            </p>
          </motion.div>

          {/* Stat Cards */}
          <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {statCards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-dark rounded-xl p-4 border border-white/5 flex flex-col gap-2"
              >
                <div className="p-2 bg-white/5 rounded-lg w-fit">{card.icon}</div>
                <p className={`text-2xl font-black ${card.color}`}>{card.value}</p>
                <p className="text-xs text-gray-500">{card.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Radar: Skills */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-dark rounded-2xl p-6 border border-white/10"
          >
            <h3 className="font-bold text-lg mb-1">Security Skill Radar</h3>
            <p className="text-gray-400 text-sm mb-4">Your knowledge coverage across domains</p>
            <ResponsiveContainer width="100%" height={260}>
              <RadarChart data={skillData}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis dataKey="skill" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <PolarRadiusAxis domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <Radar name="Your Score" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.25} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Line: Score over time */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-dark rounded-2xl p-6 border border-white/10"
          >
            <h3 className="font-bold text-lg mb-1">Quiz Score Trend</h3>
            <p className="text-gray-400 text-sm mb-4">Your performance over the last 7 weeks</p>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={progressHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="week" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} unit="%" />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="score" stroke="#22d3ee" strokeWidth={2.5} dot={{ fill: '#22d3ee', r: 4 }} activeDot={{ r: 6, fill: '#3b82f6' }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-dark rounded-2xl p-6 border border-white/10"
        >
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-cyber-secondary" /> Recent Activity
          </h3>
          <div className="space-y-3">
            {recentActivity.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-black/30 rounded-xl hover:bg-black/50 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/5 rounded-lg group-hover:scale-110 transition-transform">{item.icon}</div>
                  <div>
                    <p className="text-gray-200 text-sm font-medium">{item.action}</p>
                    <p className="text-gray-500 text-xs">{item.date}</p>
                  </div>
                </div>
                <span className="text-cyber-neon text-xs font-bold bg-cyber-primary/10 px-2 py-1 rounded-full">{item.xp}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
