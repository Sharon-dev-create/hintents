// Copyright (c) Hintents Authors.
// SPDX-License-Identifier: Apache-2.0

"use client";

import React, { useEffect, useState } from 'react';
import { Sun, Moon, Laptop, type LucideIcon } from 'lucide-react';
import styles from './ThemeToggle.module.css';

type Mode = 'auto' | 'light' | 'dark';
const ORDER: Mode[] = ['auto', 'light', 'dark'];
const STORAGE_KEY = 'erst-theme';

const ICONS: Record<Mode, LucideIcon> = {
  auto: Laptop,
  light: Sun,
  dark: Moon,
};

export default function ThemeToggle() {
  const [mode, setMode] = useState<Mode>('auto');

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') setMode(stored);
  }, []);

  const applyMode = (next: Mode) => {
    setMode(next);
    if (next === 'auto') {
      document.documentElement.removeAttribute('data-theme');
      window.localStorage.removeItem(STORAGE_KEY);
    } else {
      document.documentElement.setAttribute('data-theme', next);
      window.localStorage.setItem(STORAGE_KEY, next);
    }
  };

  const cycle = () => {
    const next = ORDER[(ORDER.indexOf(mode) + 1) % ORDER.length];
    applyMode(next);
  };

  const Icon = ICONS[mode];

  return (
    <button
      type="button"
      onClick={cycle}
      className={styles.toggle}
      aria-label={`Theme: ${mode}. Click to change.`}
      title={`Theme: ${mode}`}
    >
      <Icon size={15} />
    </button>
  );
}
