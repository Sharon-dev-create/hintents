// Copyright (c) Hintents Authors.
// SPDX-License-Identifier: Apache-2.0

"use client";

import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import GithubMark from '@/components/icons/GithubMark';
import styles from './StarButton.module.css';

function formatStars(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k`;
  return String(n);
}

export default function StarButton({ repo }: { repo: string }) {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/github-stars')
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled && typeof data.stars === 'number') setStars(data.stars);
      })
      .catch(() => {
        // Network/API failure — the button still works as a plain link.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <a
      href={`https://github.com/${repo}`}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.starButton}
      aria-label="Star erst on GitHub"
    >
      <GithubMark size={16} />
      <span className={styles.label}>Star</span>
      <span className={styles.divider} aria-hidden="true" />
      <Star size={14} className={styles.starIcon} />
      <span className={styles.count}>{stars !== null ? formatStars(stars) : '—'}</span>
    </a>
  );
}
