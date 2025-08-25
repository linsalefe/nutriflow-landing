// src/components/landing/PricingTeaser.tsx
'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  Stack,
  useTheme,
  alpha,
} from '@mui/material';
import { motion, useReducedMotion } from 'framer-motion';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import StarIcon from '@mui/icons-material/Star';

// motion(Card) para evitar 'as any'
const MotionCard = motion(Card);

type Plan = {
  key: string;
  title: string;
  price: string;
  period?: string;
  subtitle?: string;
  features: string[];
  highlight?: boolean;
  ctaHref: string;
  badge?: string;
};

export default function PricingTeaser() {
  const theme = useTheme();
  const reduced = useReducedMotion();

  const plans: Plan[] = [
    {
      key: 'mensal',
      title: 'Mensal',
      price: 'R$ 29,90',
      period: 'por mês',
      subtitle: 'Flexibilidade total',
      features: ['Análise por foto e texto', 'Histórico de refeições', 'Recomendações básicas'],
      ctaHref: '/signup',
    },
    {
      key: 'anual',
      title: 'Anual',
      price: 'R$ 197',
      period: 'R$ 16,40/mês',
      subtitle: 'Economia de R$ 161',
      features: ['Tudo do Mensal', 'Planos personalizados', 'Relatórios avançados'],
      highlight: true,
      ctaHref: '/signup?plan=anual',
      badge: 'MAIS POPULAR',
    },
    {
      key: 'gratis',
      title: 'Teste Grátis 7 dias',
      price: 'R$ 0',
      period: 'sem cartão',
      subtitle: 'Experimente agora',
      features: ['Acesso imediato', 'Cancelamento fácil', 'Sem compromisso'],
      ctaHref: '/signup?trial=1',
    },
  ];

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 5, md: 10 },
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.04)}, ${alpha(
          theme.palette.secondary.main,
          0.06
        )})`,
      }}
      id="pricing" // ancora para CTA do Hero
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
          <Chip
            icon={<LocalOfferIcon />}
            label="Oferta de lançamento"
            sx={{
              mb: 2,
              fontWeight: 600,
              bgcolor: alpha(theme.palette.primary.main, 0.12),
              color: theme.palette.primary.main,
              '& .MuiChip-icon': { color: theme.palette.primary.main },
              fontSize: { xs: '0.75rem', md: '0.875rem' },
              height: { xs: 28, md: 32 },
            }}
          />
          <Typography
            component="h2"
            variant="h4"
            sx={{
              fontWeight: 800,
              mb: 1,
              fontSize: { xs: '1.6rem', md: '2.125rem' },
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: { xs: 1.2, md: 1.25 },
            }}
          >
            Planos simples, foco em resultado
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontSize: { xs: '0.95rem', md: '1rem' } }}>
            Comece grátis e evolua conforme suas metas.
          </Typography>
        </Box>

        {/* Carrossel touch no mobile / grid no desktop */}
        <Box
          sx={{
            display: 'grid',
            gap: { xs: 2.5, md: 4 },
            // Mobile: fluxo em colunas com largura de 85% (carrossel)
            gridAutoFlow: { xs: 'column', md: 'row' },
            gridAutoColumns: { xs: '85%', md: 'unset' },
            gridTemplateColumns: { xs: 'unset', md: 'repeat(3, minmax(0, 1fr))' },
            overflowX: { xs: 'auto', md: 'visible' },
            scrollSnapType: { xs: 'x mandatory', md: 'none' },
            WebkitOverflowScrolling: 'touch',
            overscrollBehaviorX: { xs: 'contain', md: 'auto' },
            px: { xs: 1, md: 0 },
            pb: { xs: 1, md: 0 },
            alignItems: 'stretch',
          }}
        >
          {plans.map((plan, idx) => (
            <MotionCard
              key={plan.key}
              initial={reduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              sx={{
                height: '100%',
                position: 'relative',
                borderRadius: 4,
                border: `1px solid ${alpha(
                  theme.palette.primary.main,
                  plan.highlight ? 0.3 : 0.12
                )}`,
                boxShadow: plan.highlight
                  ? '0 20px 60px rgba(0,0,0,0.18)'
                  : '0 12px 40px rgba(0,0,0,0.10)',
                background: plan.highlight
                  ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.06)}, ${alpha(
                      theme.palette.secondary.main,
                      0.08
                    )})`
                  : 'background.paper',
                backdropFilter: plan.highlight ? 'blur(8px)' : undefined,
                scrollSnapAlign: { xs: 'center', md: 'unset' },
              }}
            >
              {plan.badge && (
                <Chip
                  size="small"
                  icon={<StarIcon sx={{ fontSize: 16 }} />}
                  label={plan.badge}
                  sx={{
                    position: 'absolute',
                    top: 12,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    bgcolor: theme.palette.primary.main,
                    color: 'white',
                    fontWeight: 800,
                    '& .MuiChip-icon': { color: 'white' },
                  }}
                />
              )}
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Typography
                  variant="overline"
                  color="text.secondary"
                  sx={{ letterSpacing: 1, fontSize: { xs: '0.7rem', md: '0.75rem' } }}
                >
                  {plan.title}
                </Typography>

                <Box sx={{ my: 1 }}>
                  <Typography
                    variant="h4"
                    aria-label={`Preço ${plan.price}`}
                    sx={{
                      fontWeight: 900,
                      lineHeight: 1,
                      fontVariantNumeric: 'tabular-nums',
                      color: theme.palette.primary.main,
                      fontSize: { xs: '1.8rem', md: '2.125rem' },
                    }}
                  >
                    {plan.price}
                  </Typography>
                  {plan.period && (
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', md: '0.8rem' } }}>
                      {plan.period}
                    </Typography>
                  )}
                </Box>

                {plan.subtitle && (
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontSize: { xs: '0.9rem', md: '0.95rem' } }}>
                    {plan.subtitle}
                  </Typography>
                )}

                <Stack component="ul" spacing={1.1} sx={{ listStyle: 'none', pl: 0, mb: 3 }}>
                  {plan.features.map((feat) => (
                    <Box key={feat} component="li" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CheckCircleIcon
                        fontSize="small"
                        sx={{ color: plan.highlight ? theme.palette.primary.main : theme.palette.success.main }}
                        aria-hidden
                      />
                      <Typography variant="body2" sx={{ fontSize: { xs: '0.9rem', md: '0.95rem' } }}>
                        {feat}
                      </Typography>
                    </Box>
                  ))}
                </Stack>

                <Button
                  fullWidth
                  variant={plan.highlight ? 'contained' : 'outlined'}
                  size="large"
                  href={plan.ctaHref}
                  sx={{
                    textTransform: 'none',
                    borderRadius: 3,
                    fontWeight: 800,
                    height: { xs: 48, md: 52 },
                    ...(plan.highlight
                      ? {
                          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                          boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
                          '&:hover': {
                            background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                            transform: 'translateY(-2px)',
                            boxShadow: '0 12px 28px rgba(0,0,0,0.22)',
                          },
                        }
                      : {
                          borderWidth: 2,
                          '&:hover': { borderWidth: 2, transform: 'translateY(-2px)' },
                        }),
                    transition: 'all 0.25s ease',
                  }}
                >
                  {plan.key === 'gratis' ? 'Começar Grátis' : 'Começar Agora'}
                </Button>
              </CardContent>
            </MotionCard>
          ))}
        </Box>

        {/* Observação/garantias */}
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', md: '0.8rem' } }}>
            7 dias grátis em qualquer plano. Cancele quando quiser.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
