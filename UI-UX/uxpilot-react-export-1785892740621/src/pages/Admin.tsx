import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Ticket, Users, BarChart3, Settings, LogOut,
  Headphones, Search, Filter, ChevronDown, MoreHorizontal,
  TrendingUp, TrendingDown, Clock, CheckCircle2, AlertTriangle, Loader2
} from "lucide-react";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from "recharts";

type Status = "Open" | "In Progress" | "Resolved" | "Closed";
type Priority = "Low" | "Medium" | "High";

interface AdminTicket {
  id: string;
  title: string;
  requester: string;
  avatar: string;
  department: string;
  priority: Priority;
  status: Status;
  assignee: string;
  submitted: string;
}

const tickets: AdminTicket[] = [
  { id: "#1047", title: "VPN disconnects every 20 minutes",   requester: "Alex Rivers",   avatar: "2", department: "IT",       priority: "High",   status: "In Progress", assignee: "James K.",  submitted: "Today, 9:14 AM"  },
  { id: "#1046", title: "Laptop keyboard unresponsive",        requester: "Sarah Chen",    avatar: "1", department: "Legal",    priority: "High",   status: "Open",        assignee: "Unassigned", submitted: "Today, 8:50 AM"  },
  { id: "#1045", title: "Microsoft 365 activation error",      requester: "Marcus Webb",   avatar: "3", department: "Finance",  priority: "Medium", status: "Open",        assignee: "Priya N.",  submitted: "Today, 8:30 AM"  },
  { id: "#1044", title: "Printer offline in 3rd floor office", requester: "Leila Hassan",  avatar: "6", department: "HR",       priority: "Low",    status: "In Progress", assignee: "James K.",  submitted: "Yesterday, 4:10 PM" },
  { id: "#1043", title: "Request for second monitor",          requester: "Tom Nakamura",  avatar: "4", department: "Design",   priority: "Low",    status: "Open",        assignee: "Unassigned", submitted: "Yesterday, 2:30 PM" },
  { id: "#1042", title: "Zoom audio not working in conf room", requester: "Priya Nair",    avatar: "5", department: "Ops",      priority: "Medium", status: "Resolved",    assignee: "Priya N.",  submitted: "Jun 12, 10:00 AM" },
  { id: "#1041", title: "Excel license expired on shared drive", requester: "Sam Torres",  avatar: "8", department: "Finance",  priority: "Medium", status: "Resolved",    assignee: "James K.",  submitted: "Jun 11, 11:00 AM" },
  { id: "#1040", title: "Slack notifications not working",      requester: "Nina Osei",    avatar: "7", department: "Marketing",priority: "Low",    status: "Closed",      assignee: "Priya N.",  submitted: "Jun 10, 4:00 PM"  },
];

const weeklyData = [
  { day: "Mon", submitted: 8,  resolved: 5  },
  { day: "Tue", submitted: 12, resolved: 9  },
  { day: "Wed", submitted: 7,  resolved: 11 },
  { day: "Thu", submitted: 15, resolved: 10 },
  { day: "Fri", submitted: 10, resolved: 13 },
  { day: "Sat", submitted: 4,  resolved: 6  },
  { day: "Sun", submitted: 2,  resolved: 3  },
];

const trendData = [
  { week: "W1", time: 5.2 },
  { week: "W2", time: 4.8 },
  { week: "W3", time: 4.1 },
  { week: "W4", time: 3.8 },
];

const statusConfig: Record<Status, { bg: string; text: string; icon: React.ComponentType<{className?: string}> }> = {
  "Open":        { bg: "bg-primary/10",  text: "text-primary", icon: AlertTriangle },
  "In Progress": { bg: "bg-info/10",     text: "text-info",    icon: Loader2 },
  "Resolved":    { bg: "bg-success/10",  text: "text-success", icon: CheckCircle2 },
  "Closed":      { bg: "bg-slate-100",   text: "text-muted",   icon: CheckCircle2 },
};

const priorityConfig: Record<Priority, { bg: string; text: string }> = {
  High:   { bg: "bg-danger/10",   text: "text-danger" },
  Medium: { bg: "bg-warning/10",  text: "text-warning" },
  Low:    { bg: "bg-success/10",  text: "text-success" },
};

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard",    path: "#",          active: true  },
  { icon: Ticket,          label: "All Tickets",  path: "#",          active: false },
  { icon: Users,           label: "Team",         path: "#",          active: false },
  { icon: BarChart3,       label: "Analytics",    path: "#",          active: false },
  { icon: Settings,        label: "Settings",     path: "#",          active: false },
];

const kpis = [
  { label: "Open Tickets",    value: "47",  change: "+5 today",  up: false, color: "text-primary", bg: "bg-primary/10",  icon: Ticket },
  { label: "Resolved Today",  value: "12",  change: "+3 vs. avg",up: true,  color: "text-success", bg: "bg-success/10",  icon: CheckCircle2 },
  { label: "Avg. Response",   value: "3.8m",change: "-0.4m",     up: true,  color: "text-warning", bg: "bg-warning/10",  icon: Clock },
  { label: "SLA Breaches",    value: "2",   change: "Critical",  up: false, color: "text-danger",  bg: "bg-danger/10",   icon: AlertTriangle },
];

export default function Admin() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<"All" | Priority>("All");

  const filtered = tickets.filter((t) => {
    const m = t.title.toLowerCase().includes(search.toLowerCase()) ||
              t.requester.toLowerCase().includes(search.toLowerCase()) ||
              t.id.toLowerCase().includes(search.toLowerCase());
    const p = priorityFilter === "All" || t.priority === priorityFilter;
    return m && p;
  });

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-dark flex-shrink-0 flex flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center gap-2.5 px-5 border-b border-white/10">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Headphones className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-bold text-lg">HelpDesk<span style={{color:"var(--primary)"}}>Lite</span></span>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          <div className="px-3 pt-3 pb-1">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Main</span>
          </div>
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                item.active
                  ? "bg-primary text-white shadow-primary"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {item.label}
              {item.label === "All Tickets" && (
                <span className="ml-auto bg-white/10 text-white text-xs px-2 py-0.5 rounded-full">
                  {tickets.filter(t => t.status !== "Closed").length}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Admin user */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-9.jpg"
              className="w-9 h-9 rounded-full object-cover ring-2 ring-white/10" alt="Admin" />
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-bold truncate">James Kim</p>
              <p className="text-slate-500 text-xs">IT Administrator</p>
            </div>
            <button onClick={() => navigate("/login")} className="text-slate-500 hover:text-danger transition-colors p-1" title="Sign out">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-surface border-b border-border flex items-center justify-between px-6">
          <div>
            <h1 className="text-lg font-extrabold text-dark">Dashboard</h1>
            <p className="text-xs text-muted">Monday, June 16 · Welcome back, James</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/submit")}
              className="flex items-center gap-1.5 bg-primary text-white text-sm font-bold px-4 py-2 rounded-lg shadow-primary hover:opacity-90 transition-all"
            >
              <Ticket className="w-3.5 h-3.5" /> New Ticket
            </button>
            <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-9.jpg"
              className="w-9 h-9 rounded-full object-cover ring-2 ring-border" alt="" />
          </div>
        </header>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
            {kpis.map((k) => (
              <div key={k.label} className="bg-surface rounded-2xl border border-border p-5 shadow-card">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 ${k.bg} rounded-xl flex items-center justify-center`}>
                    <k.icon className={`w-5 h-5 ${k.color}`} />
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
                    k.up ? "bg-success/10 text-success" : "bg-danger/10 text-danger"
                  }`}>
                    {k.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {k.change}
                  </div>
                </div>
                <div className="text-3xl font-extrabold text-dark">{k.value}</div>
                <div className="text-sm text-muted mt-0.5">{k.label}</div>
              </div>
            ))}
          </div>

          {/* Charts row */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            {/* Bar chart */}
            <div className="xl:col-span-2 bg-surface rounded-2xl border border-border p-5 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-dark">Weekly Ticket Volume</h3>
                  <p className="text-xs text-muted">Submitted vs. Resolved this week</p>
                </div>
                <span className="text-xs font-semibold text-muted-light border border-border rounded-lg px-3 py-1">Last 7 days</span>
              </div>
              <div style={{height:"200px"}}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyData} barGap={4} barCategoryGap="30%">
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize:12, fill:"var(--muted)"}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize:12, fill:"var(--muted)"}} />
                    <Tooltip
                      contentStyle={{background:"var(--surface)", border:"1px solid var(--border)", borderRadius:"12px", fontSize:12}}
                      cursor={{fill:"var(--background)"}}
                    />
                    <Bar dataKey="submitted" name="Submitted" fill="var(--primary)" radius={[6,6,0,0]} />
                    <Bar dataKey="resolved"  name="Resolved"  fill="var(--success)"  radius={[6,6,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Line chart */}
            <div className="bg-surface rounded-2xl border border-border p-5 shadow-card">
              <div className="mb-4">
                <h3 className="font-bold text-dark">Avg. Response Time</h3>
                <p className="text-xs text-muted">Weekly trend (minutes)</p>
              </div>
              <div style={{height:"200px"}}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{fontSize:12, fill:"var(--muted)"}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize:12, fill:"var(--muted)"}} domain={[2,7]} />
                    <Tooltip
                      contentStyle={{background:"var(--surface)", border:"1px solid var(--border)", borderRadius:"12px", fontSize:12}}
                    />
                    <Line type="monotone" dataKey="time" name="Avg. Mins" stroke="var(--primary)" strokeWidth={3} dot={{fill:"var(--primary)", r:4}} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-success" />
                <span className="text-xs font-semibold text-success">Improving 8% week-over-week</span>
              </div>
            </div>
          </div>

          {/* Ticket Table */}
          <div className="bg-surface rounded-2xl border border-border shadow-card overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex flex-col sm:flex-row sm:items-center gap-3">
              <div>
                <h3 className="font-bold text-dark">All Tickets</h3>
                <p className="text-xs text-muted">{filtered.length} tickets shown</p>
              </div>
              <div className="sm:ml-auto flex items-center gap-3">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-light pointer-events-none" />
                  <input
                    type="text" placeholder="Search…" value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9 pr-4 py-2 rounded-lg border border-border bg-background text-sm text-dark placeholder:text-muted-light focus:outline-none focus:ring-2 focus:border-primary transition-all w-48"
                  />
                </div>
                {/* Priority filter */}
                <div className="relative">
                  <select
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value as "All" | Priority)}
                    className="appearance-none pl-8 pr-8 py-2 rounded-lg border border-border bg-background text-sm text-dark focus:outline-none focus:ring-2 focus:border-primary transition-all"
                  >
                    <option value="All">All Priorities</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                  <Filter className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-light pointer-events-none" />
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-light pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-background">
                    <th className="text-left px-6 py-3 text-xs font-bold text-muted uppercase tracking-wider">Ticket</th>
                    <th className="text-left px-4 py-3 text-xs font-bold text-muted uppercase tracking-wider">Requester</th>
                    <th className="text-left px-4 py-3 text-xs font-bold text-muted uppercase tracking-wider hidden md:table-cell">Dept.</th>
                    <th className="text-left px-4 py-3 text-xs font-bold text-muted uppercase tracking-wider">Priority</th>
                    <th className="text-left px-4 py-3 text-xs font-bold text-muted uppercase tracking-wider">Status</th>
                    <th className="text-left px-4 py-3 text-xs font-bold text-muted uppercase tracking-wider hidden lg:table-cell">Assignee</th>
                    <th className="text-left px-4 py-3 text-xs font-bold text-muted uppercase tracking-wider hidden xl:table-cell">Submitted</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.map((t) => {
                    const sc = statusConfig[t.status];
                    const pc = priorityConfig[t.priority];
                    return (
                      <tr key={t.id} className="hover:bg-background transition-colors group">
                        <td className="px-6 py-4">
                          <div>
                            <span className="text-xs font-bold text-muted-light">{t.id}</span>
                            <p className="font-semibold text-dark text-sm mt-0.5 max-w-xs truncate">{t.title}</p>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/default-placeholder.png"
                              className="w-7 h-7 rounded-full object-cover flex-shrink-0" alt={t.requester} />
                            <span className="text-dark font-medium whitespace-nowrap">{t.requester}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 hidden md:table-cell">
                          <span className="text-muted text-sm">{t.department}</span>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${pc.bg} ${pc.text}`}>
                            {t.priority}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`flex items-center gap-1 w-fit text-xs font-semibold px-2.5 py-1 rounded-full ${sc.bg} ${sc.text}`}>
                            <sc.icon className="w-3 h-3" />
                            {t.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 hidden lg:table-cell">
                          <span className="text-sm text-dark font-medium">{t.assignee}</span>
                        </td>
                        <td className="px-4 py-4 hidden xl:table-cell">
                          <span className="text-sm text-muted">{t.submitted}</span>
                        </td>
                        <td className="px-4 py-4">
                          <button className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-border transition-all text-muted">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {filtered.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-dark font-bold">No tickets match your search.</p>
                  <p className="text-muted text-sm mt-1">Try adjusting the search or priority filter.</p>
                </div>
              )}
            </div>
          </div>

          {/* Footer nav hint */}
          <div className="flex items-center justify-center gap-4 pb-2 text-xs text-muted-light">
            <button onClick={() => navigate("/")} className="hover:text-primary transition-colors">← Back to Landing</button>
            <span>·</span>
            <button onClick={() => navigate("/submit")} className="hover:text-primary transition-colors">Submit Ticket</button>
            <span>·</span>
            <button onClick={() => navigate("/my-tickets")} className="hover:text-primary transition-colors">My Tickets</button>
            <span>·</span>
            <button onClick={() => navigate("/login")} className="hover:text-primary transition-colors">Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}