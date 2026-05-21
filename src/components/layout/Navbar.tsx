import { useEffect, useState } from 'react';
import type { PageId } from '../../types/pizza';
import { BUSINESS } from '../../data/business';
import './Navbar.css';

interface Props {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

const NAV_LINKS: Array<{ id: PageId; label: string }> = [
  { id: 'home',    label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'about',   label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar({ currentPage, onNavigate }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header className={['hts-nav', scrolled ? 'hts-nav--scrolled' : ''].join(' ')}>
        <button className="hts-nav-logo" onClick={() => onNavigate('home')}>
          <img src="/logo.png" alt="Heavy Tree Service LLC" className="hts-nav-logo-img" />
          <span className="hts-nav-logo-text">Heavy Tree Service</span>
        </button>

        <nav className="hts-nav-links">
          {NAV_LINKS.map(link => (
            <button
              key={link.id}
              className={['hts-nav-link', currentPage === link.id ? 'hts-nav-link--active' : ''].join(' ')}
              onClick={() => onNavigate(link.id)}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="hts-nav-actions">
          <a href={`tel:${BUSINESS.phoneRaw}`} className="hts-nav-phone">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.1a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.5 17.5z"/>
            </svg>
            {BUSINESS.phone}
          </a>
          <button className="hts-nav-cta" onClick={() => onNavigate('contact')}>
            Free Estimate
          </button>
          <button
            className="hts-nav-hamburger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span className={menuOpen ? 'open' : ''} />
            <span className={menuOpen ? 'open' : ''} />
            <span className={menuOpen ? 'open' : ''} />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div className={['hts-mobile-menu', menuOpen ? 'hts-mobile-menu--open' : ''].join(' ')}>
        {NAV_LINKS.map(link => (
          <button
            key={link.id}
            className="hts-mobile-link"
            onClick={() => { onNavigate(link.id); setMenuOpen(false); }}
          >
            {link.label}
          </button>
        ))}
        <a href={`tel:${BUSINESS.phoneRaw}`} className="hts-mobile-phone">
          Call {BUSINESS.phone}
        </a>
      </div>
    </>
  );
}
