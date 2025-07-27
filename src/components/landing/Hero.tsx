// src/components/landing/Hero.tsx
'use client';

import React from 'react';
import {
  Box,
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
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: '80vh',
        px: { xs: 2, md: 8 },
        py: { xs: 4, md: 0 },
        bgcolor: alpha(theme.palette.primary.main, 0.05),
      }}
    >
      {/* TEXTO */}
      <Box
        sx={{
          flex: 1,
          pr: { xs: 0, md: 4 },
          textAlign: { xs: 'center', md: 'left' },
          mb: { xs: 6, md: 0 },
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            component="h1"
            variant={isSm ? 'h4' : 'h2'}
            sx={{
              fontWeight: 800,
              mb: 1,
              lineHeight: 1.1,
              color: theme.palette.primary.main,
            }}
          >
            NutriFlow
          </Typography>
          <Typography
            variant={isSm ? 'h6' : 'h5'}
            component="p"
            sx={{
              color: theme.palette.text.primary,
              mb: 3,
              fontWeight: 500,
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
          <Typography
            variant={isSm ? 'body2' : 'h6'}
            sx={{
              color: theme.palette.text.secondary,
              mb: 4,
              maxWidth: 480,
              mx: { xs: 'auto', md: 0 },
              lineHeight: 1.5,
            }}
          >
            Fotografe suas refeições, receba cálculos automáticos de calorias e macros,
            acompanhe seu progresso e ganhe planos personalizados 24/7 — sem complicações.
          </Typography>
          <Card
            sx={{
              display: 'inline-block',
              boxShadow: 6,
              borderRadius: 2,
              backgroundColor: theme.palette.background.paper,
            }}
          >
            <CardContent sx={{ p: 3, width: isSm ? 280 : 320 }}>
              <Typography variant="subtitle1" gutterBottom>
                Oferta de lançamento: <strong>R$ 9,90 no primeiro mês</strong>
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                Cadastre-se e leve de bônus o nosso E-book de Receitas Saudáveis
              </Typography>
              <TextField
                fullWidth
                placeholder="Seu melhor e-mail"
                variant="outlined"
                size="small"
                sx={{ mb: 2 }}
              />
              <Button
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  textTransform: 'none',
                  borderRadius: 2,
                  height: 44,
                  bgcolor: theme.palette.primary.main,
                  '&:hover': { bgcolor: theme.palette.primary.dark },
                }}
                href="/signup"
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
      </Box>

      {/* IMAGEM */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: { xs: 'center', md: 'flex-end' },
          alignItems: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Box sx={{ width: isSm ? 240 : 400, height: 'auto', position: 'relative' }}>
            <img
              src="/transparent-nutriflow.png"
              alt="Usuária segurando celular com NutriFlow"
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
                borderRadius: 16,
                boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
              }}
            />
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
}
