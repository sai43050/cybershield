import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Mail, Lock, LogIn, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual Firebase Auth here.
    // auth.signInWithEmailAndPassword or auth.createUserWithEmailAndPassword
    console.log("Mock auth submission", { email, password, isSignUp });
    
    // Simulate successful login and redirect to home
    alert(isSignUp ? "Account created (Mock)" : "Logged in (Mock)");
    navigate('/');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 glass-dark p-10 rounded-3xl border-t border-white/10 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyber-primary via-cyber-secondary to-cyber-neon" />
        
        <div>
          <div className="mx-auto h-16 w-16 bg-cyber-primary/20 rounded-2xl flex items-center justify-center">
            <Shield className="h-10 w-10 text-cyber-neon" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            {isSignUp ? "Create your account" : "Sign in to your account"}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            {isSignUp ? "Join the CyberShield community" : "Welcome back, defender"}
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-xl relative block w-full pl-10 px-3 py-4 border border-white/10 bg-black/50 text-white focus:outline-none focus:ring-1 focus:ring-cyber-primary focus:border-cyber-primary sm:text-sm transition-all"
                placeholder="Email address"
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-xl relative block w-full pl-10 px-3 py-4 border border-white/10 bg-black/50 text-white focus:outline-none focus:ring-1 focus:ring-cyber-primary focus:border-cyber-primary sm:text-sm transition-all"
                placeholder="Password"
              />
            </div>
          </div>

          {!isSignUp && (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-cyber-primary focus:ring-cyber-primary border-gray-300 rounded bg-black/50"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-cyber-primary hover:text-cyber-primary/80">
                  Forgot your password?
                </a>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-cyber-primary hover:bg-cyber-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyber-primary focus:ring-offset-black transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)]"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {isSignUp ? <UserPlus className="h-5 w-5 text-white/50 group-hover:text-white transition-colors" /> : <LogIn className="h-5 w-5 text-white/50 group-hover:text-white transition-colors" />}
              </span>
              {isSignUp ? "Sign Up" : "Sign In"}
            </button>
          </div>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-cyber-dark text-gray-400">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <button
                type="button"
                className="w-full flex items-center justify-center px-4 py-3 border border-white/10 rounded-xl shadow-sm text-sm font-medium text-white bg-black/30 hover:bg-white/5 transition-colors"
              >
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                </svg>
                Google
              </button>
            </div>
          </div>
        </form>
        
        <p className="text-center text-sm text-gray-400 mt-6">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{' '}
          <button 
            onClick={() => setIsSignUp(!isSignUp)} 
            className="font-medium text-cyber-neon hover:text-cyber-neon/80"
          >
            {isSignUp ? "Sign in" : "Sign up"}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
