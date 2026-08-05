import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Headphones,
  LayoutDashboard,
  Ticket as TicketIcon,
  Inbox,
  AlertTriangle,
  CheckCircle2,
  BarChart3,
  Users,
  Settings,
  Search,
  Bell,
  Plus,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Clock,
  ArrowLeft,
  Send,
  Paperclip,
  Bold,
  Italic,
  Link2,
  List,
  Mail,
  Building2,
  MapPin,
  Eye,
  AlertCircle,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { tickets, type Ticket } from "@/data/mockData";
import { AIBadge } from "@/components/AIBadge";
import { ThemeToggle } from "@/components/ThemeToggle";
import { BackButton } from "@/components/BackButton";
import { useApp } from "@/context/AppContext";

const navMain = [
  { label: "Dashboard", icon: LayoutDashboard, key: "dashboard" },
  { label: "All Tickets", icon: TicketIcon, key: "all", badge: 42 },
  { label: "My Tickets", icon: Inbox, key: "mine" },
  {
    label: "Urgent",
    icon: AlertTriangle,
    key: "urgent",
    badge: 7,
    badgeColor: "rose",
  },
  { label: "Resolved", icon: CheckCircle2, key: "resolved" },
];
const navMgmt = [
  { label: "Reports", icon: BarChart3, key: "reports" },
  { label: "Team", icon: Users, key: "team" },
  { label: "Settings", icon: Settings, key: "settings" },
];

const priorityStyles: Record<string, string> = {
  URGENT:
    "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-300 dark:border-rose-800",
  HIGH: "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800",
  MEDIUM:
    "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800",
  LOW: "bg-gray-50 text-gray-600 border-gray-200 dark:bg-white/5 dark:text-gray-400 dark:border-white/10",
};
const statusStyles: Record<string, string> = {
  Open: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800",
  "In Progress":
    "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800",
  Resolved:
    "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800",
  "On Hold":
    "bg-gray-100 text-gray-600 border-gray-200 dark:bg-white/5 dark:text-gray-400 dark:border-white/10",
};

const aiCategoryMap: Record<string, string> = {
  "Network / VPN": "Network Issue",
  "Email / Calendar": "Email Sync",
  Hardware: "Hardware Fault",
  "Access & Permissions": "Access Request",
  Software: "Software Bug",
};

function Sidebar({
  active,
  onClose,
}: {
  active: string;
  onClose?: () => void;
}) {
  const { setRole } = useApp();
  return (
    <aside className="w-60 bg-[#0B1120] text-gray-300 flex flex-col h-full shrink-0">
      <div className="px-5 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <Headphones className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="font-semibold text-white text-sm">
            HelpDesk Lite
          </span>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
      <div className="px-3 mt-4 overflow-y-auto flex-1">
        <div className="px-2 text-[10px] uppercase tracking-wider text-gray-500 mb-2">
          Main
        </div>
        <nav className="space-y-0.5">
          {navMain.map((item) => {
            const isActive =
              active === item.key ||
              (item.key === "all" && active === "detail");
            return (
              <button
                key={item.key}
                className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                      item.badgeColor === "rose"
                        ? "bg-rose-500 text-white"
                        : "bg-blue-500/20 text-blue-300"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
        <div className="px-2 text-[10px] uppercase tracking-wider text-gray-500 mb-2 mt-6">
          Management
        </div>
        <nav className="space-y-0.5">
          {navMgmt.map((item) => (
            <button
              key={item.key}
              className="w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
            >
              <item.icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
      <div className="p-3 border-t border-white/5">
        <div className="rounded-xl bg-white/5 p-3 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-xs font-semibold">
            MT
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium text-white truncate">
              Mike Torres
            </div>
            <div className="text-[10px] text-gray-500 truncate">
              IT Administrator
            </div>
          </div>
          <button
            onClick={() => setRole(null)}
            className="text-gray-500 hover:text-white"
            title="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}

function TopBar({ onMenu }: { onMenu: () => void }) {
  return (
    <div className="h-16 px-4 sm:px-6 bg-white dark:bg-[#0F172A] border-b border-gray-200 dark:border-white/10 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <button
          onClick={onMenu}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            placeholder="Search tickets, users, or keywords..."
            className="hidden sm:block w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <ThemeToggle />
        <button className="relative text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500" />
        </button>
        <div className="w-px h-6 bg-gray-200 dark:bg-white/10" />
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-xs font-semibold">
            MT
          </div>
          <div className="hidden sm:block">
            <div className="text-xs font-medium text-gray-900 dark:text-white leading-tight">
              Mike Torres
            </div>
            <div className="text-[10px] text-gray-500 dark:text-gray-400">
              IT Administrator
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardView({
  onSelectTicket,
}: {
  onSelectTicket: (t: Ticket) => void;
}) {
  const navigate = useNavigate();

  const stats = [
    {
      label: "Open Tickets",
      value: "42",
      trend: "+12%",
      trendUp: true,
      color: "blue",
      icon: TicketIcon,
    },
    {
      label: "Urgent",
      value: "7",
      trend: "+2",
      trendUp: true,
      color: "rose",
      icon: AlertTriangle,
    },
    {
      label: "Resolved Today",
      value: "31",
      trend: "+8%",
      trendUp: true,
      color: "emerald",
      icon: CheckCircle2,
    },
    {
      label: "Avg Response Time",
      value: "18m",
      trend: "-5%",
      trendUp: false,
      color: "amber",
      icon: Clock,
    },
  ];
  const colorMap: Record<string, { bg: string; text: string }> = {
    blue: {
      bg: "bg-blue-50 dark:bg-blue-900/20",
      text: "text-blue-600 dark:text-blue-400",
    },
    rose: {
      bg: "bg-rose-50 dark:bg-rose-900/20",
      text: "text-rose-600 dark:text-rose-400",
    },
    emerald: {
      bg: "bg-emerald-50 dark:bg-emerald-900/20",
      text: "text-emerald-600 dark:text-emerald-400",
    },
    amber: {
      bg: "bg-amber-50 dark:bg-amber-900/20",
      text: "text-amber-600 dark:text-amber-400",
    },
  };

  return (
    <div className="p-4 sm:p-6 overflow-y-auto">
      {/* Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            IT Admin Dashboard
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Welcome back, Mike. Here's what's happening today.
          </p>
        </div>
        <motion.button
          onClick={() => navigate("/submit")}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 transition-colors text-white text-sm font-medium px-4 py-2 rounded-lg shadow-sm"
        >
          <Plus className="w-4 h-4" /> New Ticket
        </motion.button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((s, i) => {
          const c = colorMap[s.color];
          return (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ scale: 1.04, y: -2 }}
              key={s.label}
              className="bg-white dark:bg-[#0F172A] rounded-xl border border-gray-200 dark:border-white/10 p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className={`w-9 h-9 rounded-lg ${c.bg} ${c.text} flex items-center justify-center`}
                >
                  <s.icon className="w-4.5 h-4.5" />
                </div>
                <span
                  className={`text-xs font-medium ${s.trendUp ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}
                >
                  {s.trend}
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {s.value}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {s.label}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Recent tickets table */}
      <div className="bg-white dark:bg-[#0F172A] rounded-xl border border-gray-200 dark:border-white/10 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-200 dark:border-white/10 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
              Recent Tickets
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Latest support requests across all departments
            </p>
          </div>
          <button className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-500 font-medium">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[800px]">
            <thead>
              <tr className="bg-gray-50 dark:bg-white/5 text-left text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                <th className="px-5 py-3 font-medium">Ticket</th>
                <th className="px-5 py-3 font-medium">Submitter</th>
                <th className="px-5 py-3 font-medium">Title</th>
                <th className="px-5 py-3 font-medium">Priority</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Assigned</th>
                <th className="px-5 py-3 font-medium">Created</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/5">
              {tickets.map((t, idx) => (
                <motion.tr
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.04 }}
                  key={t.id}
                  className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                >
                  <td className="px-5 py-3.5 font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                    {t.id}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white text-[10px] font-semibold shrink-0">
                        {t.submitter
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 whitespace-nowrap">
                        {t.submitter}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-gray-600 dark:text-gray-400 max-w-[200px] truncate">
                    {t.title}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded border ${priorityStyles[t.priority]}`}
                      >
                        {t.priority}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded border ${statusStyles[t.status]}`}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    {t.assignedTo === "Unassigned" ? (
                      <span className="text-xs text-gray-400 italic">
                        Unassigned
                      </span>
                    ) : (
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-[9px] font-semibold">
                          {t.assignedTo
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <span className="text-gray-600 dark:text-gray-400 whitespace-nowrap">
                          {t.assignedTo}
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="px-5 py-3.5 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    {t.created}
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onSelectTicket(t)}
                      className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-500 font-medium mr-3"
                    >
                      View
                    </motion.button>
                    <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 inline-flex">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="px-5 py-3.5 border-t border-gray-200 dark:border-white/10 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span className="hidden sm:inline">Showing 1–8 of 42 tickets</span>
          <div className="flex items-center gap-1 ml-auto">
            <button className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-white/10 text-gray-400">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="px-2.5 py-1 rounded-md bg-blue-600 text-white font-medium">
              1
            </button>
            <button className="px-2.5 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300">
              2
            </button>
            <button className="px-2.5 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300">
              3
            </button>
            <span className="px-1">…</span>
            <button className="px-2.5 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300">
              6
            </button>
            <button className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TicketDetailView({
  ticket,
  onBack,
}: {
  ticket: Ticket;
  onBack: () => void;
}) {
  return (
    <div className="p-4 sm:p-6 overflow-y-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Dashboard
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-400">All Tickets</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-700 dark:text-gray-300 font-medium">
          {ticket.id}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main thread */}
        <div className="lg:col-span-2 space-y-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-[#0F172A] rounded-xl border border-gray-200 dark:border-white/10 p-5"
          >
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-medium text-gray-400">
                {ticket.id}
              </span>
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded border ${priorityStyles[ticket.priority]}`}
              >
                {ticket.priority}
              </span>
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded border ${statusStyles[ticket.status]}`}
              >
                {ticket.status}
              </span>
              <AIBadge
                label={aiCategoryMap[ticket.category] ?? "Auto-Triaged"}
              />
            </div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
              {ticket.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
              <span>{ticket.category}</span>
              <span>•</span>
              <span>Created {ticket.createdFull}</span>
              <span>•</span>
              <span>{ticket.replies} replies</span>
            </div>
          </motion.div>

          {/* Original message */}
          <div className="bg-white dark:bg-[#0F172A] rounded-xl border border-gray-200 dark:border-white/10 p-5">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white text-xs font-semibold shrink-0">
                {ticket.submitter
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {ticket.submitter}
                  </span>
                  <span className="text-xs text-gray-400">
                    {ticket.createdFull}
                  </span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                  {ticket.submitterDept}
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                  {ticket.description}
                </div>
              </div>
            </div>
          </div>

          {/* IT agent reply */}
          <div className="bg-blue-50/50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-800/40 p-5">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-xs font-semibold shrink-0">
                MT
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    Mike Torres
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-medium">
                    IT Agent
                  </span>
                  <span className="text-xs text-gray-400">1h ago</span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                  IT Support Team
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  Hi Sarah, thanks for the detailed report. This looks like a
                  known issue with the AnyConnect update pushed this morning.
                  Here's what I'd like you to try:
                  <ol className="list-decimal ml-5 mt-2 space-y-1">
                    <li>
                      Open <strong>Services</strong> (Win+R →{" "}
                      <code>services.msc</code>)
                    </li>
                    <li>
                      Locate{" "}
                      <strong>Cisco AnyConnect Network Access Agent</strong>
                    </li>
                    <li>
                      Right-click → <strong>Restart</strong> the service
                    </li>
                    <li>
                      Reopen AnyConnect and attempt to connect to{" "}
                      <code>vpn.company.com</code>
                    </li>
                  </ol>
                  If that doesn't resolve it, I'll push a profile update to your
                  client remotely. Let me know how it goes!
                </div>
              </div>
            </div>
          </div>

          {/* Submitter follow-up */}
          <div className="bg-white dark:bg-[#0F172A] rounded-xl border border-gray-200 dark:border-white/10 p-5">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white text-xs font-semibold shrink-0">
                {ticket.submitter
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {ticket.submitter}
                  </span>
                  <span className="text-xs text-gray-400">30m ago</span>
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  Hi Mike, I tried restarting the service as you described but
                  I'm still getting the same error. The service does restart
                  successfully, but AnyConnect still won't connect. Happy to
                  jump on a quick call if that's easier.
                </div>
              </div>
            </div>
          </div>

          {/* Reply composer */}
          <div className="bg-white dark:bg-[#0F172A] rounded-xl border border-gray-200 dark:border-white/10 p-4">
            <div className="flex items-center gap-2 border-b border-gray-100 dark:border-white/10 pb-2 mb-3">
              <button className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400">
                <Bold className="w-4 h-4" />
              </button>
              <button className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400">
                <Italic className="w-4 h-4" />
              </button>
              <button className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400">
                <Link2 className="w-4 h-4" />
              </button>
              <button className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400">
                <List className="w-4 h-4" />
              </button>
              <div className="flex-1" />
              <button className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400">
                <Paperclip className="w-4 h-4" />
              </button>
            </div>
            <textarea
              rows={3}
              placeholder="Type your reply..."
              className="w-full text-sm text-gray-700 dark:text-gray-200 bg-transparent focus:outline-none resize-none placeholder-gray-400"
            />
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 dark:border-white/10">
              <span className="text-xs text-gray-400 dark:text-gray-500">
                Replying as Mike Torres
              </span>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 transition-colors text-white text-sm font-medium px-4 py-2 rounded-lg"
              >
                <Send className="w-3.5 h-3.5" /> Send Reply
              </motion.button>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-4">
          {/* Status panel */}
          <div className="bg-white dark:bg-[#0F172A] rounded-xl border border-gray-200 dark:border-white/10 p-5 space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Ticket Details
            </h3>
            <div>
              <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">
                Status
              </label>
              <div className="relative">
                <select
                  defaultValue={ticket.status}
                  className="w-full appearance-none px-3 py-2 pr-9 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                  <option>On Hold</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">
                Priority
              </label>
              <div className="relative">
                <select
                  defaultValue={ticket.priority}
                  className="w-full appearance-none px-3 py-2 pr-9 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>URGENT</option>
                  <option>HIGH</option>
                  <option>MEDIUM</option>
                  <option>LOW</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">
                Assignee
              </label>
              <div className="relative">
                <select
                  defaultValue={ticket.assignedTo}
                  className="w-full appearance-none px-3 py-2 pr-9 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Mike Torres</option>
                  <option>Priya Nair</option>
                  <option>Alex Morgan</option>
                  <option>Unassigned</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div className="pt-2 border-t border-gray-100 dark:border-white/10">
              <label className="text-xs text-gray-500 dark:text-gray-400 mb-1.5 block">
                AI Triage
              </label>
              <AIBadge
                label={aiCategoryMap[ticket.category] ?? "Auto-Triaged"}
              />
            </div>
          </div>

          {/* Submitted by */}
          <div className="bg-white dark:bg-[#0F172A] rounded-xl border border-gray-200 dark:border-white/10 p-5">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
              Submitted By
            </h3>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white text-sm font-semibold">
                {ticket.submitter
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {ticket.submitter}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {ticket.submitterDept}
                </div>
              </div>
            </div>
            <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-gray-400" />{" "}
                {ticket.submitterEmail}
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-3.5 h-3.5 text-gray-400" />{" "}
                {ticket.submitterDept}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-gray-400" />{" "}
                {ticket.submitterLocation}
              </div>
            </div>
          </div>

          {/* SLA */}
          <div className="bg-white dark:bg-[#0F172A] rounded-xl border border-gray-200 dark:border-white/10 p-5">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-rose-500" />
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                SLA Breach Warning
              </h3>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
              This ticket is approaching its SLA deadline. Resolve within 2
              hours to avoid breach.
            </p>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500 dark:text-gray-400">Due in</span>
              <span className="font-semibold text-rose-600 dark:text-rose-400">
                1h 58m
              </span>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-gray-100 dark:bg-white/10 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "85%" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-rose-500 rounded-full"
              />
            </div>
          </div>

          {/* Watchers */}
          <div className="bg-white dark:bg-[#0F172A] rounded-xl border border-gray-200 dark:border-white/10 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Eye className="w-4 h-4 text-gray-400" />
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                Watchers
              </h3>
              <span className="ml-auto text-xs text-gray-400">3</span>
            </div>
            <div className="flex -space-x-2">
              {["MT", "PN", "AM"].map((s, i) => (
                <div
                  key={s}
                  className={`w-7 h-7 rounded-full border-2 border-white dark:border-[#0F172A] flex items-center justify-center text-white text-[10px] font-semibold ${
                    ["bg-blue-500", "bg-emerald-500", "bg-amber-500"][i]
                  }`}
                >
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-emerald-600 hover:bg-emerald-500 transition-colors text-white text-sm font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" /> Resolve Ticket
            </motion.button>
            <button className="w-full text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-sm font-medium py-2 text-center">
              Place On Hold
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const { role } = useApp();
  const [view, setView] = useState<"dashboard" | "detail">("dashboard");
  const [selected, setSelected] = useState<Ticket | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B1120] flex font-sans text-gray-900 dark:text-gray-100">
      {/* Desktop sidebar */}
      <div className="hidden lg:block sticky top-0 h-screen">
        <Sidebar active={view === "detail" ? "all" : "dashboard"} />
      </div>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "tween", duration: 0.25 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 z-50"
            >
              <Sidebar
                active={view === "detail" ? "all" : "dashboard"}
                onClose={() => setMobileOpen(false)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar onMenu={() => setMobileOpen(true)} />
        {view === "dashboard" && (
          <div>
            <div className="px-4 sm:px-6 pt-4">
              <BackButton to="/" />
            </div>
            <DashboardView
              onSelectTicket={(t) => {
                setSelected(t);
                setView("detail");
              }}
            />
          </div>
        )}
        {view === "detail" && selected && (
          <TicketDetailView
            ticket={selected}
            onBack={() => setView("dashboard")}
          />
        )}
      </div>
    </div>
  );
}
