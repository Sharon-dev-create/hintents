// Copyright (c) Hintents Authors.
// SPDX-License-Identifier: Apache-2.0

"use client";

import React, { useEffect, useState } from 'react';
import { GitFork } from 'lucide-react';
import styles from './StarButton.module.css';

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k`;
  return String(n);
}

export default function ForkButton({ repo }: { repo: string }) {
  const [forks, setForks] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/github-stars')
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled && typeof data.forks === 'number') setForks(data.forks);
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
      href={`https://github.com/${repo}/fork`}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.starButton}
      aria-label="Fork erst on GitHub"
    >
      <GitFork size={14} className={styles.starIcon} />
      <span className={styles.label}>Fork</span>
      <span className={styles.divider} aria-hidden="true" />
      <span className={styles.count}>{forks !== null ? formatCount(forks) : '—'}</span>
    </a>
  );
}
