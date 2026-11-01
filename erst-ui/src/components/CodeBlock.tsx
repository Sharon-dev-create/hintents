// Copyright (c) Hintents Authors.
// SPDX-License-Identifier: Apache-2.0

"use client";

import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import styles from './CodeBlock.module.css';

interface CodeBlockProps {
  lines: { text: string; comment?: boolean }[];
  /** Raw text copied to the clipboard — defaults to the non-comment lines joined by newlines. */
  copyText?: string;
}

export default function CodeBlock({ lines, copyText }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = copyText ?? lines.filter((l) => !l.comment).map((l) => l.text).join('\n');
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API unavailable (non-HTTPS/older browser) — silently no-op.
    }
  };

  return (
    <div className={styles.block}>
      <button
        type="button"
        className={styles.copyButton}
        onClick={handleCopy}
        aria-label={copied ? 'Copied' : 'Copy to clipboard'}
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>
      <pre className={styles.pre}>
        {lines.map((line, i) => (
          <div key={i} className={line.comment ? styles.comment : styles.line}>
            {!line.comment && <span className={styles.prompt}>$</span>}
            {line.text}
          </div>
        ))}
      </pre>
    </div>
  );
}
