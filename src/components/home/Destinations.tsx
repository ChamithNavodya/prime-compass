'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SectionTitle from '@/components/shared/SectionTitle';
import { staggerContainer, scaleIn } from '@/utils/animations';
import { DbDestination } from '@/types/db';

interface Props {
  destinations: DbDestination[];
}

export default function Destinations({ destinations }: Props) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Top Picks"
          title="Popular"
          highlight="Destinations"
          subtitle="From tropical highlands to pristine beaches — explore Sri Lanka's most captivating places"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {destinations.map((dest, i) => (
            <motion.div
              key={dest.id}
              variants={scaleIn}
              className={`relative overflow-hidden rounded-2xl cursor-pointer group ${
                i === 0 ? 'row-span-2 col-span-1 sm:row-span-1 lg:row-span-2' : ''
              }`}
            >
              <Link href={`/packages?q=${dest.name}`}>
                <div
                  className={`relative w-full ${
                    i === 0 ? 'h-[280px] lg:h-full min-h-[280px]' : 'h-[180px]'
                  }`}
                >
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-heading font-bold text-white text-lg leading-tight">
                      {dest.name}
                    </h3>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-white/70 text-sm flex items-center gap-1">
                        <LocationOnIcon sx={{ fontSize: 12 }} />
                        {dest.country}
                      </span>
                      {dest._count && (
                        <span className="text-xs text-white bg-secondary/80 px-2 py-0.5 rounded-full">
                          {dest._count.packages} tours
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-semibold text-sm px-4 py-2 border-2 border-white rounded-xl transform scale-90 group-hover:scale-100 transition-transform duration-300">
                      Explore
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
