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
  // Considera mobile para telas <= md (960px)
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            px: { xs: 2, md: 6 },
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Logo */}
          <Box
            onClick={() => scrollTo('hero')}
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          >
            <Image src="/logo.png" alt="NutriFlow Logo" width={48} height={48} />
          </Box>

          {/* Navegação + CTA (apenas desktop) */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1, ml: 4 }}>
              {sections.map(({ id, label }) => (
                <Button
                  key={id}
                  onClick={() => scrollTo(id)}
                  variant="text"
                  size="small"
                  sx={{
                    textTransform: 'none',
                    fontWeight: 500,
                    color: theme.palette.text.primary,
                    '&:hover': {
                      color: theme.palette.primary.light,
                    },
                  }}
                >
                  {label}
                </Button>
              ))}
              <Button
                variant="contained"
                size="small"
                onClick={() => scrollTo('pricing')}
                sx={{
                  ml: 2,
                  textTransform: 'none',
                  borderRadius: 2,
                  fontWeight: 600,
                  bgcolor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  '&:hover': { bgcolor: theme.palette.primary.dark },
                }}
              >
                Assine Agora
              </Button>
            </Box>
          )}

          {/* Menu Mobile */}
          {isMobile && (
            <IconButton onClick={() => setOpen(true)} sx={{ color: theme.palette.text.primary }}>
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
