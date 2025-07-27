// src/components/landing/Header.tsx
'use client';

import React from 'react';
import { AppBar, Toolbar, Button, Box, Typography, useTheme, useMediaQuery } from '@mui/material';

export default function Header() {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));

  const sections = ['features', 'pricing', 'faq'];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          px: { xs: 2, md: 6 },
          py: 1,
        }}
      >
        {/* Logo como texto */}
        <Typography
          variant="h6"
          onClick={() => scrollTo('hero')}
          sx={{
            color: theme.palette.primary.main,
            fontWeight: 700,
            cursor: 'pointer',
            userSelect: 'none',
            mr: 4,
          }}
        >
          NutriFlow
        </Typography>

        {/* Links de navegação (desktop) */}
        {!isSm && (
          <Box sx={{ display: 'flex', gap: 3 }}>
            {sections.map((sec) => (
              <Button
                key={sec}
                onClick={() => scrollTo(sec)}
                sx={{
                  color: theme.palette.text.primary,
                  textTransform: 'none',
                  fontWeight: 500,
                }}
              >
                {sec.charAt(0).toUpperCase() + sec.slice(1)}
              </Button>
            ))}
          </Box>
        )}

        {/* Espaçador para empurrar o CTA à direita */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Botão CTA */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => scrollTo('pricing')}
          sx={{
            textTransform: 'none',
            borderRadius: 2,
            fontWeight: 600,
            px: 3,
            py: 0.5,
          }}
        >
          Assine Agora
        </Button>
      </Toolbar>
    </AppBar>
);
}
