// src/components/landing/Hero.tsx
'use client';

import { Box, Typography, Button, useTheme } from '@mui/material';

export default function Hero() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        py: 12,
        px: 2,
        textAlign: 'center',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
      }}
    >
      <Typography variant="h2" sx={{ mb: 2 }}>
        NutriFlow
      </Typography>
      <Typography variant="h5" sx={{ mb: 4 }}>
        Seu assistente nutricional por IA que analisa fotos e mantém seu histórico.
      </Typography>
      <Button
        variant="contained"
        size="large"
        href="/signup"
        sx={{ borderRadius: 2, px: 4 }}
      >
        Começar Agora
      </Button>
    </Box>
  );
}
