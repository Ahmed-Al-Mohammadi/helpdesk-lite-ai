import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Headphones, Mail, Lock, ArrowRight, Chrome } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/my-tickets");
    }, 1200);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left: Dark Branding */}
      <div className="hidden lg:flex lg:w-1/2 gradient-dark flex-col justify-between p-14 relative overflow-hidden">
        {/* Glow blobs */}
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full blur-3xl opacity-20" style={{background:"var(--primary)"}} />
        <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full blur-3xl opacity-10" style={{background:"var(--info)"}} />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-primary">
            <Headphones className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-bold text-2xl tracking-tight">
            HelpDesk <span style={{color:"var(--primary)"}}>Lite</span>
          </span>
        </div>

        {/* Middle content */}
        <div className="relative z-10">
          <h1 className="text-4xl xl:text-5xl font-extrabold text-white leading-tight mb-5">
            Streamlining support
            <span className="block mt-1" style={{
              background:"linear-gradient(90deg, #2563EB, #60A5FA)",
              WebkitBackgroundClip:"text",
              WebkitTextFillColor:"transparent"
            }}>for modern teams.</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-sm leading-relaxed">
            Connect your workspace, automate your workflow, and deliver exceptional support experiences at enterprise scale.
          </p>

          {/* Feature highlights */}
          <div className="mt-10 space-y-4">
            {[
              "Submit & track tickets in real-time",
              "Role-based access for IT & employees",
              "Live KPI dashboards for managers",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <span className="text-slate-300 text-sm">{item}</span>
              </div>
            ))}
          </div>

          {/* Social proof */}
          <div className="mt-12 flex items-center gap-4">
            <div className="flex -space-x-2">
              {[1,2,5,3].map((n) => (
                <img key={n} src="https://storage.googleapis.com/uxpilot-auth.appspot.com/default-placeholder.png"
                  className="w-9 h-9 rounded-full ring-2 ring-[var(--dark)] object-cover" alt="" />
              ))}
            </div>
            <p className="text-slate-400 text-sm">
              <span className="text-white font-bold">2,400+</span> organizations trust HelpDesk Lite
            </p>
          </div>
        </div>

        {/* Bottom dark card */}
        <div className="relative z-10 glass rounded-2xl p-5 border border-white/10">
          <p className="text-slate-300 text-sm italic leading-relaxed">
            "We cut ticket resolution time by 40% in the first month. The admin dashboard alone is worth it."
          </p>
          <div className="flex items-center gap-3 mt-4">
            <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg"
              className="w-8 h-8 rounded-full object-cover" alt="Sarah Chen" />
            <div>
              <p className="text-white text-sm font-semibold">Sarah Chen</p>
              <p className="text-slate-500 text-xs">IT Director @ Veritas Inc.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Auth Form */}
      <div className="w-full lg:w-1/2 bg-surface flex items-center justify-center p-6 md:p-12 overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Headphones className="w-4 h-4 text-white" />
            </div>
            <span className="text-dark font-bold text-lg">HelpDesk <span style={{color:"var(--primary)"}}>Lite</span></span>
          </div>

          <h2 className="text-3xl font-extrabold text-dark mb-1">Welcome back</h2>
          <p className="text-muted text-base mb-8">Sign in to access your support portal.</p>

          {/* SSO Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              onClick={() => navigate("/my-tickets")}
              className="flex items-center justify-center gap-2 border border-border rounded-xl py-3 text-sm font-semibold text-dark hover:bg-background transition-all"
            >
              {/* Google icon SVG */}
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
            <button
              onClick={() => navigate("/my-tickets")}
              className="flex items-center justify-center gap-2 border border-border rounded-xl py-3 text-sm font-semibold text-dark hover:bg-background transition-all"
            >
              {/* Microsoft icon */}
              <svg className="w-4 h-4" viewBox="0 0 23 23">
                <rect x="1"  y="1"  width="10" height="10" fill="#F25022"/>
                <rect x="12" y="1"  width="10" height="10" fill="#7FBA00"/>
                <rect x="1"  y="12" width="10" height="10" fill="#00A4EF"/>
                <rect x="12" y="12" width="10" height="10" fill="#FFB900"/>
              </svg>
              Microsoft
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs uppercase font-semibold text-muted-light tracking-widest">Or with email</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-dark ml-0.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-light pointer-events-none" />
                <input
                  type="email" required value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-background text-dark placeholder:text-muted-light text-sm focus:outline-none focus:ring-2 focus:border-primary transition-all"
                  style={{"--tw-ring-color":"rgba(37,99,235,0.2)"} as React.CSSProperties}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-dark ml-0.5">Password</label>
                <button type="button" className="text-xs font-semibold text-primary hover:opacity-70 transition-opacity">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-light pointer-events-none" />
                <input
                  type="password" required value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-background text-dark placeholder:text-muted-light text-sm focus:outline-none focus:ring-2 focus:border-primary transition-all"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" className="w-4 h-4 rounded border-border accent-primary" />
              <label htmlFor="remember" className="text-sm text-muted font-medium">Remember me for 30 days</label>
            </div>

            <button
              type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-primary text-white font-bold text-base py-3.5 rounded-xl shadow-primary hover:opacity-90 transition-all disabled:opacity-70"
            >
              {loading ? (
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z" />
                </svg>
              ) : <><span>Sign In</span><ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          <p className="text-center text-sm text-muted mt-6">
            No account yet?{" "}
            <button onClick={() => navigate("/")} className="text-primary font-bold hover:opacity-70 transition-opacity">
              Start 14-day free trial
            </button>
          </p>

          <p className="text-center text-xs text-muted-light mt-8">
            <button onClick={() => navigate("/admin")} className="underline hover:text-muted transition-colors">
              View Admin Dashboard →
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}