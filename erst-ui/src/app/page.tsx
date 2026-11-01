// Copyright (c) Hintents Authors.
// SPDX-License-Identifier: Apache-2.0

"use client";

import React from 'react';
import Link from 'next/link';
import {
  PlayCircle,
  Waypoints,
  Code2,
  Lightbulb,
  ShieldCheck,
  WifiOff,
  Terminal,
  FlaskConical,
  Blocks,
  ArrowRight,
} from 'lucide-react';
import { motion } from 'motion/react';
import StarButton from '@/components/StarButton';
import ForkButton from '@/components/ForkButton';
import ThemeToggle from '@/components/ThemeToggle';
import Logo from '@/components/icons/Logo';
import Reveal from '@/components/Reveal';
import InstallTabs, { InstallTab } from '@/components/InstallTabs';
import { duration, ease } from '@/lib/motion';
import styles from './page.module.css';

const INSTALL_TABS: InstallTab[] = [
  {
    id: 'source',
    label: 'From Source',
    lines: [
      { text: '# Clone the repository', comment: true },
      { text: 'git clone https://github.com/dotandev/hintents.git' },
      { text: 'cd hintents' },
      { text: '', comment: true },
      { text: '# Build the Rust simulator', comment: true },
      { text: 'cd simulator && cargo build --release && cd ..' },
      { text: '', comment: true },
      { text: '# Build the Go CLI', comment: true },
      { text: 'go build -o erst ./cmd/erst' },
    ],
  },
  {
    id: 'docker',
    label: 'Docker',
    lines: [
      { text: '# Pull the multi-arch image (amd64 / arm64)', comment: true },
      { text: 'docker pull ghcr.io/dotandev/hintents:latest' },
      { text: '', comment: true },
      { text: '# Debug a transaction', comment: true },
      { text: 'docker run --rm ghcr.io/dotandev/hintents:latest \\' },
      { text: '  debug <tx-hash> --network testnet' },
    ],
  },
  {
    id: 'homebrew',
    label: 'Homebrew',
    badge: 'Soon',
    disabled: true,
    lines: [{ text: 'brew install dotandev/hintents/erst' }],
    note: 'Pre-built Homebrew binaries are planned for a future release — build from source or use Docker today.',
  },
];

const EXTENSION_TAB: InstallTab[] = [
  {
    id: 'ext-source',
    label: 'Build from source',
    lines: [
      { text: 'git clone https://github.com/dotandev/hintents.git' },
      { text: 'cd hintents/erst_extension' },
      { text: 'npm install' },
      { text: 'npm run compile' },
      { text: '', comment: true },
      { text: '# In VS Code: press F5 to launch the Extension Development Host', comment: true },
    ],
    note: '"ERST Tracer" is not yet published to the VS Code Marketplace — this runs it directly from source.',
  },
];

const FEATURES = [
  {
    icon: PlayCircle,
    title: 'Local Simulation',
    body: 'Fetch transaction envelopes and ledger states directly from an RPC provider, and re-execute them logically in an isolated local environment without spending lumens.',
  },
  {
    icon: Waypoints,
    title: 'Trace Decoding',
    body: 'Map execution steps, host environment metrics, and WASM instruction failures directly back to your readable Rust source lines using embedded DWARF debug symbols.',
  },
  {
    icon: Code2,
    title: 'VS Code Integration',
    body: 'A native DAP (Debug Adapter Protocol) extension that turns your editor into a time-travel debugger — inspect stack traces and state changes without leaving your IDE.',
  },
  {
    icon: Lightbulb,
    title: 'Error Suggestion Engine',
    body: 'A heuristic engine that recognizes common Soroban panics and host errors, then proposes concrete fixes instead of leaving you to decode raw error codes.',
  },
  {
    icon: ShieldCheck,
    title: 'Security & Token-Flow Tracing',
    body: 'Dedicated analysis passes walk the execution trace for authorization gaps and follow every asset movement, surfacing suspicious transfers before they reach mainnet.',
  },
  {
    icon: WifiOff,
    title: 'Offline-First Workflows',
    body: 'Replay local WASM builds with mocked ledger state, snapshot and time-travel through a session, or run a batch of saved transactions as a regression suite — no RPC required.',
  },
];

const ECOSYSTEM = [
  {
    icon: Terminal,
    title: 'CLI',
    status: 'live' as const,
    statusLabel: 'Available',
    body: 'erst debug, erst compare, erst shell, and more — fetch, replay, diff, and profile transactions from your terminal.',
    href: 'https://github.com/dotandev/hintents#installation',
  },
  {
    icon: Code2,
    title: 'VS Code Extension',
    status: 'dev' as const,
    statusLabel: 'Source available',
    body: '"ERST Tracer" brings a full DAP debugger, trace tree view, code lens, and inline hovers into your editor.',
    href: '#extension',
  },
  {
    icon: FlaskConical,
    title: 'Playground',
    status: 'live' as const,
    statusLabel: 'Available',
    body: 'Write a Soroban contract in the browser, compile it, and run it through the simulator — nothing to install.',
    href: 'https://playground.erstt.xyz',
  },
  {
    icon: Blocks,
    title: 'Packages Explorer',
    status: 'dev' as const,
    statusLabel: 'In development',
    body: 'A searchable registry of deployed Soroban contracts with verified source and metadata, in the spirit of Sui’s Move Registry.',
    href: 'https://github.com/dotandev/hintents/tree/main/packages-explorer',
  },
];

export default function LandingPage() {
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <div className={styles.navContent}>
          <div className={styles.navBrand}>
            <span className={styles.navLogoIcon}>
              <Logo size={22} />
            </span>
            <span className={styles.navLogo}>Erst.</span>
            <span className={styles.navVersion}>v0.1.0</span>
          </div>
          <div className={styles.navLinks}>
            <Link href="#install">Install</Link>
            <Link href="#features">Features</Link>
            <Link href="#extension">Extension</Link>
            <a href="https://dotandev-hintents-75.mintlify.app/" target="_blank" rel="noopener noreferrer">
              Docs
            </a>
            <a href="https://playground.erstt.xyz" target="_blank" rel="noopener noreferrer">
              Playground
            </a>
          </div>
          <div className={styles.navActions}>
            <ThemeToggle />
            <StarButton repo="dotandev/hintents" />
            <ForkButton repo="dotandev/hintents" />
          </div>
        </div>
      </nav>

      <main className={styles.main}>
        <div className={styles.heroContent}>
          <motion.div
            className={styles.heroCopy}
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          >
            <motion.span
              className={styles.eyebrow}
              variants={{ hidden: { opacity: 0, transform: 'translateY(10px)' }, show: { opacity: 1, transform: 'translateY(0px)' } }}
              transition={{ duration: duration.base, ease: ease.out }}
            >
              Apache 2.0 &middot; Open Source
            </motion.span>
            <motion.h1
              className={styles.heroTitle}
              variants={{ hidden: { opacity: 0, transform: 'translateY(16px)' }, show: { opacity: 1, transform: 'translateY(0px)' } }}
              transition={{ duration: duration.base, ease: ease.out }}
            >
              High-Fidelity <br />
              <span className={styles.heroAccent}>Glass-Box Debugging</span> <br />
              for Stellar.
            </motion.h1>
            <motion.p
              className={styles.heroSubtitle}
              variants={{ hidden: { opacity: 0, transform: 'translateY(16px)' }, show: { opacity: 1, transform: 'translateY(0px)' } }}
              transition={{ duration: duration.base, ease: ease.out }}
            >
              Erst eliminates the opaque "black box" experience of failed smart contract transactions. Map generic
              network errors back to human-readable diagnostics, Rust source code, and exact execution traces.
            </motion.p>
            <motion.div
              className={styles.ctaGroup}
              variants={{ hidden: { opacity: 0, transform: 'translateY(16px)' }, show: { opacity: 1, transform: 'translateY(0px)' } }}
              transition={{ duration: duration.base, ease: ease.out }}
            >
              <Link href="#install" className={styles.btnPrimary}>
                Get Started <ArrowRight size={16} />
              </Link>
              <a href="https://dotandev-hintents-75.mintlify.app/" className={styles.btnSecondary}>
                Read the Docs
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className={styles.terminal}
            initial={{ opacity: 0, transform: 'translateY(24px) scale(0.97)' }}
            animate={{ opacity: 1, transform: 'translateY(0px) scale(1)' }}
            transition={{ duration: duration.slow, ease: ease.out, delay: 0.2 }}
          >
            <div className={styles.terminalHeader}>
              <div className={styles.terminalDots}>
                <div className={styles.terminalDot}></div>
                <div className={styles.terminalDot}></div>
                <div className={styles.terminalDot}></div>
              </div>
              <div className={styles.terminalTitle}>debug.sh</div>
            </div>
            <div className={styles.terminalBody}>
              <div className={styles.comment}># Debug a failed transaction on testnet</div>
              <div className={styles.command}>
                <span className={styles.prompt}>$</span>
                <span className={styles.input}>erst debug &lt;tx-hash&gt; --network testnet</span>
              </div>

              <div className={styles.output}>
                <span className={styles.success}>&#10003;</span> Fetched transaction envelope...<br />
                <span className={styles.success}>&#10003;</span> Downloaded ledger state...<br />
                <span className={styles.info}>&#8505;</span> Replaying logically in local simulator...
              </div>

              <div className={styles.errorBlock}>
                <span className={styles.errorText}>Error:</span> Trapped at <span className={styles.input}>src/contract.rs:42</span><br />
                <span className={styles.errorContext}>HostError: Contract execution panicked</span>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Install Section */}
      <section id="install" className={styles.section}>
        <div className={styles.sectionContent}>
          <Reveal>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>01</span>
              <h2>Install erst.</h2>
              <p>
                Requires Go 1.25.0+ and Rust 1.87+ with Cargo. Choose the path that fits your workflow.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <InstallTabs tabs={INSTALL_TABS} />
          </Reveal>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={styles.sectionAlt}>
        <div className={styles.sectionContent}>
          <Reveal>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>02</span>
              <h2>Engineering over guesswork.</h2>
              <p>Stop relying on print statements. Erst provides a complete suite of tools to trace, profile, and verify Soroban smart contracts locally.</p>
            </div>
          </Reveal>

          <div className={styles.featuresGrid}>
            {FEATURES.map((feature, i) => (
              <Reveal key={feature.title} delay={i * 0.06}>
                <div className={styles.featureCard}>
                  <span className={styles.featureIndex}>{String(i + 1).padStart(2, '0')}</span>
                  <div className={styles.featureIcon}>
                    <feature.icon size={20} />
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className={styles.philosophy}>
        <div className={styles.sectionContent}>
          <Reveal>
            <span className={styles.sectionNumber}>03</span>
            <h2 className={styles.philosophyTitle}>No black box.</h2>
            <p className={styles.philosophyLead}>
              A failed Soroban transaction shouldn&apos;t end in a hex error code. Erst runs the real simulator against
              real ledger state on your machine, then shows you exactly which line of Rust it died on &mdash; not a
              guess, not a heuristic string match, the actual execution trace.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Extension Spotlight */}
      <section id="extension" className={styles.section}>
        <div className={styles.sectionContentSplit}>
          <Reveal className={styles.extensionCopy}>
            <span className={styles.sectionNumber}>04</span>
            <h2>Debug without leaving your editor.</h2>
            <p>
              "ERST Tracer" wires a full Debug Adapter Protocol (DAP) implementation straight into VS Code: set
              breakpoints in Rust, step through host function calls, inspect XDR payloads, diff ledger state, and
              search the trace tree &mdash; all talking to the same simulator engine behind the CLI.
            </p>
            <ul className={styles.checklist}>
              <li>Full DAP debugger with stack traces &amp; variable inspection</li>
              <li>Searchable trace tree view and inline code lenses</li>
              <li>XDR payload viewer and ledger state-diff tool</li>
            </ul>
          </Reveal>
          <Reveal delay={0.1} className={styles.extensionInstall}>
            <InstallTabs tabs={EXTENSION_TAB} />
          </Reveal>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section id="ecosystem" className={styles.sectionAlt}>
        <div className={styles.sectionContent}>
          <Reveal>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>05</span>
              <h2>One engine, every surface.</h2>
              <p>The same Go + Rust simulation engine backs an interactive playground, a VS Code debugger, and a contract registry explorer.</p>
            </div>
          </Reveal>

          <div className={styles.ecosystemGrid}>
            {ECOSYSTEM.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.06}>
                <a
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={styles.ecosystemCard}
                >
                  <div className={styles.ecosystemCardHeader}>
                    <div className={styles.ecosystemIcon}>
                      <item.icon size={18} />
                    </div>
                    <span className={`${styles.badge} ${item.status === 'live' ? styles.badgeLive : styles.badgeDev}`}>
                      {item.statusLabel}
                    </span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <span className={styles.ecosystemLink}>
                    Explore <ArrowRight size={14} />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerBrand}>
            <span className={styles.footerLogo}>Erst.</span>
            <span className={styles.footerCopyright}>&copy; 2026 Hintents</span>
          </div>
          <div className={styles.navLinks}>
            <a href="https://crates.io/crates/erst-sim" target="_blank" rel="noopener noreferrer">Crates.io</a>
            <a href="https://github.com/dotandev/hintents/releases" target="_blank" rel="noopener noreferrer">Releases</a>
            <a href="https://dotandev-hintents-75.mintlify.app/" target="_blank" rel="noopener noreferrer">Documentation</a>
            <a href="https://github.com/dotandev/hintents" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
