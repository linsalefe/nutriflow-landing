// src/components/landing/Testimonials.tsx
'use client';

import { Box, Typography, Card, CardContent, Grid } from '@mui/material';

const testimonials = [
  { name: 'Joana S.', text: 'O NutriFlow mudou minha rotina alimentar para melhor!' },
  { name: 'Carlos M.', text: 'Agora controlo minhas calorias sem esforço.' },
];

export default function Testimonials() {
  return (
    <Box sx={{ py: 8, px: 2, backgroundColor: 'background.paper' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Depoimentos
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {testimonials.map((t) => (
          <Grid item xs={12} sm={6} key={t.name}>
            <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="body1">“{t.text}”</Typography>
                <Typography variant="subtitle2" align="right" sx={{ mt: 2 }}>
                  — {t.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
