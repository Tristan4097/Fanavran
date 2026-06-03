import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import AnnouncementDetail from '@/pages/AnnouncementDetail';
import ArchivePage from '@/pages/ArchivePage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="min-h-screen bg-n-100 dark:bg-n-900 transition-colors duration-300">
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/announcement/:id" element={<AnnouncementDetail />} />
        <Route path="/archive" element={<ArchivePage />} />
      </Routes>
      <Footer />
    </div>
  );
}
