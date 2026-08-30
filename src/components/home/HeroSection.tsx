'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRouter } from 'next/navigation';
import PeopleIcon from '@mui/icons-material/People';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import SearchIcon from '@mui/icons-material/Search';
import { destinations } from '@/data/destinations';
import { BRAND_CONFIG, STATS } from '@/constants';
import { fadeInUp } from '@/utils/animations';

function AnimatedCounter({ end, suffix }: { end: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const step = end / (duration / 16);
          let current = 0;
          const timer = setInterval(() => {
            current += step;
            if (current >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function HeroSection() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], [0, 150]);

  const suggestions = destinations.filter(
    (d) =>
      query.length > 1 &&
      (d.name.toLowerCase().includes(query.toLowerCase()) ||
        d.country.toLowerCase().includes(query.toLowerCase()))
  );
  const [showSuggestions, setShowSuggestions] = useState(false);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Parallax background */}
      <motion.div
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80)',
          y: bgY,
        }}
        className="absolute inset-0 -top-20 -bottom-20 bg-cover bg-center bg-no-repeat"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-white/20"
          style={{
            left: `${10 + i * 15}%`,
            top: `${20 + (i % 3) * 20}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.4,
          }}
        />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 glass-effect rounded-full px-4 py-2 mb-6"
          >
            <LocationOnIcon sx={{ fontSize: 16, color: '#FF6B35' }} />
            <span className="text-white text-sm font-medium">
              Discover Sri Lanka
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6"
          >
            Discover the{' '}
            <span className="text-gradient-light">Soul</span>
            <br />
            of Sri Lanka
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
            className="text-lg text-white/80 leading-relaxed mb-8 max-w-xl"
          >
            {BRAND_CONFIG.description}. Hand-picked itineraries crafted by
            passionate travel experts.
          </motion.p>

          {/* Search bar */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.8 }}
            className="relative mb-10"
          >
            <div className="flex items-center bg-white rounded-2xl shadow-xl overflow-visible">
              <SearchIcon
                sx={{ ml: 2, color: '#9CA3AF', flexShrink: 0 }}
              />
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                placeholder="Search destinations, countries..."
                className="flex-1 px-4 py-4 text-[var(--text-primary)] placeholder-gray-400 outline-none bg-transparent text-base"
              />
              <button
                onClick={() =>
                  router.push(query ? `/packages?q=${query}` : '/packages')
                }
                className="m-2 px-6 py-3 bg-secondary text-white rounded-xl font-semibold text-sm cursor-pointer hover:bg-secondary-dark transition-colors"
              >
                Search
              </button>
            </div>

            {/* Suggestions dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <motion.ul
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl z-20 overflow-hidden"
              >
                {suggestions.map((dest) => (
                  <li
                    key={dest.id}
                    onMouseDown={() => {
                      setQuery(dest.name);
                      router.push(`/packages?q=${dest.name}`);
                    }}
                    className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors border-b last:border-0"
                  >
                    <LocationOnIcon sx={{ color: '#1A237E', fontSize: 18 }} />
                    <div>
                      <p className="text-sm font-medium text-[var(--text-primary)]">
                        {dest.name}
                      </p>
                      <p className="text-xs text-[var(--text-secondary)]">
                        {dest.country} · {dest.packageCount} packages
                      </p>
                    </div>
                  </li>
                ))}
              </motion.ul>
            )}
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.0 }}
            className="flex flex-wrap gap-6"
          >
            {STATS.map((stat, i) => (
              <div key={i} className="flex items-center gap-2 glass-effect rounded-xl px-4 py-2">
                {i === 0 && <PeopleIcon sx={{ color: '#FF6B35', fontSize: 20 }} />}
                {i === 1 && <LocationOnIcon sx={{ color: '#FF6B35', fontSize: 20 }} />}
                {i === 2 && <StarIcon sx={{ color: '#FF6B35', fontSize: 20 }} />}
                {i === 3 && <StarIcon sx={{ color: '#FF6B35', fontSize: 20 }} />}
                <div>
                  <p className="text-white font-bold text-lg leading-none">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-white/70 text-xs">{stat.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center pt-2">
          <div className="w-1.5 h-2.5 bg-white/70 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
