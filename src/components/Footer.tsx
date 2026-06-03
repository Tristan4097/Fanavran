import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="relative bg-n-900 text-white overflow-hidden">
      {/* Decorative concentric circles */}
      <svg
        className="absolute bottom-0 left-0 w-[300px] md:w-[400px] h-[300px] md:h-[400px] opacity-[0.06] pointer-events-none"
        viewBox="0 0 400 400"
        fill="none"
      >
        <circle cx="200" cy="200" r="180" stroke="#00B8A8" strokeWidth="2" />
        <circle cx="200" cy="200" r="150" stroke="#00B8A8" strokeWidth="2" />
        <circle cx="200" cy="200" r="120" stroke="#00B8A8" strokeWidth="2" />
        <circle cx="200" cy="200" r="90" stroke="#00B8A8" strokeWidth="2" />
        <circle cx="200" cy="200" r="60" stroke="#00B8A8" strokeWidth="2" />
        <circle cx="200" cy="200" r="180" stroke="#00B8A8" strokeWidth="6" strokeDasharray="12 8" opacity="0.5" />
      </svg>

      <div className="container-main relative z-10 pt-16 pb-8">
        {/* Top section */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <img src="/logo.png" alt="لوگو" className="h-12 w-auto" />
            <h3 className="text-xl md:text-2xl font-bold">
              شرکت فناوران توسعه امن ناجی
            </h3>
          </div>
          <p className="text-sm text-n-400">
            ارائه‌دهنده راهکارهای نرم‌افزاری و سامانه‌های سازمانی
          </p>
        </div>

        {/* Links + Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Quick links */}
          <div>
            <h4 className="text-sm font-medium text-n-300 mb-3">لینک‌های سریع</h4>
            <div className="flex flex-col gap-2">
              <Link
                to="/"
                className="text-sm text-n-400 hover:text-[#00B8A8] transition-colors duration-150 w-fit"
              >
                صفحه اصلی
              </Link>
              <Link
                to="/#announcements"
                className="text-sm text-n-400 hover:text-[#00B8A8] transition-colors duration-150 w-fit"
              >
                اعلانات
              </Link>
              <Link
                to="/archive"
                className="text-sm text-n-400 hover:text-[#00B8A8] transition-colors duration-150 w-fit"
              >
                آرشیو
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-medium text-n-300 mb-3">تماس با ما</h4>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-n-500">تلفن: ۰۲۱-۸۸۷۷۶۶۵۵</span>
              <span className="text-sm text-n-500">ایمیل: info@fanavaran-naji.ir</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-n-700 pt-4">
          <p className="text-xs text-n-500 text-center">
            © ۱۴۰۴ شرکت فناوران توسعه امن ناجی. تمامی حقوق محفوظ است.
          </p>
        </div>
      </div>
    </footer>
  );
}
