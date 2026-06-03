import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileOpen]);

  const navLinks = [
    { to: '/', label: 'صفحه اصلی' },
    { to: '/archive', label: 'اعلانات' },
    { to: '/archive', label: 'آرشیو' },
  ];

  const isActive = (to: string) => {
    if (to === '/') return location.pathname === '/';
    return location.pathname.startsWith(to);
  };

  return (
    <>
      <header
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-n-100/85 dark:bg-n-900/85 backdrop-blur-[16px] border-b border-n-300 dark:border-n-700'
            : 'bg-transparent'
        }`}
      >
        <div className="container-main h-[72px] md:h-[72px] h-[64px] flex items-center justify-between">
          {/* Logo + Company Name */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="فناوران توسعه امن ناجی"
              className="h-10 md:h-12 w-auto object-contain"
            />
            <span className="hidden md:block text-sm lg:text-base font-bold text-n-900 dark:text-n-100 whitespace-nowrap">
              شرکت فناوران توسعه امن ناجی
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className={`relative text-sm font-medium transition-colors duration-150 py-1 ${
                  isActive(link.to)
                    ? 'text-brand'
                    : 'text-n-600 dark:text-n-400 hover:text-brand dark:hover:text-brand'
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 right-0 h-[2px] bg-brand transition-all duration-150 ${
                    isActive(link.to) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-150 hover:bg-n-200 dark:hover:bg-n-700"
              aria-label="تغییر تم"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-n-600" />
              ) : (
                <Sun className="w-5 h-5 text-n-400" />
              )}
            </button>
          </nav>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full flex items-center justify-center"
              aria-label="تغییر تم"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-n-600" />
              ) : (
                <Sun className="w-5 h-5 text-n-400" />
              )}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="w-10 h-10 rounded-full flex items-center justify-center"
              aria-label="منو"
            >
              {mobileOpen ? (
                <X className="w-6 h-6 text-n-900 dark:text-n-100" />
              ) : (
                <Menu className="w-6 h-6 text-n-900 dark:text-n-100" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-40 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed top-0 right-0 h-full w-[280px] bg-n-100/95 dark:bg-n-900/95 backdrop-blur-[20px] z-50 md:hidden shadow-2xl">
            <div className="p-6 flex flex-col gap-2 mt-16">
              {navLinks.map((link, i) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className={`py-3 px-4 rounded-xl text-base font-medium transition-all duration-150 ${
                    isActive(link.to)
                      ? 'text-brand bg-brand-light dark:bg-n-800'
                      : 'text-n-700 dark:text-n-300 hover:bg-n-200 dark:hover:bg-n-800'
                  }`}
                  style={{
                    animation: `fadeInUp 0.3s ease-out ${i * 60}ms both`,
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
