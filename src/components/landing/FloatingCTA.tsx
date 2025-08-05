'use client';

import React, { useState, useEffect } from 'react';
import { Fab, useTheme, useMediaQuery, Zoom } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export default function FloatingCTA() {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 200);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!isSm) return null;

  return (
    <Zoom in={show}>
      <Fab
        variant="extended"
        color="secondary"
        href="https://global.disruptybr.com.br/zoyi4e1idi"
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          position: 'fixed',
          bottom: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1200,
        }}
      >
        <AttachMoneyIcon sx={{ mr: 1 }} /> Assine Agora
      </Fab>
    </Zoom>
  );
}
