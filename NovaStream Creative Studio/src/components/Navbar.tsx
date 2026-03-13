import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'Work', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const target = document.querySelector(href);
    target?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        className="glass"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: '0 2rem',
          height: '70px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backdropFilter: scrolled ? 'blur(32px)' : 'blur(12px)',
          WebkitBackdropFilter: scrolled ? 'blur(32px)' : 'blur(12px)',
          background: scrolled ? 'rgba(5,5,8,0.85)' : 'rgba(5,5,8,0.4)',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
          transition: 'all 0.4s ease',
        }}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); handleNav('#hero'); }}
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <div style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: 'linear-gradient(135deg, #00f5ff, #bf00ff)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 16px rgba(0,245,255,0.4)',
          }}>
            <span style={{ color: '#fff', fontWeight: 800, fontSize: 14, fontFamily: 'var(--font-display)' }}>N</span>
          </div>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '1.1rem',
            background: 'linear-gradient(135deg, #00f5ff, #bf00ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            NovaStream
          </span>
        </a>

        {/* Desktop Nav Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="hidden-mobile">
          {NAV_LINKS.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              className="nav-link"
              onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
              whileHover={{ y: -1 }}
              transition={{ duration: 0.2 }}
            >
              {link.label}
            </motion.a>
          ))}
          <motion.button
            className="btn-glow"
            style={{ padding: '0.5rem 1.5rem', fontSize: '0.875rem' }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleNav('#contact')}
          >
            Get in Touch
          </motion.button>
        </div>

        {/* Hamburger (mobile) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: 'none',
            flexDirection: 'column',
            gap: 5,
            background: 'none',
            border: 'none',
            padding: 8,
          }}
          className="hamburger"
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              style={{
                display: 'block',
                width: 24,
                height: 2,
                borderRadius: 2,
                background: 'var(--color-cyan)',
              }}
              animate={
                menuOpen
                  ? i === 0
                    ? { rotate: 45, y: 7 }
                    : i === 1
                    ? { opacity: 0 }
                    : { rotate: -45, y: -7 }
                  : { rotate: 0, y: 0, opacity: 1 }
              }
              transition={{ duration: 0.3 }}
            />
          ))}
        </button>
      </motion.nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '280px',
              zIndex: 999,
              background: 'rgba(11,11,18,0.97)',
              backdropFilter: 'blur(32px)',
              padding: '5rem 2rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              borderLeft: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="nav-link"
                style={{ fontSize: '1.1rem', fontWeight: 500 }}
                onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}