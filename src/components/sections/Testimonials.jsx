import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'CTO',
    company: 'SynthX Dynamics',
    text: 'Aetheris AI hasn\'t just improved our throughput; it has fundamentally redefined how our autonomous systems communicate.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 2,
    name: 'Marcus Thorne',
    role: 'VP Engineering',
    company: 'Orbital Labs',
    text: 'The glassmorphic dashboard is beautiful, but the underlying engine is what keeps us ahead of the competition.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    role: 'Chief Data Officer',
    company: 'Verisys',
    text: 'Integrating the Edge Intelligence module reduced our operational latency by 40% in just two weeks.',
    rating: 4,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 4,
    name: 'James Okafor',
    role: 'Head of AI',
    company: 'Nexus Innovations',
    text: 'The predictive analytics capabilities have given us a 3x ROI in the first quarter alone. Truly game-changing.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 5,
    name: 'Priya Sharma',
    role: 'Director of Operations',
    company: 'CloudSphere',
    text: 'Deployment was seamless, and the support team is incredibly responsive. Best enterprise AI solution we\'ve used.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
  },
];

const StarRating = ({ rating }) => {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={`material-symbols-outlined text-sm ${
            i < rating ? 'text-primary' : 'text-on-surface-variant/20'
          }`}
          style={{ fontVariationSettings: i < rating ? "'FILL' 1" : "'FILL' 0" }}
        >
          star
        </span>
      ))}
    </div>
  );
};

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
    }),
  };

  const current = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-2xl max-w-max-width mx-auto px-margin-mobile overflow-hidden">
      <SectionHeading
        title="Trusted by the Architects of Change"
        subtitle="See what our customers say about us"
      />

      <div className="relative glass-surface rounded-2xl p-xl md:p-2xl overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="flex flex-col md:flex-row items-start md:items-center gap-xl"
          >
            {/* ✅ Profile Image with Gradient Border */}
            <div className="flex-shrink-0">
              <div className="relative w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-primary to-tertiary shadow-lg shadow-primary/20">
                <img
                  src={current.image}
                  alt={current.name}
                  className="w-full h-full rounded-full object-cover border-2 border-background"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-center gap-md flex-wrap mb-sm">
                <h4 className="font-headline-lg text-headline-lg">{current.name}</h4>
                <span className="text-on-surface-variant text-body-md">
                  {current.role}, {current.company}
                </span>
              </div>
              <StarRating rating={current.rating} />
              <p className="text-body-lg font-body-lg text-on-surface-variant mt-md italic">
                "{current.text}"
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-xl">
          <button
            onClick={prevSlide}
            className="glass-surface p-sm rounded-full hover:bg-white/10 transition-all"
            aria-label="Previous"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>

          <div className="flex gap-sm">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all rounded-full ${
                  index === currentIndex
                    ? 'w-6 h-2 bg-primary'
                    : 'w-2 h-2 bg-on-surface-variant/30 hover:bg-on-surface-variant/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="glass-surface p-sm rounded-full hover:bg-white/10 transition-all"
            aria-label="Next"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>
    </section>
  );
};