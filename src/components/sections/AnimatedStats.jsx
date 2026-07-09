import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Container } from '../ui/Container';

const stats = [
  { value: 10000, label: 'Users', suffix: '+', prefix: '' },
  { value: 99, label: 'Uptime', suffix: '.9%', prefix: '' },
  { value: 500, label: 'Enterprise Clients', suffix: '+', prefix: '' },
  { value: 24, label: 'Global Regions', suffix: '/7 Support', prefix: '' },
];

const Counter = ({ target, suffix = '', prefix = '', duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const increment = target / (duration * 60);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

export const AnimatedStats = () => {
  return (
    <section id="stats" className="py-2xl relative">
      <Container>
        {/* ✅ Responsive Grid - 2 columns on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-gutter">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-surface p-4 md:p-xl rounded-2xl text-center hover-lift"
            >
              {/* ✅ Responsive Font Sizes */}
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
                <Counter target={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
              </div>
              <div className="text-xs sm:text-sm md:text-body-md text-on-surface-variant mt-1 md:mt-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};