// Copyright (c) Hintents Authors.
// SPDX-License-Identifier: Apache-2.0

import React, { useId } from 'react';

/**
 * Erst's mark: a solid rounded square with a rounded window cut through the
 * middle — a simple, literal "glass box" you can see into. Renders in
 * `currentColor` so it inherits the brand accent wherever it's placed.
 */
export default function Logo({ size = 24 }: { size?: number }) {
  const maskId = `erst-logo-mask-${useId()}`;

  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <mask id={maskId}>
        <rect width="32" height="32" rx="9" fill="white" />
        <rect x="12" y="11" width="8" height="10" rx="2" fill="black" />
      </mask>
      <rect width="32" height="32" rx="9" fill="currentColor" mask={`url(#${maskId})`} />
    </svg>
  );
}
