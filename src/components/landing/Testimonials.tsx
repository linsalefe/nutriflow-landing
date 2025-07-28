'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  { name: 'Joana S.', text: 'O NutriFlow mudou minha rotina alimentar para melhor! Agora me sinto mais saudável e consciente.', avatar: 'JS' },
  { name: 'Carlos M.', text: 'Em poucos dias já notei diferença. A análise por foto é impecável e super prática.', avatar: 'CM' },
  { name: 'Renata P.', text: 'Recomendo para todos que querem controlar calorias sem complicação. Facilita muito meu dia a dia!', avatar: 'RP' },
];

export default function Testimonials() {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const [active, setActive] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const next = () => setActive((prev) => (prev + 1) % testimonials.length);
  const prev = () => setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(next, 5000);
    return () => timeoutRef.current && clearTimeout(timeoutRef.current);
  }, [active]);

  return (
    <Box component="section" sx={{ py: 8, px: 2, backgroundColor: theme.palette.background.paper }}>
      <Typography variant="h4" align="center" gutterBottom>Depoimentos</Typography>
      <Box sx={{ position: 'relative', width: '100%', maxWidth: 600, mx: 'auto', mt: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <IconButton onClick={prev} sx={{ position: 'absolute', left: 0, color: theme.palette.text.primary, zIndex: 2 }} aria-label="Anterior">
          <ArrowBackIosIcon />
        </IconButton>
        <AnimatePresence initial={false}>
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
            style={{ width: '100%' }}
          >
            <Card sx={{ borderRadius: 2, boxShadow: 3, p: 2, bgcolor: theme.palette.background.paper, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.02)' } }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <Avatar sx={{ bgcolor: theme.palette.primary.main, mb: 2, width: isSm ? 48 : 64, height: isSm ? 48 : 64 }}>
                  {testimonials[active].avatar}
                </Avatar>
                <Typography variant="body1" sx={{ fontStyle: 'italic', mb: 2, maxWidth: 500 }}>
                  “{testimonials[active].text}”
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: theme.palette.text.secondary }}>
                  — {testimonials[active].name}
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
        <IconButton onClick={next} sx={{ position: 'absolute', right: 0, color: theme.palette.text.primary, zIndex: 2 }} aria-label="Próximo">
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 1 }}>
        {testimonials.map((_, idx) => (
          <Box
            key={idx}
            onClick={() => setActive(idx)}
            sx={{
              width: idx === active ? 12 : 8,
              height: idx === active ? 12 : 8,
              borderRadius: '50%',
              bgcolor: idx === active ? theme.palette.primary.main : theme.palette.divider,
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
