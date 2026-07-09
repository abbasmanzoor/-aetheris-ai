import { motion } from 'framer-motion';

export const Card = ({
  children,
  className = '',
  hover = true,
  glass = true,
  ...props
}) => {
  const baseStyles = 'p-lg rounded-2xl transition-all duration-300';
  const glassStyles = glass ? 'glass-surface' : '';
  const hoverStyles = hover ? 'hover-lift' : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`${baseStyles} ${glassStyles} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};