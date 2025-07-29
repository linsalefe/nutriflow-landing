// src/app/layout.tsx
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { getTheme } from './theme/theme';
import './globals.css';
import { SnackbarProvider } from 'notistack';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
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
      <head>
        {/* Básico */}
        <title>NutriFlow: Seu Nutricionista de Bolso por IA | A partir de R$ 19,90/mês</title>
        <meta
          name="description"
          content="NutriFlow é seu assistente nutricional por IA que analisa fotos de refeições, calcula calorias e macros e entrega recomendações personalizadas 24/7. Assine por R$ 19,90/mês com 30 dias de garantia."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://nutriflow.cloud/" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="NutriFlow: Seu Nutricionista de Bolso por IA" />
        <meta
          property="og:description"
          content="Analise fotos de refeições, receba cálculos de calorias e macros e tenha planos nutricionais por R$ 19,90/mês."
        />
        <meta property="og:url" content="https://nutriflow.cloud/" />
        <meta property="og:image" content="https://nutriflow.cloud/og-image.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="NutriFlow: Seu Nutricionista de Bolso por IA" />
        <meta
          name="twitter:description"
          content="Fotografe suas refeições e receba recomendações nutricionais personalizadas por R$ 19,90/mês."
        />
        <meta name="twitter:image" content="https://nutriflow.cloud/og-image.png" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: "NutriFlow",
              image: ["https://nutriflow.cloud/og-image.png"],
              description: "Assistente nutricional por IA – planos a partir de R$19,90/mês.",
              offers: {
                "@type": "Offer",
                price: "19.90",
                priceCurrency: "BRL",
                url: "https://nutriflow.cloud/",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                reviewCount: "132",
              },
            }),
          }}
        />

        {/* Google Analytics 4 */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                page_path: window.location.pathname
              });
            `,
          }}
        />
      </head>
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
