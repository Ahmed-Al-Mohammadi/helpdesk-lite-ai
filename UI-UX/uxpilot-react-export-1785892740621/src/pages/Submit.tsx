import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Upload, ArrowRight } from "lucide-react";
import AppNav from "@/components/AppNav";

const departments = [
  "Information Technology",
  "Human Resources",
  "Finance & Payroll",
  "Facilities",
  "Marketing",
  "Design & Product",
  "Legal & Compliance",
];

const priorities = [
  { value: "low",    label: "Low",    color: "success" },
  { value: "medium", label: "Medium", color: "warning" },
  { value: "high",   label: "High",   color: "danger" },
] as const;

type Priority = "low" | "medium" | "high";

export default function Submit() {
  const navigate = useNavigate();
  const [priority, setPriority] = useState<Priority>("medium");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ title: "", department: "", description: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <AppNav />
        <div className="flex flex-col items-center justify-center py-32 px-4">
          <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mb-6">
            <CheckCircle className="w-10 h-10 text-success" />
          </div>
          <h2 className="text-2xl font-extrabold text-dark mb-2">Request Submitted!</h2>
          <p className="text-muted text-base mb-8 text-center max-w-sm">
            Your ticket has been logged. Our IT team will review it shortly and you'll receive an email update.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/my-tickets")}
              className="bg-primary text-white font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-all shadow-primary flex items-center gap-2"
            >
              View My Tickets <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => { setSubmitted(false); setForm({ title: "", department: "", description: "" }); setPriority("medium"); }}
              className="border border-border text-dark font-semibold px-6 py-3 rounded-xl hover:bg-background transition-all"
            >
              Submit Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AppNav />
      <main className="max-w-2xl mx-auto py-12 px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-dark">Submit a Request</h1>
          <p className="text-muted mt-1">Provide details below and our IT team will assist you.</p>
        </div>

        {/* Card */}
        <div className="bg-surface rounded-2xl border border-border shadow-card overflow-hidden">
          {/* Top bar */}
          <div className="px-8 py-5 border-b border-border bg-background flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-sm font-semibold text-dark">New Support Ticket</span>
            <span className="ml-auto text-xs text-muted-light font-medium"># Auto-assigned</span>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Title */}
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-dark">Request Title <span className="text-danger">*</span></label>
              <input
                type="text" required value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g., Cannot connect to VPN from home"
                className="w-full px-4 py-3 rounded-xl border border-border bg-white text-dark placeholder:text-muted-light text-sm focus:outline-none focus:ring-2 focus:border-primary transition-all"
              />
            </div>

            {/* Email & Department */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-dark">Contact Email</label>
                <input
                  type="email" value="alex.rivers@company.com" disabled
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-muted text-sm cursor-not-allowed"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-dark">Department <span className="text-danger">*</span></label>
                <div className="relative">
                  <select
                    required value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                    className="w-full appearance-none px-4 py-3 rounded-xl border border-border bg-white text-dark text-sm focus:outline-none focus:ring-2 focus:border-primary transition-all"
                  >
                    <option value="" disabled>Select department</option>
                    {departments.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                  <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-light pointer-events-none" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Priority */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-dark">Priority Level</label>
              <div className="grid grid-cols-3 gap-2 p-1 bg-background rounded-xl border border-border">
                {priorities.map((p) => (
                  <button
                    key={p.value} type="button"
                    onClick={() => setPriority(p.value)}
                    className={`py-2.5 text-sm font-bold rounded-lg transition-all duration-200 ${
                      priority === p.value
                        ? p.color === "success"
                          ? "bg-success text-white shadow-sm"
                          : p.color === "warning"
                          ? "bg-warning text-white shadow-sm"
                          : "bg-danger text-white shadow-sm"
                        : "text-muted hover:text-dark"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-dark">Description <span className="text-danger">*</span></label>
              <textarea
                required rows={5} value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Describe the issue in detail. Include steps to reproduce, error messages, and how this affects your work…"
                className="w-full px-4 py-3 rounded-xl border border-border bg-white text-dark placeholder:text-muted-light text-sm focus:outline-none focus:ring-2 focus:border-primary transition-all resize-none"
              />
            </div>

            {/* File Upload */}
            <div className="border-2 border-dashed border-border rounded-xl p-6 flex flex-col items-center justify-center gap-2 hover:border-primary transition-colors cursor-pointer group">
              <div className="w-11 h-11 rounded-full bg-background group-hover:bg-primary-light flex items-center justify-center transition-colors">
                <Upload className="w-5 h-5 text-muted-light group-hover:text-primary transition-colors" />
              </div>
              <p className="text-sm text-muted">
                <span className="text-primary font-bold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-muted-light">PDF, PNG, JPG or DOCX · Max 10 MB</p>
            </div>

            {/* Submit */}
            <button
              type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-primary text-white font-bold text-base py-4 rounded-xl shadow-primary hover:opacity-90 transition-all disabled:opacity-70"
            >
              {loading ? (
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z"/>
                </svg>
              ) : (
                <><span>Submit Request</span><ArrowRight className="w-5 h-5" /></>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-muted mt-6 flex items-center justify-center gap-1.5">
          <span>Need urgent help? Call IT at</span>
          <span className="font-bold text-dark">ext. 4455</span>
        </p>
      </main>
    </div>
  );
}