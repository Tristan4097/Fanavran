import { Link } from 'react-router-dom';
import { Calendar, ChevronLeft } from 'lucide-react';
import type { Announcement } from '@/types';

interface Props {
  announcement: Announcement;
  compact?: boolean;
}

export default function AnnouncementCard({ announcement, compact = false }: Props) {
  const { id, title, summary, image, category, priority, date } = announcement;

  const badgeClass = {
    'اطلاعیه': 'badge-info',
    'خبر': 'badge-news',
    'رویداد': 'badge-event',
    'فوری': 'badge-urgent',
  }[category] || 'badge-info';

  const priorityColor = {
    urgent: 'bg-[#DC3545]',
    important: 'bg-[#F0A030]',
    normal: '',
  }[priority];

  if (compact) {
    return (
      <Link
        to={`/announcement/${id}`}
        className="glass-card block overflow-hidden group"
      >
        <div className="aspect-video overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${badgeClass}`}>
              {category}
            </span>
            {priorityColor && <span className={`w-2 h-2 rounded-full ${priorityColor}`} />}
          </div>
          <h4 className="text-base font-medium text-n-900 dark:text-n-100 line-clamp-2 group-hover:text-brand transition-colors">
            {title}
          </h4>
          <div className="flex items-center gap-1.5 mt-2 text-n-500">
            <Calendar className="w-3.5 h-3.5" />
            <span className="text-xs">{date}</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/announcement/${id}`}
      className="glass-card block overflow-hidden group"
    >
      {/* Image */}
      <div className="aspect-video overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#009B8C]/10 to-[#007A6E]/20 flex items-center justify-center">
            <svg className="w-16 h-16 opacity-20" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="40" stroke="#009B8C" strokeWidth="2" />
              <circle cx="50" cy="50" r="30" stroke="#009B8C" strokeWidth="2" />
              <circle cx="50" cy="50" r="20" stroke="#009B8C" strokeWidth="2" />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 lg:p-6">
        {/* Badge row */}
        <div className="flex items-center gap-2 mb-3">
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${badgeClass}`}>
            {category}
          </span>
          {priorityColor && <span className={`w-2 h-2 rounded-full ${priorityColor}`} />}
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-n-900 dark:text-n-100 line-clamp-2 mb-2 group-hover:text-brand transition-colors duration-150">
          {title}
        </h3>

        {/* Date */}
        <div className="flex items-center gap-1.5 mb-3 text-n-500">
          <Calendar className="w-4 h-4" />
          <span className="text-xs">{date}</span>
        </div>

        {/* Summary */}
        <p className="text-sm text-n-600 dark:text-n-400 line-clamp-3 mb-4 leading-relaxed">
          {summary}
        </p>

        {/* Link */}
        <span className="inline-flex items-center gap-1 text-sm font-medium text-brand group-hover/link:translate-x-[-4px] transition-transform duration-150">
          مشاهده جزئیات
          <ChevronLeft className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
}
