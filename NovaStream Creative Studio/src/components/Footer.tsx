import { motion } from 'framer-motion';

const SOCIAL_LINKS = [
  { label: 'Twitter', href: 'https://twitter.com' },
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Dribbble', href: 'https://dribbble.com' },
];

const FOOTER_NAV = [
  { label: 'Work', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '3rem 2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Glow bg */}
      <div style={{
        position: 'absolute',
        bottom: '-40%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 600,
        height: 200,
        background: 'radial-gradient(ellipse, rgba(0,245,255,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
        {/* Top row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              width: 28,
              height: 28,
              borderRadius: 7,
              background: 'linear-gradient(135deg, #00f5ff, #bf00ff)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 12px rgba(0,245,255,0.3)',
            }}>
              <span style={{ color: '#fff', fontWeight: 800, fontSize: 12, fontFamily: 'var(--font-display)' }}>N</span>
            </div>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '1rem',
              background: 'linear-gradient(135deg, #00f5ff, #bf00ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              NovaStream
            </span>
          </div>

          {/* Nav links */}
          <nav style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            {FOOTER_NAV.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="nav-link"
                style={{ fontSize: '0.875rem' }}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social links */}
          <div style={{ display: 'flex', gap: '1rem' }}>
            {SOCIAL_LINKS.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, color: 'var(--color-cyan)' }}
                style={{ fontSize: '0.8125rem', color: 'rgba(240,244,255,0.4)', textDecoration: 'none' }}
              >
                {s.label}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', marginBottom: '1.5rem' }} />

        {/* Bottom row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <p style={{ fontSize: '0.8125rem', color: 'rgba(240,244,255,0.3)' }}>
            © 2024 NovaStream Creative Studio. All rights reserved.
          </p>
          <p style={{ fontSize: '0.8125rem', color: 'rgba(240,244,255,0.2)' }}>
            Designed & built with ✦ passion
          </p>
        </div>
      </div>
    </footer>
  );
}
