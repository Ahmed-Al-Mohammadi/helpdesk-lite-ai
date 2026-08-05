import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Headphones,
  Bell,
  ChevronDown,
  UploadCloud,
  Send,
  Check,
  AlertCircle,
} from 'lucide-react';
import { BackButton } from '@/components/BackButton';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useApp } from '@/context/AppContext';

type Priority = 'Low' | 'Medium' | 'High';

export default function SubmitPage() {
  const { role } = useApp();
  const [priority, setPriority] = useState<Priority>('Low');
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B1120] font-sans text-gray-900 dark:text-gray-100">
      {/* Top nav */}
      <nav className="bg-white dark:bg-[#0F172A] border-b border-gray-200 dark:border-white/10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Headphones className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="font-semibold">HelpDesk Lite</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <Link to="/submit" className="text-blue-600 dark:text-blue-400 font-medium">New Request</Link>
            <Link to="/my-tickets" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium">My Tickets</Link>
            {role === 'admin' && (
              <Link to="/admin" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium">Admin Dashboard</Link>
            )}
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button className="relative text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-rose-500" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-xs font-semibold">
                SC
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </nav>

      {/* Page content */}
      <main className="max-w-2xl mx-auto px-6 py-10">
        <div className="mb-8">
          <BackButton to={role === 'admin' ? '/admin' : '/my-tickets'} className="mb-4" />
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1.5">Employee Portal</div>
          <h1 className="text-2xl font-bold">Submit a New Request</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1.5">
            Fill out the form below and our IT team will get back to you as soon as possible.
          </p>
        </div>

        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex items-center gap-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 px-4 py-3 rounded-lg text-sm"
          >
            <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span>Your request has been submitted. Track its progress in <Link to="/my-tickets" className="underline font-medium">My Tickets</Link>.</span>
          </motion.div>
        )}

        <motion.form
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          onSubmit={handleSubmit}
          className="bg-white dark:bg-[#0F172A] rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm p-6 sm:p-8 space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Request Title</label>
            <input
              type="text"
              required
              placeholder="Brief summary of your issue"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Contact Email</label>
              <input
                type="email"
                required
                defaultValue="sarah.chen@company.com"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Department</label>
              <div className="relative">
                <select
                  required
                  defaultValue="Engineering"
                  className="w-full appearance-none px-4 py-2.5 pr-10 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option>Engineering</option>
                  <option>Product</option>
                  <option>Design</option>
                  <option>HR</option>
                  <option>Finance</option>
                  <option>Marketing</option>
                  <option>Sales</option>
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Priority Level</label>
            <div className="grid grid-cols-3 gap-3">
              {(['Low', 'Medium', 'High'] as Priority[]).map((p) => {
                const active = priority === p;
                const colors: Record<Priority, string> = {
                  Low: active ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : 'border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:border-gray-300',
                  Medium: active ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300' : 'border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:border-gray-300',
                  High: active ? 'border-rose-500 bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300' : 'border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:border-gray-300',
                };
                return (
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    key={p}
                    type="button"
                    onClick={() => setPriority(p)}
                    className={`px-4 py-2.5 rounded-lg border-2 text-sm font-medium transition-all ${colors[p]}`}
                  >
                    {p}
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Description</label>
            <textarea
              required
              rows={5}
              placeholder="Provide as much detail as possible. Include error messages, steps to reproduce, and any context that might help."
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Attachments (optional)</label>
            <motion.label
              whileHover={{ scale: 1.01 }}
              className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-300 dark:border-white/10 rounded-xl py-8 px-4 cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors"
            >
              <UploadCloud className="w-7 h-7 text-gray-400" />
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <span className="text-blue-600 dark:text-blue-400 font-medium">Click to upload</span> or drag and drop
              </div>
              <div className="text-xs text-gray-400">PNG, JPG, PDF up to 10MB</div>
              <input
                type="file"
                className="hidden"
                onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
              />
            </motion.label>
            {fileName && (
              <div className="mt-2 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Check className="w-4 h-4 text-emerald-500" /> {fileName}
              </div>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="group w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 transition-colors text-white font-semibold py-3 rounded-lg shadow-lg shadow-blue-600/20"
          >
            Submit Request
            <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </motion.button>

          <div className="flex items-start gap-2 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg p-3">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0 text-gray-400" />
            <span>Need urgent help? Call IT support at <span className="font-semibold text-gray-700 dark:text-gray-300">ext. 4455</span> — available 24/7 for critical system outages and security incidents.</span>
          </div>
        </motion.form>
      </main>
    </div>
  );
}
