// src/components/landing/Features.tsx
'use client';

import { Box, Grid, Typography } from '@mui/material';

const features = [
  {
    title: 'Análise por Foto',
    desc: 'Envie fotos das suas refeições e receba calorias e macros automaticamente.',
  },
  {
    title: 'Histórico Diário',
    desc: 'Acompanhe todas as suas refeições e pesagens em um só lugar.',
  },
  {
    title: 'Recomendações Personalizadas',
    desc: 'Sugestões de refeições balanceadas com base em seus objetivos.',
  },
];

export default function Features() {
  return (
    <Box sx={{ py: 8, px: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Funcionalidades
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {features.map((f) => (
          <Grid item xs={12} sm={6} md={4} key={f.title}>
            <Typography variant="h6" gutterBottom>
              {f.title}
            </Typography>
            <Typography variant="body1">{f.desc}</Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
