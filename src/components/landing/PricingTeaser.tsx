// src/components/landing/PricingTeaser.tsx
'use client';

import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';

const tiers = [
  {
    title: 'Essencial',
    price: '19,90',
    perks: [
      'Análises ilimitadas de fotos',
      'Histórico completo',
      'Recomendações básicas',
    ],
    popular: false,
  },
  {
    title: 'Pro',
    price: '39,90',
    perks: [
      'Tudo do Essencial',
      'Exportação de dados',
      'Metas personalizadas',
    ],
    popular: true,
  },
  {
    title: 'Premium',
    price: '69,90',
    perks: [
      'Tudo do Pro',
      'Chat prioritário',
      'Conteúdos exclusivos',
    ],
    popular: false,
  },
];

export default function PricingTeaser() {
  const theme = useTheme();

  return (
    <Box
      component="section"
      id="pricing"
      sx={{
        py: 8,
        px: 2,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Planos Simples. Resultados Reais.
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {tiers.map((tier, i) => (
          <Grid item xs={12} sm={6} md={4} key={tier.title}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
            >
              <Card
                sx={{
                  position: 'relative',
                  borderRadius: 2,
                  boxShadow: tier.popular ? 6 : 3,
                  border: tier.popular
                    ? `2px solid ${theme.palette.primary.main}`
                    : 'none',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': {
                    boxShadow: tier.popular ? 8 : 4,
                    transform: 'translateY(-4px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                {tier.popular && (
                  <Chip
                    label="Mais Popular"
                    color="primary"
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 16,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontWeight: 600,
                    }}
                  />
                )}

                <CardContent
                  sx={{
                    pt: tier.popular ? 6 : 4,
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    {tier.title}
                  </Typography>
                  <Typography variant="h3" sx={{ my: 2 }}>
                    R$ {tier.price}
                  </Typography>
                  <Box
                    component="ul"
                    sx={{
                      listStyle: 'none',
                      p: 0,
                      mb: 3,
                      textAlign: 'left',
                      width: '100%',
                    }}
                  >
                    {tier.perks.map((p) => (
                      <Typography
                        key={p}
                        component="li"
                        variant="body2"
                        sx={{ mb: 1 }}
                      >
                        • {p}
                      </Typography>
                    ))}
                    <Typography
                      component="li"
                      variant="body2"
                      sx={{ mb: 1, fontStyle: 'italic' }}
                    >
                      • E-book de Receitas Saudáveis (bônus)
                    </Typography>
                  </Box>
                  <Button
                    href="/signup"
                    variant={tier.popular ? 'contained' : 'outlined'}
                    size="medium"
                    sx={{
                      borderRadius: 2,
                      px: 4,
                      ...(tier.popular && {
                        color: theme.palette.primary.contrastText,
                      }),
                    }}
                  >
                    Assinar {tier.title}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
