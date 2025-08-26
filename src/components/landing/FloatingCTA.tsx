'use client';

import React, { useState, useEffect } from 'react';
import { Fab, useTheme, useMediaQuery, Zoom } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export default function FloatingCTA() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300);
    onScroll(); // Check initial position
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!isMobile) return null;

  return (
    <Zoom in={show}>
      <Fab
        variant="extended"
        href="https://pay.kiwify.com.br/6hOMVb2"
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 1300,
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
          color: 'white',
          fontWeight: 700,
          fontSize: '0.9rem',
          textTransform: 'none',
          boxShadow: '0 6px 20px rgba(76, 175, 80, 0.4)',
          '&:hover': {
            background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
            transform: 'scale(1.05)',
            boxShadow: '0 8px 25px rgba(76, 175, 80, 0.5)',
          },
          transition: 'all 0.3s ease',
        }}
      >
        <AttachMoneyIcon sx={{ mr: 1, fontSize: 20 }} />
        Melhor Oferta
      </Fab>
    </Zoom>
  );
}
