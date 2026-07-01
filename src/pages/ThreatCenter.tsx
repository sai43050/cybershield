import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Terminal, ShieldAlert, Cpu, CheckCircle2, RefreshCw, Play, Circle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface Packet {
  time: string;
  protocol: string;
  source: string;
  country: string;
  action: 'BLOCKED' | 'ALLOWED';
  threat: 'HIGH' | 'MEDIUM' | 'NONE';
}

const countries = ['United States', 'Germany', 'China', 'Russia', 'India', 'Brazil', 'Japan', 'United Kingdom'];
const protocols = ['TCP/443', 'TCP/22', 'UDP/53', 'HTTPS', 'SSH', 'DNS', 'HTTP/80'];

export default function ThreatCenter() {
  // Stats Counters
  const [attacksBlocked, setAttacksBlocked] = useState(849204);
  const [nodesOnline, setNodesOnline] = useState(42);
  const [healthIndex, setHealthIndex] = useState(99.8);
  const [systemLoad, setSystemLoad] = useState(34);

  // Live Chart Data (10 points)
  const [chartData, setChartData] = useState(() => 
    Array.from({ length: 15 }, (_, i) => ({
      time: `${i}:00`,
      blocked: Math.floor(Math.random() * 80) + 120,
      allowed: Math.floor(Math.random() * 200) + 400,
    }))
  );

  // Live Packet Capture log
  const [packets, setPackets] = useState<Packet[]>([]);
  const logEndRef = useRef<HTMLDivElement>(null);

  // Audit Terminal State
  const [targetHost, setTargetHost] = useState('');
  const [auditRunning, setAuditRunning] = useState(false);
  const [auditLogs, setAuditLogs] = useState<string[]>([]);
  const [auditStep, setAuditStep] = useState(0);

  // 1. Ticking Counters & Chart Data updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Tick attacks blocked
      setAttacksBlocked(prev => prev + Math.floor(Math.random() * 3) + 1);

      // Jitter nodes and load
      setNodesOnline(prev => Math.max(38, Math.min(46, prev + (Math.random() > 0.5 ? 1 : -1))));
      setSystemLoad(prev => Math.max(20, Math.min(75, prev + Math.floor(Math.random() * 7) - 3)));
      setHealthIndex(prev => parseFloat(Math.max(98.5, Math.min(100.0, prev + (Math.random() > 0.6 ? 0.05 : -0.05))).toFixed(2)));

      // Tick Chart Data (add new point, drop first)
      const now = new Date();
      const timeStr = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
      setChartData(prev => [
        ...prev.slice(1),
        {
          time: timeStr,
          blocked: Math.floor(Math.random() * 80) + 120,
          allowed: Math.floor(Math.random() * 200) + 400,
        }
      ]);

      // Add a live packet log
      const newPacket: Packet = {
        time: now.toLocaleTimeString(),
        protocol: protocols[Math.floor(Math.random() * protocols.length)],
        source: `${Math.floor(Math.random() * 190) + 10}.${Math.floor(Math.random() * 254)}.${Math.floor(Math.random() * 254)}.${Math.floor(Math.random() * 254)}`,
        country: countries[Math.floor(Math.random() * countries.length)],
        action: Math.random() > 0.3 ? 'ALLOWED' : 'BLOCKED',
        threat: Math.random() > 0.85 ? 'HIGH' : Math.random() > 0.6 ? 'MEDIUM' : 'NONE'
      };

      setPackets(prev => [...prev.slice(-14), newPacket]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Scroll to log end
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [packets]);

  // 2. Audit Simulation Runner
  const runAudit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetHost.trim() || auditRunning) return;

    setAuditRunning(true);
    setAuditLogs([]);
    setAuditStep(0);
  };

  useEffect(() => {
    if (!auditRunning) return;

    const steps = [
      `[INFO] Resolving DNS entries for '${targetHost}'...`,
      `[SUCCESS] Host resolved to IP 104.244.42.1 (Cloudflare Edge Node).`,
      `[SCAN] Testing critical TCP ports (21, 22, 80, 443, 8080, 3306)...`,
      `[INFO] Port 80 (HTTP) - Open (Redirecting to HTTPS).`,
      `[INFO] Port 443 (HTTPS) - Open (TLS 1.3 Active).`,
      `[WARN] Port 22 (SSH) - Closed but responding to handshake checks.`,
      `[SCAN] Evaluating security headers configurations...`,
      `[WARN] Missing Content-Security-Policy (CSP) headers on root resource.`,
      `[INFO] X-Frame-Options is properly set to DENY.`,
      `[SCAN] Inspecting SSL/TLS handshakes and certificate chain...`,
      `[SUCCESS] TLS handshake secure. Certificate valid (Expires in 78 days).`,
      `[AUDIT COMPLETE] Rating generated: 92/100 (Grade: A-).`,
      `[ADVISORY] Suggestions: Add CSP headers to prevent XSS. Disable SSH interface exposure.`
    ];

    if (auditStep < steps.length) {
      const timeout = setTimeout(() => {
        setAuditLogs(prev => [...prev, steps[auditStep]]);
        setAuditStep(prev => prev + 1);
      }, 900);
      return () => clearTimeout(timeout);
    } else {
      setAuditRunning(false);
    }
  }, [auditRunning, auditStep]);

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-primary/10 border border-cyber-primary/30 text-cyber-neon text-xs font-bold mb-4"
          >
            <Activity className="h-3.5 w-3.5 animate-pulse" />
            LIVE SECURITY COMMAND CENTER
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Real-Time <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-primary via-cyber-secondary to-cyber-neon">Threat Dashboard</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Live telemetry monitoring, security scan simulations, and network packet firewall audits in real time.
          </p>
        </div>

        {/* Real-time Ticking Ribbon */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="glass-dark border border-white/10 rounded-2xl p-5 relative overflow-hidden">
            <div className="absolute inset-y-0 right-4 flex items-center text-red-500/10"><ShieldAlert className="h-16 w-16" /></div>
            <span className="text-[10px] font-bold text-red-400 tracking-wider block uppercase">Blocked Attacks Today</span>
            <p className="text-3xl font-black text-white mt-2 font-mono tabular-nums tracking-tight">
              {attacksBlocked.toLocaleString()}
            </p>
            <span className="text-[9px] text-green-400 mt-1 block flex items-center gap-1 font-bold">
              <Circle className="h-1.5 w-1.5 fill-green-400 animate-ping" /> Real-time feed active
            </span>
          </div>

          <div className="glass-dark border border-white/10 rounded-2xl p-5 relative overflow-hidden">
            <div className="absolute inset-y-0 right-4 flex items-center text-cyber-neon/10"><Cpu className="h-16 w-16" /></div>
            <span className="text-[10px] font-bold text-cyber-neon tracking-wider block uppercase">Security Nodes Online</span>
            <p className="text-3xl font-black text-white mt-2 font-mono">
              {nodesOnline} <span className="text-xs text-gray-500 font-sans">/ 50</span>
            </p>
            <span className="text-[9px] text-gray-500 mt-1 block font-bold">Cluster operations healthy</span>
          </div>

          <div className="glass-dark border border-white/10 rounded-2xl p-5 relative overflow-hidden">
            <div className="absolute inset-y-0 right-4 flex items-center text-green-400/10"><CheckCircle2 className="h-16 w-16" /></div>
            <span className="text-[10px] font-bold text-green-400 tracking-wider block uppercase">Network Health Index</span>
            <p className="text-3xl font-black text-white mt-2 font-mono">
              {healthIndex}%
            </p>
            <span className="text-[9px] text-gray-500 mt-1 block font-bold">SLA guarantee compliant</span>
          </div>

          <div className="glass-dark border border-white/10 rounded-2xl p-5 relative overflow-hidden">
            <div className="absolute inset-y-0 right-4 flex items-center text-cyber-secondary/10"><RefreshCw className="h-16 w-16" /></div>
            <span className="text-[10px] font-bold text-cyber-secondary tracking-wider block uppercase">Firewall Core Load</span>
            <p className="text-3xl font-black text-white mt-2 font-mono">
              {systemLoad}%
            </p>
            <span className="text-[9px] text-gray-500 mt-1 block font-bold">Auto-scaling group ready</span>
          </div>
        </div>

        {/* Charts & Interactive Audit Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">

          {/* Live Charts Card */}
          <div className="lg:col-span-2 glass-dark border border-white/10 p-6 rounded-2xl">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-bold text-white text-base">Live Traffic Telemetry</h3>
                <p className="text-[10px] text-gray-400">Monitoring blocked requests vs allowed transactions</p>
              </div>
              <div className="flex items-center gap-4 text-xs font-bold">
                <span className="flex items-center gap-1.5 text-cyber-primary"><span className="w-2.5 h-2.5 rounded-full bg-cyber-primary" /> Allowed</span>
                <span className="flex items-center gap-1.5 text-cyber-neon"><span className="w-2.5 h-2.5 rounded-full bg-cyber-neon" /> Blocked</span>
              </div>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="allowedGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="blockedGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" stroke="rgba(255,255,255,0.3)" fontSize={9} />
                  <YAxis stroke="rgba(255,255,255,0.3)" fontSize={9} />
                  <Tooltip contentStyle={{ background: '#0a0a0f', borderColor: 'rgba(255,255,255,0.1)', color: '#fff' }} />
                  <Area type="monotone" dataKey="allowed" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#allowedGrad)" />
                  <Area type="monotone" dataKey="blocked" stroke="#22d3ee" strokeWidth={2} fillOpacity={1} fill="url(#blockedGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Cyber Audit Simulator */}
          <div className="glass-dark border border-white/10 p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-white text-base mb-1 flex items-center gap-2">
                <Terminal className="h-5 w-5 text-cyber-neon" /> Interactive Cyber Auditor
              </h3>
              <p className="text-[10px] text-gray-400 mb-4">Simulate a security compliance port audit on your server/domain.</p>

              <form onSubmit={runAudit} className="flex gap-2 mb-4">
                <input
                  type="text"
                  required
                  disabled={auditRunning}
                  value={targetHost}
                  onChange={e => setTargetHost(e.target.value)}
                  placeholder="e.g. staging.company.com"
                  className="flex-grow bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyber-primary"
                />
                <button
                  type="submit"
                  disabled={auditRunning || !targetHost.trim()}
                  className="px-4 py-2 bg-gradient-to-r from-cyber-primary to-cyber-secondary rounded-xl text-white font-bold text-xs flex items-center gap-1 hover:opacity-90 disabled:opacity-40"
                >
                  <Play className="h-3 w-3" /> Audit
                </button>
              </form>

              {/* Terminal Logs */}
              <div className="h-52 bg-black/60 border border-white/5 rounded-xl p-3.5 overflow-y-auto font-mono text-[9px] text-green-400 space-y-1.5">
                {auditLogs.length === 0 ? (
                  <p className="text-gray-500 italic">Enter a host and click Audit to start scanner simulation...</p>
                ) : (
                  auditLogs.map((log, idx) => (
                    <p key={idx} className={
                      log.includes('[WARN]') ? 'text-yellow-400' :
                      log.includes('[SUCCESS]') ? 'text-cyber-neon font-bold' :
                      log.includes('[AUDIT COMPLETE]') ? 'text-white font-bold text-[10px]' :
                      'text-green-400'
                    }>
                      {log}
                    </p>
                  ))
                )}
              </div>
            </div>

            {auditRunning && (
              <span className="text-[9px] text-gray-500 font-bold block text-center mt-3 animate-pulse">
                Auditor running... analyzing packet handshakes
              </span>
            )}
          </div>

        </div>

        {/* Live Network Packets Feed */}
        <div className="glass-dark border border-white/10 rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-white/10 bg-white/[0.02] flex justify-between items-center">
            <div>
              <h3 className="font-bold text-white text-base">Network Firewall Logs</h3>
              <p className="text-[10px] text-gray-400">Live stream packet capture of incoming telemetry</p>
            </div>
            <span className="text-xs font-bold text-cyber-neon bg-cyber-primary/10 border border-cyber-primary/30 px-3 py-1 rounded-full flex items-center gap-1.5">
              <span className="w-2 h-2 bg-cyber-neon rounded-full animate-ping" /> Ticking logs active
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-black/40 border-b border-white/10 text-gray-400 text-[10px] uppercase font-bold">
                <tr>
                  <th className="p-4">Time Stamp</th>
                  <th className="p-4">Protocol</th>
                  <th className="p-4">Source IP Address</th>
                  <th className="p-4">Source Region</th>
                  <th className="p-4">Threat Rating</th>
                  <th className="p-4">Audit Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <AnimatePresence>
                  {packets.map((pkt, i) => (
                    <motion.tr
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="hover:bg-white/[0.01]"
                    >
                      <td className="p-4 text-gray-400">{pkt.time}</td>
                      <td className="p-4 text-white font-bold">{pkt.protocol}</td>
                      <td className="p-4 text-gray-300">{pkt.source}</td>
                      <td className="p-4 text-gray-300">{pkt.country}</td>
                      <td className="p-4">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          pkt.threat === 'HIGH' ? 'bg-red-500/25 text-red-400' :
                          pkt.threat === 'MEDIUM' ? 'bg-orange-500/25 text-orange-400' :
                          'bg-green-500/25 text-green-400'
                        }`}>
                          {pkt.threat}
                        </span>
                      </td>
                      <td className="p-4 font-bold">
                        <span className={pkt.action === 'BLOCKED' ? 'text-red-400' : 'text-green-400'}>
                          {pkt.action}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
