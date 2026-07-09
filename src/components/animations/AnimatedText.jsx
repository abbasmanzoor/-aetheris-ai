import { motion } from 'framer-motion';

export const AnimatedText = ({
  text,
  className = '',
  delay = 0,
  type = 'fade',
}) => {
  const variants = {
    fade: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 },
    },
  };

  return (
    <motion.span
      initial="hidden"
      animate="visible"
      variants={variants[type]}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {text}
    </motion.span>
  );
};

export const AnimatedTextReveal = ({ children, className = '' }) => {
  return (
    <motion.span
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.span>
  );
};