// Copyright (c) Hintents Authors.
// SPDX-License-Identifier: Apache-2.0

import { NextResponse } from 'next/server';

const REPO = 'dotandev/hintents';

export async function GET() {
  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}`, {
      headers: { Accept: 'application/vnd.github+json' },
      // Revalidate hourly — a star count doesn't need to be real-time, and
      // this keeps us well under GitHub's unauthenticated rate limit.
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return NextResponse.json({ stars: null }, { status: 200 });
    }

    const data = await res.json();
    const stars = typeof data.stargazers_count === 'number' ? data.stargazers_count : null;
    return NextResponse.json({ stars });
  } catch {
    return NextResponse.json({ stars: null }, { status: 200 });
  }
}
