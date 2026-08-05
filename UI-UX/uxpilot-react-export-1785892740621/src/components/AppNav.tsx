import { useNavigate, useLocation } from "react-router-dom";
import { Headphones, Plus, Ticket, Bell, LogOut } from "lucide-react";

export default function AppNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    { path: "/submit",     label: "New Request", icon: Plus },
    { path: "/my-tickets", label: "My Tickets",  icon: Ticket },
  ];

  return (
    <header className="h-16 bg-surface border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-6">
          <button onClick={() => navigate("/")} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Headphones className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-dark text-lg hidden sm:block">
              HelpDesk <span style={{color:"var(--primary)"}}>Lite</span>
            </span>
          </button>
          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => {
              const active = location.pathname === l.path;
              return (
                <button
                  key={l.path}
                  onClick={() => navigate(l.path)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    active
                      ? "bg-primary-light text-primary"
                      : "text-muted hover:text-dark hover:bg-background"
                  }`}
                >
                  <l.icon className="w-4 h-4" />
                  {l.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <button className="p-2 text-muted hover:text-dark transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-danger" />
          </button>
          <div className="flex items-center gap-3 pl-3 border-l border-border">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-dark leading-none">Alex Rivers</p>
              <p className="text-xs text-muted mt-0.5">Employee</p>
            </div>
            <img
              src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg"
              className="w-9 h-9 rounded-full object-cover ring-2 ring-border" alt="Avatar"
            />
            <button
              onClick={() => navigate("/login")}
              className="p-2 text-muted hover:text-danger transition-colors"
              title="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}