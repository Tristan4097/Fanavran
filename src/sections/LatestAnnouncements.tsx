import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import AnnouncementCard from '@/components/AnnouncementCard';
import { imageAnnouncements } from '@/data/announcements';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function LatestAnnouncements() {
  const headerRef = useScrollReveal<HTMLDivElement>({ y: 20, duration: 500 });
  const gridRef = useScrollReveal<HTMLDivElement>({ y: 24, stagger: 100, duration: 400 });

  return (
    <section
      id="announcements"
      className="bg-n-100 dark:bg-n-900 section-padding"
    >
      <div className="container-main">
        {/* Section header */}
        <div ref={headerRef} className="mb-10">
          <p className="text-xs font-bold tracking-wider text-brand mb-2">
            آخرین اطلاعیه‌ها
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-n-900 dark:text-n-100">
            اطلاعیه‌های سازمانی
          </h2>
        </div>

        {/* Announcement grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {imageAnnouncements.map((announcement) => (
            <AnnouncementCard key={announcement.id} announcement={announcement} />
          ))}
        </div>

        {/* View all link */}
        <div className="mt-10 text-left">
          <Link
            to="/archive"
            className="inline-flex items-center gap-1 text-brand font-medium hover:underline transition-all duration-150 hover:-translate-x-1"
          >
            مشاهده همه اعلانات
            <ChevronLeft className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
