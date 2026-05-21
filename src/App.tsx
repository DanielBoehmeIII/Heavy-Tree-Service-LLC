import { useCallback, useEffect, useState } from 'react';
import type { PageId } from './types/pizza';
import Home from './pages/Home';
import Contact from './pages/Contact';

const PAGES: PageId[] = ['home', 'services', 'about', 'contact'];

function pageFromHash(): PageId {
  const id = window.location.hash.replace('#', '') as PageId;
  return PAGES.includes(id) ? id : 'home';
}

export default function App() {
  const [page, setPage] = useState<PageId>(() => pageFromHash());

  const navigate = useCallback((id: PageId) => {
    setPage(id);
    window.location.hash = id === 'home' ? '' : id;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const onHashChange = () => setPage(pageFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return (
    <>
      {page === 'home' && <Home onNavigate={navigate} />}
      {page === 'contact' && <Contact onNavigate={navigate} />}
      {(page === 'services' || page === 'about') && <Home onNavigate={navigate} />}
    </>
  );
}
