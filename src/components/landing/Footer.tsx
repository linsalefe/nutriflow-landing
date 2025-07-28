// src/components/landing/Footer.tsx
'use client';

import React from 'react';
import { Box, Typography, Link, useTheme, Divider } from '@mui/material';
import Image from 'next/image';

export default function Footer() {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: theme.palette.background.paper,
        borderTop: `1px solid ${theme.palette.divider}`,
        py: { xs: 6, md: 8 },
        px: { xs: 2, md: 6 },
      }}
    >
      {/* Logo centralizada */}
      <Box sx={{ textAlign: 'center', mb: 2 }}>
        <Image
          src="/logo.png"
          alt="NutriFlow Logo"
          width={84}
          height={84}
          priority
        />
      </Box>

      {/* Nome (opcional) */}
      <Typography
        variant="h6"
        align="center"
        sx={{ fontWeight: 600, color: theme.palette.text.primary, mb: 1 }}
      >
        NutriFlow
      </Typography>

      {/* Copyright */}
      <Typography
        variant="body2"
        align="center"
        color="text.secondary"
        sx={{ mb: 2 }}
      >
        © {new Date().getFullYear()} NutriFlow. Todos os direitos reservados.
      </Typography>

      <Divider sx={{ mb: 2 }} />

      {/* Links úteis */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Link href="/privacy" underline="hover" color="text.secondary">
          Política de Privacidade
        </Link>
        <Link href="/terms" underline="hover" color="text.secondary">
          Termos de Uso
        </Link>
        <Link href="/contact" underline="hover" color="text.secondary">
          Contato
        </Link>
      </Box>
    </Box>
);
}
