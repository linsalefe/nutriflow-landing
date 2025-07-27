'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { getTheme } from './theme/theme';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // inicializa com 'light' e só lê localStorage no cliente
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  // ao montar, recupera valor salvo (no cliente)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('themeMode') as 'light' | 'dark' | null;
      if (saved === 'light' || saved === 'dark') {
        setMode(saved);
      }
    }
  }, []);

  // persiste toda vez que mudar (no cliente)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('themeMode', mode);
    }
  }, [mode]);

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <html lang="pt-BR">
      <head />
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
