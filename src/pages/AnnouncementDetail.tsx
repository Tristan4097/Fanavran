import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Eye, ArrowLeft, Copy, Check, AlertTriangle, AlertCircle } from 'lucide-react';
import { announcements } from '@/data/announcements';
import AnnouncementCard from '@/components/AnnouncementCard';
import Lightbox from '@/components/Lightbox';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function AnnouncementDetail() {
  const { id } = useParams<{ id: string }>();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const announcement = useMemo(() =>
    announcements.find(a => a.id === id),
    [id]
  );

  const related = useMemo(() => {
    if (!announcement) return [];
    return announcements
      .filter(a => a.id !== announcement.id && a.image && a.category === announcement.category)
      .slice(0, 3);
  }, [announcement]);

  const headerRef = useScrollReveal<HTMLDivElement>({ y: 20, duration: 500 });
  const contentRef = useScrollReveal<HTMLDivElement>({ y: 20, duration: 500, delay: 100 });
  const relatedRef = useScrollReveal<HTMLDivElement>({ y: 24, stagger: 100, duration: 400 });

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (!announcement) {
    return (
      <div className="min-h-screen bg-n-100 dark:bg-n-900 flex items-center justify-center pt-[72px]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-n-900 dark:text-n-100 mb-4">
            اطلاعیه یافت نشد
          </h1>
          <Link to="/" className="btn-primary">
            بازگشت به صفحه اصلی
          </Link>
        </div>
      </div>
    );
  }

  const hasPriority = announcement.priority === 'urgent' || announcement.priority === 'important';

  const badgeClass: Record<string, string> = {
    'اطلاعیه': 'badge-info',
    'خبر': 'badge-news',
    'رویداد': 'badge-event',
    'فوری': 'badge-urgent',
  };

  return (
    <main className="min-h-screen bg-n-100 dark:bg-n-900 pt-[72px]">
      {/* Article Header */}
      <div className="bg-n-200 dark:bg-n-800 pt-12 pb-8">
        <div className="container-main max-w-[800px]" ref={headerRef}>
          {/* Breadcrumb */}
          <nav className="text-xs text-n-500 mb-6">
            <Link to="/" className="text-brand hover:underline">صفحه اصلی</Link>
            <span className="mx-2">/</span>
            <Link to="/#announcements" className="text-brand hover:underline">اعلانات</Link>
            <span className="mx-2">/</span>
            <span className="text-n-500">
              {announcement.title.length > 40 ? announcement.title.slice(0, 40) + '...' : announcement.title}
            </span>
          </nav>

          {/* Category badge */}
          <div className="mb-4">
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${badgeClass[announcement.category] || 'badge-info'}`}>
              {announcement.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-n-900 dark:text-n-100 leading-tight mb-4">
            {announcement.title}
          </h1>

          {/* Meta bar */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-n-500 mb-6">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {announcement.date}
            </span>
            {announcement.department && (
              <span>{announcement.department}</span>
            )}
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              ۲۳۴ بازدید
            </span>
          </div>

          {/* Featured image */}
          {announcement.image && (
            <div
              className="w-full aspect-video rounded-[20px] overflow-hidden cursor-pointer relative group"
              onClick={() => setLightboxOpen(true)}
            >
              <img
                src={announcement.image}
                alt={announcement.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-xs text-white">نمایش در اندازه کامل</span>
              </div>
            </div>
          )}

          {/* Priority banner */}
          {hasPriority && (
            <div
              className={`mt-4 p-4 rounded-lg border-r-4 ${
                announcement.priority === 'urgent'
                  ? 'bg-[rgba(220,53,69,0.08)] border-r-[#DC3545]'
                  : 'bg-[rgba(240,160,48,0.08)] border-r-[#F0A030]'
              }`}
            >
              <div className="flex items-center gap-2">
                {announcement.priority === 'urgent' ? (
                  <AlertTriangle className="w-5 h-5 text-[#DC3545]" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-[#F0A030]" />
                )}
                <span className="text-sm font-medium">
                  {announcement.priority === 'urgent'
                    ? 'این اطلاعیه فوری است'
                    : 'این اطلاعیه اهمیت بالا دارد'}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Article Content */}
      <div className="container-main max-w-[800px] py-10" ref={contentRef}>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {announcement.content ? (
            <div className="text-n-800 dark:text-n-200 leading-[1.9] text-justify whitespace-pre-line text-base">
              {announcement.content}
            </div>
          ) : (
            <p className="text-n-600 dark:text-n-400 leading-relaxed">
              {announcement.summary}
            </p>
          )}
        </div>

        {/* Tags */}
        {announcement.tags && announcement.tags.length > 0 && (
          <div className="mt-8 pt-6 border-t border-n-200 dark:border-n-700">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium text-n-500 ml-2">برچسب‌ها:</span>
              {announcement.tags.map(tag => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full bg-brand-light dark:bg-n-800 text-brand-deep dark:text-brand-glow"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="mt-6 pt-4 border-t border-n-200 dark:border-n-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-n-500 ml-2">اشتراک‌گذاری:</span>
            <button
              onClick={handleCopyLink}
              className="w-9 h-9 rounded-lg bg-n-200 dark:bg-n-700 hover:bg-n-300 dark:hover:bg-n-600 flex items-center justify-center transition-colors duration-150"
              title="کپی لینک"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4 text-n-600 dark:text-n-400" />
              )}
            </button>
          </div>
          <Link
            to="/archive"
            className="inline-flex items-center gap-1 text-sm text-brand font-medium hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            بازگشت به اعلانات
          </Link>
        </div>
      </div>

      {/* Related Announcements */}
      {related.length > 0 && (
        <section className="bg-n-200 dark:bg-n-800 section-padding">
          <div className="container-main">
            <h2 className="text-2xl md:text-3xl font-bold text-n-900 dark:text-n-100 mb-8">
              اعلانات مرتبط
            </h2>
            <div
              ref={relatedRef}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {related.map(a => (
                <AnnouncementCard key={a.id} announcement={a} compact />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox */}
      {announcement.image && (
        <Lightbox
          src={announcement.image}
          alt={announcement.title}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </main>
  );
}
