// Copyright (c) Hintents Authors.
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { Inter_Tight, JetBrains_Mono } from 'next/font/google';
import './globals.css';

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
  title: 'Erst — High-Fidelity Glass-Box Debugging for Stellar',
  description:
    'Erst eliminates the opaque black-box experience of failed Soroban smart contract transactions: local-first replay, trace decoding, and source mapping for the Stellar network.',
};

// Runs before hydration so a stored light/dark choice applies before first
// paint — otherwise the page would flash the default dark theme first.
const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('erst-theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${interTight.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
