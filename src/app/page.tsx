import HeroSection from "@/components/home/HeroSection";
import FeaturedPackages from "@/components/home/FeaturedPackages";
import Destinations from "@/components/home/Destinations";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import Newsletter from "@/components/home/Newsletter";
import { prisma } from "@/lib/prisma";
import { DbPackage } from "@/types/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [rawPackages, categories, destinations] = await Promise.all([
    prisma.package.findMany({
      where: { isFeatured: true },
      include: { categories: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    prisma.destination.findMany({
      take: 8,
      orderBy: { name: "asc" },
      include: { _count: { select: { packages: true } } },
    }),
  ]);

  const packages: DbPackage[] = rawPackages.map((pkg) => ({
    ...pkg,
    pricingType: pkg.pricingType as "FIXED" | "RANGE" | "HIDDEN",
    itinerary: Array.isArray(pkg.itinerary)
      ? (pkg.itinerary as { day: number; title: string; description: string }[])
      : [],
    route: Array.isArray(pkg.route)
      ? (pkg.route as {
          id: string;
          label: string;
          lat: number;
          lng: number;
          destinationId?: string;
        }[])
      : [],
  }));

  return (
    <>
      <HeroSection />
      <Destinations destinations={destinations} />
      <FeaturedPackages packages={packages} categories={categories} />
      <WhyChooseUs />
      <Testimonials />
      <Newsletter />
    </>
  );
}
