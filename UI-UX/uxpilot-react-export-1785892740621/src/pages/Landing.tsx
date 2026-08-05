import { useNavigate } from "react-router-dom";
import {
  Headphones, Zap, Shield, BarChart3, Users, Clock,
  CheckCircle, ArrowRight, Star, ChevronRight
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning-Fast Ticketing",
    description: "Submit, track, and resolve support issues in seconds with our streamlined intake flow.",
    color: "text-warning",
    bg: "bg-amber-50",
  },
  {
    icon: Shield,
    title: "Enterprise-Grade Security",
    description: "SSO, role-based access, and audit logs keep your internal data protected at every layer.",
    color: "text-success",
    bg: "bg-emerald-50",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description: "Live dashboards give IT managers full visibility over ticket volume, SLAs, and team performance.",
    color: "text-primary",
    bg: "bg-primary-light",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Assign, comment, and escalate tickets across departments without leaving the portal.",
    color: "text-info",
    bg: "bg-cyan-50",
  },
  {
    icon: Clock,
    title: "SLA Management",
    description: "Set custom response targets per priority level and get automated alerts before breaches.",
    color: "text-danger",
    bg: "bg-red-50",
  },
  {
    icon: CheckCircle,
    title: "Self-Service Portal",
    description: "Empower employees with a knowledge base and smart suggestions before they even submit.",
    color: "text-success",
    bg: "bg-emerald-50",
  },
];

const stats = [
  { value: "2,400+", label: "Active Organizations" },
  { value: "98.9%", label: "Uptime SLA" },
  { value: "< 4 min", label: "Avg. First Response" },
  { value: "4.9 / 5", label: "Customer Rating" },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "IT Director @ Veritas Inc.",
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg",
    quote: "We cut ticket resolution time by 40% in the first month. The admin dashboard alone is worth it.",
  },
  {
    name: "Marcus Webb",
    role: "Head of Operations @ Novex",
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg",
    quote: "Our IT team finally has visibility across departments. HelpDesk Lite is an absolute game-changer.",
  },
  {
    name: "Priya Nair",
    role: "CTO @ Prism Labs",
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg",
    quote: "Setup took under 30 minutes and the SSO integration worked perfectly with our Azure AD.",
  },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-dark overflow-x-hidden">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16 glass border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Headphones className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-bold text-lg">HelpDesk <span className="text-primary" style={{color:"var(--primary)"}}>Lite</span></span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-slate-400 hover:text-white transition-colors">Features</a>
          <a href="#stats"    className="text-sm text-slate-400 hover:text-white transition-colors">About</a>
          <a href="#testimonials" className="text-sm text-slate-400 hover:text-white transition-colors">Reviews</a>
        </nav>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/login")}
            className="text-sm font-semibold text-slate-300 hover:text-white transition-colors px-4 py-2"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:opacity-90 transition-all shadow-primary"
          >
            Get Started Free
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-32 pb-24 px-6 md:px-12 flex flex-col items-center text-center overflow-hidden">
        {/* Background glows */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full opacity-20 pointer-events-none"
             style={{background:"radial-gradient(ellipse at center, #2563EB 0%, transparent 70%)"}} />
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl opacity-10 bg-primary" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-3xl opacity-10 bg-info" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6 text-sm text-slate-300 border border-white/10">
            <Star className="w-3.5 h-3.5 text-warning fill-current" />
            Rated #1 Internal Helpdesk by G2 — Spring 2025
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
            IT Support that
            <span className="block" style={{
              background: "linear-gradient(90deg, #2563EB, #60A5FA)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              actually works.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            HelpDesk Lite is the modern internal ticketing platform that connects employees and IT teams — built for clarity, speed, and enterprise-grade reliability.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate("/submit")}
              className="flex items-center gap-2 bg-primary text-white font-bold text-base px-8 py-4 rounded-xl hover:opacity-90 transition-all shadow-primary"
            >
              Submit a Ticket <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate("/admin")}
              className="flex items-center gap-2 glass text-white font-semibold text-base px-8 py-4 rounded-xl hover:bg-white/10 transition-all"
            >
              View Admin Demo <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Hero screenshot mockup */}
        <div className="relative z-10 mt-16 w-full max-w-5xl mx-auto">
          <div className="glass rounded-2xl p-2 border border-white/10 shadow-2xl">
            <div className="bg-dark-mid rounded-xl overflow-hidden" style={{height:"360px"}}>
              <div className="h-8 bg-dark flex items-center px-4 gap-2 border-b border-white/10">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-4 text-xs text-slate-500">app.helpdeskite.io/admin</span>
              </div>
              <div className="p-6 grid grid-cols-4 gap-4">
                {[
                  { label: "Open Tickets", val: "47", color: "bg-primary/20 text-primary" },
                  { label: "Resolved Today", val: "12", color: "bg-success/20 text-success" },
                  { label: "Avg. Response", val: "3.8m", color: "bg-warning/20 text-warning" },
                  { label: "SLA Breaches", val: "2", color: "bg-danger/20 text-danger" },
                ].map((k) => (
                  <div key={k.label} className="glass rounded-xl p-4 flex flex-col gap-1">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-md w-fit ${k.color}`}>{k.label}</span>
                    <span className="text-2xl font-extrabold text-white mt-1">{k.val}</span>
                  </div>
                ))}
                <div className="col-span-4 glass rounded-xl p-4">
                  <div className="text-xs text-slate-500 mb-3 font-semibold uppercase tracking-wider">Recent Tickets</div>
                  <div className="space-y-2">
                    {[
                      { id: "#1042", title: "VPN not connecting", dept: "IT", priority: "High", status: "Open" },
                      { id: "#1041", title: "Excel license expired", dept: "Finance", priority: "Medium", status: "In Progress" },
                      { id: "#1040", title: "New monitor request", dept: "Design", priority: "Low", status: "Resolved" },
                    ].map((t) => (
                      <div key={t.id} className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0">
                        <span className="text-xs text-slate-500 w-12">{t.id}</span>
                        <span className="text-sm text-slate-300 flex-1 ml-3">{t.title}</span>
                        <span className="text-xs text-slate-500 w-20 hidden md:block">{t.dept}</span>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          t.priority === "High" ? "bg-danger/20 text-danger" :
                          t.priority === "Medium" ? "bg-warning/20 text-warning" :
                          "bg-success/20 text-success"
                        }`}>{t.priority}</span>
                        <span className={`ml-3 text-xs font-semibold px-2 py-0.5 rounded-full ${
                          t.status === "Open" ? "bg-primary/20 text-primary" :
                          t.status === "In Progress" ? "bg-info/20 text-info" :
                          "bg-success/20 text-success"
                        }`}>{t.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section id="stats" className="py-16 px-6 md:px-12 border-y border-white/10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl md:text-4xl font-extrabold text-white mb-1">{s.value}</div>
              <div className="text-sm text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-4 text-sm text-primary border border-primary/30">
              <Zap className="w-3.5 h-3.5" /> Powerful Features
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">Everything your IT team needs</h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">One platform. Every tool your support team needs to deliver exceptional employee experiences.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="glass rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group cursor-default border border-white/5">
                <div className={`w-12 h-12 ${f.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <f.icon className={`w-6 h-6 ${f.color}`} />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-6 md:px-12 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Trusted by teams worldwide</h2>
            <p className="text-slate-400 text-base">Don't just take our word for it.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="glass rounded-2xl p-6 border border-white/5">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-warning fill-current" />)}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-white/10" />
                  <div>
                    <div className="text-white font-semibold text-sm">{t.name}</div>
                    <div className="text-slate-500 text-xs">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden p-12 text-center"
               style={{background:"linear-gradient(135deg, #1D4ED8 0%, #2563EB 60%, #3B82F6 100%)"}}>
            <div className="absolute inset-0 opacity-10" style={{backgroundImage:"radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize:"60px 60px"}} />
            <h2 className="relative text-3xl md:text-4xl font-extrabold text-white mb-4">Ready to modernize your IT support?</h2>
            <p className="relative text-blue-100 text-lg mb-8 max-w-xl mx-auto">Start your 14-day free trial today. No credit card required.</p>
            <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate("/login")}
                className="bg-white text-primary font-bold text-base px-8 py-4 rounded-xl hover:bg-blue-50 transition-all shadow-lg"
              >
                Start Free Trial
              </button>
              <button
                onClick={() => navigate("/admin")}
                className="text-white font-semibold text-base px-8 py-4 rounded-xl border border-white/40 hover:bg-white/10 transition-all"
              >
                View Live Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 md:px-12 border-t border-white/10 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
            <Headphones className="w-3 h-3 text-white" />
          </div>
          <span className="text-white font-bold">HelpDesk Lite</span>
        </div>
        <p className="text-slate-500 text-sm">© 2025 HelpDesk Lite. All rights reserved.</p>
      </footer>
    </div>
  );
}