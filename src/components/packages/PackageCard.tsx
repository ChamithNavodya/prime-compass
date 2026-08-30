'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Rating from '@mui/material/Rating';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Package } from '@/types';
import { BRAND_CONFIG } from '@/constants';

export default function PackageCard({ pkg }: { pkg: Package }) {
  const phone = BRAND_CONFIG.contact.phone.replace(/\D/g, '');
  const waMessage = encodeURIComponent(
    `Hi Pear Trails! I'm interested in the "${pkg.title}" package. Could you share more details?`
  );
  const waUrl = `https://wa.me/${phone}?text=${waMessage}`;

  return (
    <Link href={`/packages/${pkg.id}`} className="block group">
      <motion.div
        initial="rest"
        whileHover="hover"
        animate="rest"
        className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"
      >
        {/* Image */}
        <div className="relative h-52 overflow-hidden flex-shrink-0">
          <Image
            src={pkg.image}
            alt={pkg.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {pkg.isBestSeller && (
              <span className="px-2.5 py-1 bg-secondary text-white text-xs font-semibold rounded-full">
                Best Seller
              </span>
            )}
            {pkg.discount && (
              <span className="px-2.5 py-1 bg-accent text-white text-xs font-semibold rounded-full">
                {pkg.discount}% OFF
              </span>
            )}
          </div>

          {/* Category badge */}
          <span className="absolute top-3 right-3 px-2.5 py-1 glass-effect text-white text-xs font-medium rounded-full capitalize">
            {pkg.category}
          </span>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          {/* Location */}
          <div className="flex items-center gap-1 text-[var(--text-secondary)] text-sm mb-2">
            <LocationOnIcon sx={{ fontSize: 14, color: 'var(--secondary)' }} />
            <span>{pkg.destination}, {pkg.country}</span>
          </div>

          {/* Title */}
          <h3 className="font-heading font-semibold text-[var(--text-primary)] text-base mb-3 line-clamp-2 group-hover:text-primary transition-colors">
            {pkg.title}
          </h3>

          {/* Duration & Rating */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1 text-sm text-[var(--text-secondary)]">
              <AccessTimeIcon sx={{ fontSize: 14 }} />
              <span>{pkg.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Rating value={pkg.rating} readOnly size="small" precision={0.1} sx={{ color: '#FF6B35' }} />
              <span className="text-xs text-[var(--text-secondary)]">({pkg.reviews})</span>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-100 mb-4" />

          {/* Price & CTAs */}
          <div className="flex items-center justify-between mt-auto">
            <div>
              <span className="text-xs text-[var(--text-secondary)]">From</span>
              <p className="font-heading font-bold text-xl text-primary leading-tight">
                ${pkg.price.toLocaleString()}
                <span className="text-xs font-normal text-[var(--text-secondary)] ml-1">{pkg.currency}</span>
              </p>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-2 text-sm border border-primary text-primary rounded-lg font-medium group-hover:bg-primary group-hover:text-white transition-all">
                Details
              </span>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label="Inquire on WhatsApp"
                className="w-9 h-9 flex items-center justify-center bg-[#25D366] text-white rounded-lg hover:bg-[#1ebe5d] transition-colors flex-shrink-0"
              >
                <WhatsAppIcon sx={{ fontSize: 18 }} />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
