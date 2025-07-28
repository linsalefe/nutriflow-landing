// src/components/landing/BackToTop.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Fab, Zoom, Box } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Zoom in={show}>
      <Box sx={{ position: 'fixed', bottom: 96, right: 24, zIndex: 1200 }}>
        <Fab color="primary" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <KeyboardArrowUpIcon />
        </Fab>
      </Box>
    </Zoom>
  );
}
