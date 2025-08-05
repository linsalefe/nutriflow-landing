'use client';

import React from 'react';
import { Box, useTheme, Typography, Container } from '@mui/material';
import { motion } from 'framer-motion';

export default function Demo() {
  const theme = useTheme();

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 4, md: 6 },
        px: 2,
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: 600, color: theme.palette.primary.main }}
        >
          Experimente o NutriFlow
        </Typography>
        <Typography
          variant="body2"
          sx={{ mb: 3, color: theme.palette.text.secondary }}
        >
          Veja como nossa IA analisa suas refeições em segundos.
        </Typography>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Box
            component="img"
            src="/hero.gif"
            alt="Demonstração do NutriFlow"
            sx={{
              width: '100%',
              maxWidth: 320,
              mx: 'auto',
              borderRadius: 2,
              boxShadow: 4,
            }}
          />
        </motion.div>
      </Container>
    </Box>
  );
}
