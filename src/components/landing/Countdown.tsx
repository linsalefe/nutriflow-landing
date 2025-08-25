// src/components/landing/Countdown.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { Box, Typography, useTheme, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { AccessTime, LocalOffer, Bolt, Star } from '@mui/icons-material';

export default function Countdown() {
  const theme = useTheme();

  const [targetDate] = useState(() => {
    const target = new Date();
    target.setDate(target.getDate() + 7);
    target.setHours(23, 59, 59, 999);
    return target;
  });

  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0, total: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = Date.now();
      const difference = targetDate.getTime() - now;
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds, total: difference });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (timeLeft.total <= 0) return null;

  const timeUnits = [
    { value: timeLeft.days, label: 'Dias',     color: '#FF5722' },
    { value: timeLeft.hours, label: 'Horas',   color: '#FF9800' },
    { value: timeLeft.minutes, label: 'Minutos', color: '#FFC107' },
    { value: timeLeft.seconds, label: 'Segundos', color: '#4CAF50' },
  ];

  return (
    <Box
      component="section"
      sx={{
        py: 4, px: 2,
        background: `linear-gradient(135deg, ${theme.palette.error.main}15, ${theme.palette.warning.main}15)`,
        border: '2px solid',
        borderColor: `${theme.palette.error.main}30`,
        borderRadius: 3,
        position: 'relative',
        overflow: 'hidden',
        my: 6,
        maxWidth: 900,
        mx: 'auto',
      }}
    >
      <Box
        component={motion.div}
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        sx={{
          position: 'absolute',
          top: -50, right: -50, width: 200, height: 200,
          background: `radial-gradient(circle, ${theme.palette.error.main}20, transparent)`,
          borderRadius: '50%',
          zIndex: 0,
        }}
      />

      <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mb: 3 }}>
          <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <Bolt sx={{ fontSize: 40, color: theme.palette.error.main }} />
          </motion.div>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              background: `linear-gradient(45deg, ${theme.palette.error.main}, ${theme.palette.warning.main})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            🔥 OFERTA LIMITADA
          </Typography>

          <motion.div animate={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <LocalOffer sx={{ fontSize: 40, color: theme.palette.warning.main }} />
          </motion.div>
        </Box>

        <Typography variant="h6" sx={{ mb: 3, color: theme.palette.text.primary, fontWeight: 500 }}>
          ⏰ Esta oferta especial expira em:
        </Typography>

        {/* Contador visual (CSS Grid) */}
        <Box
          sx={{
            display: 'grid',
            gap: 2,
            mb: 4,
            justifyContent: 'center',
            gridTemplateColumns: {
              xs: 'repeat(2, minmax(80px, auto))',
              sm: 'repeat(4, minmax(80px, auto))',
            },
          }}
        >
          {timeUnits.map((unit) => (
            <motion.div
              key={unit.label + unit.value}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Box
                sx={{
                  background: `linear-gradient(135deg, ${unit.color}20, ${unit.color}10)`,
                  border: '2px solid',
                  borderColor: unit.color,
                  borderRadius: 3,
                  p: 2,
                  minWidth: 80,
                  textAlign: 'center',
                  boxShadow: `0 4px 15px ${unit.color}30`,
                }}
              >
                <Typography
                  variant="h3"
                  sx={{ fontWeight: 'bold', color: unit.color, lineHeight: 1, fontFamily: 'monospace' }}
                >
                  {unit.value.toString().padStart(2, '0')}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: theme.palette.text.secondary,
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    fontSize: '0.7rem',
                  }}
                >
                  {unit.label}
                </Typography>
              </Box>
            </motion.div>
          ))}
        </Box>

        {/* Chips */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap', mb: 3 }}>
          <Chip icon={<Star />} label="7 Dias Grátis" color="success" sx={{ fontWeight: 'bold' }} />
          <Chip icon={<AccessTime />} label="Sem Compromisso" color="info" sx={{ fontWeight: 'bold' }} />
          <Chip icon={<LocalOffer />} label="Preço Especial" color="warning" sx={{ fontWeight: 'bold' }} />
        </Box>

        <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
          <Typography variant="body1" sx={{ color: theme.palette.error.main, fontWeight: 'bold', fontSize: '1.1rem' }}>
            ⚠️ Após este prazo, o preço volta ao valor normal!
          </Typography>
        </motion.div>

        <Box
          sx={{
            mt: 3, p: 2, borderRadius: 2,
            bgcolor: `${theme.palette.success.main}10`,
            border: '1px solid', borderColor: `${theme.palette.success.main}30`,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.success.main,
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
            }}
          >
            🔥 <strong>127 pessoas</strong> se inscreveram nas últimas 24 horas!
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
