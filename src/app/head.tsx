export default function Head() {
  return (
    <>
      {/* Básico */}
      <title>NutriFlow: Seu Nutricionista de Bolso por IA | A partir de R$ 19,90/mês</title>
      <meta
        name="description"
        content="NutriFlow é seu assistente nutricional por IA que analisa fotos de refeições, calcula calorias e macros e entrega recomendações personalizadas 24/7. Assine por R$ 19,90/mês com 30 dias de garantia."
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href="https://seu-dominio.com.br/" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="NutriFlow: Seu Nutricionista de Bolso por IA" />
      <meta
        property="og:description"
        content="Analise fotos de refeições, receba cálculos de calorias e macros e tenha planos nutricionais por R$ 19,90/mês."
      />
      <meta property="og:url" content="https://seu-dominio.com.br/" />
      <meta property="og:image" content="https://seu-dominio.com.br/og-image.png" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="NutriFlow: Seu Nutricionista de Bolso por IA" />
      <meta
        name="twitter:description"
        content="Fotografe suas refeições e receba recomendações nutricionais personalizadas por R$ 19,90/mês."
      />
      <meta name="twitter:image" content="https://seu-dominio.com.br/og-image.png" />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "NutriFlow",
            image: ["https://seu-dominio.com.br/og-image.png"],
            description: "Assistente nutricional por IA – planos a partir de R$19,90/mês.",
            offers: {
              "@type": "Offer",
              price: "19.90",
              priceCurrency: "BRL",
              url: "https://seu-dominio.com.br/",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.8",
              reviewCount: "132",
            },
          }),
        }}
      />
    </>
  );
}
