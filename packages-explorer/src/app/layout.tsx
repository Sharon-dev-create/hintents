// Copyright (c) Hintents Authors.
// SPDX-License-Identifier: Apache-2.0

import './globals.css';
import React from 'react';
import { Inter_Tight, JetBrains_Mono } from 'next/font/google';
import WalletConnect from '@/components/WalletConnect';
import StarButton from '@/components/StarButton';
import ThemeToggle from '@/components/ThemeToggle';
import Logo from '@/components/icons/Logo';

const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata = {
  title: 'Erst Registry — Stellar Packages Explorer',
  description: 'Explore Soroban smart contracts, ABIs, and verified source code.',
};

const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('erst-theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${interTight.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="antialiased min-h-screen flex flex-col font-sans bg-[var(--bg)] text-[var(--text)]">
        <nav className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-shrink-0">
              <a href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
                <span className="flex text-accent-strong"><Logo size={20} /></span>
                Erst Registry
              </a>
              <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-full bg-[var(--surface)] text-[var(--text-secondary)] ml-1 border border-[var(--border)]">
                TESTNET
              </span>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-[var(--text-secondary)]">
              <a href="/" className="hover:text-[var(--text)] transition-colors">Contracts</a>
              <a href="/publish" className="hover:text-[var(--text)] transition-colors">Publish</a>
              <a
                href="https://dotandev-hintents-75.mintlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--text)] transition-colors"
              >
                Docs
              </a>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <ThemeToggle />
              <StarButton repo="dotandev/hintents" />
              <WalletConnect />
            </div>
          </div>
        </nav>
        <main className="flex-grow">
          {children}
        </main>
      </body>
    </html>
  );
}
