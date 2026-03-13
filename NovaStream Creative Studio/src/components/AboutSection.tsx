import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { number: '8+', label: 'Years of Excellence' },
  { number: '120+', label: 'Projects Delivered' },
  { number: '60+', label: 'Happy Clients' },
  { number: '12', label: 'Industry Awards' },
];

function StatCounter({ number, label, delay }: { number: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      style={{ textAlign: 'center' }}
    >
      <motion.div
        className="stat-number"
        initial={{ scale: 0.8 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 0.5, delay: delay + 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {number}
      </motion.div>
      <p style={{ fontSize: '0.875rem', color: 'rgba(240,244,255,0.45)', marginTop: '0.5rem', letterSpacing: '0.03em' }}>
        {label}
      </p>
    </motion.div>
  );
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !textRef.current) return;

    const lines = textRef.current.querySelectorAll('.reveal-line');
    const ctx = gsap.context(() => {
      gsap.from(lines, {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 75%',
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section-padding">
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
          {/* Left: Text */}
          <div ref={textRef}>
            <p className="section-label">Our Story</p>
            <h2
              className="reveal-line"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                letterSpacing: '-0.03em',
                color: 'var(--color-white)',
                lineHeight: 1.15,
                marginBottom: '1.5rem',
              }}
            >
              Where vision<br />meets <span className="text-gradient">execution</span>
            </h2>
            <p
              className="reveal-line"
              style={{ fontSize: '1rem', color: 'rgba(240,244,255,0.55)', lineHeight: 1.8, marginBottom: '1rem' }}
            >
              NovaStream was born from a shared obsession with the intersection of art, technology,
              and storytelling. We're a team of designers, developers, and motion artists who believe
              the web is the most powerful creative medium of our time.
            </p>
            <p
              className="reveal-line"
              style={{ fontSize: '1rem', color: 'rgba(240,244,255,0.55)', lineHeight: 1.8, marginBottom: '2rem' }}
            >
              From immersive 3D campaigns for global brands to micro-animation systems for
              seed-stage startups — we bring the same obsessive craft to every project.
            </p>

            <motion.button
              className="btn-ghost"
              style={{ padding: '0.75rem 2rem', fontSize: '0.9rem' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Work With Us →
            </motion.button>
          </div>

          {/* Right: Visual panel */}
          <div style={{ position: 'relative' }}>
            {/* Decorative 3D-ish grid box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'relative',
                height: 400,
                borderRadius: 24,
                overflow: 'hidden',
                background: 'linear-gradient(135deg, rgba(0,245,255,0.08) 0%, rgba(191,0,255,0.08) 50%, rgba(255,0,110,0.08) 100%)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {/* Grid pattern */}
              <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.15 }} xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00f5ff" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>

              {/* Glowing orbs */}
              <div className="animate-float" style={{
                position: 'absolute',
                top: '20%',
                left: '20%',
                width: 120,
                height: 120,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(0,245,255,0.4) 0%, transparent 70%)',
                filter: 'blur(20px)',
              }} />
              <div className="animate-float" style={{
                position: 'absolute',
                bottom: '25%',
                right: '20%',
                width: 100,
                height: 100,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(191,0,255,0.4) 0%, transparent 70%)',
                filter: 'blur(16px)',
                animationDelay: '-3s',
              }} />

              {/* Center text */}
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
              }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '5rem', fontWeight: 800, lineHeight: 1 }}>
                  <span className="text-gradient">NS</span>
                </span>
                <span style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: 'rgba(240,244,255,0.3)', textTransform: 'uppercase' }}>
                  Est. 2016
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Stats Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '2rem',
          marginTop: '5rem',
          paddingTop: '4rem',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}>
          {STATS.map((stat, i) => (
            <StatCounter key={stat.label} number={stat.number} label={stat.label} delay={i * 0.1} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #about .grid-two { grid-template-columns: 1fr !important; }
          #about .stats-row { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
