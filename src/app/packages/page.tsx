import { Suspense } from 'react';
import Image from 'next/image';
import PackagesClient from './PackagesClient';
import GridSkeleton from '@/components/shared/LoadingSkeleton';
import { prisma } from '@/lib/prisma';
import { DbPackage } from '@/types/db';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Tour Packages | Pear Trails',
  description:
    "Explore Pear Trails' Sri Lanka packages — 7-day island journeys, honeymoon collections, wildlife safaris, customized tours, and airport transfers.",
};

export default async function PackagesPage() {
  const [rawPackages, categories] = await Promise.all([
    prisma.package.findMany({
      include: { categories: true },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.category.findMany({ orderBy: { name: 'asc' } }),
  ]);

  const packages: DbPackage[] = rawPackages.map((pkg) => ({
    ...pkg,
    pricingType: pkg.pricingType as 'FIXED' | 'RANGE' | 'HIDDEN',
    itinerary: Array.isArray(pkg.itinerary)
      ? (pkg.itinerary as { day: number; title: string; description: string }[])
      : [],
    route: Array.isArray(pkg.route)
      ? (pkg.route as { id: string; label: string; lat: number; lng: number; destinationId?: string }[])
      : [],
  }));

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero banner */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <Image
          src="https://plus.unsplash.com/premium_photo-1730145749791-28fc538d7203?w=1920&q=80"
          alt="Sri Lanka packages"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/85 to-primary-dark/70 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
            <span className="inline-block px-4 py-1.5 bg-white/20 text-white text-sm font-semibold rounded-full mb-4 backdrop-blur-sm">
              Pear Trails Collection
            </span>
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-white mb-3 leading-tight">
              Our Sri Lanka Packages
            </h1>
            <p className="text-white/80 text-base md:text-lg max-w-2xl">
              Private Tours &bull; Airport Transfers &bull; Multi-Day Adventures &bull; Customized Itineraries
            </p>
          </div>
        </div>
      </div>

      <div className="pt-12 pb-16">
        <Suspense fallback={
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            <GridSkeleton count={5} />
          </div>
        }>
          <PackagesClient packages={packages} categories={categories} />
        </Suspense>
      </div>
    </div>
  );
}
