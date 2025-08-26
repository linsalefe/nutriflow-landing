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
  useMediaQuery,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { motion, useReducedMotion } from 'framer-motion';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import StarIcon from '@mui/icons-material/Star';

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
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const reduced = useReducedMotion();

  const plans: Plan[] = [
    {
      key: 'mensal',
      title: 'MENSAL',
      price: 'R$ 29,90',
      period: 'por mês',
      features: [
        'Análise nutricional por IA',
        'Chat 24/7 com a Lina',
        'Dashboard personalizado',
        'E-book de marmitas incluído',
        'Suporte premium',
      ],
      ctaHref: 'https://pay.kiwify.com.br/SEyg6iA',
    },
    {
      key: 'anual',
      title: 'ANUAL',
      price: 'R$ 197',
      period: 'R$ 16,40/mês',
      subtitle: 'Economia de R$ 161',
      features: [
        'Tudo do plano mensal',
        'Relatórios avançados',
        'Planos personalizados',
        'Calculadoras inteligentes',
        'Suporte prioritário',
        'E-book exclusivo',
      ],
      highlight: true,
      ctaHref: 'https://pay.kiwify.com.br/6hOMVb2',
      badge: 'MELHOR OFERTA',
    },
  ];

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(
          theme.palette.primary.main,
          0.05
        )} 100%)`,
        position: 'relative',
      }}
      id="pricing"
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <Chip
            icon={<LocalOfferIcon />}
            label="Oferta Especial de Lançamento"
            sx={{
              mb: 3,
              fontWeight: 700,
              bgcolor: alpha(theme.palette.primary.main, 0.15),
              color: theme.palette.primary.main,
              '& .MuiChip-icon': { color: theme.palette.primary.main },
              fontSize: { xs: '0.8rem', md: '0.9rem' },
              height: { xs: 32, md: 36 },
              px: 2,
            }}
          />

          <Typography
            component="h2"
            variant="h3"
            sx={{
              fontWeight: 800,
              mb: 2,
              fontSize: { xs: '1.8rem', md: '2.5rem' },
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: 1.2,
            }}
          >
            Escolha seu Plano
          </Typography>

          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              fontSize: { xs: '1rem', md: '1.15rem' },
              maxWidth: 600,
              mx: 'auto',
              px: { xs: 2, md: 0 },
              lineHeight: 1.5,
            }}
          >
            Comece sua transformação nutricional hoje mesmo
          </Typography>
        </Box>

        {/* Grid de Planos */}
        <Box
          sx={{
            display: 'grid',
            gap: { xs: 3, md: 4 },
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            maxWidth: 800,
            mx: 'auto',
            px: { xs: 1, md: 0 },
            mt: 2,
            overflow: 'visible',
          }}
        >
          {plans.map((plan, idx) => (
            <MotionCard
              key={plan.key}
              initial={reduced ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              sx={{
                height: '100%',
                position: 'relative',
                borderRadius: 4,
                border: `2px solid ${
                  plan.highlight ? theme.palette.primary.main : alpha(theme.palette.primary.main, 0.2)
                }`,
                boxShadow: plan.highlight
                  ? '0 16px 48px rgba(76, 175, 80, 0.2)'
                  : '0 8px 32px rgba(0,0,0,0.08)',
                background: plan.highlight
                  ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)}, ${alpha(
                      theme.palette.secondary.main,
                      0.05
                    )})`
                  : theme.palette.background.paper,
                transition: 'all 0.3s ease',
                overflow: 'visible', // não cortar o badge
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: plan.highlight
                    ? '0 20px 60px rgba(76, 175, 80, 0.25)'
                    : '0 12px 40px rgba(0,0,0,0.12)',
                },
              }}
            >
              {plan.badge && (
                <Chip
                  size="small"
                  icon={<StarIcon sx={{ fontSize: 16 }} />}
                  label={plan.badge}
                  sx={{
                    position: 'absolute',
                    top: -12,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    bgcolor: theme.palette.primary.main,
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '0.7rem',
                    height: 24,
                    '& .MuiChip-icon': { color: 'white', fontSize: 16 },
                    zIndex: 2,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  }}
                />
              )}

              <CardContent
                sx={{
                  p: { xs: 2.5, md: 4 },
                  pt: plan.highlight ? { xs: 3.5, md: 5 } : { xs: 2.5, md: 4 },
                  textAlign: 'center',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography
                  variant="overline"
                  color="text.secondary"
                  sx={{
                    letterSpacing: 1.2,
                    fontSize: { xs: '0.75rem', md: '0.8rem' },
                    fontWeight: 600,
                    mb: 1,
                  }}
                >
                  {plan.title}
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 800,
                      lineHeight: 1,
                      fontVariantNumeric: 'tabular-nums',
                      color: theme.palette.primary.main,
                      fontSize: { xs: '2.5rem', md: '3rem' },
                      mb: 0.5,
                    }}
                  >
                    {plan.price}
                  </Typography>

                  {plan.period && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontSize: { xs: '0.9rem', md: '1rem' },
                        fontWeight: 500,
                      }}
                    >
                      {plan.period}
                    </Typography>
                  )}
                </Box>

                {plan.subtitle && (
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 3,
                      color: theme.palette.success.main,
                      fontWeight: 600,
                      fontSize: { xs: '0.9rem', md: '1rem' },
                    }}
                  >
                    {plan.subtitle}
                  </Typography>
                )}

                <Stack
                  component="ul"
                  spacing={1.5}
                  sx={{
                    listStyle: 'none',
                    pl: 0,
                    mb: 4,
                    flexGrow: 1,
                  }}
                >
                  {plan.features.map((feat) => (
                    <Box
                      key={feat}
                      component="li"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        textAlign: 'left',
                      }}
                    >
                      <CheckCircleIcon
                        sx={{
                          color: theme.palette.success.main,
                          fontSize: { xs: 20, md: 22 },
                          flexShrink: 0,
                        }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: { xs: '0.9rem', md: '0.95rem' },
                          fontWeight: 500,
                          lineHeight: 1.4,
                        }}
                      >
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
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    textTransform: 'none',
                    borderRadius: 3,
                    fontWeight: 700,
                    height: { xs: 52, md: 56 },
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    mt: 'auto',
                    ...(plan.highlight
                      ? {
                          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                          boxShadow: '0 6px 20px rgba(76, 175, 80, 0.3)',
                          '&:hover': {
                            background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                            transform: 'translateY(-1px)',
                            boxShadow: '0 8px 25px rgba(76, 175, 80, 0.4)',
                          },
                        }
                      : {
                          borderWidth: 2,
                          borderColor: theme.palette.primary.main,
                          color: theme.palette.primary.main,
                          bgcolor: 'transparent',
                          '&:hover': {
                            borderWidth: 2,
                            borderColor: theme.palette.primary.dark,
                            bgcolor: alpha(theme.palette.primary.main, 0.08),
                            transform: 'translateY(-1px)',
                          },
                        }),
                    transition: 'all 0.3s ease',
                  }}
                >
                  Começar Agora
                </Button>
              </CardContent>
            </MotionCard>
          ))}
        </Box>

        {/* Garantias */}
        <Box
          sx={{
            textAlign: 'center',
            mt: { xs: 6, md: 8 },
            mx: { xs: 1, md: 'auto' },
            p: { xs: 2.5, md: 4 },
            borderRadius: 3,
            bgcolor: alpha(theme.palette.success.main, 0.05),
            border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
            maxWidth: 600,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: theme.palette.success.main,
              mb: 2,
              fontSize: { xs: '1.1rem', md: '1.25rem' },
            }}
          >
            Garantias e condições
          </Typography>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: { xs: 2, md: 3 },
            }}
          >
            {['Garantia 30 dias', 'Sem fidelidade', 'Cancele quando quiser'].map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <CheckCircleIcon
                  sx={{
                    color: theme.palette.success.main,
                    fontSize: { xs: 20, md: 22 },
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    color: theme.palette.success.main,
                    fontSize: { xs: '0.85rem', md: '0.9rem' },
                  }}
                >
                  {item}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* CTA Mobile Fixo */}
        {isMobile && (
          <Button
            variant="contained"
            size="large"
            href="https://pay.kiwify.com.br/6hOMVb2"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              position: 'fixed',
              left: 12,
              right: 12,
              bottom: 12,
              height: 56,
              borderRadius: 3,
              fontWeight: 700,
              fontSize: '1rem',
              textTransform: 'none',
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              boxShadow: '0 8px 24px rgba(76, 175, 80, 0.3)',
              zIndex: 1000,
              '&:hover': {
                background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                transform: 'translateY(-1px)',
                boxShadow: '0 10px 30px rgba(76, 175, 80, 0.4)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Começar Agora - Melhor Oferta
          </Button>
        )}
      </Container>
    </Box>
  );
}
