// Copyright (c) Hintents Authors.
// SPDX-License-Identifier: Apache-2.0

"use client";

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { duration, ease, fadeUp } from '@/lib/motion';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'li';
}

/**
 * Fades + lifts content into view the first time it scrolls into the
 * viewport. Reserved for one-time marketing reveals, not for UI that is
 * re-rendered often — see the `animate` skill's frequency gate.
 */
export default function Reveal({ children, delay = 0, className, as = 'div' }: RevealProps) {
  const reduce = useReducedMotion();
  const Component = motion[as];

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-10% 0px' }}
      variants={reduce ? { hidden: { opacity: 0 }, show: { opacity: 1 } } : fadeUp}
      transition={{ duration: duration.base, ease: ease.out, delay }}
    >
      {children}
    </Component>
  );
}
