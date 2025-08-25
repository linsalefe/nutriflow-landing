// src/components/landing/Hero.tsx
'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  useTheme,
  useMediaQuery,
  alpha,
  Chip,
  Stack,
} from '@mui/material';
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
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

export default function Hero() {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('md'));
  const reduced = useReducedMotion();

  // framer-motion v12
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 50]);
  const motionStyle: MotionStyle | undefined = reduced ? undefined : { y };

  const [email, setEmail] = useState('');

  const benefits = [
    { icon: <PhotoCameraIcon fontSize="small" />, text: 'Análise nutricional instantânea por foto' },
    { icon: <SmartToyIcon fontSize="small" />, text: 'Assistente nutricional disponível 24/7' },
    { icon: <MenuBookIcon fontSize="small" />, text: 'E-book completo com receitas práticas' },
  ];

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        width: '100%',
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.08)} 100%)`,
        py: { xs: 4, md: 10 }, // menor no mobile
        pb: { xs: 12, md: 10 }, // reserva espaço pro CTA fixo no mobile
        overflow: 'hidden',
      }}
    >
      {/* BG decorativo */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)}, ${alpha(theme.palette.secondary.main, 0.06)})`,
          filter: 'blur(2px)',
        }}
      />
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          bottom: -150,
          left: -150,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.06)}, ${alpha(theme.palette.primary.main, 0.04)})`,
          filter: 'blur(3px)',
        }}
      />

      {/* CTA topo (desktop) */}
      {!isSm && (
        <Button
          variant="contained"
          size="medium"
          href="#pricing"
          sx={{
            position: 'absolute',
            top: 20,
            right: 20,
            textTransform: 'none',
            borderRadius: 3,
            fontWeight: 600,
            bgcolor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            px: 3,
            py: 1.5,
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            '&:hover': {
              bgcolor: theme.palette.primary.dark,
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 25px rgba(0,0,0,0.2)',
            },
            transition: 'all 0.3s ease',
            zIndex: 10,
          }}
        >
          Começar Agora
        </Button>
      )}

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Layout 2 col (stack no mobile) */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 3, md: 6 },
            alignItems: 'center',
          }}
        >
          {/* Esquerda */}
          <Box>
            <motion.div
              initial={reduced ? false : { opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              {/* Badge */}
              <motion.div
                initial={reduced ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Chip
                  label="🚀 Tecnologia exclusiva no Brasil"
                  sx={{
                    mb: { xs: 2, md: 3 },
                    bgcolor: alpha(theme.palette.primary.main, 0.15),
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                    fontSize: { xs: '0.75rem', md: '0.85rem' },
                    px: 2,
                    py: 0.5,
                    borderRadius: 2,
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                  }}
                />
              </motion.div>

              {/* Headline */}
              <Typography
                component="h1"
                variant="h2"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '2rem', sm: '2.3rem', md: '3rem' },
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  mb: { xs: 1.5, md: 2 },
                  lineHeight: { xs: 1.15, md: 1.2 },
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
                  mb: { xs: 3, md: 4 },
                  maxWidth: 520,
                  fontWeight: 500,
                  lineHeight: 1.4,
                  fontSize: { xs: '1rem', md: '1.25rem' },
                }}
              >
                Descubra as calorias exatas com <strong>1 foto</strong>. Sua jornada para uma alimentação mais consciente começa aqui.
              </Typography>

              {/* Benefícios */}
              <Stack spacing={{ xs: 1.25, md: 2 }} sx={{ mb: { xs: 3, md: 4 } }}>
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.text}
                    initial={reduced ? false : { opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Box
                        aria-hidden
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 28,
                          height: 28,
                          borderRadius: '50%',
                          bgcolor: alpha(theme.palette.primary.main, 0.15),
                          color: theme.palette.primary.main,
                        }}
                      >
                        {benefit.icon}
                      </Box>
                      <Typography variant="body1" sx={{ fontWeight: 500, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                        {benefit.text}
                      </Typography>
                    </Box>
                  </motion.div>
                ))}
              </Stack>

              {/* Card de preço/lead */}
              <motion.div
                initial={reduced ? false : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Card
                  sx={{
                    maxWidth: { xs: '100%', md: 480 },
                    boxShadow: { xs: '0 8px 24px rgba(0,0,0,0.08)', md: '0 12px 40px rgba(0,0,0,0.1)' },
                    borderRadius: 4,
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                    background: 'rgba(255,255,255,0.95)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                    {/* Oferta */}
                    <Box sx={{ textAlign: 'center', mb: { xs: 2, md: 3 } }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main, mb: 0.5, fontSize: { xs: '1rem', md: '1.1rem' } }}>
                        OFERTA ESPECIAL DE LANÇAMENTO
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.8rem', md: '0.9rem' } }}>
                        Primeiros 1000 usuários ganham desconto exclusivo
                      </Typography>
                    </Box>

                    {/* Planos */}
                    <Box
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                        gap: 1.5,
                        mb: { xs: 2.5, md: 3 },
                      }}
                    >
                      <Box
                        sx={{
                          p: { xs: 1.5, md: 2 },
                          borderRadius: 2,
                          border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                          textAlign: 'center',
                          position: 'relative',
                        }}
                      >
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5, fontSize: { xs: '0.75rem', md: '0.85rem' } }}>
                          MENSAL
                        </Typography>
                        <Typography
                          variant="h4"
                          sx={{
                            fontWeight: 800,
                            color: theme.palette.primary.main,
                            fontVariantNumeric: 'tabular-nums',
                            fontSize: { xs: '1.6rem', md: '2rem' },
                          }}
                        >
                          R$ 29,90
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          por mês
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          p: { xs: 1.5, md: 2 },
                          borderRadius: 2,
                          background: `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.secondary.main}10)`,
                          border: `2px solid ${theme.palette.primary.main}`,
                          textAlign: 'center',
                          position: 'relative',
                        }}
                      >
                        <Chip
                          label="MELHOR OFERTA"
                          size="small"
                          icon={<LocalOfferIcon sx={{ fontSize: 16 }} />}
                          sx={{
                            position: 'absolute',
                            top: -8,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            bgcolor: theme.palette.primary.main,
                            color: 'white',
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            '& .MuiChip-icon': { color: 'white' },
                          }}
                        />
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5, mt: 1, fontSize: { xs: '0.75rem', md: '0.85rem' } }}>
                          ANUAL
                        </Typography>
                        <Typography
                          variant="h4"
                          sx={{
                            fontWeight: 800,
                            color: theme.palette.primary.main,
                            fontVariantNumeric: 'tabular-nums',
                            fontSize: { xs: '1.6rem', md: '2rem' },
                          }}
                        >
                          R$ 197
                        </Typography>
                        <Typography variant="caption" sx={{ color: theme.palette.success.main, fontWeight: 600 }}>
                          R$ 16,40/mês · Economia de R$ 161
                        </Typography>
                      </Box>
                    </Box>

                    {/* Email */}
                    <TextField
                      fullWidth
                      placeholder="Seu melhor e-mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      size="medium"
                      sx={{
                        mb: { xs: 2, md: 3 },
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          '&:hover fieldset': { borderColor: theme.palette.primary.main },
                        },
                      }}
                      inputProps={{ 'aria-label': 'Seu e-mail' }}
                    />

                    {/* CTA principal */}
                    <Button
                      fullWidth
                      variant="contained"
                      size="large"
                      href="/signup"
                      sx={{
                        textTransform: 'none',
                        borderRadius: 3,
                        height: { xs: 50, md: 56 },
                        fontSize: { xs: '1rem', md: '1.1rem' },
                        fontWeight: 700,
                        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                        '&:hover': {
                          background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
                        },
                        transition: 'all 0.3s ease',
                        mb: 2,
                      }}
                    >
                      🚀 COMEÇAR MINHA TRANSFORMAÇÃO
                    </Button>

                    {/* Garantias */}
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                      {['✅ 7 dias grátis', '✅ Garantia 30 dias', '✅ Cancele quando quiser'].map((g) => (
                        <Typography
                          key={g}
                          variant="caption"
                          sx={{
                            color: theme.palette.success.main,
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: { xs: '0.75rem', md: '0.8rem' },
                          }}
                        >
                          {g}
                        </Typography>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </Box>

          {/* Direita (imagem) */}
          <Box
            sx={{
              order: { xs: -1, md: 0 }, // imagem primeiro no mobile
              display: 'flex',
              justifyContent: { xs: 'center', md: 'flex-end' },
              alignItems: 'center',
              pl: { xs: 0, md: 4 },
            }}
          >
            <motion.div
              style={motionStyle}
              initial={reduced ? false : { opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Box
                component="img"
                src="/transparent-nutriflow.png"
                alt="Aplicativo NutriFlow mostrando análise nutricional"
                loading="lazy"
                sx={{
                  width: { xs: 260, sm: 300, md: 450 },
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: 4,
                  boxShadow: '0 14px 40px rgba(0,0,0,0.12)',
                  filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.08))',
                }}
              />
            </motion.div>
          </Box>
        </Box>
      </Container>

      {/* CTA fixo (mobile) */}
      {isSm && (
        <Button
          href="/signup"
          variant="contained"
          size="large"
          sx={{
            position: 'fixed',
            left: 16,
            right: 16,
            bottom: 12,
            height: 48,
            borderRadius: 3,
            fontWeight: 800,
            textTransform: 'none',
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
            '&:hover': {
              background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
              transform: 'translateY(-1px)',
            },
            zIndex: 50,
          }}
        >
          Começar Agora
        </Button>
      )}
    </Box>
  );
}
