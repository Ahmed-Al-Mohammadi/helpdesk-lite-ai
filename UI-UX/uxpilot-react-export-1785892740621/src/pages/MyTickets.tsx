import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, ChevronRight, Clock, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import AppNav from "@/components/AppNav";

type Status = "Open" | "In Progress" | "Resolved" | "Closed";
type Priority = "Low" | "Medium" | "High";

interface Ticket {
  id: string;
  title: string;
  department: string;
  priority: Priority;
  status: Status;
  submitted: string;
  updated: string;
  description: string;
}

const mockTickets: Ticket[] = [
  {
    id: "#1047",
    title: "VPN disconnects every 20 minutes",
    department: "Information Technology",
    priority: "High",
    status: "In Progress",
    submitted: "Today, 9:14 AM",
    updated: "Today, 10:02 AM",
    description: "VPN client drops my connection repeatedly while working from home. I'm on Windows 11 using GlobalConnect v3.2.",
  },
  {
    id: "#1043",
    title: "Request for second monitor",
    department: "Design & Product",
    priority: "Low",
    status: "Open",
    submitted: "Yesterday, 2:30 PM",
    updated: "Yesterday, 2:30 PM",
    description: "My workstation setup only has one display which makes my design workflow difficult. Requesting a second 27\" monitor.",
  },
  {
    id: "#1038",
    title: "Excel license expired on shared drive",
    department: "Finance & Payroll",
    priority: "Medium",
    status: "Resolved",
    submitted: "Jun 10, 11:00 AM",
    updated: "Jun 11, 3:15 PM",
    description: "The shared Excel file on the finance drive keeps prompting for a license renewal, blocking month-end reporting.",
  },
  {
    id: "#1032",
    title: "New employee laptop setup",
    department: "Human Resources",
    priority: "Medium",
    status: "Resolved",
    submitted: "Jun 8, 8:00 AM",
    updated: "Jun 9, 1:45 PM",
    description: "Requesting laptop provisioning for two new hires starting on June 15th. Specs on file with HR.",
  },
  {
    id: "#1027",
    title: "Slack notifications not working on Mac",
    department: "Marketing",
    priority: "Low",
    status: "Closed",
    submitted: "Jun 5, 4:00 PM",
    updated: "Jun 6, 9:20 AM",
    description: "Push and desktop notifications for Slack stopped working after macOS update to Sonoma 14.5.",
  },
];

const statusConfig: Record<Status, { label: string; bg: string; text: string; icon: React.ComponentType<{className?: string}> }> = {
  "Open":        { label: "Open",        bg: "bg-primary/10",  text: "text-primary", icon: AlertCircle },
  "In Progress": { label: "In Progress", bg: "bg-info/10",     text: "text-info",    icon: Loader2 },
  "Resolved":    { label: "Resolved",    bg: "bg-success/10",  text: "text-success", icon: CheckCircle2 },
  "Closed":      { label: "Closed",      bg: "bg-slate-100",   text: "text-muted",   icon: CheckCircle2 },
};

const priorityConfig: Record<Priority, { bg: string; text: string }> = {
  High:   { bg: "bg-danger/10",   text: "text-danger" },
  Medium: { bg: "bg-warning/10",  text: "text-warning" },
  Low:    { bg: "bg-success/10",  text: "text-success" },
};

export default function MyTickets() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"All" | Status>("All");
  const [selected, setSelected] = useState<Ticket | null>(null);

  const filtered = mockTickets.filter((t) => {
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) ||
                        t.id.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || t.status === filter;
    return matchSearch && matchFilter;
  });

  const stats = {
    total: mockTickets.length,
    open: mockTickets.filter((t) => t.status === "Open").length,
    inProgress: mockTickets.filter((t) => t.status === "In Progress").length,
    resolved: mockTickets.filter((t) => t.status === "Resolved" || t.status === "Closed").length,
  };

  return (
    <div className="min-h-screen bg-background">
      <AppNav />
      <main className="max-w-6xl mx-auto py-10 px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-extrabold text-dark">My Tickets</h1>
            <p className="text-muted mt-0.5">Track and manage all your support requests.</p>
          </div>
          <button
            onClick={() => navigate("/submit")}
            className="flex items-center gap-2 bg-primary text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-primary hover:opacity-90 transition-all"
          >
            <Plus className="w-4 h-4" /> New Request
          </button>
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Tickets",  value: stats.total,      color: "text-dark",    bg: "bg-surface" },
            { label: "Open",           value: stats.open,       color: "text-primary", bg: "bg-primary-light" },
            { label: "In Progress",    value: stats.inProgress, color: "text-info",    bg: "bg-cyan-50" },
            { label: "Resolved",       value: stats.resolved,   color: "text-success", bg: "bg-emerald-50" },
          ].map((k) => (
            <div key={k.label} className={`${k.bg} rounded-2xl border border-border px-5 py-4 shadow-card`}>
              <div className="text-2xl font-extrabold text-dark">{k.value}</div>
              <div className={`text-xs font-semibold mt-0.5 ${k.color}`}>{k.label}</div>
            </div>
          ))}
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-5">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-light pointer-events-none" />
            <input
              type="text" placeholder="Search tickets…"
              value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-surface text-sm text-dark placeholder:text-muted-light focus:outline-none focus:ring-2 focus:border-primary transition-all"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {(["All", "Open", "In Progress", "Resolved", "Closed"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  filter === f
                    ? "bg-primary text-white shadow-sm"
                    : "bg-surface border border-border text-muted hover:text-dark"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Content area */}
        <div className="flex gap-5">
          {/* Ticket list */}
          <div className={`flex-1 space-y-3 ${selected ? "hidden md:block" : ""}`}>
            {filtered.length === 0 ? (
              <div className="text-center py-20 bg-surface rounded-2xl border border-border">
                <div className="w-14 h-14 rounded-full bg-background mx-auto flex items-center justify-center mb-4">
                  <Search className="w-6 h-6 text-muted-light" />
                </div>
                <p className="text-dark font-bold">No tickets found</p>
                <p className="text-muted text-sm mt-1">Try adjusting your search or filter.</p>
              </div>
            ) : filtered.map((ticket) => {
              const sc = statusConfig[ticket.status];
              const pc = priorityConfig[ticket.priority];
              const isActive = selected?.id === ticket.id;
              return (
                <div
                  key={ticket.id}
                  onClick={() => setSelected(isActive ? null : ticket)}
                  className={`bg-surface rounded-2xl border p-5 cursor-pointer transition-all hover:shadow-lg-soft ${
                    isActive ? "border-primary shadow-primary/10 ring-1 ring-primary/20" : "border-border hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-xs font-bold text-muted-light">{ticket.id}</span>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${pc.bg} ${pc.text}`}>
                          {ticket.priority}
                        </span>
                      </div>
                      <p className="font-bold text-dark text-base truncate">{ticket.title}</p>
                      <p className="text-muted text-sm mt-0.5">{ticket.department}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <span className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${sc.bg} ${sc.text}`}>
                        <sc.icon className="w-3 h-3" />
                        {sc.label}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-light">
                        <Clock className="w-3 h-3" />
                        {ticket.submitted}
                      </span>
                    </div>
                    <ChevronRight className={`w-4 h-4 text-muted-light flex-shrink-0 transition-transform ${isActive ? "rotate-90" : ""}`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detail panel */}
          {selected && (
            <div className="w-full md:w-80 lg:w-96 flex-shrink-0">
              <div className="bg-surface rounded-2xl border border-border shadow-card sticky top-24">
                <div className="p-5 border-b border-border flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-muted-light">{selected.id}</span>
                    <h3 className="font-extrabold text-dark mt-0.5 text-base leading-snug">{selected.title}</h3>
                  </div>
                  <button onClick={() => setSelected(null)} className="text-muted-light hover:text-dark p-1">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
                  </button>
                </div>
                <div className="p-5 space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Status",     val: selected.status,     style: `${statusConfig[selected.status].bg} ${statusConfig[selected.status].text}` },
                      { label: "Priority",   val: selected.priority,   style: `${priorityConfig[selected.priority].bg} ${priorityConfig[selected.priority].text}` },
                    ].map((item) => (
                      <div key={item.label} className="bg-background rounded-xl p-3">
                        <div className="text-xs text-muted-light font-semibold mb-1">{item.label}</div>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${item.style}`}>{item.val}</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-background rounded-xl p-3">
                    <div className="text-xs text-muted-light font-semibold mb-1">Department</div>
                    <div className="text-sm font-semibold text-dark">{selected.department}</div>
                  </div>
                  <div className="bg-background rounded-xl p-3">
                    <div className="text-xs text-muted-light font-semibold mb-1">Submitted</div>
                    <div className="text-sm font-semibold text-dark">{selected.submitted}</div>
                    <div className="text-xs text-muted mt-0.5">Updated: {selected.updated}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-light font-semibold mb-2">Description</div>
                    <p className="text-sm text-dark leading-relaxed">{selected.description}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}