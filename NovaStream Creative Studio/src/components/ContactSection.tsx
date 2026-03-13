import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { submitContact } from '../services/api';
import type { ContactPayload } from '../types';
import toast, { Toaster } from 'react-hot-toast';

const CONTACT_METHODS = [
  { icon: '✉', label: 'Email', value: 'hello@novastream.studio' },
  { icon: '◎', label: 'Based In', value: 'Los Angeles, CA' },
  { icon: '◷', label: 'Response', value: 'Within 24 hours' },
];

export default function ContactSection() {
  const [form, setForm] = useState<ContactPayload>({ name: '', email: '', message: '', company: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    try {
      await submitContact(form);
      setSent(true);
      toast.success('Message sent! We\'ll be in touch soon. ✨');
      setForm({ name: '', email: '', message: '', company: '' });
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-padding">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'rgba(16,16,28,0.95)',
            border: '1px solid rgba(0,245,255,0.2)',
            color: '#f0f4ff',
            fontFamily: 'var(--font-sans)',
            backdropFilter: 'blur(20px)',
          },
        }}
      />

      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <p className="section-label" style={{ justifyContent: 'center' }}>Get in Touch</p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            letterSpacing: '-0.03em',
            color: 'var(--color-white)',
            lineHeight: 1.1,
          }}>
            Let's build something<br />
            <span className="text-gradient">extraordinary</span>
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '4rem', alignItems: 'start' }}>
          {/* Left: Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p style={{ color: 'rgba(240,244,255,0.55)', lineHeight: 1.8, marginBottom: '2.5rem', fontSize: '1rem' }}>
              Have a project in mind? We'd love to hear about it. Drop us a message
              and we'll get back to you within 24 hours.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {CONTACT_METHODS.map((item) => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(0,245,255,0.06)',
                    border: '1px solid rgba(0,245,255,0.15)',
                    color: 'var(--color-cyan)',
                    fontSize: '1.1rem',
                    flexShrink: 0,
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: 2 }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--color-white)' }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="glass-card"
            style={{ padding: '2.5rem' }}
          >
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ textAlign: 'center', padding: '3rem 1rem' }}
                >
                  <div style={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    background: 'rgba(0,245,255,0.1)',
                    border: '2px solid rgba(0,245,255,0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                    fontSize: '1.5rem',
                    color: 'var(--color-cyan)',
                    boxShadow: 'var(--glow-cyan)',
                  }}>
                    ✓
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.75rem' }}>Message Received!</h3>
                  <p style={{ color: 'rgba(240,244,255,0.5)', lineHeight: 1.7 }}>
                    Thank you for reaching out. We'll review your project and get back to you shortly.
                  </p>
                  <motion.button
                    className="btn-ghost"
                    style={{ margin: '2rem auto 0', padding: '0.6rem 1.5rem', display: 'block' }}
                    onClick={() => setSent(false)}
                    whileHover={{ scale: 1.04 }}
                  >
                    Send Another
                  </motion.button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.08em', color: 'var(--color-muted)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                        Name <span style={{ color: 'var(--color-cyan)' }}>*</span>
                      </label>
                      <input
                        className="form-field"
                        type="text"
                        name="name"
                        placeholder="Alex Johnson"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.08em', color: 'var(--color-muted)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                        Email <span style={{ color: 'var(--color-cyan)' }}>*</span>
                      </label>
                      <input
                        className="form-field"
                        type="email"
                        name="email"
                        placeholder="alex@company.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.08em', color: 'var(--color-muted)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                      Company (optional)
                    </label>
                    <input
                      className="form-field"
                      type="text"
                      name="company"
                      placeholder="Acme Inc."
                      value={form.company}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.08em', color: 'var(--color-muted)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                      Message <span style={{ color: 'var(--color-cyan)' }}>*</span>
                    </label>
                    <textarea
                      className="form-field"
                      name="message"
                      placeholder="Tell us about your project, goals, and timeline..."
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      required
                    />
                  </div>

                  <motion.button
                    type="submit"
                    className="btn-glow"
                    style={{ padding: '0.9rem', fontSize: '0.9375rem', width: '100%' }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="animate-neon-pulse">Sending…</span>
                    ) : (
                      'Send Message →'
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #contact > div > div:last-child { grid-template-columns: 1fr !important; }
          #contact form > div:first-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
