import { BUSINESS } from '../../data/business';
import type { PageId } from '../../types/pizza';
import './Footer.css';

interface Props {
  onNavigate: (page: PageId) => void;
}

export default function Footer({ onNavigate }: Props) {
  return (
    <footer className="hts-footer">
      <div className="hts-footer-inner section-wrap">
        <div className="hts-footer-brand">
          <img src="/logo.png" alt="Heavy Tree Service LLC" className="hts-footer-logo" />
          <p className="hts-footer-tagline">{BUSINESS.tagline}</p>
          <a href={`tel:${BUSINESS.phoneRaw}`} className="hts-footer-phone">
            {BUSINESS.phone}
          </a>
          <span className="pill pill-green hts-footer-badge">24/7 Emergency Response</span>
        </div>

        <div className="hts-footer-links">
          <p className="hts-footer-col-title">Navigate</p>
          {(['home', 'services', 'about', 'contact'] as PageId[]).map(p => (
            <button key={p} className="hts-footer-link" onClick={() => onNavigate(p)}>
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>

        <div className="hts-footer-services">
          <p className="hts-footer-col-title">Services</p>
          {BUSINESS.services.map(s => (
            <span key={s.id} className="hts-footer-service-item">{s.title}</span>
          ))}
        </div>

        <div className="hts-footer-contact">
          <p className="hts-footer-col-title">Contact</p>
          <a href={`tel:${BUSINESS.phoneRaw}`} className="hts-footer-contact-item">
            {BUSINESS.phone}
          </a>
          <a href={`mailto:${BUSINESS.email}`} className="hts-footer-contact-item">
            {BUSINESS.email}
          </a>
          <p className="hts-footer-contact-item">{BUSINESS.address.full}</p>
          <a href={BUSINESS.facebook} target="_blank" rel="noopener noreferrer" className="hts-footer-fb">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            {BUSINESS.followers} Followers
          </a>
        </div>
      </div>

      <div className="hts-footer-bottom">
        <p>© {new Date().getFullYear()} Heavy Tree Service LLC · Finleyville, PA · All rights reserved</p>
        <p className="hts-footer-bottom-right">
          Serving Pittsburgh &amp; surrounding PA areas
        </p>
      </div>
    </footer>
  );
}
