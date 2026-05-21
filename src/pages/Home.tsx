import { type ReactElement, useEffect, useRef, useState } from 'react';
import { BUSINESS } from '../data/business';
import type { PageId } from '../types/pizza';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import './Home.css';

interface Props {
  onNavigate: (page: PageId) => void;
}

// ─── Intersection observer hook ───────────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const els = ref.current.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.12 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
  return ref;
}

// ─── Animated stat counter ────────────────────────────────────────────────────
function StatCard({ value, label, delay }: { value: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`hts-stat-card ${visible ? 'hts-stat-card--visible' : ''}`} style={{ transitionDelay: `${delay}ms` }}>
      <span className="hts-stat-value">{value}</span>
      <span className="hts-stat-label">{label}</span>
    </div>
  );
}

// ─── Service icon SVG ─────────────────────────────────────────────────────────
function ServiceIcon({ icon }: { icon: string }) {
  const icons: Record<string, ReactElement> = {
    tree: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22V12M12 12L8 8M12 12L16 8M8 8L4 4M16 8L20 4M4 4h16M10 4H8M14 4h2"/>
        <path d="M7 12H5l7-8 7 8h-2"/>
      </svg>
    ),
    scissors: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/>
        <line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/>
        <line x1="8.12" y1="8.12" x2="12" y2="12"/>
      </svg>
    ),
    zap: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    disc: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/>
      </svg>
    ),
    mountain: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="3 20 9 4 15 14 19 8 21 20 3 20"/>
      </svg>
    ),
    sprout: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 20h10M10 20c5.5-2.5 7-5.5 7-11V2c-4 0-6.5 1.5-7.5 4C8 2 5 2 2 2v7c0 5.5 1.5 8.5 8 11z"/>
      </svg>
    ),
  };
  return <div className="hts-service-icon">{icons[icon] ?? icons.tree}</div>;
}

// ─── Trust icon ───────────────────────────────────────────────────────────────
function TrustIcon({ title }: { title: string }) {
  const map: Record<string, ReactElement> = {
    'Fully Insured': (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    '24/7 Emergency': (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    'Pro Equipment': (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
    'Family Owned': (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    'Free Estimates': (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
    'Experienced Crew': (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  };
  return <div className="hts-trust-icon">{map[title] ?? map['Fully Insured']}</div>;
}

// ─── Leaf particle ────────────────────────────────────────────────────────────
function LeafParticles() {
  const leaves = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 12,
    duration: 8 + Math.random() * 10,
    size: 6 + Math.random() * 8,
    dx: (Math.random() - 0.5) * 80,
  }));
  return (
    <div className="hts-particles" aria-hidden>
      {leaves.map(l => (
        <div
          key={l.id}
          className="hts-leaf"
          style={{
            left: `${l.left}%`,
            animationDelay: `${l.delay}s`,
            animationDuration: `${l.duration}s`,
            width: `${l.size}px`,
            height: `${l.size}px`,
            '--dx': `${l.dx}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function Home({ onNavigate }: Props) {
  const pageRef = useReveal();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', service: '', message: '' });
  const [formSent, setFormSent] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <div className="hts-page" ref={pageRef}>
      <Navbar currentPage="home" onNavigate={onNavigate} />

      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section className="hts-hero">
        <video
          ref={videoRef}
          className="hts-hero-video"
          src="/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className="hts-hero-overlay" />
        <LeafParticles />

        <div className="hts-hero-content">
          <div className="hts-hero-logo-wrap animate-fade-in">
            <img src="/logo.png" alt="Heavy Tree Service LLC" className="hts-hero-logo" />
          </div>

          <div className="hts-hero-badge animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <span className="hts-hero-badge-dot" />
            24/7 Emergency Response
          </div>

          <h1 className="hts-hero-title animate-fade-in" style={{ animationDelay: '0.15s' }}>
            Heavy Tree<br />
            <span className="hts-hero-title-accent">Service</span>
          </h1>

          <p className="hts-hero-sub animate-fade-in" style={{ animationDelay: '0.22s' }}>
            Professional Tree Removal, Pruning & Emergency<br className="hts-hero-br" /> Storm Cleanup — Pittsburgh, PA
          </p>

          <div className="hts-hero-ctas animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <button className="btn-primary hts-hero-cta-primary" onClick={() => onNavigate('contact')}>
              Get Free Estimate
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
            <a href={`tel:${BUSINESS.phoneRaw}`} className="btn-secondary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.1a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.5 17.5z"/>
              </svg>
              Call Now
            </a>
          </div>

          <a href={`tel:${BUSINESS.phoneRaw}`} className="hts-hero-phone animate-fade-in" style={{ animationDelay: '0.38s' }}>
            {BUSINESS.phone}
          </a>
        </div>

        <div className="hts-hero-scroll">
          <div className="hts-scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────────────────── */}
      <section className="hts-stats">
        <div className="section-wrap hts-stats-inner">
          {BUSINESS.stats.map((s, i) => (
            <StatCard key={s.label} value={s.value} label={s.label} delay={i * 100} />
          ))}
        </div>
      </section>

      {/* ── SERVICES ──────────────────────────────────────────────────────────── */}
      <section className="hts-section hts-services-section">
        <div className="section-wrap">
          <div className="hts-section-header reveal">
            <p className="eyebrow">What We Do</p>
            <h2 className="hts-section-title">Professional Tree Services</h2>
            <p className="hts-section-sub">
              From emergency storm response to precision pruning — fully insured, locally operated, built for Pittsburgh terrain.
            </p>
          </div>

          <div className="hts-services-grid">
            {BUSINESS.services.map((s, i) => (
              <div key={s.id} className={`hts-service-card depth-panel reveal reveal-delay-${Math.min(i + 1, 6)}`}>
                <ServiceIcon icon={s.icon} />
                <h3 className="hts-service-title">{s.title}</h3>
                <p className="hts-service-desc">{s.desc}</p>
                <button className="hts-service-cta" onClick={() => onNavigate('contact')}>
                  Get Estimate
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE ────────────────────────────────────────────────────────── */}
      <section className="hts-section hts-trust-section">
        <div className="section-wrap">
          <div className="hts-section-header reveal">
            <p className="eyebrow">Why Choose Heavy</p>
            <h2 className="hts-section-title">Built on Trust,<br />Backed by Results</h2>
          </div>

          <div className="hts-trust-grid">
            {BUSINESS.trustPoints.map((t, i) => (
              <div key={t.title} className={`hts-trust-card reveal reveal-delay-${Math.min(i + 1, 6)}`}>
                <TrustIcon title={t.title} />
                <h3 className="hts-trust-title">{t.title}</h3>
                <p className="hts-trust-desc">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WORK SHOWCASE ─────────────────────────────────────────────────────── */}
      <section className="hts-section hts-showcase-section">
        <div className="section-wrap">
          <div className="hts-section-header reveal">
            <p className="eyebrow">Our Work</p>
            <h2 className="hts-section-title">Every Job,<br />Done Right</h2>
            <p className="hts-section-sub">
              From storm-downed oaks to full lot clearing — see the kind of work we bring to every site.
            </p>
          </div>

          <div className="hts-showcase-grid">
            {[
              { label: 'Storm Damage Cleanup', desc: 'Emergency response — same-day downed tree removal', gradient: 'linear-gradient(135deg, #0a1f0a 0%, #1a3a1a 50%, #0d2d0d 100%)' },
              { label: 'Large Tree Removal', desc: 'Multi-story oaks and maples — zero property damage', gradient: 'linear-gradient(135deg, #0d1f0a 0%, #152e10 50%, #0a1a08 100%)' },
              { label: 'Stump Grinding', desc: 'Below-grade elimination — clean, flush, ready to plant', gradient: 'linear-gradient(135deg, #12180a 0%, #1e2e10 50%, #0f1508 100%)' },
              { label: 'Clean Finish', desc: 'Full debris haul-out — site left better than we found it', gradient: 'linear-gradient(135deg, #0a140a 0%, #162514 50%, #0a1208 100%)' },
            ].map((item, i) => (
              <div
                key={item.label}
                className={`hts-showcase-card reveal reveal-delay-${Math.min(i + 1, 4)}`}
                style={{ background: item.gradient }}
              >
                <div className="hts-showcase-texture" />
                <div className="hts-showcase-icon">
                  <svg viewBox="0 0 64 64" fill="none" stroke="rgba(34,197,94,0.4)" strokeWidth="1">
                    <circle cx="32" cy="32" r="28"/>
                    <path d="M32 12 L32 52 M12 32 L52 32" strokeDasharray="4 4"/>
                    <circle cx="32" cy="32" r="12" stroke="rgba(34,197,94,0.25)"/>
                  </svg>
                </div>
                <div className="hts-showcase-info">
                  <span className="hts-showcase-label">{item.label}</span>
                  <p className="hts-showcase-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ───────────────────────────────────────────────────────────── */}
      <section className="hts-section hts-process-section">
        <div className="section-wrap">
          <div className="hts-section-header reveal">
            <p className="eyebrow">How It Works</p>
            <h2 className="hts-section-title">Simple Process,<br />Clean Results</h2>
          </div>

          <div className="hts-process-track">
            {BUSINESS.process.map((step, i) => (
              <div key={step.step} className={`hts-process-step reveal reveal-delay-${i + 1}`}>
                <div className="hts-process-connector" aria-hidden={i === 0} />
                <div className="hts-process-node">
                  <span className="hts-process-num">{step.step}</span>
                </div>
                <h3 className="hts-process-title">{step.title}</h3>
                <p className="hts-process-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────────────────── */}
      <section className="hts-section hts-testimonials-section">
        <div className="section-wrap">
          <div className="hts-section-header reveal">
            <p className="eyebrow">Customer Reviews</p>
            <h2 className="hts-section-title">What Pittsburgh Says</h2>
          </div>

          <div className="hts-testimonials-grid">
            {BUSINESS.testimonials.map((t, i) => (
              <div key={t.name} className={`hts-testimonial-card depth-panel reveal reveal-delay-${Math.min(i + 1, 4)}`}>
                <div className="hts-testimonial-stars">
                  {Array.from({ length: t.rating }).map((_, si) => (
                    <svg key={si} width="14" height="14" viewBox="0 0 24 24" fill="#22c55e" stroke="none">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  ))}
                </div>
                <p className="hts-testimonial-text">"{t.text}"</p>
                <div className="hts-testimonial-author">
                  <span className="hts-testimonial-name">{t.name}</span>
                  <span className="hts-testimonial-loc">{t.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICE AREA ──────────────────────────────────────────────────────── */}
      <section className="hts-section hts-area-section">
        <div className="section-wrap">
          <div className="hts-area-inner">
            <div className="hts-area-text reveal">
              <p className="eyebrow">Coverage</p>
              <h2 className="hts-section-title">We Serve All<br />of Greater Pittsburgh</h2>
              <p className="hts-area-desc">
                Based in Finleyville, PA — we cover the South Hills, Washington County, Allegheny County, and surrounding areas. Local crews. Fast arrival. No distance surcharges on most jobs.
              </p>
              <button className="btn-primary" onClick={() => onNavigate('contact')}>
                Check Your Area
              </button>
            </div>

            <div className="hts-area-map reveal reveal-delay-2">
              <div className="hts-area-map-inner">
                <div className="hts-area-map-bg" />
                <div className="hts-area-ring hts-area-ring-1 animate-pulse-glow" />
                <div className="hts-area-ring hts-area-ring-2 animate-pulse-glow" style={{ animationDelay: '0.5s' }} />
                <div className="hts-area-ring hts-area-ring-3 animate-pulse-glow" style={{ animationDelay: '1s' }} />
                <div className="hts-area-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div className="hts-area-chips">
                  {BUSINESS.serviceArea.map((area, i) => (
                    <span key={area} className="hts-area-chip" style={{ animationDelay: `${i * 0.15}s` }}>
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT / CTA ─────────────────────────────────────────────────────── */}
      <section className="hts-section hts-contact-section" id="contact">
        <div className="section-wrap">
          <div className="hts-contact-inner">
            <div className="hts-contact-left reveal">
              <p className="eyebrow">Get In Touch</p>
              <h2 className="hts-section-title">Ready to Get<br />a Free Estimate?</h2>
              <p className="hts-contact-sub">
                Call, email, or fill out the form. We'll respond fast — and if it's an emergency, we're available right now.
              </p>

              <div className="hts-contact-methods">
                <a href={`tel:${BUSINESS.phoneRaw}`} className="hts-contact-method">
                  <div className="hts-contact-method-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.1a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.5 17.5z"/>
                    </svg>
                  </div>
                  <div>
                    <span className="hts-contact-method-label">Call or Text</span>
                    <span className="hts-contact-method-value">{BUSINESS.phone}</span>
                  </div>
                </a>

                <a href={`mailto:${BUSINESS.email}`} className="hts-contact-method">
                  <div className="hts-contact-method-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <div>
                    <span className="hts-contact-method-label">Email Us</span>
                    <span className="hts-contact-method-value">{BUSINESS.email}</span>
                  </div>
                </a>

                <div className="hts-contact-method">
                  <div className="hts-contact-method-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <div>
                    <span className="hts-contact-method-label">Location</span>
                    <span className="hts-contact-method-value">{BUSINESS.address.full}</span>
                  </div>
                </div>
              </div>

              <div className="hts-contact-emergency">
                <span className="hts-emergency-dot" />
                <p>Available 24/7 for emergency storm damage — call any time</p>
              </div>
            </div>

            <div className="hts-contact-right reveal reveal-delay-2">
              {formSent ? (
                <div className="hts-form-success depth-panel">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                  <h3>Message Sent!</h3>
                  <p>We'll follow up shortly. For emergencies, call {BUSINESS.phone} now.</p>
                </div>
              ) : (
                <form className="hts-form depth-panel" onSubmit={handleFormSubmit}>
                  <h3 className="hts-form-title">Request a Free Estimate</h3>

                  <div className="hts-form-row">
                    <div className="hts-form-group">
                      <label className="hts-form-label">Your Name</label>
                      <input
                        type="text"
                        className="hts-form-input"
                        placeholder="John Smith"
                        value={formData.name}
                        onChange={e => setFormData(d => ({ ...d, name: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="hts-form-group">
                      <label className="hts-form-label">Phone Number</label>
                      <input
                        type="tel"
                        className="hts-form-input"
                        placeholder="(412) 000-0000"
                        value={formData.phone}
                        onChange={e => setFormData(d => ({ ...d, phone: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="hts-form-group">
                    <label className="hts-form-label">Email Address</label>
                    <input
                      type="email"
                      className="hts-form-input"
                      placeholder="you@email.com"
                      value={formData.email}
                      onChange={e => setFormData(d => ({ ...d, email: e.target.value }))}
                    />
                  </div>

                  <div className="hts-form-group">
                    <label className="hts-form-label">Service Needed</label>
                    <select
                      className="hts-form-input hts-form-select"
                      value={formData.service}
                      onChange={e => setFormData(d => ({ ...d, service: e.target.value }))}
                      required
                    >
                      <option value="">Select a service...</option>
                      {BUSINESS.services.map(s => (
                        <option key={s.id} value={s.id}>{s.title}</option>
                      ))}
                      <option value="other">Other / Not Sure</option>
                    </select>
                  </div>

                  <div className="hts-form-group">
                    <label className="hts-form-label">Tell Us About Your Project</label>
                    <textarea
                      className="hts-form-input hts-form-textarea"
                      placeholder="Describe the trees, location, urgency, access, etc."
                      rows={4}
                      value={formData.message}
                      onChange={e => setFormData(d => ({ ...d, message: e.target.value }))}
                    />
                  </div>

                  <button type="submit" className="btn-primary hts-form-submit">
                    Send Estimate Request
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />

      {/* Mobile sticky CTA */}
      <div className="hts-mobile-sticky">
        <a href={`tel:${BUSINESS.phoneRaw}`} className="hts-mobile-sticky-call">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.1a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.5 17.5z"/>
          </svg>
          Call Now
        </a>
        <button className="hts-mobile-sticky-estimate" onClick={() => onNavigate('contact')}>
          Free Estimate
        </button>
      </div>
    </div>
  );
}
