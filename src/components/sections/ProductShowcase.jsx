import { useState } from 'react';
import { motion } from 'framer-motion';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { Card } from '../ui/Card';

const features = [
  {
    id: 1,
    icon: 'hub',
    title: 'Neural Network Status',
    description: 'Monitor sub-millisecond propagation delays across your global autonomous cluster in real-time.',
    progress: 85,
    color: 'primary',
  },
  {
    id: 2,
    icon: 'query_stats',
    title: 'Predictive Analytics',
    description: 'Leverage quantum-inspired algorithms to forecast market trends and consumer behavior with unmatched precision.',
    stats: { confidence: '0.99', drift: 'Low' },
    color: 'tertiary',
  },
  {
    id: 3,
    icon: 'memory',
    title: 'Edge Intelligence',
    description: 'Decentralize decision-making by deploying weights to 10,000+ edge nodes instantly.',
    nodes: ['E1', 'E2', 'E3', '+1k'],
    color: 'secondary',
  },
];

const galleryImages = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCpbeG8auVW2We01-uAKS_JNMoGG8SCS8VxTBnU8j41Z-8-0m5Da1Xlo8l_BM4Yh_NH9i4-cHSkgl2uRXxQhYxasooxnkALlbrjzq43KlpWj-u_0mXTDN1QXfEGjgUpAZRksjEFTzCahxHPemBa7GN5bA6w7HRgEC1mJ9GWsnoItlPdgAKI30i7b04ca4TfBMFeKSJbrDU3F7sTytby_sP79P9KwrSimONoktlmphwpP9GR8upV9NiY',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCpbeG8auVW2We01-uAKS_JNMoGG8SCS8VxTBnU8j41Z-8-0m5Da1Xlo8l_BM4Yh_NH9i4-cHSkgl2uRXxQhYxasooxnkALlbrjzq43KlpWj-u_0mXTDN1QXfEGjgUpAZRksjEFTzCahxHPemBa7GN5bA6w7HRgEC1mJ9GWsnoItlPdgAKI30i7b04ca4TfBMFeKSJbrDU3F7sTytby_sP79P9KwrSimONoktlmphwpP9GR8upV9NiY',
];

export const ProductShowcase = () => {
  const [selectedImage, setSelectedImage] = useState(galleryImages[0]);

  return (
    <section id="platform" className="py-2xl relative z-10">
      <Container>
        <SectionHeading
          title="Cognitive Engine Modules"
          subtitle="Deploy advanced AI capabilities with a single line of code."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-2xl">
          {features.map((feature) => (
            <Card key={feature.id} className="ai-shimmer group" hover>
              <div className={`w-12 h-12 rounded-xl bg-${feature.color}/10 flex items-center justify-center mb-lg group-hover:bg-${feature.color}/20 transition-colors`}>
                <span className={`material-symbols-outlined text-${feature.color} text-3xl`}>
                  {feature.icon}
                </span>
              </div>
              <h3 className="font-headline-lg text-headline-lg mb-sm">{feature.title}</h3>
              <p className="text-on-surface-variant text-body-md mb-lg">{feature.description}</p>

              {feature.progress && (
                <div className="flex items-center gap-sm">
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full bg-${feature.color} w-[${feature.progress}%] rounded-full shadow-[0_0_8px_#c0c1ff]`}></div>
                  </div>
                  <span className="text-label-sm font-label-sm text-primary">{feature.progress}%</span>
                </div>
              )}

              {feature.stats && (
                <div className="grid grid-cols-2 gap-sm">
                  <div className="bg-white/5 p-sm rounded-lg border border-white/5">
                    <div className="text-xs text-on-surface-variant">Confidence</div>
                    <div className="text-lg font-bold text-tertiary">{feature.stats.confidence}</div>
                  </div>
                  <div className="bg-white/5 p-sm rounded-lg border border-white/5">
                    <div className="text-xs text-on-surface-variant">Drift</div>
                    <div className="text-lg font-bold text-error">{feature.stats.drift}</div>
                  </div>
                </div>
              )}

              {feature.nodes && (
                <div className="flex -space-x-2">
                  {feature.nodes.map((node, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-surface-container flex items-center justify-center text-[10px]">
                      {node}
                    </div>
                  ))}
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter mb-2xl">
          <div className="md:col-span-3">
            <motion.img
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              src={selectedImage}
              alt="Product Gallery"
              className="w-full h-auto rounded-xl glass-surface p-xs shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
            />
          </div>
          <div className="flex md:flex-col gap-sm">
            {galleryImages.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(img)}
                className={`rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImage === img ? 'border-primary' : 'border-transparent'
                }`}
              >
                <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-20 object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* ✅ Video Preview - Added ID for scrolling */}
        <div id="product-demo" className="mt-gutter scroll-mt-24">
          <h4 className="text-headline-lg font-headline-lg mb-md text-center text-primary">Watch Product Demo</h4>
          <div className="relative rounded-xl overflow-hidden glass-surface p-xs shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
            <iframe
              className="w-full aspect-video rounded-lg"
              src="https://www.youtube.com/embed/ZK-rNEhJIDs?autoplay=0&rel=0&modestbranding=1&showinfo=0"
              title="AI Tech Product Demo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </Container>
    </section>
  );
};