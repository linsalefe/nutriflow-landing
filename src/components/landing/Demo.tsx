'use client';

import React from 'react';
import { Box, useTheme } from '@mui/material';

export default function Demo() {
  const theme = useTheme();
  return (
    <Box
      component="section"
      sx={{
        py: 8,
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Box
        component="video"
        src="/demo.mp4"
        autoPlay
        loop
        muted
        playsInline
        sx={{
          width: '100%',
          maxWidth: 600,
          borderRadius: 2,
          boxShadow: 3,
        }}
      />
    </Box>
  );
}
