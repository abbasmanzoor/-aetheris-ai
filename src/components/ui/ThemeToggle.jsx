import { useTheme } from '../../contexts/ThemeContext';
import { motion } from 'framer-motion';

export const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-xs hover:bg-white/10 rounded-full transition-colors"
      aria-label="Toggle theme"
    >
      <motion.span
        initial={false}
        animate={{ rotate: isDark ? 0 : 180 }}
        transition={{ duration: 0.3 }}
        className="material-symbols-outlined text-primary text-2xl"
      >
        {isDark ? 'dark_mode' : 'light_mode'}
      </motion.span>
    </button>
  );
};