import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface AIBadgeProps {
  label: string;
  className?: string;
}

export function AIBadge({ label, className = '' }: AIBadgeProps) {
  return (
    <motion.span
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      whileHover={{ scale: 1.05 }}
      className={`inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full bg-gradient-to-r from-violet-500/10 to-blue-500/10 text-violet-700 dark:text-violet-300 border border-violet-300/40 ${className}`}
    >
      <Sparkles className="w-3 h-3" />
      AI: {label}
    </motion.span>
  );
}
