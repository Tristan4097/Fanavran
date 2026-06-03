import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, SlidersHorizontal, Grid3X3, List, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { announcements } from '@/data/announcements';
import AnnouncementCard from '@/components/AnnouncementCard';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function ArchivePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [yearFilter, setYearFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<string>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const headerRef = useScrollReveal<HTMLDivElement>({ y: 20, duration: 500 });
  const resultsRef = useScrollReveal<HTMLDivElement>({ y: 24, stagger: 80, duration: 400 });

  // Filter and sort
  const filtered = useMemo(() => {
    let result = [...announcements];

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q)
      );
    }

    // Year filter
    if (yearFilter !== 'all') {
      result = result.filter(a => a.year === parseInt(yearFilter));
    }

    // Category filter
    if (categoryFilter !== 'all') {
      result = result.filter(a => a.category === categoryFilter);
    }

    // Sort
    if (sortOrder === 'newest') {
      result.sort((a, b) => parseInt(b.id) - parseInt(a.id));
    } else if (sortOrder === 'oldest') {
      result.sort((a, b) => parseInt(a.id) - parseInt(b.id));
    }

    return result;
  }, [searchQuery, yearFilter, categoryFilter, sortOrder]);

  const activeFiltersCount = [
    yearFilter !== 'all',
    categoryFilter !== 'all',
  ].filter(Boolean).length;

  const clearFilters = () => {
    setYearFilter('all');
    setCategoryFilter('all');
    setSearchQuery('');
  };

  const badgeClass: Record<string, string> = {
    'اطلاعیه': 'badge-info',
    'خبر': 'badge-news',
    'رویداد': 'badge-event',
    'فوری': 'badge-urgent',
  };

  return (
    <main className="min-h-screen bg-n-100 dark:bg-n-900 pt-[72px]">
      {/* Page Header */}
      <div className="bg-n-200 dark:bg-n-800 pt-12 pb-8">
        <div className="container-main" ref={headerRef}>
          {/* Breadcrumb */}
          <nav className="text-xs text-n-500 mb-6">
            <Link to="/" className="text-brand hover:underline">صفحه اصلی</Link>
            <span className="mx-2">/</span>
            <span className="text-n-500">آرشیو اعلانات</span>
          </nav>

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-n-900 dark:text-n-100 mb-2">
            آرشیو اعلانات
          </h1>
          <p className="text-base text-n-600 dark:text-n-400 max-w-xl">
            جستجو و دسترسی به کلیه اطلاعیه‌ها، اخبار و رویدادهای منتشرشده
          </p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="sticky top-[72px] z-40 bg-n-100/90 dark:bg-n-900/90 backdrop-blur-[12px] border-b border-n-300 dark:border-n-700">
        <div className="container-main py-4">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            {/* Search */}
            <div className="relative flex-shrink-0 md:w-[320px]">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-n-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="جستجو در اعلانات..."
                className="w-full pr-10 pl-4 py-2.5 bg-n-50 dark:bg-n-800 border border-n-300 dark:border-n-700 rounded-xl text-sm text-n-900 dark:text-n-100 placeholder:text-n-400 focus:outline-none focus:border-brand focus:ring-[3px] focus:ring-[rgba(0,155,140,0.15)] transition-all duration-150"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                >
                  <X className="w-4 h-4 text-n-400" />
                </button>
              )}
            </div>

            {/* Filter dropdowns */}
            <div className="flex items-center gap-2 flex-wrap">
              <SlidersHorizontal className="w-4 h-4 text-n-400 hidden md:block" />

              {/* Year */}
              <div className="flex items-center gap-1">
                <span className="text-xs text-n-500 hidden lg:inline">سال:</span>
                <select
                  value={yearFilter}
                  onChange={(e) => setYearFilter(e.target.value)}
                  className="py-2 px-3 bg-n-50 dark:bg-n-800 border border-n-300 dark:border-n-700 rounded-lg text-sm text-n-900 dark:text-n-100 focus:outline-none focus:border-brand cursor-pointer"
                >
                  <option value="all">همه سال‌ها</option>
                  <option value="1404">۱۴۰۴</option>
                  <option value="1403">۱۴۰۳</option>
                  <option value="1402">۱۴۰۲</option>
                </select>
              </div>

              {/* Category */}
              <div className="flex items-center gap-1">
                <span className="text-xs text-n-500 hidden lg:inline">دسته‌بندی:</span>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="py-2 px-3 bg-n-50 dark:bg-n-800 border border-n-300 dark:border-n-700 rounded-lg text-sm text-n-900 dark:text-n-100 focus:outline-none focus:border-brand cursor-pointer"
                >
                  <option value="all">همه</option>
                  <option value="اطلاعیه">اطلاعیه</option>
                  <option value="خبر">خبر</option>
                  <option value="رویداد">رویداد</option>
                  <option value="فوری">فوری</option>
                </select>
              </div>

              {/* Sort */}
              <div className="flex items-center gap-1">
                <span className="text-xs text-n-500 hidden lg:inline">مرتب‌سازی:</span>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="py-2 px-3 bg-n-50 dark:bg-n-800 border border-n-300 dark:border-n-700 rounded-lg text-sm text-n-900 dark:text-n-100 focus:outline-none focus:border-brand cursor-pointer"
                >
                  <option value="newest">جدیدترین</option>
                  <option value="oldest">قدیمی‌ترین</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active filter tags */}
          {activeFiltersCount > 0 && (
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              {yearFilter !== 'all' && (
                <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-brand-light dark:bg-n-800 text-brand-deep dark:text-brand-glow">
                  سال {yearFilter}
                  <button onClick={() => setYearFilter('all')}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {categoryFilter !== 'all' && (
                <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-brand-light dark:bg-n-800 text-brand-deep dark:text-brand-glow">
                  {categoryFilter}
                  <button onClick={() => setCategoryFilter('all')}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {activeFiltersCount >= 1 && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-brand hover:underline"
                >
                  پاک کردن همه
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="container-main py-8 pb-16">
        {/* View toggle + count */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs text-n-500">
            {filtered.length} اعلان یافت شد
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors duration-150 ${
                viewMode === 'grid'
                  ? 'bg-brand text-white'
                  : 'text-n-500 hover:bg-n-200 dark:hover:bg-n-700'
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors duration-150 ${
                viewMode === 'list'
                  ? 'bg-brand text-white'
                  : 'text-n-500 hover:bg-n-200 dark:hover:bg-n-700'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Empty state */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-n-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-n-500 mb-2">
              موردی یافت نشد
            </h3>
            <p className="text-sm text-n-500 mb-6">
              لطفاً عبارت جستجو یا فیلترها را تغییر دهید
            </p>
            <button onClick={clearFilters} className="btn-secondary">
              پاک کردن فیلترها
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* Grid view */
          <div
            ref={resultsRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((announcement) => (
              <AnnouncementCard key={announcement.id} announcement={announcement} />
            ))}
          </div>
        ) : (
          /* List view */
          <div ref={resultsRef} className="flex flex-col">
            {filtered.map((announcement) => (
              <Link
                key={announcement.id}
                to={`/announcement/${announcement.id}`}
                className="group flex items-start gap-4 py-4 border-b border-n-200 dark:border-n-700 hover:bg-[rgba(0,155,140,0.02)] dark:hover:bg-[rgba(0,155,140,0.05)] transition-colors duration-150 px-2 -mx-2 rounded-lg"
              >
                {/* Thumbnail */}
                <div className="flex-shrink-0 w-[120px] h-[80px] rounded-xl overflow-hidden bg-n-200 dark:bg-n-700">
                  {announcement.image ? (
                    <img
                      src={announcement.image}
                      alt={announcement.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#009B8C]/10 to-[#007A6E]/20" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${badgeClass[announcement.category] || 'badge-info'}`}>
                      {announcement.category}
                    </span>
                    <span className="text-[10px] text-n-500">{announcement.date}</span>
                  </div>
                  <h4 className="text-sm font-medium text-n-900 dark:text-n-100 group-hover:text-brand transition-colors truncate">
                    {announcement.title}
                  </h4>
                  <p className="text-xs text-n-600 dark:text-n-400 truncate mt-0.5">
                    {announcement.summary}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination (mock) */}
        {filtered.length > 0 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <button className="w-9 h-9 rounded-lg flex items-center justify-center text-n-400 hover:bg-n-200 dark:hover:bg-n-700 transition-colors disabled:opacity-40" disabled>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button className="w-9 h-9 rounded-lg flex items-center justify-center bg-brand text-white text-sm font-medium">
              ۱
            </button>
            <button className="w-9 h-9 rounded-lg flex items-center justify-center text-n-600 dark:text-n-400 hover:bg-n-200 dark:hover:bg-n-700 transition-colors text-sm">
              ۲
            </button>
            <button className="w-9 h-9 rounded-lg flex items-center justify-center text-n-400 hover:bg-n-200 dark:hover:bg-n-700 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
