'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { packages } from '@/data/packages';
import PackageCard from '@/components/packages/PackageCard';
import PackageFilter from '@/components/packages/PackageFilter';
import SectionTitle from '@/components/shared/SectionTitle';
import { FilterOptions } from '@/types';
import { staggerContainer, fadeInUp } from '@/utils/animations';

export default function PackagesClient() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') || 'all';

  const [filters, setFilters] = useState<FilterOptions>({
    category: categoryParam,
    minPrice: 0,
    maxPrice: 5000,
    duration: '',
    sortBy: 'popularity',
  });

  useEffect(() => {
    setFilters((f) => ({ ...f, category: categoryParam }));
  }, [categoryParam]);

  const filtered = useMemo(() => {
    let list = packages.filter((pkg) => {
      const matchQuery =
        !query ||
        pkg.title.toLowerCase().includes(query.toLowerCase()) ||
        pkg.destination.toLowerCase().includes(query.toLowerCase()) ||
        pkg.country.toLowerCase().includes(query.toLowerCase());
      const matchCategory =
        filters.category === 'all' || pkg.category === filters.category;
      const matchPrice =
        pkg.price >= filters.minPrice && pkg.price <= filters.maxPrice;
      return matchQuery && matchCategory && matchPrice;
    });

    switch (filters.sortBy) {
      case 'price-low':
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      default:
        list = [...list].sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    }

    return list;
  }, [filters, query]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle
        badge="Our Tours"
        title="Explore All"
        highlight="Packages"
        subtitle="5 handcrafted Sri Lanka experiences — find your perfect journey"
      />

      <PackageFilter filters={filters} onChange={setFilters} />

      {query && (
        <p className="text-sm text-[var(--text-secondary)] mb-6">
          Showing results for &ldquo;<strong>{query}</strong>&rdquo; —{' '}
          {filtered.length} package{filtered.length !== 1 ? 's' : ''} found
        </p>
      )}

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-2xl font-heading font-semibold text-[var(--text-primary)] mb-2">
            No packages found
          </p>
          <p className="text-[var(--text-secondary)]">
            Try adjusting your filters or search query.
          </p>
        </div>
      ) : (
        <motion.div
          key={`${filters.category}-${filters.sortBy}-${query}`}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((pkg) => (
            <motion.div key={pkg.id} variants={fadeInUp}>
              <PackageCard pkg={pkg} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
