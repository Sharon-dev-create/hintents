// Copyright (c) Hintents Authors.
// SPDX-License-Identifier: Apache-2.0

// Single house curve + duration scale. Every animation in erst-ui pulls from
// here instead of inventing a new cubic-bezier or duration.

export const ease = {
  out: [0.16, 1, 0.3, 1] as const, // reveals, hovers — strong deceleration
  inOut: [0.77, 0, 0.175, 1] as const, // on-screen moves
};

export const duration = {
  fast: 0.15, // button/press feedback
  base: 0.5, // scroll reveals
  slow: 0.8, // large hero elements
};

export const stagger = 0.06;

export const fadeUp = {
  hidden: { opacity: 0, transform: 'translateY(16px)' },
  show: { opacity: 1, transform: 'translateY(0px)' },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};
