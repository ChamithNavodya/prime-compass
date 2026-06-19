import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ExploreIcon from '@mui/icons-material/Explore';
import { destinations } from '@/data/destinations';
import SectionTitle from '@/components/shared/SectionTitle';

export const metadata: Metadata = {
  title: 'Destinations | Voyaage',
  description: 'Explore the world\'s most captivating destinations with Voyaage.',
};

export default function DestinationsPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Explore the World"
          title="All"
          highlight="Destinations"
          subtitle="Every corner of the globe holds a story. Choose yours."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {destinations.map((dest) => (
            <Link
              key={dest.id}
              href={`/packages?q=${dest.name}`}
              className="group block rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <h3 className="font-heading font-bold text-white text-lg">{dest.name}</h3>
                  <p className="text-white/80 text-sm flex items-center gap-1">
                    <LocationOnIcon sx={{ fontSize: 12 }} />
                    {dest.country}
                  </p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-[var(--text-secondary)] mb-3 line-clamp-2">
                  {dest.description}
                </p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {dest.attractions.slice(0, 3).map((a) => (
                    <span
                      key={a}
                      className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full"
                    >
                      {a}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-[var(--text-primary)]">
                    {dest.packageCount} packages
                  </span>
                  <span className="text-sm text-secondary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    <ExploreIcon sx={{ fontSize: 16 }} />
                    Explore
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
