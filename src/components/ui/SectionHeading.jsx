import { motion } from 'framer-motion';

export const SectionHeading = ({ title, subtitle, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`text-center mb-2xl ${className}`}
    >
      <h2 className="font-headline-xl text-headline-xl mb-md">{title}</h2>
      {subtitle && <p className="text-on-surface-variant">{subtitle}</p>}
    </motion.div>
  );
};
