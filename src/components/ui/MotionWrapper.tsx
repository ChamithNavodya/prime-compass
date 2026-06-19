'use client';

import { motion, MotionProps } from 'framer-motion';
import { ReactNode } from 'react';

interface MotionWrapperProps extends MotionProps {
  children: ReactNode;
  className?: string;
  tag?: 'div' | 'section' | 'article' | 'span';
}

export default function MotionWrapper({
  children,
  className,
  tag = 'div',
  ...motionProps
}: MotionWrapperProps) {
  const MotionTag = motion[tag];
  return (
    <MotionTag className={className} {...motionProps}>
      {children}
    </MotionTag>
  );
}
