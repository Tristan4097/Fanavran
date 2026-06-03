import { useEffect, useRef, useState } from 'react';

interface Stat {
  number: string;
  label: string;
}

const stats: Stat[] = [
  { number: '۲۵۰+', label: 'پروژه موفق' },
  { number: '۱۵+', label: 'سال تجربه' },
  { number: '۵۰+', label: 'متخصص فناوری' },
  { number: '۹۹.۹٪', label: 'آپتایم سامانه‌ها' },
];

export default function StatsStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="w-full py-12 md:py-16"
      style={{
        background: 'linear-gradient(135deg, #009B8C 0%, #007A6E 50%, #00665C 100%)',
      }}
    >
      <div className="container-main">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`text-center relative transition-all duration-700 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Divider between items (hidden on mobile and first item) */}
              {index > 0 && (
                <div
                  className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12"
                  style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                />
              )}
              <div className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-1">
                {stat.number}
              </div>
              <div className="text-xs md:text-sm text-white/85">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
