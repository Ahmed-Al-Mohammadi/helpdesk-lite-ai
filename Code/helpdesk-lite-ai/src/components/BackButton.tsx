import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

interface BackButtonProps {
  to: string;
  label?: string;
  className?: string;
}

export function BackButton({ to, label = 'Go Back', className = '' }: BackButtonProps) {
  const navigate = useNavigate();
  return (
    <motion.button
      whileHover={{ x: -3 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => navigate(to)}
      className={`inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors ${className}`}
    >
      <ArrowLeft className="w-4 h-4" />
      {label}
    </motion.button>
  );
}
