// src/components/landing/Header.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  alpha,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';

type Section = { id: string; label: string };

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const sections: Section[] = [
    { id: 'features', label: 'Funcionalidades' },
    { id: 'pricing', label: 'Preços' },
    { id: 'faq', label: 'Perguntas' },
  ];

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string>('');
  const appBarRef = useRef<HTMLDivElement | null>(null);

  // Scroll listener (performático)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Observa seções para highlight do menu
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      {
        // compensa a altura do header
        rootMargin: `-${(appBarRef.current?.offsetHeight ?? 72) + 8}px 0px -60% 0px`,
        threshold: [0.1, 0.25, 0.5, 0.75],
      }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const smoothScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const headerH = (appBarRef.current?.offsetHeight ?? 72) + 8;
    const y = el.getBoundingClientRect().top + window.scrollY - headerH;
    window.scrollTo({ top: y, behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <>
      <AppBar
        ref={appBarRef}
        position="sticky"
        elevation={scrolled ? 6 : 0}
        sx={{
          bgcolor: scrolled
            ? alpha(theme.palette.background.paper, 0.8)
            : 'transparent',
          color: theme.palette.text.primary,
          borderBottom: scrolled ? `1px solid ${theme.palette.divider}` : 'transparent',
          backdropFilter: scrolled ? 'saturate(180%) blur(12px)' : 'none',
          transition: 'all .25s ease',
          boxShadow: scrolled ? `0 8px 24px ${alpha('#000', 0.08)}` : 'none',
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            px: { xs: 2, md: 6 },
            minHeight: { xs: 64, md: 72 },
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Logo */}
          <Box
            onClick={() => smoothScrollTo('hero')}
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            aria-label="Ir para o topo"
          >
            <Image
              src="/logo.png"
              alt="NutriFlow Logo"
              width={40}
              height={40}
              priority
              sizes="(max-width: 960px) 40px, 48px"
              style={{ borderRadius: 8 }}
            />
          </Box>

          {/* Navegação desktop */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1, ml: 4 }}>
              {sections.map(({ id, label }) => {
                const isActive = activeId === id;
                return (
                  <Button
                    key={id}
                    onClick={() => smoothScrollTo(id)}
                    variant="text"
                    size="small"
                    sx={{
                      textTransform: 'none',
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? theme.palette.primary.main : theme.palette.text.primary,
                      pb: 0.5,
                      borderBottom: '2px solid',
                      borderColor: isActive ? theme.palette.primary.main : 'transparent',
                      '&:hover': {
                        color: theme.palette.primary.main,
                        borderColor: theme.palette.primary.main,
                      },
                    }}
                  >
                    {label}
                  </Button>
                );
              })}
              <Button
                variant="contained"
                size="small"
                onClick={() => smoothScrollTo('pricing')}
                sx={{
                  ml: 2,
                  textTransform: 'none',
                  borderRadius: 2,
                  fontWeight: 700,
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
            <IconButton
              aria-label="Abrir menu"
              onClick={() => setOpen(true)}
              sx={{ color: theme.palette.text.primary }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer Mobile */}
      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            bgcolor: alpha(theme.palette.background.paper, 0.98),
            backdropFilter: 'blur(6px)',
          },
        }}
      >
        <Box role="presentation" sx={{ p: 1.5 }}>
          <Box
            sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}
            onClick={() => { smoothScrollTo('hero'); }}
          >
            <Image src="/logo.png" alt="NutriFlow" width={28} height={28} />
            <Box sx={{ fontWeight: 800, fontSize: 14 }}>NutriFlow</Box>
          </Box>
          <List>
            {sections.map(({ id, label }) => (
              <ListItem key={id} disablePadding>
                <ListItemButton onClick={() => smoothScrollTo(id)}>
                  <ListItemText
                    primary={label}
                    primaryTypographyProps={{
                      fontWeight: activeId === id ? 700 : 500,
                      color: activeId === id ? 'primary.main' : 'text.primary',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem disablePadding>
              <ListItemButton onClick={() => smoothScrollTo('pricing')}>
                <ListItemText
                  primary="Assine Agora"
                  primaryTypographyProps={{
                    fontWeight: 800,
                    color: 'primary.main',
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
