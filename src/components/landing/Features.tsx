// src/components/landing/Features.tsx
'use client';

import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  useTheme,
} from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import TimelineIcon from '@mui/icons-material/Timeline';
import ScienceIcon from '@mui/icons-material/Science';
import HistoryIcon from '@mui/icons-material/History';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'Análise por Foto',
    description:
      'Tire uma foto da sua refeição e receba em segundos calorias e macros precisos.',
    icon: <PhotoCameraIcon sx={{ fontSize: 48 }} color="primary" />,
  },
  {
    title: 'Acompanhamento de Progresso',
    description:
      'Visualize gráficos de evolução de peso, calorias e nutrientes ao longo do tempo.',
    icon: <TimelineIcon sx={{ fontSize: 48 }} color="primary" />,
  },
  {
    title: 'Recomendações Inteligentes',
    description:
      'Receba dicas e planos personalizados baseados nos seus objetivos reais.',
    icon: <ScienceIcon sx={{ fontSize: 48 }} color="primary" />,
  },
  {
    title: 'Histórico Detalhado',
    description:
      'Acesse todo o seu histórico de refeições, com filtro por data e nutrientes.',
    icon: <HistoryIcon sx={{ fontSize: 48 }} color="primary" />,
  },
];

export default function Features() {
  const theme = useTheme();

  return (
    <Box
      component="section"
      id="features"
      sx={{
        py: 8,
        px: 2,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Funcionalidades Principais
      </Typography>

      <Grid container spacing={4} justifyContent="center" sx={{ mt: 2 }}>
        {features.map((f, i) => (
          <Grid item xs={12} sm={6} md={6} key={f.title}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            >
              <Card
                sx={{
                  height: '100%',
                  borderRadius: 2,
                  boxShadow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  p: 3,
                  bgcolor: theme.palette.background.default,
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': { transform: 'scale(1.03)', boxShadow: 6 },
                }}
              >
                <Box sx={{ mb: 2 }}>{f.icon}</Box>
                <CardContent sx={{ p: 0 }}>
                  <Typography variant="h6" gutterBottom>
                    {f.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {f.description}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
