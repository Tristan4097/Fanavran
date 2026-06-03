import { ChevronDown } from 'lucide-react';
import GeometricBackground from '@/components/GeometricBackground';

export default function HeroSection() {
  const scrollToAnnouncements = () => {
    const el = document.getElementById('announcements');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-n-100 dark:bg-n-900">
      {/* Background gradients */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 120% 100% at 80% 0%, rgba(0,155,140,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 100% 80% at 20% 100%, rgba(0,155,140,0.05) 0%, transparent 50%)
          `,
        }}
      />

      <GeometricBackground />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Overline */}
        <p
          className="text-sm font-bold tracking-wider text-brand mb-4"
          style={{
            animation: 'fadeInUp 0.5s cubic-bezier(0,0,0.2,1) 0.2s both',
          }}
        >
          سامانه اطلاع‌رسانی سازمانی
        </p>

        {/* Headline */}
        <h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-black text-n-900 dark:text-n-50 leading-tight mb-4"
          style={{
            animation: 'fadeInUp 0.6s cubic-bezier(0,0,0.2,1) 0.4s both',
          }}
        >
          سامانه اعلانات و اطلاع‌رسانی
          <br />
          <span className="text-brand">شرکت فناوران توسعه امن ناجی</span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-base md:text-lg text-n-600 dark:text-n-400 max-w-xl mx-auto mb-8"
          style={{
            animation: 'fadeInUp 0.5s cubic-bezier(0,0,0.2,1) 0.6s both',
          }}
        >
          مرجع انتشار اsdvsvs
        </p>

        {/* CTA Button */}
        <div
          style={{
            animation: 'fadeInUp 0.4s cubic-bezier(0,0,0.2,1) 0.8s both',
          }}
        >
          <button onClick={scrollToAnnouncements} className="btn-primary">
            مشاهده آخرین اعلانات
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
        style={{
          animation: 'fadeIn 0.5s ease-out 1.2s both',
        }}
      >
        <ChevronDown className="w-6 h-6 text-n-400 animate-scroll-down" />
      </div>
    </section>
  );
}
