// Copyright (c) Hintents Authors.
// SPDX-License-Identifier: Apache-2.0

"use client";

import React, { useState } from 'react';
import { motion } from 'motion/react';
import CodeBlock from './CodeBlock';
import { duration, ease } from '@/lib/motion';
import styles from './InstallTabs.module.css';

export interface InstallTab {
  id: string;
  label: string;
  disabled?: boolean;
  badge?: string;
  lines: { text: string; comment?: boolean }[];
  note?: string;
}

export default function InstallTabs({ tabs }: { tabs: InstallTab[] }) {
  const firstEnabled = tabs.find((t) => !t.disabled)?.id ?? tabs[0].id;
  const [active, setActive] = useState(firstEnabled);
  const activeTab = tabs.find((t) => t.id === active) ?? tabs[0];

  return (
    <div>
      <div className={styles.tabList} role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            type="button"
            aria-selected={active === tab.id}
            disabled={tab.disabled}
            onClick={() => !tab.disabled && setActive(tab.id)}
            className={`${styles.tab} ${tab.disabled ? styles.tabDisabled : ''}`}
          >
            {active === tab.id && (
              <motion.span
                layoutId="install-tab-indicator"
                className={styles.indicator}
                transition={{ duration: duration.fast, ease: ease.out }}
              />
            )}
            <span className={styles.tabLabel}>{tab.label}</span>
            {tab.badge && <span className={styles.tabBadge}>{tab.badge}</span>}
          </button>
        ))}
      </div>

      <motion.div
        key={activeTab.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: duration.fast, ease: ease.out }}
      >
        <CodeBlock lines={activeTab.lines} />
        {activeTab.note && <p className={styles.note}>{activeTab.note}</p>}
      </motion.div>
    </div>
  );
}
