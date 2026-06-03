import HeroSection from '@/sections/HeroSection';
import LatestAnnouncements from '@/sections/LatestAnnouncements';
import VisualAnnouncement from '@/sections/VisualAnnouncement';
import TextAnnouncements from '@/sections/TextAnnouncements';
import StatsStrip from '@/sections/StatsStrip';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <LatestAnnouncements />
      <VisualAnnouncement />
      <StatsStrip />
      <TextAnnouncements />
    </>
  );
}
