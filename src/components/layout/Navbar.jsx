import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from '../ui/ThemeToggle';
import { useScrollProgress } from '../../hooks/useScrollProgress';

const navLinks = [
  { name: 'Platform', href: '#platform', id: 'platform' },
  { name: 'Solutions', href: '#solutions', id: 'solutions' },
  { name: 'Developers', href: '#blog', id: 'blog' },
  { name: 'Pricing', href: '#pricing', id: 'pricing' },
];

// SVG Logo
const Logo = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
    <path d="M20 4L4 12V28L20 36L36 28V12L20 4Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" className="text-primary"/>
    <circle cx="20" cy="20" r="6" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2" className="text-primary"/>
    <path d="M20 14V26M14 20H26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-primary"/>
  </svg>
);

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const progress = useScrollProgress();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  // ✅ Single click handler - works on first click on mobile
  const handleItemClick = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    scrollToSection(id);
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 h-0.5 bg-gradient-to-r from-primary to-secondary-container z-[60]"
        style={{ width: `${progress}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.1 }}
      />

      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-surface/40 backdrop-blur-xl border-b border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.3)]'
            : 'bg-transparent'
        }`}
        style={{ touchAction: 'manipulation' }} // ✅ Prevents double-tap zoom on mobile
      >
        <div className="flex justify-between items-center max-w-max-width mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 h-20">
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <Logo />
            <span className="font-headline-lg text-lg sm:text-xl md:text-2xl font-bold text-on-surface dark:text-on-surface whitespace-nowrap">
              Aetheris AI
            </span>
          </div>

          {/* ✅ Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-on-surface/70 hover:text-primary transition-all duration-300 font-body-md text-sm xl:text-base"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.id);
                }}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              className="hidden xl:block text-on-surface/70 hover:text-primary font-medium transition-all text-sm xl:text-base"
              onClick={() => scrollToSection('product-demo')}
            >
              Watch Demo
            </button>
            <button
              className="hidden md:block bg-gradient-to-r from-primary to-secondary-container px-4 py-1.5 sm:px-5 sm:py-2 rounded-lg font-bold text-on-primary hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(192,193,255,0.3)] text-sm sm:text-base whitespace-nowrap"
              onClick={() => scrollToSection('pricing')}
            >
              Start Free Trial
            </button>
            <ThemeToggle />

            {/* ✅ Hamburger Menu */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-1 sm:p-2 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined text-primary text-2xl sm:text-3xl">
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* ✅ Mobile/Tablet Menu - Single click only */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden glass-surface border-t border-white/10 overflow-y-auto"
              style={{
                pointerEvents: 'auto',
                position: 'relative',
                zIndex: 100,
                maxHeight: 'calc(100vh - 80px)',
                touchAction: 'manipulation',
              }}
            >
              <div className="flex flex-col p-4 sm:p-6 space-y-3 sm:space-y-4">
                {navLinks.map((link) => (
                  <div
                    key={link.name}
                    className="text-on-surface/70 hover:text-primary transition-colors font-body-md text-base sm:text-lg py-2 sm:py-3 px-3 sm:px-4 rounded-lg hover:bg-white/5 cursor-pointer w-full active:bg-white/10"
                    onClick={(e) => handleItemClick(e, link.id)}
                    role="button"
                    tabIndex={0}
                  >
                    {link.name}
                  </div>
                ))}

                <hr className="border-white/10" />

                <div
                  className="glass-surface px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-bold text-on-surface text-base sm:text-lg hover:bg-white/10 transition-all border border-white/20 w-full text-center cursor-pointer active:bg-white/20"
                  onClick={(e) => handleItemClick(e, 'product-demo')}
                  role="button"
                  tabIndex={0}
                >
                  Watch Demo
                </div>

                <div
                  className="bg-gradient-to-r from-primary to-secondary-container px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-bold text-on-primary text-base sm:text-lg hover:brightness-110 transition-all w-full text-center shadow-[0_0_20px_rgba(192,193,255,0.3)] cursor-pointer active:brightness-75"
                  onClick={(e) => handleItemClick(e, 'pricing')}
                  role="button"
                  tabIndex={0}
                >
                  Start Free Trial
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};