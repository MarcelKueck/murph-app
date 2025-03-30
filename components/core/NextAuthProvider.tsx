// components/core/NextAuthProvider.tsx
'use client'; // This needs to be a client component

import { SessionProvider } from 'next-auth/react';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

export default function NextAuthProvider({ children }: Props) {
  // We don't pass the session prop here as SessionProvider will fetch it
  return <SessionProvider>{children}</SessionProvider>;
}