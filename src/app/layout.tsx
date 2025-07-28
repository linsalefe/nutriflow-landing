// src/app/layout.tsx
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { getTheme } from './theme/theme';
import './globals.css';
import { SnackbarProvider } from 'notistack';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Estado para tema claro/escuro
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  // Carrega a preferência do usuário do localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('themeMode') as 'light' | 'dark' | null;
      if (saved) setMode(saved);
    }
  }, []);

  // Persiste a preferência no localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('themeMode', mode);
    }
  }, [mode]);

  // Cria o tema com base na preferência
  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <html lang="pt-BR">
      <head />
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            {children}
          </SnackbarProvider>
        </ThemeProvider>

        {process.env.NODE_ENV === 'production' && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.$crisp = [];
                window.CRISP_WEBSITE_ID = "SEU_CRISP_ID";
                (function() {
                  const d = document;
                  const s = d.createElement("script");
                  s.src = "https://client.crisp.chat/l.js";
                  s.async = true;
                  d.getElementsByTagName("head")[0].appendChild(s);
                })();
              `,
            }}
          />
        )}
      </body>
    </html>
  );
}
