// Copyright (c) Hintents Authors.
// SPDX-License-Identifier: Apache-2.0

"use client";

import React, { useEffect, useRef, useState } from 'react';
import Editor, { type Monaco } from '@monaco-editor/react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Trash2 } from 'lucide-react';
import StarButton from '@/components/StarButton';
import ThemeToggle from '@/components/ThemeToggle';
import Logo from '@/components/icons/Logo';
import { duration, ease } from '@/lib/motion';
import styles from './page.module.css';

const DEFAULT_CODE = `// SPDX-License-Identifier: Apache-2.0
#![no_std]
use soroban_sdk::{contract, contractimpl, symbol_short, vec, Env, Symbol, Vec};

#[contract]
pub struct HelloContract;

#[contractimpl]
impl HelloContract {
    pub fn hello(env: Env, to: Symbol) -> Vec<Symbol> {
        vec![&env, symbol_short!("Hello"), to]
    }
}
`;

type LogLevel = 'info' | 'success' | 'error' | 'warn';
interface LogLine {
  time: string;
  level: LogLevel;
  msg: string;
}

const LEVEL_CLASS: Record<LogLevel, string> = {
  info: styles.termInfo,
  success: styles.termSuccess,
  error: styles.termError,
  warn: styles.termWarn,
};

function defineErstTheme(monaco: Monaco) {
  monaco.editor.defineTheme('erst-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '6b7280', fontStyle: 'italic' },
      { token: 'keyword', foreground: 'bef264' },
      { token: 'string', foreground: 'a1a1aa' },
      { token: 'number', foreground: 'a3e635' },
      { token: 'type', foreground: '93c5fd' },
      { token: 'identifier', foreground: 'f4f4f5' },
    ],
    colors: {
      'editor.background': '#08090a',
      'editor.foreground': '#f4f4f5',
      'editor.lineHighlightBackground': '#141518',
      'editorLineNumber.foreground': '#3f3f46',
      'editorLineNumber.activeForeground': '#a1a1aa',
      'editorCursor.foreground': '#a3e635',
      'editor.selectionBackground': '#2dd4bf33',
      'editorGutter.background': '#08090a',
      'scrollbarSlider.background': '#ffffff14',
      'scrollbarSlider.hoverBackground': '#ffffff22',
    },
  });
}

export default function Playground() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<LogLine[]>([
    { time: '00:00:00', level: 'info', msg: 'Playground initialized.' },
    { time: '00:00:00', level: 'info', msg: 'Ready for simulation.' },
  ]);
  const editorMounted = useRef(false);

  const pushLog = (level: LogLevel, msg: string) => {
    setLogs((prev) => [...prev, { time: new Date().toLocaleTimeString(), level, msg }]);
  };

  // Packages Explorer's "Use in Playground" button links here with
  // ?contract=<id>. We don't store source for registry packages (yet), so
  // rather than faking a prefill, we're upfront about what actually happened.
  useEffect(() => {
    const contract = new URLSearchParams(window.location.search).get('contract');
    if (contract) {
      pushLog('info', `Opened from registry: ${contract}`);
      pushLog('warn', 'Source isn’t stored in the registry yet — paste or write the contract’s code below to simulate it.');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRun = async () => {
    setIsRunning(true);
    pushLog('info', 'Compiling WASM target via Erst Backend...');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_COMPILER_URL || 'http://localhost:8080/api/compile';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();

      if (response.ok) {
        pushLog('success', 'Build successful.');
        pushLog('info', `WASM binary generated (${data.wasmSize} bytes).`);
        if (data.logs) pushLog('info', data.logs);
      } else {
        pushLog('error', `Compilation failed: ${data.error}`);
        if (data.details) pushLog('error', data.details);
      }
    } catch {
      pushLog('error', 'Network error: could not connect to the compile server.');
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.title}>
          <span className={styles.brandIcon}><Logo size={18} /></span>
          <a href="https://erstt.xyz" className={styles.brandLink}>Erst.</a>
          <span className={styles.slash}>/</span>
          Playground <span className={styles.badge}>BETA</span>
        </div>
        <div className={styles.actions}>
          <ThemeToggle />
          <StarButton repo="dotandev/hintents" />
          <span className={styles.divider} aria-hidden="true" />
          <button className={styles.btnSecondary} onClick={() => setLogs([])}>
            <Trash2 size={13} /> Clear
          </button>
          <button className={styles.btnRun} onClick={handleRun} disabled={isRunning}>
            <Play size={13} fill="currentColor" />
            {isRunning ? 'Running...' : 'Run Simulation'}
          </button>
        </div>
      </header>

      <main className={styles.workspace}>
        <div className={styles.editorPane}>
          <div className={styles.paneHeader}>
            <span>src/lib.rs</span>
            <span className={styles.langBadge}>Rust</span>
          </div>
          <div className={styles.editorWrapper}>
            <Editor
              defaultLanguage="rust"
              theme="erst-dark"
              value={code}
              onChange={(value) => setCode(value ?? '')}
              beforeMount={defineErstTheme}
              onMount={() => {
                editorMounted.current = true;
              }}
              options={{
                fontFamily: 'var(--font-mono)',
                fontSize: 13,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                padding: { top: 16 },
                smoothScrolling: true,
                cursorBlinking: 'smooth',
                automaticLayout: true,
              }}
            />
          </div>
        </div>
        <div className={styles.outputPane}>
          <div className={styles.paneHeader}>
            <span>Terminal</span>
          </div>
          <div className={styles.terminal}>
            <AnimatePresence initial={false}>
              {logs.map((log, i) => (
                <motion.div
                  key={`${log.time}-${i}`}
                  className={styles.termLine}
                  initial={{ opacity: 0, transform: 'translateY(4px)' }}
                  animate={{ opacity: 1, transform: 'translateY(0px)' }}
                  transition={{ duration: duration.fast, ease: ease.out }}
                >
                  <span className={styles.termTime}>[{log.time}]</span>
                  <span className={LEVEL_CLASS[log.level]}>{log.msg}</span>
                </motion.div>
              ))}
            </AnimatePresence>
            {isRunning && (
              <div className={styles.termLine}>
                <span className={styles.termTime}>[{new Date().toLocaleTimeString()}]</span>
                <span className={styles.termInfo}>
                  <span className={styles.cursorBlink}>&#9608;</span>
                </span>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
