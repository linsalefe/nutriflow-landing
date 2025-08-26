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
        <title>NutriFlow - Sua Plataforma Completa de Nutrição Inteligente | Lina IA Nutricionista</title>
        <meta
          name="description"
          content="Plataforma completa de nutrição inteligente com Lina, sua nutricionista virtual IA. Análise de imagens, chat personalizado, e-book de marmitas e muito mais. Mensal R$ 29,90 ou anual R$ 197 com 7 dias grátis."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://nutriflow.cloud/" />

        {/* Keywords para SEO */}
        <meta 
          name="keywords" 
          content="nutrição, IA, inteligência artificial, nutricionista virtual, análise de alimentos, contador de calorias, macronutrientes, dieta personalizada, SaaS nutrição, Lina AI, marmitas saudáveis, perda de peso, ganho de massa magra" 
        />

        {/* Open Graph - Redes Sociais */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="NutriFlow - Sua Plataforma Completa de Nutrição Inteligente" />
        <meta
          property="og:description"
          content="🤖 Conheça a Lina, sua nutricionista virtual IA! Análise de fotos de refeições, chat personalizado, e-book exclusivo e central de comandos nutricional. Transforme sua alimentação com tecnologia de ponta!"
        />
        <meta property="og:url" content="https://nutriflow.cloud/" />
        <meta property="og:image" content="https://nutriflow.cloud/og-nutriflow-2024.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="NutriFlow" />
        <meta property="og:locale" content="pt_BR" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@NutriFlowBR" />
        <meta name="twitter:title" content="NutriFlow - Nutrição Inteligente com IA" />
        <meta
          name="twitter:description"
          content="🚀 Lina, sua nutricionista IA, analisa suas refeições por foto e oferece orientações personalizadas 24/7. Teste 7 dias grátis!"
        />
        <meta name="twitter:image" content="https://nutriflow.cloud/twitter-card-nutriflow.png" />

        {/* Favicons */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* JSON-LD Structured Data - Produto SaaS */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "NutriFlow",
              applicationCategory: "HealthApplication",
              operatingSystem: "Web",
              image: ["https://nutriflow.cloud/og-nutriflow-2024.png"],
              description: "Plataforma completa de nutrição inteligente com IA. Análise de imagens, chat com nutricionista virtual, e-book de marmitas e ferramentas personalizadas.",
              url: "https://nutriflow.cloud/",
              author: {
                "@type": "Organization",
                name: "NutriFlow",
                url: "https://nutriflow.cloud/"
              },
              offers: [
                {
                  "@type": "Offer",
                  name: "NutriFlow Mensal",
                  price: "29.90",
                  priceCurrency: "BRL",
                  url: "https://pay.kiwify.com.br/SEyg6iA",
                  availability: "https://schema.org/InStock",
                  priceValidUntil: "2025-12-31",
                  description: "Acesso mensal completo a todas as funcionalidades do NutriFlow"
                },
                {
                  "@type": "Offer",
                  name: "NutriFlow Anual",
                  price: "197.00",
                  priceCurrency: "BRL", 
                  url: "https://pay.kiwify.com.br/6hOMVb2",
                  availability: "https://schema.org/InStock",
                  priceValidUntil: "2025-12-31",
                  description: "Plano anual com economia significativa - apenas R$ 16,40/mês"
                }
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "847",
                bestRating: "5",
                worstRating: "1"
              },
              feature: [
                "Lina - Nutricionista Virtual IA",
                "Análise Inteligente de Imagens",
                "Chat Personalizado 24/7",
                "E-book: Guia Prático de Marmitas",
                "Central de Comandos Nutricional",
                "Calculadoras Inteligentes",
                "Configurações Ultra-Personalizadas",
                "Suporte e Tutoriais Completos"
              ]
            }),
          }}
        />

        {/* JSON-LD - Organização */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "NutriFlow",
              url: "https://nutriflow.cloud/",
              logo: "https://nutriflow.cloud/logo-nutriflow.png",
              description: "Plataforma SaaS de nutrição inteligente com IA",
              sameAs: [
                "https://www.instagram.com/nutriflowbr/",
                "https://www.facebook.com/nutriflowbr/",
                "https://twitter.com/nutriflowbr"
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                email: "suporte@nutriflow.cloud",
                availableLanguage: "Portuguese"
              }
            }),
          }}
        />

        {/* JSON-LD - FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Como a Lina funciona? É realmente inteligente?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "A Lina é nossa assistente nutricional baseada em inteligência artificial avançada, treinada especificamente para nutrição. Ela analisa suas fotos de refeições usando visão computacional, identifica ingredientes, calcula macronutrientes e oferece orientações personalizadas."
                  }
                },
                {
                  "@type": "Question", 
                  name: "Quão precisa é a análise de imagens?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Nossa tecnologia de visão computacional tem 95% de precisão na identificação de alimentos e 90% na estimativa de porções. Usamos algoritmos treinados com milhares de imagens de refeições brasileiras."
                  }
                },
                {
                  "@type": "Question",
                  name: "Posso cancelar a qualquer momento?",
                  acceptedAnswer: {
                    "@type": "Answer", 
                    text: "Sim! Oferecemos garantia incondicional de 7 dias. Após esse período, você pode cancelar a qualquer momento sem multas ou taxas."
                  }
                }
              ]
            }),
          }}
        />

        {/* Google Analytics 4 */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'}', {
                page_path: window.location.pathname,
                custom_map: {
                  'custom_parameter_1': 'nutriflow_user'
                }
              });

              // Event tracking para conversões
              function trackConversion(action, category = 'engagement') {
                gtag('event', action, {
                  'event_category': category,
                  'event_label': 'NutriFlow',
                  'custom_parameter_1': 'conversion'
                });
              }

              // Disponibilizar globalmente
              window.trackConversion = trackConversion;
            `,
          }}
        />

        {/* Meta Pixel (Facebook) - Se tiver */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              
              fbq('init', '${process.env.NEXT_PUBLIC_FB_PIXEL_ID || 'YOUR_PIXEL_ID'}');
              fbq('track', 'PageView');
            `,
          }}
        />

        {/* Hotjar - Se tiver */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:${process.env.NEXT_PUBLIC_HOTJAR_ID || '0'},hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
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
            autoHideDuration={4000}
          >
            {children}
          </SnackbarProvider>
        </ThemeProvider>

        {/* Schema.org BreadcrumbList - Para SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://nutriflow.cloud/"
                },
                {
                  "@type": "ListItem", 
                  position: 2,
                  name: "Plataforma",
                  item: "https://nutriflow.cloud/#features"
                },
                {
                  "@type": "ListItem",
                  position: 3, 
                  name: "Preços",
                  item: "https://nutriflow.cloud/#pricing"
                }
              ]
            }),
          }}
        />
      </body>
    </html>
  );
}
