// Copyright (c) Hintents Authors.
// SPDX-License-Identifier: Apache-2.0

/** @type {import('next').NextConfig} */
const nextConfig = {
  // This app lives inside a monorepo with several sibling lockfiles
  // (erst-playground, packages-explorer, playground-api, the repo root).
  // Without this, Turbopack guesses the workspace root from the nearest
  // lockfile above this directory, which picks the wrong tree.
  turbopack: {
    root: __dirname,
  },
};

module.exports = nextConfig;
