// src/components/landing/Hero.tsx
'use client';

import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  useTheme,
  useMediaQuery,
  alpha,
} from '@mui/material';
import { motion } from 'framer-motion';

export default function Hero() {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      component="section"
      sx={{
        width: '100%',
        bgcolor: alpha(theme.palette.primary.main, 0.08),
        py: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          {/* Texto + CTA */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Typography
                component="h1"
                variant={isSm ? 'h4' : 'h2'}
                sx={{
                  fontWeight: 800,
                  color: theme.palette.primary.main,
                  mb: 2,
                  lineHeight: 1.2,
                }}
              >
                NutriFlow
              </Typography>
              <Typography
                variant={isSm ? 'body1' : 'h6'}
                sx={{
                  color: theme.palette.text.primary,
                  mb: 4,
                  maxWidth: 480,
                }}
              >
                Seu Nutricionista de Bolso por IA – a partir de{' '}
                <Box
                  component="span"
                  sx={{
                    color: theme.palette.primary.main,
                    fontWeight: 700,
                  }}
                >
                  R$ 19,90/mês
                </Box>
              </Typography>

              <Card
                sx={{
                  maxWidth: isSm ? 320 : 400,
                  boxShadow: 3,
                  borderRadius: 3,
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Oferta de lançamento: <strong>R$ 9,90 no primeiro mês</strong>
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Cadastre-se e leve de bônus nosso E-book de Receitas Saudáveis
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Seu melhor e-mail"
                    size="small"
                    sx={{ mb: 2 }}
                  />
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    href="/signup"
                    sx={{
                      textTransform: 'none',
                      borderRadius: 2,
                      height: 48,
                      bgcolor: theme.palette.primary.main,
                      '&:hover': { bgcolor: theme.palette.primary.dark },
                    }}
                  >
                    Assine Agora
                  </Button>
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 1,
                      display: 'block',
                      color: theme.palette.text.secondary,
                    }}
                  >
                    30 dias de garantia – cancele quando quiser
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Imagem */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: 'flex',
              justifyContent: { xs: 'center', md: 'flex-end' },
              alignItems: 'center',
              pl: { xs: 0, md: 8 }, // espaçamento maior à esquerda no desktop
            }}
          >
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ textAlign: isSm ? 'center' : 'right' }}
            >
              <Box
                component="img"
                src="/transparent-nutriflow.png"
                alt="Usuária segurando celular com NutriFlow"
                sx={{
                  width: isSm ? 280 : 400,
                  borderRadius: 3,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                }}
              />
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
