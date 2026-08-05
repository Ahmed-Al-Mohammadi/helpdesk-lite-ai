import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Headphones,
  Bell,
  Plus,
  Wifi,
  Monitor,
  Key,
  Printer,
  Laptop,
  Mail,
  MessageSquare,
  ChevronRight,
  BookOpen,
  ArrowRight,
  Shield,
} from 'lucide-react';
import { myTickets } from '@/data/mockData';
import { BackButton } from '@/components/BackButton';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useApp } from '@/context/AppContext';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  wifi: Wifi,
  monitor: Monitor,
  key: Key,
  printer: Printer,
  laptop: Laptop,
  mail: Mail,
};

type Filter = 'All' | 'Open' | 'In Progress' | 'Resolved';

export default function MyTicketsPage() {
  const { role } = useApp();
  const [filter, setFilter] = useState<Filter>('All');

  const counts = {
    All: myTickets.length,
    Open: myTickets.filter((t) => t.status === 'Open').length,
    'In Progress': myTickets.filter((t) => t.status === 'In Progress').length,
    Resolved: myTickets.filter((t) => t.status === 'Resolved').length,
  };

  const filtered = myTickets.filter((t) => filter === 'All' || t.status === filter);
  const open = filtered.filter((t) => t.status !== 'Resolved');
  const resolved = filtered.filter((t) => t.status === 'Resolved');

  const statusStyles: Record<string, string> = {
    Open: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800',
    'In Progress': 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800',
    Resolved: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800',
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B1120] font-sans text-gray-900 dark:text-gray-100">
      {/* Top nav */}
      <nav className="bg-white dark:bg-[#0F172A] border-b border-gray-200 dark:border-white/10">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Headphones className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="font-semibold">HelpDesk Lite</span>
            {role && (
              <span className="ml-2 text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <Shield className="w-3 h-3" /> {role}
              </span>
            )}
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <Link to="/my-tickets" className="text-blue-600 dark:text-blue-400 font-medium">My Tickets</Link>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium">Knowledge Base</a>
            {role === 'admin' && (
              <Link to="/admin" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium">Admin Dashboard</Link>
            )}
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              to="/submit"
              className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 transition-colors text-white text-sm font-medium px-3.5 py-2 rounded-lg"
            >
              <Plus className="w-4 h-4" /> <span className="hidden sm:inline">Submit New Request</span>
            </Link>
            <button className="relative text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-rose-500" />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-xs font-semibold">
              SC
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="mb-6">
          <BackButton to="/" className="mb-4" />
        </div>
        {/* Greeting */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold">Good morning, Sarah</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Here are your submitted support requests.</p>
          </div>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/submit"
              className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 transition-colors text-white text-sm font-medium px-4 py-2.5 rounded-lg shadow-sm"
            >
              <Plus className="w-4 h-4" /> Submit New Request
            </Link>
          </motion.div>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-1 mb-6 border-b border-gray-200 dark:border-white/10 overflow-x-auto">
          {(Object.keys(counts) as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors whitespace-nowrap ${
                filter === f
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              {f}
              <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
                filter === f ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' : 'bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400'
              }`}>
                {counts[f]}
              </span>
            </button>
          ))}
        </div>

        {/* Open tickets */}
        {open.length > 0 && (
          <div className="space-y-3 mb-8">
            {open.map((t, idx) => {
              const Icon = iconMap[t.icon] ?? MessageSquare;
              return (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ scale: 1.01, y: -2 }}
                  key={t.id}
                  className="group bg-white dark:bg-[#0F172A] rounded-xl border border-gray-200 dark:border-white/10 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md transition-all p-4 flex items-start gap-4 cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-medium text-gray-400">{t.id}</span>
                      {t.priority === 'Urgent' && (
                        <span className="text-[10px] uppercase font-bold tracking-wide text-rose-600 bg-rose-50 dark:bg-rose-900/30 dark:text-rose-300 border border-rose-200 dark:border-rose-800 px-1.5 py-0.5 rounded">
                          Urgent
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-semibold truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {t.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 text-xs text-gray-500 dark:text-gray-400">
                      <span>Submitted {t.submitted}</span>
                      <span className="flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-gray-300" /> {t.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" /> {t.replies} {t.replies === 1 ? 'reply' : 'replies'}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${statusStyles[t.status]}`}>
                      {t.status}
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Resolved tickets */}
        {resolved.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Resolved Tickets</h2>
              <div className="flex-1 h-px bg-gray-200 dark:bg-white/10" />
            </div>
            <div className="space-y-3">
              {resolved.map((t) => {
                const Icon = iconMap[t.icon] ?? MessageSquare;
                return (
                  <motion.div
                    whileHover={{ scale: 1.01, y: -2 }}
                    key={t.id}
                    className="group bg-white dark:bg-[#0F172A] rounded-xl border border-gray-200 dark:border-white/10 hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-md transition-all p-4 flex items-start gap-4 cursor-pointer opacity-80 hover:opacity-100"
                  >
                    <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-medium text-gray-400">{t.id}</span>
                      </div>
                      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 truncate">{t.title}</h3>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 text-xs text-gray-500 dark:text-gray-400">
                        <span>Submitted {t.submitted}</span>
                        <span className="flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-gray-300" /> {t.category}
                        </span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-medium">Resolved in {t.resolvedIn}</span>
                      </div>
                    </div>
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full border bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800 shrink-0">
                      Resolved
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-50" />
            <p className="text-sm">No tickets match this filter.</p>
          </div>
        )}

        {/* Knowledge base promo */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="mt-10 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center gap-6"
        >
          <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center shrink-0">
            <BookOpen className="w-7 h-7" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-lg font-semibold mb-1">Resolve it yourself — faster</h3>
            <p className="text-blue-100 text-sm">
              Browse our knowledge base for step-by-step guides to common IT issues. Most tickets can be resolved in under 5 minutes.
            </p>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-white text-blue-700 hover:bg-blue-50 transition-colors text-sm font-semibold px-4 py-2.5 rounded-lg shrink-0"
          >
            Browse Guides <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </main>
    </div>
  );
}
