// src/components/landing/Features.tsx
'use client';

import { Box, Grid, Typography, useTheme } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import HistoryIcon from '@mui/icons-material/History';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <PhotoCameraIcon fontSize="large" />,
    title: 'Análise por Foto',
    desc: 'Envie fotos das suas refeições e receba calorias e macros automaticamente.',
  },
  {
    icon: <HistoryIcon fontSize="large" />,
    title: 'Histórico Diário',
    desc: 'Acompanhe todas as suas refeições e pesagens em um só lugar.',
  },
  {
    icon: <RestaurantMenuIcon fontSize="large" />,
    title: 'Recomendações Personalizadas',
    desc: 'Sugestões de refeições balanceadas com base em seus objetivos.',
  },
];

export default function Features() {
  const theme = useTheme();

  return (
    <Box component="section" sx={{ py: 8, px: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Funcionalidades
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {features.map((f, i) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={f.title}
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, duration: 0.6 }}
          >
            <Box
              sx={{
                textAlign: 'center',
                p: 3,
                borderRadius: 2,
                backgroundColor: theme.palette.background.paper,
                boxShadow: 3,
                '&:hover': {
                  boxShadow: 6,
                  transform: 'translateY(-4px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              <Box sx={{ mb: 2, color: theme.palette.primary.main }}>
                {f.icon}
              </Box>
              <Typography variant="h6" gutterBottom>
                {f.title}
              </Typography>
              <Typography variant="body1">{f.desc}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
