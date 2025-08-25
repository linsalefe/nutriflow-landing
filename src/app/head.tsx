// src/app/head.tsx
export default function Head() {
  return (
    <>
      {/* Básico */}
      <title>NutriFlow - Sua Plataforma Completa de Nutrição Inteligente | Lina IA Nutricionista</title>
      <meta
        name="description"
        content="🚀 NutriFlow é seu SaaS inovador de nutrição com Lina, sua nutricionista virtual IA. Análise de imagens, chat personalizado, e-book de marmitas e muito mais. Plano mensal R$ 97 ou anual R$ 697 com 7 dias grátis."
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href="https://nutriflow.cloud/" />

      {/* Keywords para SEO */}
      <meta 
        name="keywords" 
        content="nutrição, IA, inteligência artificial, nutricionista virtual, análise de alimentos, contador de calorias, macronutrientes, dieta personalizada, SaaS nutrição, Lina AI, marmitas saudáveis, perda de peso, ganho de massa magra" 
      />

      {/* Favicons e Logo */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="theme-color" content="#4CAF50" />

      {/* Open Graph - Redes Sociais */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="NutriFlow - Sua Plataforma Completa de Nutrição Inteligente" />
      <meta
        property="og:description"
        content="🤖 Conheça a Lina, sua nutricionista virtual IA! Análise de fotos de refeições, chat personalizado, e-book exclusivo e central de comandos nutricional. Transforme sua alimentação com tecnologia de ponta!"
      />
      <meta property="og:url" content="https://nutriflow.cloud/" />
      <meta property="og:image" content="https://nutriflow.cloud/logo-nutriflow.png" />
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
      <meta name="twitter:image" content="https://nutriflow.cloud/logo-nutriflow.png" />

      {/* JSON-LD Structured Data - SaaS Product */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "NutriFlow",
            applicationCategory: "HealthApplication",
            operatingSystem: "Web",
            image: ["https://nutriflow.cloud/logo-nutriflow.png"],
            description: "Plataforma completa de nutrição inteligente com IA. Análise de imagens, chat com nutricionista virtual, e-book de marmitas e ferramentas personalizadas.",
            url: "https://nutriflow.cloud/",
            logo: "https://nutriflow.cloud/logo-nutriflow.png",
            author: {
              "@type": "Organization",
              name: "NutriFlow",
              url: "https://nutriflow.cloud/",
              logo: "https://nutriflow.cloud/logo-nutriflow.png"
            },
            offers: [
              {
                "@type": "Offer",
                name: "NutriFlow Mensal",
                price: "97.00",
                priceCurrency: "BRL",
                url: "https://pay.kiwify.com.br/SEyg6iA",
                availability: "https://schema.org/InStock",
                priceValidUntil: "2025-12-31",
                description: "Acesso mensal completo a todas as funcionalidades do NutriFlow"
              },
              {
                "@type": "Offer",
                name: "NutriFlow Anual",
                price: "697.00",
                priceCurrency: "BRL",
                url: "https://pay.kiwify.com.br/6hOMVb2", 
                availability: "https://schema.org/InStock",
                priceValidUntil: "2025-12-31",
                description: "Plano anual com economia significativa - apenas R$ 58/mês"
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

      {/* JSON-LD - Organization */}
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
            foundingDate: "2024",
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
                  text: "A Lina é nossa assistente nutricional baseada em IA GPT-4, treinada especificamente para nutrição. Ela analisa suas fotos de refeições usando visão computacional avançada, identifica ingredientes, calcula macronutrientes e oferece orientações personalizadas baseadas em seus objetivos e perfil nutricional."
                }
              },
              {
                "@type": "Question", 
                name: "Quão precisa é a análise de imagens?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Nossa tecnologia de visão computacional tem 95% de precisão na identificação de alimentos e 90% na estimativa de porções. Usamos algoritmos de machine learning treinados com milhares de imagens de refeições brasileiras para garantir resultados mais precisos."
                }
              },
              {
                "@type": "Question",
                name: "O e-book de marmitas está incluído?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sim! O 'Guia Prático de Marmitas Saudáveis' vem incluso em todos os planos. São mais de 50 páginas com receitas balanceadas, listas de compras inteligentes, técnicas de conservação e dicas de economia. É seu para sempre, mesmo se cancelar."
                }
              },
              {
                "@type": "Question",
                name: "Posso cancelar a qualquer momento?",
                acceptedAnswer: {
                  "@type": "Answer", 
                  text: "Sim! Oferecemos garantia incondicional de 7 dias. Após esse período, você pode cancelar a qualquer momento sem multas ou taxas. O acesso permanece ativo até o final do período pago."
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

      {/* Meta Pixel (Facebook) */}
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

      {/* Preconnect para Performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="preconnect" href="https://pay.kiwify.com.br" />
      <link rel="preconnect" href="https://www.google-analytics.com" />

      {/* Preload da logo para performance */}
      <link rel="preload" href="/logo-nutriflow.png" as="image" type="image/png" />
      <link rel="preload" href="/nutriflow_logo.svg" as="image" type="image/svg+xml" />
    </>
  );
}
