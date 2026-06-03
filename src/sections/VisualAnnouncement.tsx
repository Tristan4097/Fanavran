import { useState } from 'react';
import { ZoomIn } from 'lucide-react';
import Lightbox from '@/components/Lightbox';
import { visualAnnouncement } from '@/data/announcements';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function VisualAnnouncement() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const sectionRef = useScrollReveal<HTMLDivElement>({ y: 30, duration: 500 });

  return (
    <section className="bg-n-200 dark:bg-n-800 section-padding">
      <div className="container-main" ref={sectionRef}>
        {/* Section label */}
        <p className="text-xs font-bold tracking-wider text-[#F0A030] mb-4">
          اطلاعیه تصویری ویژه
        </p>

        {/* Banner */}
        <div
          className="relative w-full aspect-video max-h-[540px] rounded-[24px] overflow-hidden cursor-pointer group"
          onClick={() => setLightboxOpen(true)}
        >
          {/* Image */}
          <img
            src={visualAnnouncement.image}
            alt={visualAnnouncement.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />

          {/* Vignette overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.3) 100%)',
            }}
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
              <ZoomIn className="w-8 h-8 text-white mx-auto mb-2" />
              <span className="text-sm text-white font-medium">
                نمایش در اندازه کامل
              </span>
            </div>
          </div>

          {/* Caption bar */}
          <div className="absolute bottom-0 right-0 left-0 p-6 lg:p-8"
            style={{
              background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
            }}
          >
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1">
              {visualAnnouncement.title}
            </h3>
            <p className="text-sm text-white/80">
              {visualAnnouncement.date}
            </p>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        src={visualAnnouncement.image}
        alt={visualAnnouncement.title}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </section>
  );
}
