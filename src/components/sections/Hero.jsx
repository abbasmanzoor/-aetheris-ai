import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Hero = () => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const meshRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    
    const primaryColor = isDark ? 0xc0c1ff : 0x818cf8;
    const secondaryColor = isDark ? 0x89ceff : 0x38bdf8;
    const emissiveIntensity = isDark ? 0.5 : 0.15;
    const opacity = isDark ? 0.8 : 0.4;
    const outerOpacity = isDark ? 0.2 : 0.08;

    const group = new THREE.Group();
    scene.add(group);

    const coreGeometry = new THREE.IcosahedronGeometry(1.5, 2);
    const coreMaterial = new THREE.MeshPhongMaterial({
      color: primaryColor,
      wireframe: true,
      transparent: true,
      opacity: opacity,
      emissive: primaryColor,
      emissiveIntensity: emissiveIntensity,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    group.add(core);

    const outerGeometry = new THREE.IcosahedronGeometry(2.2, 1);
    const outerMaterial = new THREE.MeshPhongMaterial({
      color: secondaryColor,
      wireframe: true,
      transparent: true,
      opacity: outerOpacity,
    });
    const outer = new THREE.Mesh(outerGeometry, outerMaterial);
    group.add(outer);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(primaryColor, isDark ? 1.5 : 0.8);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    meshRef.current = { group, core };

    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      group.rotation.y += 0.005;
      group.rotation.x += 0.003;
      core.scale.setScalar(1 + Math.sin(Date.now() * 0.002) * 0.05);
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    const observer = new MutationObserver(() => {
      const isDarkNow = document.documentElement.getAttribute('data-theme') === 'dark';
      const newPrimary = isDarkNow ? 0xc0c1ff : 0x818cf8;
      const newSecondary = isDarkNow ? 0x89ceff : 0x38bdf8;
      const newEmissive = isDarkNow ? 0.5 : 0.15;
      const newOpacity = isDarkNow ? 0.8 : 0.4;
      const newOuterOpacity = isDarkNow ? 0.2 : 0.08;
      
      coreMaterial.color.setHex(newPrimary);
      coreMaterial.emissive.setHex(newPrimary);
      coreMaterial.emissiveIntensity = newEmissive;
      coreMaterial.opacity = newOpacity;
      outerMaterial.color.setHex(newSecondary);
      outerMaterial.opacity = newOuterOpacity;
      pointLight.color.setHex(newPrimary);
      pointLight.intensity = isDarkNow ? 1.5 : 0.8;
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      if (animationId) cancelAnimationFrame(animationId);
      if (rendererRef.current) {
        rendererRef.current.dispose();
        container.removeChild(rendererRef.current.domElement);
      }
    };
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="relative min-h-screen pt-40 overflow-hidden flex flex-col items-center">
      <div ref={containerRef} className="absolute inset-0 w-full h-full opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/80 pointer-events-none" />

      <Container className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-xs px-md py-xs rounded-full glass-surface text-label-sm font-label-sm text-primary mb-lg"
        >
          <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
            auto_awesome
          </span>
          The Future of Autonomous Scale
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display-lg text-display-lg-mobile md:text-display-lg max-w-4xl mx-auto mb-lg leading-tight"
        >
          Architecting the <span className="animate-text-reveal">Intelligence</span> of Tomorrow
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl mx-auto mb-xl"
        >
          Aetheris AI provides the neural infrastructure for the next generation of enterprise automation. Built for precision, engineered for scale.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-md justify-center items-center mb-2xl"
        >
          <Button
            variant="primary"
            size="lg"
            className="w-full sm:w-auto shadow-[0_0_40px_rgba(192,193,255,0.4)] hover:shadow-[0_0_70px_rgba(192,193,255,0.6)] transition-shadow duration-300"
            onClick={() => scrollToSection('pricing')}
          >
            Start Free Trial
          </Button>
          {/* ✅ Watch Demo - Now scrolls to product-demo */}
          <Button
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto"
            onClick={() => scrollToSection('product-demo')}
          >
            Watch Demo
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2 text-on-surface-variant/50"
          >
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <span className="material-symbols-outlined">expand_more</span>
          </motion.div>
        </motion.div>
      </Container>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative w-full max-w-5xl mx-auto px-margin-mobile mt-lg z-10"
      >
        <div className="relative rounded-2xl overflow-hidden glass-surface p-xs shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
          <img
            alt="Aetheris Dashboard"
            className="w-full h-auto rounded-xl"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpbeG8auVW2We01-uAKS_JNMoGG8SCS8VxTBnU8j41Z-8-0m5Da1Xlo8l_BM4Yh_NH9i4-cHSkgl2uRXxQhYxasooxnkALlbrjzq43KlpWj-u_0mXTDN1QXfEGjgUpAZRksjEFTzCahxHPemBa7GN5bA6w7HRgEC1mJ9GWsnoItlPdgAKI30i7b04ca4TfBMFeKSJbrDU3F7sTytby_sP79P9KwrSimONoktlmphwpP9GR8upV9NiY"
          />
          <div className="absolute bottom-8 left-8 p-md glass-surface rounded-xl flex items-center gap-md hidden md:flex ai-shimmer">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                monitoring
              </span>
            </div>
            <div>
              <div className="text-label-sm font-label-sm text-on-surface-variant">REAL-TIME ACCURACY</div>
              <div className="text-headline-lg font-headline-lg text-primary">99.8%</div>
            </div>
          </div>
        </div>
      </motion.div>
    </header>
  );
};