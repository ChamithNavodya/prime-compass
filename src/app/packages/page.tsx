import { Suspense } from 'react';
import PackagesClient from './PackagesClient';
import GridSkeleton from '@/components/shared/LoadingSkeleton';

export const metadata = {
  title: 'Tour Packages | Voyaage',
  description: 'Browse all tour packages — adventure, luxury, beach, cultural, family and honeymoon.',
};

export default function PackagesPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] pt-24 pb-16">
      <Suspense fallback={
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <GridSkeleton count={6} />
        </div>
      }>
        <PackagesClient />
      </Suspense>
    </div>
  );
}
