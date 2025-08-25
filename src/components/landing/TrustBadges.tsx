// src/components/landing/TrustBadges.tsx
'use client';

import React from 'react';
import { Box, Typography, SvgIcon, useTheme } from '@mui/material';

const badges = [
  {
    label: 'SSL Seguro',
    icon: (
      <SvgIcon viewBox="0 0 24 24" fontSize="large">
        <path d="M12 1L3 5v6c0 5 3.8 9.7 9 11 5.2-1.3 9-6 9-11V5l-9-4z" />
      </SvgIcon>
    ),
  },
  {
    label: 'Pagamento Confiável',
    icon: (
      <SvgIcon viewBox="0 0 24 24" fontSize="large">
        <path d="M2 6h20v2H2zm0 4h20v2H2zm0 4h20v2H2z" />
      </SvgIcon>
    ),
  },
  {
    label: 'Suporte 24/7',
    icon: (
      <SvgIcon viewBox="0 0 24 24" fontSize="large">
        <path d="M12 1a11 11 0 0 0-11 11h2a9 9 0 1 1 9 9v2a11 11 0 0 0 0-22z" />
      </SvgIcon>
    ),
  },
];

export default function TrustBadges() {
  const theme = useTheme();

  return (
    <Box component="section" sx={{ py: 4, px: 2 }}>
      {/* Grid responsivo com Box */}
      <Box
        sx={{
          display: 'grid',
          gap: 4,
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(3, minmax(0, 1fr))',
          },
          alignItems: 'center',
          justifyItems: 'center',
          maxWidth: 900,
          mx: 'auto',
        }}
      >
        {badges.map((b) => (
          <Box
            key={b.label}
            sx={{
              textAlign: 'center',
              px: 2,
            }}
          >
            <Box
              aria-hidden
              sx={{
                mb: 1,
                color: theme.palette.primary.main,
                display: 'inline-flex',
              }}
            >
              {b.icon}
            </Box>
            <Typography variant="subtitle1">{b.label}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
