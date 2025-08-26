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
  Container,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
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

  // Scroll listener
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
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
        rootMargin: `-${(appBarRef.current?.offsetHeight ?? 80) + 20}px 0px -60% 0px`,
        threshold: [0.1, 0.25, 0.5, 0.75],
      }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [sections]);

  const smoothScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const headerH = (appBarRef.current?.offsetHeight ?? 80) + 20;
    const y = el.getBoundingClientRect().top + window.scrollY - headerH;
    window.scrollTo({ top: y, behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <>
      <AppBar
        ref={appBarRef}
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: scrolled 
            ? alpha(theme.palette.background.paper, 0.95)
            : 'transparent',
          backdropFilter: scrolled ? 'saturate(180%) blur(20px)' : 'none',
          borderBottom: scrolled 
            ? `1px solid ${alpha(theme.palette.divider, 0.1)}` 
            : 'none',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: 1300,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              minHeight: { xs: 70, md: 80 },
              justifyContent: 'space-between',
              alignItems: 'center',
              px: { xs: 0, sm: 2 },
            }}
          >
            {/* Logo */}
            <Box
              onClick={() => smoothScrollTo('hero')}
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                cursor: 'pointer',
                transition: 'transform 0.2s ease',
                '&:hover': { transform: 'scale(1.05)' }
              }}
            >
              <Image
                src="/logo.png"
                alt="NutriFlow"
                width={44}
                height={44}
                priority
                style={{ borderRadius: 10 }}
              />
              <Box 
                sx={{ 
                  ml: 1.5,
                  fontWeight: 800,
                  fontSize: { xs: 18, md: 20 },
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: { xs: 'none', sm: 'block' }
                }}
              >
                NutriFlow
              </Box>
            </Box>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1,
                bgcolor: alpha(theme.palette.background.paper, 0.8),
                borderRadius: 50,
                p: 0.5,
                backdropFilter: 'blur(10px)',
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
              }}>
                {sections.map(({ id, label }) => {
                  const isActive = activeId === id;
                  return (
                    <Button
                      key={id}
                      onClick={() => smoothScrollTo(id)}
                      variant="text"
                      size="small"
                      sx={{
                        minWidth: 'auto',
                        px: 2,
                        py: 1,
                        borderRadius: 20,
                        textTransform: 'none',
                        fontWeight: isActive ? 600 : 500,
                        fontSize: '0.875rem',
                        color: isActive 
                          ? theme.palette.primary.contrastText 
                          : theme.palette.text.primary,
                        bgcolor: isActive 
                          ? theme.palette.primary.main 
                          : 'transparent',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          bgcolor: isActive 
                            ? theme.palette.primary.dark 
                            : alpha(theme.palette.primary.main, 0.08),
                          transform: 'translateY(-1px)',
                        },
                      }}
                    >
                      {label}
                    </Button>
                  );
                })}
              </Box>
            )}

            {/* CTA Button Desktop */}
            {!isMobile && (
              <Button
                variant="contained"
                onClick={() => smoothScrollTo('pricing')}
                sx={{
                  textTransform: 'none',
                  borderRadius: 25,
                  px: 3,
                  py: 1.2,
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  bgcolor: theme.palette.primary.main,
                  boxShadow: `0 4px 14px ${alpha(theme.palette.primary.main, 0.4)}`,
                  transition: 'all 0.3s ease',
                  '&:hover': { 
                    bgcolor: theme.palette.primary.dark,
                    transform: 'translateY(-2px)',
                    boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.5)}`,
                  },
                }}
              >
                Assine Agora
              </Button>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <IconButton
                onClick={() => setOpen(true)}
                sx={{ 
                  color: theme.palette.text.primary,
                  bgcolor: alpha(theme.palette.background.paper, 0.8),
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  '&:hover': {
                    bgcolor: alpha(theme.palette.background.paper, 0.9),
                  }
                }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: 320,
            bgcolor: alpha(theme.palette.background.paper, 0.98),
            backdropFilter: 'blur(20px)',
            border: 'none',
            backgroundImage: 'none',
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          {/* Header do Drawer */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 3,
            pb: 2,
            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Image src="/logo.png" alt="NutriFlow" width={32} height={32} />
              <Box sx={{ 
                fontWeight: 700, 
                fontSize: 18,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                NutriFlow
              </Box>
            </Box>
            <IconButton 
              onClick={() => setOpen(false)}
              sx={{ 
                color: theme.palette.text.secondary,
                '&:hover': { 
                  bgcolor: alpha(theme.palette.text.secondary, 0.08) 
                }
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Navigation Items */}
          <List sx={{ p: 0 }}>
            {sections.map(({ id, label }) => (
              <ListItem key={id} disablePadding sx={{ mb: 1 }}>
                <ListItemButton 
                  onClick={() => smoothScrollTo(id)}
                  sx={{
                    borderRadius: 2,
                    py: 1.5,
                    '&:hover': {
                      bgcolor: alpha(theme.palette.primary.main, 0.08),
                    }
                  }}
                >
                  <ListItemText
                    primary={label}
                    primaryTypographyProps={{
                      fontWeight: activeId === id ? 600 : 500,
                      color: activeId === id ? 'primary.main' : 'text.primary',
                      fontSize: '1rem',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          {/* CTA Button Mobile */}
          <Button
            variant="contained"
            fullWidth
            onClick={() => smoothScrollTo('pricing')}
            sx={{
              mt: 3,
              py: 1.5,
              borderRadius: 3,
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '1rem',
              bgcolor: theme.palette.primary.main,
              boxShadow: `0 4px 14px ${alpha(theme.palette.primary.main, 0.4)}`,
              '&:hover': { 
                bgcolor: theme.palette.primary.dark,
                boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.5)}`,
              },
            }}
          >
            Assine Agora
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
