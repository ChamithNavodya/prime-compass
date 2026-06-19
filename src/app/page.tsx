import HeroSection from '@/components/home/HeroSection';
import FeaturedPackages from '@/components/home/FeaturedPackages';
import Destinations from '@/components/home/Destinations';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Testimonials from '@/components/home/Testimonials';
import Newsletter from '@/components/home/Newsletter';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedPackages />
      <Destinations />
      <WhyChooseUs />
      <Testimonials />
      <Newsletter />
    </>
  );
}
