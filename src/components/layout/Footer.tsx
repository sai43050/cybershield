import { Link } from 'react-router-dom';
import { Shield, Globe, MessageSquare, Users, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-cyber-darker border-t border-white/10 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <Shield className="h-6 w-6 text-cyber-neon group-hover:text-cyber-primary transition-colors" />
              <span className="font-bold text-xl text-white">Cyber<span className="text-cyber-primary">Shield</span></span>
            </Link>
            <p className="text-sm mb-4">
              Empowering the community with knowledge to stay safe in the digital world. A community service initiative.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Website</span>
                <Globe className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Community</span>
                <Users className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Contact</span>
                <MessageSquare className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Learn</h3>
            <ul className="space-y-2">
              <li><Link to="/learn" className="text-sm hover:text-cyber-neon transition-colors">Phishing</Link></li>
              <li><Link to="/learn" className="text-sm hover:text-cyber-neon transition-colors">Malware</Link></li>
              <li><Link to="/learn" className="text-sm hover:text-cyber-neon transition-colors">Password Security</Link></li>
              <li><Link to="/learn" className="text-sm hover:text-cyber-neon transition-colors">Social Engineering</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Tools & Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/tools" className="text-sm hover:text-cyber-neon transition-colors">Password Checker</Link></li>
              <li><Link to="/tools" className="text-sm hover:text-cyber-neon transition-colors">Scam Detector</Link></li>
              <li><Link to="/quiz" className="text-sm hover:text-cyber-neon transition-colors">Security Quiz</Link></li>
              <li><Link to="/resources" className="text-sm hover:text-cyber-neon transition-colors">Downloads</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Help</h3>
            <ul className="space-y-2">
              <li><Link to="/emergency" className="text-sm hover:text-cyber-neon transition-colors">Emergency Contacts</Link></li>
              <li><Link to="/faq" className="text-sm hover:text-cyber-neon transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="text-sm hover:text-cyber-neon transition-colors">Contact Us</Link></li>
            </ul>
            <div className="mt-4 flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4" />
              <a href="mailto:support@cybershield.com" className="hover:text-white transition-colors">support@cybershield.com</a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/10 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} CyberShield Awareness Project. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
