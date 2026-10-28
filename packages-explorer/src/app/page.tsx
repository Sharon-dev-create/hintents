// Copyright (c) Hintents Authors.
// SPDX-License-Identifier: Apache-2.0

"use client";

import React, { useState } from 'react';
import { Search, Code2, Box, ArrowRight, ShieldCheck, Globe } from 'lucide-react';
import { motion } from 'motion/react';
import { duration, ease, fadeUp } from '@/lib/motion';

const MOCK_PACKAGES = [
  { id: 'C_ASSET_TOKEN_192837', name: 'Soroban Token Standard', author: 'SDF', txs: '1.2M', version: 'v1.0.2', verified: true },
  { id: 'C_AMM_LIQUIDITY_POOL', name: 'Phoenix AMM Core', author: 'PhoenixDex', txs: '840K', version: 'v2.1.0', verified: true },
  { id: 'C_SMART_WALLET_FACTORY', name: 'Multi-sig Wallet Factory', author: 'WalletConnect', txs: '12K', version: 'v0.9.5', verified: false },
  { id: 'C_ORACLE_PRICE_FEED', name: 'Band Protocol Oracle', author: 'Band', txs: '3.4M', version: 'v3.0.0', verified: true },
];

const VALUE_PROPS = [
  {
    icon: Box,
    title: 'Open registry',
    body: 'Every deployed contract is discoverable by ID, name, or organization — no gatekeeping, no approval queue.',
  },
  {
    icon: ShieldCheck,
    title: 'Verified source',
    body: 'A package is only marked verified once its on-chain WASM hash matches a reproducible build of its linked source.',
  },
  {
    icon: Globe,
    title: 'Any network',
    body: 'Browse and publish packages across testnet, futurenet, and mainnet from the same registry.',
  },
];

export default function RegistryHome() {
  const [search, setSearch] = useState('');

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Search Hero */}
      <motion.div
        className="flex flex-col items-center justify-center py-20 text-center"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.08 } } }}
      >
        <motion.h1
          className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
          variants={fadeUp}
          transition={{ duration: duration.base, ease: ease.out }}
        >
          Explore Stellar Smart Contracts
        </motion.h1>
        <motion.p
          className="text-lg text-[var(--text-secondary)] mb-10 max-w-2xl"
          variants={fadeUp}
          transition={{ duration: duration.base, ease: ease.out }}
        >
          The registry for Soroban packages, ABIs, and verified WASM binaries. Search by Contract ID, name, or developer.
        </motion.p>

        <motion.div
          className="w-full max-w-3xl relative"
          variants={fadeUp}
          transition={{ duration: duration.base, ease: ease.out }}
        >
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-[var(--text-muted)]" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-4 py-4 bg-[var(--surface)] border border-[var(--border-strong)] rounded-xl text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/50 transition-all shadow-lg"
            placeholder="Search contracts e.g., C... or 'Token'"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
            <button className="bg-accent text-[var(--accent-foreground)] hover:bg-accent-strong px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
              Search
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Value props */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {VALUE_PROPS.map((item, i) => (
          <motion.div
            key={item.title}
            className="bg-[var(--surface)]/50 border border-[var(--border)] rounded-xl p-6"
            initial={{ opacity: 0, transform: 'translateY(16px)' }}
            whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: duration.base, ease: ease.out, delay: i * 0.06 }}
          >
            <div className="p-3 bg-accent-dim text-accent-strong rounded-lg w-fit mb-4">
              <item.icon className="w-5 h-5" />
            </div>
            <div className="font-semibold mb-1.5">{item.title}</div>
            <div className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.body}</div>
          </motion.div>
        ))}
      </div>

      {/* Trending / Recent Packages */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Trending Packages</h2>
          <button className="text-sm text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors flex items-center gap-1">
            View all <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-[var(--surface)]/30 border border-[var(--border)] rounded-xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--surface)]/50 text-sm text-[var(--text-secondary)]">
                <th className="px-6 py-4 font-medium">Package Name</th>
                <th className="px-6 py-4 font-medium">Contract ID</th>
                <th className="px-6 py-4 font-medium">Version</th>
                <th className="px-6 py-4 font-medium text-right">Invocations</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-[var(--border)]/50">
              {MOCK_PACKAGES.map((pkg, i) => (
                <tr key={i} onClick={() => window.location.href = `/package/${pkg.id}`} className="hover:bg-[var(--surface-hover)]/40 transition-colors cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-[var(--text)]">{pkg.name}</span>
                      {pkg.verified && <ShieldCheck className="w-4 h-4 text-accent-strong" />}
                    </div>
                    <div className="text-xs text-[var(--text-muted)] mt-1">by {pkg.author}</div>
                  </td>
                  <td className="px-6 py-4 font-mono text-[var(--text-secondary)] text-xs">
                    {pkg.id}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border)]">
                      {pkg.version}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-[var(--text-secondary)]">
                    {pkg.txs}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
