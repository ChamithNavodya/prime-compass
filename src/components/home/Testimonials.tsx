'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Rating from '@mui/material/Rating';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { testimonials } from '@/data/testimonials';
import SectionTitle from '@/components/shared/SectionTitle';

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const visible = 3;
  const total = testimonials.length;

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % total);
    }, 4000);
    return () => clearInterval(timer);
  }, [paused, total]);

  const prev = () => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + total) % total);
  };
  const next = () => {
    setDirection(1);
    setCurrent((c) => (c + 1) % total);
  };

  const visibleItems = Array.from({ length: visible }, (_, i) =>
    testimonials[(current + i) % total]
  );

  return (
    <section
      className="py-20 bg-[var(--background)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Traveler Stories"
          title="What Our"
          highlight="Travelers Say"
          subtitle="Real experiences from real adventurers who trusted Voyaage with their journeys"
        />

        <div className="relative">
          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
              {visibleItems.map((t) => (
                <motion.div
                  key={t.id + current}
                  initial={{ opacity: 0, x: direction * 80 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -direction * 80 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Quote icon */}
                  <FormatQuoteIcon
                    sx={{ color: 'var(--primary)', opacity: 0.15, fontSize: 48, mb: 1 }}
                  />

                  {/* Rating */}
                  <Rating
                    value={t.rating}
                    readOnly
                    size="small"
                    sx={{ color: '#FF6B35', mb: 2 }}
                  />

                  {/* Comment */}
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6 line-clamp-4">
                    &ldquo;{t.comment}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={t.avatar}
                        alt={t.name}
                        fill
                        sizes="44px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-[var(--text-primary)]">
                        {t.name}
                      </p>
                      <p className="text-xs text-[var(--text-secondary)]">
                        {t.location} · {t.date}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full border-2 border-primary/30 text-primary flex items-center justify-center cursor-pointer hover:bg-primary hover:text-white hover:border-primary transition-all"
            >
              <ChevronLeftIcon fontSize="small" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    i === current
                      ? 'w-6 h-2 bg-secondary'
                      : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-full border-2 border-primary/30 text-primary flex items-center justify-center cursor-pointer hover:bg-primary hover:text-white hover:border-primary transition-all"
            >
              <ChevronRightIcon fontSize="small" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
