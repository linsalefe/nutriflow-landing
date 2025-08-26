// src/components/landing/Hero.tsx
'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  useTheme,
  useMediaQuery,
  Chip,
  Stack,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionStyle,
} from 'framer-motion';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function Hero() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const reduced = useReducedMotion();

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 50]);
  const motionStyle: MotionStyle | undefined = reduced ? undefined : { y };

  const benefits = [
    { icon: <PhotoCameraIcon fontSize="small" />, text: 'Análise nutricional instantânea por foto' },
    { icon: <SmartToyIcon fontSize="small" />, text: 'Assistente nutricional disponível 24/7' },
    { icon: <MenuBookIcon fontSize="small" />, text: 'E-book completo com receitas práticas' },
  ];

  // Removido qualquer termo que insinue gratuidade
  const guarantees = ['Garantia 30 dias', 'Cancele quando quiser'];

  return (
    <Box
      id="hero"
      component="section"
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: { xs: '100vh', md: 'auto' },
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(
          theme.palette.secondary.main, 0.08
        )} 100%)`,
        pt: { xs: 10, md: 12 },
        pb: { xs: 16, md: 10 },
        overflow: 'hidden',
      }}
    >
      {/* Background decorativo */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)}, ${alpha(
            theme.palette.secondary.main, 0.06
          )})`,
          filter: 'blur(2px)',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 4, md: 6 },
            alignItems: 'center',
          }}
        >
          {/* Coluna esquerda - Conteúdo */}
          <Box>
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              {/* Badge */}
              <Chip
                label="🚀 Tecnologia exclusiva no Brasil"
                sx={{
                  mb: 3,
                  bgcolor: alpha(theme.palette.primary.main, 0.15),
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                  fontSize: { xs: '0.8rem', md: '0.9rem' },
                  px: 2,
                  py: 0.5,
                  borderRadius: 2,
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                }}
              />

              {/* Headline */}
              <Typography
                component="h1"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.2rem' },
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  mb: 2,
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                }}
              >
                Nunca Mais Erre na Dieta
              </Typography>

              {/* Subheadline */}
              <Typography
                variant="h6"
                sx={{
                  color: theme.palette.text.primary,
                  mb: 4,
                  fontWeight: 400,
                  lineHeight: 1.5,
                  fontSize: { xs: '1.1rem', md: '1.3rem' },
                  maxWidth: { xs: '100%', md: '90%' },
                }}
              >
                Descubra as calorias exatas com{' '}
                <Box component="span" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
                  1 foto
                </Box>
                . Sua jornada para uma alimentação mais consciente começa aqui.
              </Typography>

              {/* Benefícios */}
              <Stack spacing={2} sx={{ mb: { xs: 4, md: 5 } }}>
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.text}
                    initial={reduced ? false : { opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 32,
                          height: 32,
                          borderRadius: '50%',
                          bgcolor: alpha(theme.palette.primary.main, 0.15),
                          color: theme.palette.primary.main,
                          flexShrink: 0,
                        }}
                      >
                        {benefit.icon}
                      </Box>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 500,
                          fontSize: { xs: '1rem', md: '1.1rem' },
                          color: theme.palette.text.primary,
                        }}
                      >
                        {benefit.text}
                      </Typography>
                    </Box>
                  </motion.div>
                ))}
              </Stack>

              {/* CTA Desktop */}
              {!isMobile && (
                <Button
                  variant="contained"
                  size="large"
                  href="#pricing"
                  sx={{
                    textTransform: 'none',
                    borderRadius: 3,
                    px: 4,
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                    '&:hover': {
                      background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  🚀 Começar Agora
                </Button>
              )}
            </motion.div>
          </Box>

          {/* Coluna direita - Imagem + Card de Preço */}
          <Box>
            <Box sx={{ position: 'relative' }}>
              {/* Imagem do App */}
              <motion.div
                style={motionStyle}
                initial={reduced ? false : { opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: { xs: 4, md: 0 } }}>
                  <Box
                    component="img"
                    src="/transparent-nutriflow.png"
                    alt="Aplicativo NutriFlow mostrando análise nutricional"
                    loading="lazy"
                    sx={{
                      width: { xs: '280px', sm: '320px', md: '400px' },
                      maxWidth: '100%',
                      height: 'auto',
                      borderRadius: 3,
                      filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.12))',
                    }}
                  />
                </Box>
              </motion.div>

              {/* Card de preço (mobile) */}
              {isMobile && (
                <motion.div
                  initial={reduced ? false : { opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <Card
                    sx={{
                      mt: -8,
                      mx: 2,
                      boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                      borderRadius: 4,
                      border: `2px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                      background: 'rgba(255,255,255,0.98)',
                      backdropFilter: 'blur(10px)',
                      position: 'relative',
                      zIndex: 2,
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      {/* Header do card */}
                      <Box sx={{ textAlign: 'center', mb: 3 }}>
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: 700, color: theme.palette.primary.main, mb: 0.5, fontSize: '1.1rem' }}
                        >
                          OFERTA ESPECIAL DE LANÇAMENTO
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Primeiros 1000 usuários ganham desconto exclusivo
                        </Typography>
                      </Box>

                      {/* Planos lado a lado */}
                      <Box sx={{ display: 'flex', gap: 1.5, mb: 3 }}>
                        {/* Mensal */}
                        <Box
                          sx={{
                            flex: 1,
                            p: 2,
                            borderRadius: 2,
                            border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                            MENSAL
                          </Typography>
                          <Typography variant="h5" sx={{ fontWeight: 800, color: theme.palette.primary.main, my: 0.5, fontSize: '1.8rem' }}>
                            R$ 29,90
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            por mês
                          </Typography>
                        </Box>

                        {/* Anual */}
                        <Box
                          sx={{
                            flex: 1,
                            p: 2,
                            borderRadius: 2,
                            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.15)}, ${alpha(
                              theme.palette.secondary.main, 0.1
                            )})`,
                            border: `2px solid ${theme.palette.primary.main}`,
                            textAlign: 'center',
                            position: 'relative',
                          }}
                        >
                          <Chip
                            label="MELHOR"
                            size="small"
                            sx={{
                              position: 'absolute',
                              top: -8,
                              left: '50%',
                              transform: 'translateX(-50%)',
                              bgcolor: theme.palette.primary.main,
                              color: 'white',
                              fontSize: '0.65rem',
                              fontWeight: 700,
                              height: 20,
                            }}
                          />
                          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, mt: 1 }}>
                            ANUAL
                          </Typography>
                          <Typography variant="h5" sx={{ fontWeight: 800, color: theme.palette.primary.main, my: 0.5, fontSize: '1.8rem' }}>
                            R$ 197
                          </Typography>
                          <Typography variant="caption" sx={{ color: theme.palette.success.main, fontWeight: 600 }}>
                            R$ 16,40/mês
                          </Typography>
                        </Box>
                      </Box>

                      {/* Garantias */}
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          mb: 3,
                          flexWrap: 'wrap',
                          gap: 1,
                        }}
                      >
                        {guarantees.map((guarantee) => (
                          <Box
                            key={guarantee}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 0.5,
                              flex: { xs: '1 1 100%', sm: '1 1 auto' },
                              justifyContent: { xs: 'center', sm: 'flex-start' },
                            }}
                          >
                            <CheckCircleIcon sx={{ fontSize: 16, color: theme.palette.success.main }} />
                            <Typography
                              variant="caption"
                              sx={{ color: theme.palette.success.main, fontWeight: 600, fontSize: '0.75rem' }}
                            >
                              {guarantee}
                            </Typography>
                          </Box>
                        ))}
                      </Box>

                      {/* CTA Mobile */}
                      <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        href="#pricing"
                        sx={{
                          textTransform: 'none',
                          borderRadius: 3,
                          height: 52,
                          fontSize: '1rem',
                          fontWeight: 700,
                          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                          boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                          '&:hover': {
                            background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                            transform: 'translateY(-1px)',
                            boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
                          },
                          transition: 'all 0.3s ease',
                        }}
                      >
                        🚀 COMEÇAR AGORA
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </Box>
          </Box>
        </Box>
      </Container>

      {/* CTA fixo bottom apenas para telas muito pequenas */}
      {isSmall && (
        <Button
          href="#pricing"
          variant="contained"
          size="large"
          sx={{
            position: 'fixed',
            left: 16,
            right: 16,
            bottom: 16,
            height: 56,
            borderRadius: 3,
            fontWeight: 700,
            textTransform: 'none',
            fontSize: '1rem',
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
            '&:hover': {
              background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
              transform: 'translateY(-1px)',
            },
            zIndex: 1000,
          }}
        >
          Começar Agora
        </Button>
      )}
    </Box>
  );
}
