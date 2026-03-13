import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { ParticleField } from '../scenes/InteractiveScene';
import { useMousePosition } from '../hooks/useMousePosition';
import gsap from 'gsap';

const CHARS = 'NovaStream'.split('');

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.5 },
  },
};

const charVariants = {
  hidden: { opacity: 0, y: 80, rotateX: -80 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function HeroSection() {
  const { normalizedX, normalizedY } = useMousePosition();
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const chevronRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!subtitleRef.current || !chevronRef.current) return;

    gsap.from(subtitleRef.current, {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 1.4,
      ease: 'power3.out',
    });

    gsap.from(chevronRef.current, {
      opacity: 0,
      y: -10,
      duration: 1,
      delay: 2,
      ease: 'power2.out',
    });
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* 3D Particle Canvas */}
      <div className="hero-canvas">
        <Canvas dpr={[1, 1.5]} gl={{ antialias: false, alpha: true }}>
          <PerspectiveCamera makeDefault fov={60} position={[0, 0, 5]} />
          <ParticleField mouseX={normalizedX} mouseY={normalizedY} />
        </Canvas>
      </div>

      {/* Ambient Glow Blobs */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: 400,
        height: 400,
        background: 'radial-gradient(circle, rgba(0,245,255,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
        filter: 'blur(40px)',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '20%',
        right: '10%',
        width: 350,
        height: 350,
        background: 'radial-gradient(circle, rgba(191,0,255,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
        filter: 'blur(40px)',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        textAlign: 'center',
        maxWidth: 900,
        padding: '0 2rem',
      }}>
        {/* Badge */}
        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ justifyContent: 'center', marginBottom: '2rem' }}
        >
          <span />
          Award-winning creative studio — 2024
        </motion.div>

        {/* Kinetic Title */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            perspective: 800,
          }}
        >
          {CHARS.map((char, i) => (
            <motion.span
              key={i}
              variants={charVariants}
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(3.5rem, 9vw, 8rem)',
                lineHeight: 1,
                background: 'linear-gradient(135deg, #00f5ff, #bf00ff, #ff006e)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-0.02em',
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.div>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
            color: 'rgba(240,244,255,0.55)',
            letterSpacing: '-0.01em',
            marginTop: '1rem',
            marginBottom: '0.75rem',
          }}
        >
          Creative Studio
        </motion.p>

        <p
          ref={subtitleRef}
          style={{
            fontSize: 'clamp(0.95rem, 1.8vw, 1.125rem)',
            color: 'rgba(240,244,255,0.45)',
            lineHeight: 1.7,
            maxWidth: 560,
            margin: '0 auto 3rem',
          }}
        >
          We design and build immersive digital experiences — 3D worlds, motion-first brands,
          and next-gen web applications.
        </p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <motion.button
            className="btn-glow"
            style={{ padding: '0.875rem 2.5rem', fontSize: '1rem' }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explore Work
          </motion.button>
          <motion.button
            className="btn-ghost"
            style={{ padding: '0.875rem 2.5rem', fontSize: '1rem' }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Start a Project
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Chevron */}
      <div
        ref={chevronRef}
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
        }}
      >
        <span style={{ fontSize: '0.7rem', letterSpacing: '0.15em', color: 'rgba(240,244,255,0.3)', textTransform: 'uppercase' }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: 24,
            height: 40,
            border: '1.5px solid rgba(0,245,255,0.3)',
            borderRadius: 12,
            display: 'flex',
            justifyContent: 'center',
            paddingTop: 6,
          }}
        >
          <motion.div
            animate={{ opacity: [1, 0, 1], y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: 4,
              height: 8,
              borderRadius: 2,
              background: 'var(--color-cyan)',
              boxShadow: '0 0 6px var(--color-cyan)',
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}