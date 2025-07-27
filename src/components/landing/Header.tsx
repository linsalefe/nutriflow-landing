'use client';
import React from 'react';
import { AppBar, Toolbar, Button, useTheme, useMediaQuery } from '@mui/material';

export default function Header() {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const sections = ['features','pricing','faq'];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{ bgcolor: theme.palette.background.paper, borderBottom: `1px solid ${theme.palette.divider}` }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Button onClick={() => scrollTo('hero')} sx={{ color: theme.palette.text.primary }}>
          NutriFlow
        </Button>
        {!isSm && sections.map((sec) => (
          <Button key={sec} onClick={() => scrollTo(sec)} sx={{ color: theme.palette.text.primary }}>
            {sec.charAt(0).toUpperCase()+sec.slice(1)}
          </Button>
        ))}
        <Button
          variant="contained"
          color="primary"
          onClick={() => scrollTo('pricing')}
        >
          Assine Agora
        </Button>
      </Toolbar>
    </AppBar>
  );
}
