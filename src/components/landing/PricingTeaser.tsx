'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Switch,
  FormControlLabel,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { motion } from 'framer-motion';

const plans = [
  {
    key: 'essencial',
    title: 'Essencial',
    priceMonthly: 19.9,
    priceAnnual: 199.0, // 2 meses grátis
    perks: ['Análises ilimitadas', 'Histórico completo', 'Recomendações básicas'],
    url: 'https://global.disruptybr.com.br/zoyi4e1idi',
  },
  {
    key: 'pro',
    title: 'Pro',
    priceMonthly: 39.9,
    priceAnnual: 399.0,
    perks: ['Tudo do Essencial', 'Exportação de dados', 'Metas personalizadas'],
    popular: true,
    url: 'https://global.disruptybr.com.br/l81iq',
  },
  {
    key: 'premium',
    title: 'Premium',
    priceMonthly: 69.9,
    priceAnnual: 699.0,
    perks: ['Tudo do Pro', 'Chat prioritário', 'Conteúdos exclusivos'],
    url: 'https://global.disruptybr.com.br/konz1',
  },
];

export default function PricingTeaser() {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const [annual, setAnnual] = useState(false);

  return (
    <Box
      component="section"
      id="pricing"
      sx={{ py: 8, px: 2, backgroundColor: theme.palette.background.paper }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Planos Simples. Resultados Reais.
      </Typography>

      <Box textAlign="center" mb={4}>
        <FormControlLabel
          control={
            <Switch
              checked={annual}
              onChange={() => setAnnual((prev) => !prev)}
              color="primary"
            />
          }
          label={annual ? 'Cobrança Anual (2 meses grátis)' : 'Cobrança Mensal'}
        />
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {plans.map((plan, i) => {
          const price = annual ? plan.priceAnnual : plan.priceMonthly;
          return (
            <Grid item xs={12} sm={6} md={4} key={plan.key}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Card
                  sx={{
                    position: 'relative',
                    borderRadius: 2,
                    boxShadow: plan.popular ? 6 : 3,
                    border: plan.popular
                      ? `2px solid ${theme.palette.primary.main}`
                      : 'none',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'scale(1.03)',
                      boxShadow: plan.popular ? 8 : 4,
                    },
                  }}
                >
                  {plan.popular && (
                    <Box
                      component="span"
                      sx={{
                        position: 'absolute',
                        top: 16,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        px: 2,
                        py: 0.5,
                        bgcolor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        borderRadius: 1,
                        fontSize: '0.75rem',
                        fontWeight: 600,
                      }}
                    >
                      Mais Popular
                    </Box>
                  )}

                  <CardContent sx={{ pt: plan.popular ? 6 : 4, flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom align="center">
                      {plan.title}
                    </Typography>
                    <Typography
                      variant={isSm ? 'h4' : 'h3'}
                      align="center"
                      sx={{ my: 2 }}
                    >
                      R$ {price.toFixed(2)}{' '}
                      <Typography component="span" variant="body2">
                        /{annual ? 'ano' : 'mês'}
                      </Typography>
                    </Typography>

                    <Box component="ul" sx={{ listStyle: 'none', p: 0, mb: 4 }}>
                      {plan.perks.map((perk) => (
                        <Typography
                          component="li"
                          variant="body2"
                          sx={{ mb: 1 }}
                          key={perk}
                        >
                          • {perk}
                        </Typography>
                      ))}
                      <Typography
                        component="li"
                        variant="body2"
                        sx={{ fontStyle: 'italic' }}
                      >
                        • E-book de Receitas Saudáveis (bônus)
                      </Typography>
                    </Box>

                    <Button
                      fullWidth
                      variant={plan.popular ? 'contained' : 'outlined'}
                      color="primary"
                      href={plan.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        textTransform: 'none',
                        borderRadius: 2,
                        py: 1.5,
                      }}
                    >
                      Assinar {plan.title}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
