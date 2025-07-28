// src/components/landing/Header.tsx
'use client';

import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';

export default function Header() {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));

  const sections = [
    { id: 'features', label: 'Funcionalidades' },
    { id: 'pricing',  label: 'Preços' },
    { id: 'faq',      label: 'Perguntas' },
  ];

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={scrolled ? 4 : 0}
        sx={{
          bgcolor: '#fafafa',
          borderBottom: `1px solid ${theme.palette.divider}`,
          py: 1,
        }}
      >
        <Toolbar disableGutters sx={{ px: { xs: 2, md: 6 }, gap: 4 }}>
          {/* Logo */}
          <Box
            onClick={() => scrollTo('hero')}
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          >
            <Image src="/logo.png" alt="NutriFlow Logo" width={64} height={64} />
          </Box>

          {/* Navegação Desktop */}
          {!isSm && (
            <Box sx={{ display: 'flex', gap: 2, flexGrow: 1 }}>
              {sections.map(({ id, label }) => (
                <Button
                  key={id}
                  onClick={() => scrollTo(id)}
                  variant="outlined"
                  size="small"
                  sx={{
                    color: '#fff',
                    borderColor: '#fff',
                    textTransform: 'none',
                    fontWeight: 500,
                    '&:hover': {
                      borderColor: theme.palette.primary.light,
                      color: theme.palette.primary.light,
                      backgroundColor: 'transparent',
                    },
                  }}
                >
                  {label}
                </Button>
              ))}
            </Box>
          )}

          <Box sx={{ flexGrow: 1 }} />

          {/* CTA Desktop */}
          {!isSm && (
            <Button
              variant="outlined"
              size="small"
              onClick={() => scrollTo('pricing')}
              sx={{
                textTransform: 'none',
                borderRadius: 2,
                fontWeight: 600,
                borderColor: '#fff',
                color: '#fff',
                px: 3,
                '&:hover': {
                  borderColor: theme.palette.primary.light,
                  color: theme.palette.primary.light,
                  backgroundColor: 'transparent',
                },
              }}
            >
              Assine Agora
            </Button>
          )}

          {/* Menu Mobile */}
          {isSm && (
            <IconButton onClick={() => setOpen(true)} sx={{ color: '#fff' }}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer Mobile */}
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 240 }} role="presentation">
          <List>
            {sections.map(({ id, label }) => (
              <ListItem key={id} disablePadding>
                <ListItemButton onClick={() => scrollTo(id)}>
                  <ListItemText primary={label} />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem disablePadding>
              <ListItemButton onClick={() => scrollTo('pricing')}>
                <ListItemText
                  primary="Assine Agora"
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontWeight: 600,
                      color: theme.palette.primary.main,
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}
