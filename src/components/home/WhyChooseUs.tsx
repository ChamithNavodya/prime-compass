'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import VerifiedIcon from '@mui/icons-material/Verified';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SectionTitle from '@/components/shared/SectionTitle';
import { fadeInUp, staggerContainer } from '@/utils/animations';
import { STATS } from '@/constants';

const features = [
  {
    Icon: VerifiedIcon,
    title: 'Professional & Reliable',
    description:
      'Our experienced local drivers are courteous, knowledgeable, and committed to safe and comfortable travel throughout your journey.',
    color: '#1A237E',
  },
  {
    Icon: SupportAgentIcon,
    title: 'Dedicated Support',
    description:
      'From your first inquiry until your departure flight, our team is available to assist whenever you need us.',
    color: '#FF6B35',
  },
  {
    Icon: PriceCheckIcon,
    title: 'Transparent Pricing',
    description:
      'No hidden costs. No surprises. Just honest pricing and exceptional service on every journey we create.',
    color: '#00897B',
  },
  {
    Icon: EmojiEventsIcon,
    title: 'Local Expertise',
    description:
      'We know Sri Lanka beyond the tourist trails and can introduce you to places many visitors never discover.',
    color: '#1A237E',
  },
];

function CounterCard({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const step = value / (duration / 16);
          let current = 0;
          const timer = setInterval(() => {
            current += step;
            if (current >= value) {
              setCount(value);
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
  }, [value]);

  return (
    <div ref={ref} className="text-center">
      <p className="font-heading text-4xl font-bold text-white mb-1">
        {count.toLocaleString()}
        {suffix}
      </p>
      <p className="text-white/70 text-sm">{label}</p>
    </div>
  );
}

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Why Pear Trails"
          title="Why Travelers"
          highlight="Choose Us"
          subtitle="We go above and beyond to ensure every journey exceeds expectations"
        />

        {/* Feature cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 group cursor-default"
            >
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' as const, delay: i * 0.4 }}
                className="w-14 h-14 rounded-2xl mb-5 flex items-center justify-center"
                style={{ backgroundColor: `${f.color}15` }}
              >
                <f.Icon sx={{ color: f.color, fontSize: 28 }} />
              </motion.div>
              <h3 className="font-heading font-semibold text-lg text-[var(--text-primary)] mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {f.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats banner */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="rounded-3xl p-8 md:p-12 bg-gradient-to-r from-primary to-primary-light"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <CounterCard
                key={i}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
