// src/components/landing/Testimonials.tsx
'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const testimonials = [
  {
    name: 'Joana S.',
    text: 'O NutriFlow mudou minha rotina alimentar para melhor! Agora me sinto mais saudável e consciente.',
    avatar: 'JS',
  },
  {
    name: 'Carlos M.',
    text: 'Em poucos dias já notei diferença. A análise por foto é impecável e super prática.',
    avatar: 'CM',
  },
  {
    name: 'Renata P.',
    text: 'Recomendo para todos que querem controlar calorias sem complicação. Facilita muito meu dia a dia!',
    avatar: 'RP',
  },
];

export default function Testimonials() {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const [active, setActive] = useState(0);

  const handlePrev = () =>
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  const handleNext = () =>
    setActive((prev) => (prev + 1) % testimonials.length);

  return (
    <Box
      component="section"
      sx={{
        py: 8,
        px: 2,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Depoimentos
      </Typography>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: 600,
          mx: 'auto',
          mt: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <IconButton
          onClick={handlePrev}
          sx={{
            position: 'absolute',
            left: 0,
            color: theme.palette.text.primary,
            zIndex: 2,
          }}
          aria-label="Depoimento anterior"
        >
          <ArrowBackIosIcon />
        </IconButton>

        <AnimatePresence initial={false}>
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            style={{ width: '100%' }}
          >
            <Card
              sx={{
                borderRadius: 2,
                boxShadow: 3,
                p: 2,
                bgcolor: theme.palette.background.paper,
              }}
            >
              <CardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: theme.palette.primary.main,
                    mb: 2,
                    width: isSm ? 48 : 64,
                    height: isSm ? 48 : 64,
                  }}
                >
                  {testimonials[active].avatar}
                </Avatar>
                <Typography
                  variant="body1"
                  sx={{ fontStyle: 'italic', mb: 2, maxWidth: 500 }}
                >
                  “{testimonials[active].text}”
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 600, color: theme.palette.text.secondary }}
                >
                  — {testimonials[active].name}
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        <IconButton
          onClick={handleNext}
          sx={{
            position: 'absolute',
            right: 0,
            color: theme.palette.text.primary,
            zIndex: 2,
          }}
          aria-label="Próximo depoimento"
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
