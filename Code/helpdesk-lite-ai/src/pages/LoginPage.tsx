import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Headphones, Mail, Lock, Eye, EyeOff, ArrowRight, Shield, User } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { setRole } = useApp();
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);

  const loginAs = (r: 'admin' | 'employee') => {
    setRole(r);
    navigate(r === 'admin' ? '/admin' : '/my-tickets');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAs('admin');
  };

  return (
    <div className="min-h-screen flex font-sans">
      {/* Left dark panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0B1120] text-white relative overflow-hidden flex-col justify-between p-12">
        <div
          className="absolute -top-32 -left-20 w-[500px] h-[500px] rounded-full bg-blue-600/25 blur-[120px] pointer-events-none"
          aria-hidden
        />
        <div
          className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-blue-500/10 blur-[100px] pointer-events-none"
          aria-hidden
        />
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 flex items-center gap-2.5"
        >
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center">
            <Headphones className="w-5 h-5" />
          </div>
          <span className="text-lg font-semibold tracking-tight">HelpDesk Lite</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative z-10"
        >
          <h1 className="text-4xl xl:text-5xl font-bold tracking-tight leading-tight mb-4">
            Streamlining support
            <br />
            for modern teams
          </h1>
          <p className="text-gray-400 text-lg max-w-md leading-relaxed">
            Submit, track, and resolve internal tickets in one clean, lightning-fast workspace.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative z-10 flex items-center gap-6 text-sm text-gray-400"
        >
          <div>
            <div className="text-2xl font-bold text-white">2,400+</div>
            <div>Teams onboarded</div>
          </div>
          <div className="w-px h-10 bg-white/10" />
          <div>
            <div className="text-2xl font-bold text-white">18m</div>
            <div>Avg response</div>
          </div>
          <div className="w-px h-10 bg-white/10" />
          <div>
            <div className="text-2xl font-bold text-white">99.9%</div>
            <div>Uptime</div>
          </div>
        </motion.div>
      </div>

      {/* Right white panel */}
      <div className="flex-1 flex items-center justify-center bg-white p-6 sm:p-10">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center">
              <Headphones className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-gray-900">HelpDesk Lite</span>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-1.5">Welcome Back</h2>
            <p className="text-gray-500 mb-8">Sign in to your HelpDesk Lite account to continue.</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    required
                    defaultValue="sarah.chen@company.com"
                    placeholder="you@company.com"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <a href="#" className="text-xs text-blue-600 hover:text-blue-500 font-medium">Forgot password?</a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    defaultValue="password"
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-11 py-3 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                Remember me
              </label>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="group w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 transition-colors text-white font-semibold py-3 rounded-lg shadow-lg shadow-blue-600/20"
              >
                Sign In
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </motion.button>
            </form>

            {/* Quick login */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-3 text-xs text-gray-400 uppercase tracking-wider">Quick demo login</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => loginAs('admin')}
                className="flex items-center justify-center gap-2 border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors py-2.5 rounded-lg text-sm font-medium text-gray-700"
              >
                <Shield className="w-4 h-4 text-blue-600" />
                IT Admin
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => loginAs('employee')}
                className="flex items-center justify-center gap-2 border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition-colors py-2.5 rounded-lg text-sm font-medium text-gray-700"
              >
                <User className="w-4 h-4 text-emerald-600" />
                Employee
              </motion.button>
            </div>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-3 text-xs text-gray-400 uppercase tracking-wider">or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 transition-colors py-2.5 rounded-lg text-sm font-medium text-gray-700">
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </motion.button>
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 transition-colors py-2.5 rounded-lg text-sm font-medium text-gray-700">
                <svg className="w-4 h-4" viewBox="0 0 23 23">
                  <path fill="#F25022" d="M1 1h10v10H1z"/>
                  <path fill="#7FBA00" d="M12 1h10v10H12z"/>
                  <path fill="#00A4EF" d="M1 12h10v10H1z"/>
                  <path fill="#FFB900" d="M12 12h10v10H12z"/>
                </svg>
                Microsoft
              </motion.button>
            </div>

            <p className="text-center text-sm text-gray-500 mt-8">
              Don&apos;t have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-500 font-medium">Sign up free</Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
