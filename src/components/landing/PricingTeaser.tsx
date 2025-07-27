// src/components/landing/PricingTeaser.tsx
'use client';

import { Box, Grid, Card, CardContent, Typography, Button } from '@mui/material';

const tiers = [
  { title: 'Grátis', price: '0', perks: ['X análises/mês', 'Histórico básico'] },
  { title: 'Pro', price: '29', perks: ['Análises ilimitadas', 'Exportação de dados'] },
  { title: 'Premium', price: '59', perks: ['Suporte prioritário', 'Conteúdos exclusivos'] },
];

export default function PricingTeaser() {
  return (
    <Box sx={{ py: 8, px: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Planos
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {tiers.map((tier) => (
          <Grid item xs={12} sm={6} md={4} key={tier.title}>
            <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6">{tier.title}</Typography>
                <Typography variant="h3" sx={{ my: 2 }}>
                  R$ {tier.price}
                </Typography>
                {tier.perks.map((p) => (
                  <Typography key={p} variant="body2">
                    • {p}
                  </Typography>
                ))}
                <Box textAlign="center" mt={3}>
                  <Button href="/signup" variant="contained">
                    Assinar {tier.title}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
