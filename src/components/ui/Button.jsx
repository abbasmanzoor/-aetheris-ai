import { motion } from 'framer-motion';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseStyles = 'rounded-xl font-bold transition-all active:scale-95 inline-flex items-center justify-center gap-2';

  const variants = {
    primary: 'bg-gradient-to-r from-primary to-secondary-container text-on-primary hover:brightness-110 shadow-[0_0_20px_rgba(192,193,255,0.3)]',
    secondary: 'glass-surface text-on-surface hover:bg-white/10 border border-white/20',
    ghost: 'text-on-surface/70 hover:text-primary',
  };

  const sizes = {
    sm: 'px-md py-sm text-sm',
    md: 'px-lg py-md text-body-lg',
    lg: 'px-xl py-md text-body-lg',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};