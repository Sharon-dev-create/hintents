// Copyright (c) Hintents Authors.
// SPDX-License-Identifier: Apache-2.0

"use client";

import React from 'react';
import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export default function Button({ variant = 'primary', className, children, ...rest }: ButtonProps) {
  const variantClass = styles[variant] ?? styles.primary;
  const classes = [styles.button, variantClass, className].filter(Boolean).join(' ');

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
