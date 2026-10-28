// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2026 dotandev
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

"use client";

import React, { useState } from 'react';
import styles from './page.module.css';
import Button from '@/components/ui/Button';

type Network = 'testnet' | 'mainnet' | 'futurenet';

interface DebugResult {
  success: boolean;
  output?: unknown;
  logs?: string;
  callGraphSvg?: string;
  error?: string;
  stderr?: string;
  stdout?: string;
}

// SVG text content is generated server-side from simulated contract call
// data (function names, contract IDs), which an adversarial contract could
// influence. Rendering it as an <img> — rather than injecting it into the
// DOM — keeps any embedded markup inert: the browser treats the whole
// document as a static image and never executes scripts inside it.
function svgToImageSrc(svg: string): string {
  const encoded = encodeURIComponent(svg).replace(/'/g, '%27').replace(/"/g, '%22');
  return `data:image/svg+xml,${encoded}`;
}

export default function DebugPage() {
  const [txHash, setTxHash] = useState('');
  const [network, setNetwork] = useState<Network>('testnet');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DebugResult | null>(null);

  const handleDebug = async () => {
    if (!txHash) return;

    // Client-side validation for transaction hash (64 hex characters).
    // The API route re-validates this server-side — this is just fast feedback.
    if (txHash.length !== 64 || !/^[0-9a-fA-F]+$/.test(txHash)) {
      setResult({
        success: false,
        error: 'Invalid Transaction Hash',
        stderr: 'Transaction hash must be exactly 64 hex characters long.',
      });
      return;
    }

    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/debug', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ txHash, network }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ success: false, error: 'Failed to execute request' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className="heading-gradient">Transaction Debugger</h1>
        <p className={styles.subtitle}>Decode envelopes and inspect transaction contexts</p>
      </header>

      <div className={styles.grid}>
        <section className={`glass-panel ${styles.panel}`}>
          <h2>Input Payload</h2>
          <div className={styles.inputGroup}>
            <label>Transaction Hash</label>
            <textarea
              className={styles.textarea}
              placeholder="64-character hex transaction hash..."
              rows={8}
              value={txHash}
              onChange={(e) => setTxHash(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="network-select">Network</label>
            <select
              id="network-select"
              className={styles.textarea}
              style={{ height: 'auto', padding: '0.6rem' }}
              value={network}
              onChange={(e) => setNetwork(e.target.value as Network)}
            >
              <option value="testnet">Testnet</option>
              <option value="mainnet">Mainnet</option>
              <option value="futurenet">Futurenet</option>
            </select>
          </div>
          <div className={styles.actions}>
            <Button variant="primary" onClick={handleDebug} disabled={loading}>
              {loading ? 'Executing...' : 'Decode & Fetch State'}
            </Button>
            <Button variant="ghost" onClick={() => { setTxHash(''); setResult(null); }}>Clear</Button>
          </div>
        </section>

        <section className={`glass-panel ${styles.panel} ${styles.resultPanel}`}>
          <h2>Decoded Context</h2>
          {!result ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>⬡</div>
              <p>Awaiting transaction payload...</p>
            </div>
          ) : (
            <div className={styles.resultContent} style={{ overflowY: 'auto', maxHeight: '700px', fontSize: '0.85rem' }}>
              {result.success ? (
                <>
                  <h3 style={{ color: 'var(--accent-color)' }}>Execution Succeeded</h3>
                  <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', marginTop: '1rem' }}>
                    {JSON.stringify(result.output, null, 2)}
                  </pre>
                  {result.logs && (
                    <div style={{ marginTop: '1rem' }}>
                      <h4>Logs:</h4>
                      <pre style={{ whiteSpace: 'pre-wrap', color: 'var(--text-secondary)' }}>{result.logs}</pre>
                    </div>
                  )}
                  {result.callGraphSvg && (
                    <div style={{ marginTop: '1.5rem' }}>
                      <h4>Call Graph</h4>
                      <div
                        style={{
                          border: '1px solid var(--border-color)',
                          borderRadius: '8px',
                          overflow: 'auto',
                          background: '#0d1117',
                        }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={svgToImageSrc(result.callGraphSvg)}
                          alt="Contract call graph"
                          style={{ display: 'block', width: '100%', height: 'auto' }}
                        />
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <h3 style={{ color: 'var(--error-color)', marginBottom: '1rem' }}>Execution Failed</h3>
                  <p><strong>Error:</strong> {result.error}</p>
                  {result.stderr && (
                    <pre style={{ color: '#ff6b6b', marginTop: '1rem', whiteSpace: 'pre-wrap' }}>
                      {result.stderr}
                    </pre>
                  )}
                  {result.stdout && (
                    <pre style={{ color: 'var(--text-secondary)', marginTop: '1rem', whiteSpace: 'pre-wrap' }}>
                      {result.stdout}
                    </pre>
                  )}
                </>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
