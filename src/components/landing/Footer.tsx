// src/components/landing/Footer.tsx
'use client';

import { Box, Typography, Link } from '@mui/material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        px: 2,
        textAlign: 'center',
        backgroundColor: 'background.default',
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} NutriFlow. Todos os direitos reservados.
      </Typography>
      <Link href="/privacy" sx={{ ml: 2 }}>
        Política de Privacidade
      </Link>
    </Box>
  );
}
