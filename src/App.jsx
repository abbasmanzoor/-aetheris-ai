import { ThemeProvider } from './contexts/ThemeContext';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { ProductShowcase } from './components/sections/ProductShowcase';
import { FeatureComparison } from './components/sections/FeatureComparison';
import { AnimatedStats } from './components/sections/AnimatedStats';
import { Pricing } from './components/sections/Pricing';
import { Testimonials } from './components/sections/Testimonials';
import { FAQ } from './components/sections/FAQ';
import { BlogPreview } from './components/sections/BlogPreview';
import { Contact } from './components/sections/Contact';
import { BackToTop } from './components/ui/BackToTop';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <Hero />
        <ProductShowcase />
        <FeatureComparison />
        <AnimatedStats />
        <Pricing />
        <Testimonials />
        <FAQ />
        <BlogPreview />
        <Contact />
        <BackToTop />
        <footer className="bg-surface-container-lowest w-full py-2xl pb-lg border-t border-white/5">
          <div className="max-w-max-width mx-auto px-margin-mobile text-center text-on-surface-variant text-body-md">
            <p>© 2024 Aetheris AI. Engineered for the future.</p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;