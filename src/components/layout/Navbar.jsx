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

  // ✅ Universal scroll function with fallback
  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false); // Close menu first
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80; // Adjust for navbar height
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    } else {
      // Fallback: try to scroll to a section with that id
      const fallbackEl = document.getElementById(id);
      if (fallbackEl) {
        fallbackEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // ✅ Mobile item click handler
  const handleMobileClick = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    scrollToSection(id);
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 h-0.5 bg-gradient-to-r from-primary to-secondary-container z-[60]"
        style={{ width: `${progress}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.1 }}
      />

      {/* Navbar */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-surface/40 backdrop-blur-xl border-b border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.3)]'
            : 'bg-transparent'
        }`}
      >
        <div className="flex justify-between items-center max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Logo />
            <span className="font-headline-lg text-headline-lg font-bold text-on-surface dark:text-on-surface whitespace-nowrap">
              Aetheris AI
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-xl">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-on-surface/70 hover:text-primary transition-all duration-300 font-body-md text-body-md"
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
          <div className="flex items-center gap-md">
            <button
              className="hidden lg:block text-on-surface/70 hover:text-primary font-medium transition-all text-body-md"
              onClick={() => scrollToSection('product-demo')}
            >
              Watch Demo
            </button>
            <button
              className="bg-gradient-to-r from-primary to-secondary-container px-lg py-sm rounded-lg font-bold text-on-primary hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(192,193,255,0.3)] text-body-md"
              onClick={() => scrollToSection('pricing')}
            >
              Start Free Trial
            </button>
            <ThemeToggle />

            {/* Hamburger Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-xs hover:bg-white/10 rounded-full transition-colors"
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined text-primary text-2xl">
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* ✅ Mobile Menu - Fully Clickable with Touch Support */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden glass-surface border-t border-white/10 overflow-hidden"
              style={{ pointerEvents: 'auto', position: 'relative', zIndex: 100 }}
            >
              <div className="flex flex-col p-lg space-y-md">
                {/* Navigation Links */}
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    className="text-on-surface/70 hover:text-primary transition-colors font-body-md text-body-md py-sm px-md rounded-lg hover:bg-white/5 text-left cursor-pointer w-full"
                    onClick={(e) => handleMobileClick(e, link.id)}
                    onTouchStart={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                    }}
                    onTouchEnd={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    {link.name}
                  </button>
                ))}

                <hr className="border-white/10" />

                {/* Watch Demo Button */}
                <button
                  className="glass-surface px-xl py-md rounded-xl font-bold text-on-surface text-body-lg hover:bg-white/10 transition-all border border-white/20 w-full"
                  onClick={(e) => handleMobileClick(e, 'product-demo')}
                  onTouchStart={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                  }}
                  onTouchEnd={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  Watch Demo
                </button>

                {/* Start Free Trial Button */}
                <button
                  className="bg-gradient-to-r from-primary to-secondary-container px-xl py-md rounded-xl font-bold text-on-primary text-body-lg hover:brightness-110 transition-all w-full shadow-[0_0_20px_rgba(192,193,255,0.3)]"
                  onClick={(e) => handleMobileClick(e, 'pricing')}
                  onTouchStart={(e) => {
                    e.currentTarget.style.opacity = '0.8';
                  }}
                  onTouchEnd={(e) => {
                    e.currentTarget.style.opacity = '1';
                  }}
                >
                  Start Free Trial
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};