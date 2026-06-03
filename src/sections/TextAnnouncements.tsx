import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { textAnnouncements } from '@/data/announcements';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const badgeClass: Record<string, string> = {
  'اطلاعیه': 'badge-info',
  'خبر': 'badge-news',
  'رویداد': 'badge-event',
  'فوری': 'badge-urgent',
};

export default function TextAnnouncements() {
  const headerRef = useScrollReveal<HTMLDivElement>({ y: 20, duration: 500 });
  const listRef = useScrollReveal<HTMLDivElement>({ x: 20, stagger: 80, duration: 400 });

  // Extract day and month/year from date
  const parseDate = (dateStr: string) => {
    const parts = dateStr.split(' ');
    return { day: parts[0], monthYear: parts.slice(1).join(' ') };
  };

  return (
    <section className="bg-n-100 dark:bg-n-900 section-padding">
      <div className="container-main max-w-[960px]">
        {/* Section header */}
        <div ref={headerRef} className="mb-10">
          <p className="text-xs font-bold tracking-wider text-brand mb-2">
            اطلاعیه‌های متنی
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-n-900 dark:text-n-100">
            اخبار و اطلاعیه‌های کوتاه
          </h2>
        </div>

        {/* Timeline list */}
        <div ref={listRef} className="relative">
          {/* Timeline connector line */}
          <div
            className="absolute right-[52px] md:right-[58px] top-0 bottom-0 w-[2px] bg-n-300 dark:bg-n-700"
            aria-hidden="true"
          />

          {textAnnouncements.map((item, index) => {
            const { day, monthYear } = parseDate(item.date);
            const isLast = index === textAnnouncements.length - 1;

            return (
              <Link
                key={item.id}
                to={`/announcement/${item.id}`}
                className={`group flex items-start gap-4 md:gap-6 py-5 pr-0 pl-0 border-b border-n-200 dark:border-n-700 transition-colors duration-150 hover:bg-[rgba(0,155,140,0.02)] dark:hover:bg-[rgba(0,155,140,0.05)] -mr-2 pr-2 rounded-lg ${
                  isLast ? 'border-b-0' : ''
                }`}
              >
                {/* Date block */}
                <div className="flex-shrink-0 w-[80px] md:w-[100px] text-center pt-1">
                  <div className="text-xl md:text-2xl font-bold text-brand leading-none">
                    {day}
                  </div>
                  <div className="text-xs text-n-500 mt-1">{monthYear}</div>
                </div>

                {/* Timeline dot */}
                <div className="flex-shrink-0 relative z-10 mt-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-brand ring-4 ring-n-100 dark:ring-n-900 transition-transform duration-300 group-hover:scale-125" />
                </div>

                {/* Content */}
                <div className="flex-grow min-w-0 pt-0.5">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span
                      className={`text-[10px] md:text-xs font-bold px-2.5 py-0.5 rounded-full ${
                        badgeClass[item.category] || 'badge-info'
                      }`}
                    >
                      {item.category}
                    </span>
                  </div>
                  <h4 className="text-sm md:text-base font-medium text-n-900 dark:text-n-100 group-hover:text-brand transition-colors duration-150 truncate">
                    {item.title}
                  </h4>
                  <p className="text-xs md:text-sm text-n-600 dark:text-n-400 truncate mt-0.5">
                    {item.summary}
                  </p>
                </div>

                {/* Arrow */}
                <div className="flex-shrink-0 self-center hidden md:block">
                  <ChevronLeft className="w-5 h-5 text-n-400 group-hover:text-brand transition-colors duration-150" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* View archive link */}
        <div className="mt-8 text-left">
          <Link
            to="/archive"
            className="inline-flex items-center gap-1 text-brand font-medium hover:underline transition-all duration-150 hover:-translate-x-1"
          >
            مشاهده آرشیو اطلاعیه‌ها
            <ChevronLeft className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
