'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SectionTitle from '@/components/shared/SectionTitle';
import PackageCard from '@/components/packages/PackageCard';
import { staggerContainer, fadeInUp } from '@/utils/animations';
import { DbPackage, DbCategory } from '@/types/db';

interface Props {
  packages: DbPackage[];
  categories: DbCategory[];
}

export default function FeaturedPackages({ packages, categories }: Props) {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [{ value: 'all', label: 'All Packages' }, ...categories.map((c) => ({ value: c.slug, label: c.name }))];

  const featured = packages
    .filter((p) => activeTab === 'all' || p.categories.some((c) => c.slug === activeTab))
    .slice(0, 6);

  return (
    <section className="py-20 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Popular Tours"
          title="Handpicked Tour"
          highlight="Packages"
          subtitle="Explore our most loved destinations and experiences, curated by travel experts"
        />

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-10"
        >
          <Tabs
            value={activeTab}
            onChange={(_, v) => setActiveTab(v)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTabs-indicator': { backgroundColor: 'var(--secondary)', height: 3, borderRadius: 2 },
              '& .MuiTab-root': {
                color: 'var(--text-secondary)',
                fontWeight: 500,
                '&.Mui-selected': { color: 'var(--primary)', fontWeight: 700 },
              },
            }}
          >
            {tabs.map((cat) => (
              <Tab key={cat.value} label={cat.label} value={cat.value} />
            ))}
          </Tabs>
          <div className="h-px bg-gray-200 -mt-px" />
        </motion.div>

        <motion.div
          key={activeTab}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {featured.map((pkg) => (
            <motion.div key={pkg.id} variants={fadeInUp}>
              <PackageCard pkg={pkg} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-primary text-primary font-semibold cursor-pointer hover:bg-primary hover:text-white transition-all duration-200"
          >
            View All Packages
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
