import type { PageId } from '../types/pizza';
import Home from './Home';

// Contact page just renders Home and scrolls to the contact section
export default function Contact({ onNavigate }: { onNavigate: (page: PageId) => void }) {
  return <Home onNavigate={onNavigate} />;
}
