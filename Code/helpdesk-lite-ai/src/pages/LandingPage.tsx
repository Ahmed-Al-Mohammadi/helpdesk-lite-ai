import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Headphones,
  Sparkles,
  ArrowRight,
  Play,
  Zap,
  ShieldCheck,
  BarChart3,
  Bell,
  Users,
  Smartphone,
  Star,
  Check,
} from 'lucide-react';
import { ScrollReveal } from '@/components/Animations';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0B1120] text-white font-sans antialiased">
      {/* Nav */}
      <nav className="relative z-20 max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center">
            <Headphones className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-semibold tracking-tight">HelpDesk Lite</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-sm text-gray-200 hover:text-white transition-colors">Sign in</Link>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/login"
              className="block text-sm bg-blue-600 hover:bg-blue-500 transition-colors px-4 py-2 rounded-lg font-medium"
            >
              Get Started
            </Link>
          </motion.div>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/20 via-transparent to-transparent pointer-events-none" />
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-blue-600/20 blur-[120px] pointer-events-none"
          aria-hidden
        />
        <div className="relative z-10 max-w-5xl mx-auto px-6 pt-20 pb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-blue-300 mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Now with AI-powered ticket routing</span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-400">v2.0</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6"
          >
            Support that
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              just works.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            HelpDesk Lite gives modern teams a lightning-fast way to submit, track, and resolve
            internal support tickets — without the bloat of enterprise software.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/login"
                className="group inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 transition-colors px-6 py-3.5 rounded-xl font-semibold text-base shadow-lg shadow-blue-600/30"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <button className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors px-6 py-3.5 rounded-xl font-medium text-base">
                <Play className="w-4 h-4" />
                Watch Demo
              </button>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center justify-center gap-3 text-sm text-gray-400"
          >
            <div className="flex -space-x-2">
              {['A', 'B', 'C', 'D'].map((s, i) => (
                <div
                  key={s}
                  className={`w-8 h-8 rounded-full border-2 border-[#0B1120] flex items-center justify-center text-xs font-semibold ${
                    ['bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-rose-500'][i]
                  }`}
                >
                  {s}
                </div>
              ))}
            </div>
            <span>Trusted by 2,400+ teams worldwide</span>
          </motion.div>
        </div>
      </header>

      {/* Product preview */}
      <ScrollReveal className="relative z-10 max-w-6xl mx-auto px-6 pb-24">
        <motion.div
          whileHover={{ y: -4 }}
          className="rounded-2xl border border-white/10 bg-white/5 p-2 shadow-2xl shadow-blue-950/40 transition-shadow"
        >
          <div className="rounded-xl overflow-hidden bg-[#0F172A]">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500/70" />
                <div className="w-3 h-3 rounded-full bg-amber-500/70" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
              </div>
              <div className="mx-auto text-xs text-gray-500 bg-black/30 px-3 py-1 rounded-md">
                app.helpdesklite.io/admin
              </div>
            </div>
            <div className="flex">
              <div className="hidden md:block w-52 bg-[#0B1120] border-r border-white/10 p-4">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-7 h-7 rounded-md bg-blue-600 flex items-center justify-center">
                    <Headphones className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold">HelpDesk Lite</span>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-blue-600/20 text-blue-300">
                    <BarChart3 className="w-4 h-4" /> Dashboard
                  </div>
                  {['All Tickets', 'My Tickets', 'Urgent', 'Resolved'].map((l) => (
                    <div key={l} className="flex items-center gap-2 px-2 py-1.5 rounded-md text-gray-400">
                      <div className="w-4 h-4" /> {l}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1 p-5">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                  {[
                    ['Open Tickets', '42', 'text-blue-400'],
                    ['Urgent', '7', 'text-rose-400'],
                    ['Resolved Today', '31', 'text-emerald-400'],
                    ['Avg Response', '18m', 'text-amber-400'],
                  ].map(([label, val, color]) => (
                    <div key={label} className="rounded-lg border border-white/10 bg-white/5 p-3">
                      <div className="text-xs text-gray-500 mb-1">{label}</div>
                      <div className={`text-xl font-semibold ${color}`}>{val}</div>
                    </div>
                  ))}
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 overflow-hidden">
                  <div className="px-4 py-3 border-b border-white/10 text-sm font-medium">
                    Recent Tickets
                  </div>
                  <div className="divide-y divide-white/5">
                    {['#TK-1041 Sarah Chen', '#TK-1040 James Liu', '#TK-1039 Maria Gomez'].map((t) => (
                      <div key={t} className="px-4 py-2.5 text-xs text-gray-400 flex items-center justify-between">
                        <span>{t}</span>
                        <span className="px-2 py-0.5 rounded bg-blue-600/20 text-blue-300">Open</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </ScrollReveal>

      {/* Features */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20">
        <ScrollReveal className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Why Teams Love It
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Everything you need to keep your internal support running smoothly — nothing you don't.
          </p>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { icon: Zap, title: 'Instant Routing', desc: 'Tickets auto-assign to the right team based on category, urgency, and workload.' },
            { icon: ShieldCheck, title: 'Role-Based Access', desc: 'Admins, agents, and employees each see exactly what they need — nothing more.' },
            { icon: BarChart3, title: 'Live Analytics', desc: 'Real-time dashboards show response times, resolution rates, and bottlenecks.' },
            { icon: Bell, title: 'Smart Notifications', desc: 'Get pinged only when it matters. Quiet by default, loud when urgent.' },
            { icon: Users, title: 'Multi-Department', desc: 'Route across IT, HR, Facilities, and more — each with its own queue and SLAs.' },
            { icon: Smartphone, title: 'Mobile First', desc: 'Submit and track tickets from any device. No app install required.' },
          ].map((f, i) => (
            <ScrollReveal key={f.title} delay={i * 0.08}>
              <motion.div
                whileHover={{ scale: 1.04, y: -4 }}
                className="group rounded-2xl border border-white/10 bg-white/5 hover:bg-white/[0.07] hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-900/30 transition-all p-6 h-full"
              >
                <div className="w-11 h-11 rounded-xl bg-blue-600/15 border border-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <f.icon className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Logos */}
      <ScrollReveal className="max-w-5xl mx-auto px-6 py-12">
        <p className="text-center text-xs uppercase tracking-widest text-gray-500 mb-8">
          Trusted by teams at
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 opacity-60">
          {['Acme Corp', 'Vertex Inc', 'Nimbus Co', 'Quanta Labs', 'Northwind', 'Helios'].map((c) => (
            <span key={c} className="text-lg font-semibold text-gray-400 tracking-tight">{c}</span>
          ))}
        </div>
      </ScrollReveal>

      {/* Bottom CTA */}
      <ScrollReveal className="max-w-5xl mx-auto px-6 py-20">
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="relative rounded-3xl bg-gradient-to-br from-blue-600 to-blue-800 p-10 md:p-14 text-center overflow-hidden"
        >
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 30% 20%, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} aria-hidden />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-white text-white" />
              ))}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Ready to simplify your support workflow?
            </h2>
            <p className="text-blue-100 max-w-lg mx-auto mb-8">
              Join thousands of teams who replaced messy email threads with a clean, fast ticketing system.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 bg-white text-blue-700 hover:bg-blue-50 transition-colors px-6 py-3.5 rounded-xl font-semibold shadow-lg"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <div className="mt-6 flex items-center justify-center gap-5 text-sm text-blue-100">
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4" /> Free 14-day trial</span>
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4" /> No credit card</span>
            </div>
          </div>
        </motion.div>
      </ScrollReveal>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-blue-600 flex items-center justify-center">
              <Headphones className="w-4 h-4" />
            </div>
            <span className="font-semibold">HelpDesk Lite</span>
            <span className="text-sm text-gray-500 ml-2">© 2026</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Security</a>
            <a href="#" className="hover:text-white transition-colors">Status</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
