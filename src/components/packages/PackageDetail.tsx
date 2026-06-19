'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Rating from '@mui/material/Rating';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PeopleIcon from '@mui/icons-material/People';
import { Package } from '@/types';

interface TabPanelProps {
  children: React.ReactNode;
  value: number;
  index: number;
}
function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <AnimatePresence mode="wait">
      {value === index && (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="py-6"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function PackageDetail({ pkg }: { pkg: Package }) {
  const [activeImage, setActiveImage] = useState(0);
  const [tab, setTab] = useState(0);
  const [guests, setGuests] = useState(2);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[var(--text-secondary)] mb-6">
        <Link href="/" className="hover:text-primary cursor-pointer transition-colors">Home</Link>
        <span>/</span>
        <Link href="/packages" className="hover:text-primary cursor-pointer transition-colors">Packages</Link>
        <span>/</span>
        <span className="text-[var(--text-primary)] font-medium truncate">{pkg.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Main content */}
        <div className="lg:col-span-2">
          {/* Gallery */}
          <div className="mb-6">
            <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden mb-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={pkg.gallery[activeImage]}
                    alt={`${pkg.title} - image ${activeImage + 1}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="flex gap-3">
              {pkg.gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`relative h-20 flex-1 rounded-xl overflow-hidden cursor-pointer transition-all ${
                    i === activeImage ? 'ring-2 ring-primary ring-offset-2' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt={`Gallery ${i + 1}`} fill sizes="150px" className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Overview header */}
          <div className="mb-6">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div>
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full capitalize mb-2">
                  {pkg.category}
                </span>
                <h1 className="font-heading text-2xl md:text-3xl font-bold text-[var(--text-primary)]">
                  {pkg.title}
                </h1>
              </div>
              <div className="text-right">
                <p className="text-xs text-[var(--text-secondary)]">From</p>
                <p className="font-heading text-3xl font-bold text-primary">
                  ${pkg.price.toLocaleString()}
                </p>
                <p className="text-xs text-[var(--text-secondary)]">per person</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-1.5 text-sm text-[var(--text-secondary)]">
                <LocationOnIcon sx={{ fontSize: 16, color: 'var(--secondary)' }} />
                {pkg.destination}, {pkg.country}
              </div>
              <div className="flex items-center gap-1.5 text-sm text-[var(--text-secondary)]">
                <AccessTimeIcon sx={{ fontSize: 16, color: 'var(--secondary)' }} />
                {pkg.duration}
              </div>
              <div className="flex items-center gap-1.5 text-sm text-[var(--text-secondary)]">
                <CalendarMonthIcon sx={{ fontSize: 16, color: 'var(--secondary)' }} />
                Best: {pkg.bestTimeToVisit}
              </div>
              <div className="flex items-center gap-1">
                <Rating value={pkg.rating} readOnly size="small" precision={0.1} sx={{ color: '#FF6B35' }} />
                <span className="text-sm text-[var(--text-secondary)]">{pkg.rating} ({pkg.reviews} reviews)</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <Tabs
              value={tab}
              onChange={(_, v) => setTab(v)}
              sx={{
                borderBottom: '1px solid #e5e7eb',
                '& .MuiTabs-indicator': { backgroundColor: 'var(--secondary)', height: 3 },
                '& .MuiTab-root': { color: 'var(--text-secondary)', '&.Mui-selected': { color: 'var(--primary)', fontWeight: 700 } },
              }}
            >
              {['Overview', 'Itinerary', 'Inclusions', 'Highlights'].map((label, i) => (
                <Tab key={i} label={label} />
              ))}
            </Tabs>

            <div className="px-6">
              <TabPanel value={tab} index={0}>
                <p className="text-[var(--text-secondary)] leading-relaxed">{pkg.description}</p>
              </TabPanel>

              <TabPanel value={tab} index={1}>
                <div className="space-y-3">
                  {pkg.itinerary.map((item) => (
                    <Accordion key={item.day} sx={{ boxShadow: 'none', border: '1px solid #e5e7eb', borderRadius: '12px !important', '&:before': { display: 'none' } }}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                            {item.day}
                          </span>
                          <span className="font-medium text-[var(--text-primary)]">{item.title}</span>
                        </div>
                      </AccordionSummary>
                      <AccordionDetails>
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed pl-11">
                          {item.description}
                        </p>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </div>
              </TabPanel>

              <TabPanel value={tab} index={2}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                      <CheckCircleIcon sx={{ color: 'var(--accent)', fontSize: 20 }} />
                      Inclusions
                    </h4>
                    <ul className="space-y-2">
                      {pkg.inclusions.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                          <CheckCircleIcon sx={{ color: 'var(--accent)', fontSize: 16, mt: 0.3, flexShrink: 0 }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                      <CancelIcon sx={{ color: '#EF4444', fontSize: 20 }} />
                      Exclusions
                    </h4>
                    <ul className="space-y-2">
                      {pkg.exclusions.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                          <CancelIcon sx={{ color: '#EF4444', fontSize: 16, mt: 0.3, flexShrink: 0 }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabPanel>

              <TabPanel value={tab} index={3}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {pkg.highlights.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 p-3 bg-primary/5 rounded-xl">
                      <CheckCircleIcon sx={{ color: 'var(--primary)', fontSize: 18 }} />
                      <span className="text-sm text-[var(--text-primary)] font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </TabPanel>
            </div>
          </div>
        </div>

        {/* Right: Sticky booking widget */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="font-heading font-semibold text-lg text-[var(--text-primary)] mb-4">
                Book This Package
              </h3>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-xs text-[var(--text-secondary)] mb-1.5">
                    Travel Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-[var(--text-primary)] outline-none focus:border-primary transition-colors cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[var(--text-secondary)] mb-1.5">
                    Guests
                  </label>
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setGuests((g) => Math.max(1, g - 1))}
                      className="px-4 py-2.5 text-[var(--text-secondary)] hover:bg-gray-50 cursor-pointer transition-colors text-lg"
                    >
                      −
                    </button>
                    <div className="flex-1 text-center text-sm font-medium text-[var(--text-primary)]">
                      <PeopleIcon sx={{ fontSize: 14, mr: 0.5, verticalAlign: 'middle' }} />
                      {guests} {guests === 1 ? 'Guest' : 'Guests'}
                    </div>
                    <button
                      onClick={() => setGuests((g) => g + 1)}
                      className="px-4 py-2.5 text-[var(--text-secondary)] hover:bg-gray-50 cursor-pointer transition-colors text-lg"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Price breakdown */}
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between text-[var(--text-secondary)]">
                  <span>${pkg.price.toLocaleString()} × {guests} guests</span>
                  <span>${(pkg.price * guests).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[var(--text-secondary)]">
                  <span>Taxes & Fees (10%)</span>
                  <span>${Math.round(pkg.price * guests * 0.1).toLocaleString()}</span>
                </div>
                <div className="h-px bg-gray-100" />
                <div className="flex justify-between font-bold text-base text-[var(--text-primary)]">
                  <span>Total</span>
                  <span className="text-primary">
                    ${Math.round(pkg.price * guests * 1.1).toLocaleString()}
                  </span>
                </div>
              </div>

              <Link
                href={`/contact?package=${pkg.id}`}
                className="block w-full text-center py-3.5 bg-secondary text-white rounded-xl font-semibold cursor-pointer hover:bg-secondary-dark transition-colors mb-3"
              >
                Book Now
              </Link>
              <Link
                href="/contact"
                className="block w-full text-center py-3 border border-primary text-primary rounded-xl font-medium text-sm cursor-pointer hover:bg-primary hover:text-white transition-all"
              >
                Enquire
              </Link>

              <p className="text-center text-xs text-[var(--text-secondary)] mt-3">
                Free cancellation up to 14 days before
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
