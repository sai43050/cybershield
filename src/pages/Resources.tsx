import { motion } from 'framer-motion';
import { FileText, Download, ExternalLink, ShieldAlert } from 'lucide-react';

export default function Resources() {
  const downloads = [
    { title: "Ultimate Cyber Security Checklist", type: "PDF", size: "2.4 MB" },
    { title: "Guide to Recognizing Phishing", type: "PDF", size: "1.8 MB" },
    { title: "Password Management 101", type: "PDF", size: "3.1 MB" },
  ];

  const links = [
    { title: "National Cyber Security Center", url: "#" },
    { title: "Report Cyber Crime", url: "#" },
    { title: "Identity Theft Recovery", url: "#" },
  ];

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Security <span className="text-cyber-primary">Resources</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Downloadable guides, checklists, and links to official authorities to help you stay secure.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Downloads Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-dark p-8 rounded-2xl border-t border-white/10"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Download className="h-6 w-6 text-cyber-primary" />
              Downloadable Guides
            </h2>
            <div className="space-y-4">
              {downloads.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-white/5 hover:border-cyber-primary/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-cyber-primary/20 rounded-lg text-cyber-primary">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-200">{item.title}</h3>
                      <p className="text-sm text-gray-400">{item.type} • {item.size}</p>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-white/10 rounded-full transition-colors text-cyber-neon" aria-label="Download">
                    <Download className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* External Links Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-dark p-8 rounded-2xl border-t border-white/10"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <ShieldAlert className="h-6 w-6 text-cyber-secondary" />
              Official Authorities & Help
            </h2>
            <div className="space-y-4">
              {links.map((link, i) => (
                <a 
                  key={i} 
                  href={link.url}
                  className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-white/5 hover:border-cyber-secondary/30 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-cyber-secondary group-hover:scale-150 transition-transform" />
                    <h3 className="font-bold text-gray-200">{link.title}</h3>
                  </div>
                  <ExternalLink className="h-5 w-5 text-gray-500 group-hover:text-cyber-secondary transition-colors" />
                </a>
              ))}
            </div>
            
            <div className="mt-8 p-6 bg-red-500/10 border border-red-500/30 rounded-xl">
              <h3 className="text-red-400 font-bold mb-2">Emergency Contact</h3>
              <p className="text-sm text-gray-300">If you are a victim of financial cyber fraud, immediately call the National Cyber Crime Helpline at <span className="font-bold text-white">1930</span> or visit <a href="#" className="text-cyber-neon hover:underline">cybercrime.gov.in</a>.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
