'use client';

import React from 'react';
import LayoutShell from '@/components/LayoutShell';

export default function FellowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutShell role="fellow">{children}</LayoutShell>;
}
