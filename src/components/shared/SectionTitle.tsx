'use client';

import { motion } from 'framer-motion';
import { fadeInUp } from '@/utils/animations';

interface SectionTitleProps {
  badge?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionTitle({
  badge,
  title,
  highlight,
  subtitle,
  centered = true,
  light = false,
}: SectionTitleProps) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      {badge && (
        <motion.span
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4 ${
            light
              ? 'bg-white/20 text-white'
              : 'bg-primary/10 text-primary'
          }`}
        >
          {badge}
        </motion.span>
      )}

      <motion.h2
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className={`font-heading text-3xl md:text-4xl font-bold mb-4 leading-tight ${
          light ? 'text-white' : 'text-[var(--text-primary)]'
        }`}
      >
        {title}{' '}
        {highlight && (
          <span className={light ? 'text-gradient-light' : 'text-gradient'}>
            {highlight}
          </span>
        )}
      </motion.h2>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className={`mx-auto mb-4 h-1 w-16 rounded-full ${
          centered ? 'mx-auto' : ''
        } bg-gradient-to-r from-primary to-secondary`}
      />

      {subtitle && (
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={`text-base md:text-lg max-w-2xl leading-relaxed ${
            centered ? 'mx-auto' : ''
          } ${light ? 'text-white/80' : 'text-[var(--text-secondary)]'}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
