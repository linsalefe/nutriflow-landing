// src/components/landing/Testimonials.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  IconButton,
  useTheme,
  useMediaQuery,
  Rating,
  Chip,
  alpha,
} from '@mui/material';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import StarIcon from '@mui/icons-material/Star';
import VerifiedIcon from '@mui/icons-material/Verified';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const testimonials = [
  { name: 'Marina Silva', text: 'A Lina mudou completamente minha relação com a comida! Em 2 meses perdi 8kg de forma saudável. A análise de fotos é incrível, muito precisa!', avatar: 'MS', role: 'Nutricionista', rating: 5, result: '8kg perdidos em 2 meses', verified: true },
  { name: 'Carlos Eduardo', text: 'Como engenheiro, adoro a tecnologia por trás do NutriFlow. O chat com IA é impressionante e me ajuda a manter foco nos meus objetivos.', avatar: 'CE', role: 'Engenheiro de Software', rating: 5, result: 'Ganhou 5kg de massa magra', verified: true },
  { name: 'Ana Paula', text: 'Depois dos 40, pensava que seria impossível emagrecer. O NutriFlow provou que estava errada! A personalização é incrível.', avatar: 'AP', role: 'Empresária', rating: 5, result: '12kg perdidos em 4 meses', verified: true },
  { name: 'Roberto Santos', text: 'O e-book de marmitas salvou minha vida corrida! Agora como bem e economizo tempo e dinheiro. A Lina sempre tem dicas perfeitas.', avatar: 'RS', role: 'Executivo', rating: 5, result: 'Economiza 3h por semana', verified: true },
  { name: 'Juliana Costa', text: 'Tentei várias dietas antes, mas só com o NutriFlow consegui resultados duradouros. A abordagem científica faz toda diferença!', avatar: 'JC', role: 'Médica', rating: 5, result: '15kg perdidos em 6 meses', verified: true },
  { name: 'Thiago Oliveira', text: 'Como personal trainer, recomendo o NutriFlow para todos meus alunos. A integração entre exercício e nutrição é fantástica!', avatar: 'TO', role: 'Personal Trainer', rating: 5, result: 'Clientes com 90% mais resultados', verified: true },
];

export default function Testimonials() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const reduced = useReducedMotion();

  const [active, setActive] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const timeoutRef = useRef<number | null>(null);
  const progressIntervalRef = useRef<number | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInViewRef = useRef(true);

  const AUTOPLAY_DURATION = 6000;

  // Navegação
  const next = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
    setProgress(0);
  };
  const prev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setProgress(0);
  };

  // Controle de timer
  const clearTimers = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (progressIntervalRef.current) {
      window.clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  };

  const startAutoPlay = () => {
    if (!reduced && isInViewRef.current && !document.hidden && isPlaying) {
      clearTimers();
      setProgress(0);
      
      // Progress bar
      progressIntervalRef.current = window.setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + (100 / (AUTOPLAY_DURATION / 50));
          return newProgress >= 100 ? 0 : newProgress;
        });
      }, 50);

      // Auto advance
      timeoutRef.current = window.setTimeout(next, AUTOPLAY_DURATION);
    }
  };

  const pauseAutoPlay = () => {
    setIsPlaying(false);
    clearTimers();
  };

  const resumeAutoPlay = () => {
    setIsPlaying(true);
    startAutoPlay();
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      pauseAutoPlay();
    } else {
      resumeAutoPlay();
    }
  };

  useEffect(() => {
    startAutoPlay();
    return clearTimers;
  }, [active, isPlaying, reduced]);

  // Intersection Observer
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isInViewRef.current = entry.isIntersecting && entry.intersectionRatio > 0.3;
        if (!isInViewRef.current) {
          clearTimers();
        } else if (isPlaying) {
          startAutoPlay();
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75] }
    );
    
    io.observe(el);
    return () => io.disconnect();
  }, [isPlaying]);

  // Visibility change
  useEffect(() => {
    const onVis = () => {
      if (document.hidden) {
        clearTimers();
      } else if (isPlaying) {
        startAutoPlay();
      }
    };
    
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, [isPlaying]);

  // Touch gestures
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchDeltaX = useRef(0);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    pauseAutoPlay();
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    
    const deltaX = e.touches[0].clientX - touchStartX.current;
    const deltaY = e.touches[0].clientY - touchStartY.current;
    
    // Só processar se movimento horizontal for maior que vertical
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      e.preventDefault(); // Evita scroll vertical
      touchDeltaX.current = deltaX;
    }
  };

  const onTouchEnd = () => {
    if (touchStartX.current !== null) {
      const dx = touchDeltaX.current;
      if (Math.abs(dx) > 50) {
        dx < 0 ? next() : prev();
      } else {
        resumeAutoPlay();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
    touchDeltaX.current = 0;
  };

  // Keyboard navigation
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prev();
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      next();
    }
    if (e.key === ' ') {
      e.preventDefault();
      togglePlayPause();
    }
  };

  return (
    <Box
      component="section"
      id="testimonials"
      ref={sectionRef}
      sx={{
        py: { xs: 6, md: 10 },
        background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(
          theme.palette.primary.main,
          0.08
        )} 100%)`,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 800,
            fontSize: { xs: '1.8rem', md: '2.5rem' },
            lineHeight: { xs: 1.2, md: 1.25 },
            background: `linear-gradient(45deg, ${theme.palette.success.main}, ${theme.palette.info.main})`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: { xs: 1.5, md: 2 },
          }}
        >
          ⭐ O que nossos usuários dizem
        </Typography>

        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          sx={{ 
            mb: { xs: 4, md: 6 }, 
            maxWidth: 700, 
            mx: 'auto', 
            px: { xs: 2, md: 0 }, 
            fontSize: { xs: '1rem', md: '1.15rem' } 
          }}
        >
          Transformações reais de pessoas que escolheram revolucionar sua alimentação com o NutriFlow
        </Typography>

        {/* Estatísticas */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: { xs: 2, md: 4 },
            mb: { xs: 4, md: 6 },
            flexWrap: 'wrap',
            px: { xs: 2, md: 0 },
          }}
        >
          <Box sx={{ textAlign: 'center', minWidth: { xs: 100, md: 120 } }}>
            <Typography variant="h4" fontWeight={800} color="primary" sx={{ fontSize: { xs: '1.8rem', md: '2.125rem' } }}>
              10,000+
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.8rem', md: '0.875rem' } }}>
              Usuários ativos
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center', minWidth: { xs: 100, md: 120 } }}>
            <Typography variant="h4" fontWeight={800} color="success.main" sx={{ fontSize: { xs: '1.8rem', md: '2.125rem' } }}>
              4.9/5
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.8rem', md: '0.875rem' } }}>
              Avaliação média
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center', minWidth: { xs: 100, md: 120 } }}>
            <Typography variant="h4" fontWeight={800} color="info.main" sx={{ fontSize: { xs: '1.8rem', md: '2.125rem' } }}>
              50,000+
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.8rem', md: '0.875rem' } }}>
              Refeições analisadas
            </Typography>
          </Box>
        </Box>

        {/* Controles Mobile */}
        {isMobile && (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 3,
            px: 2,
          }}>
            <IconButton
              onClick={prev}
              sx={{
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.2),
                }
              }}
              aria-label="Depoimento anterior"
            >
              <ArrowBackIosIcon />
            </IconButton>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton
                onClick={togglePlayPause}
                sx={{
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main,
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.2),
                  }
                }}
                aria-label={isPlaying ? "Pausar" : "Reproduzir"}
              >
                {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
              </IconButton>
              
              <Typography variant="caption" color="text.secondary">
                {active + 1} / {testimonials.length}
              </Typography>
            </Box>

            <IconButton
              onClick={next}
              sx={{
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.2),
                }
              }}
              aria-label="Próximo depoimento"
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
        )}

        {/* Progress bar (mobile) */}
        {isMobile && isPlaying && (
          <Box sx={{ px: 2, mb: 3 }}>
            <Box
              sx={{
                width: '100%',
                height: 3,
                bgcolor: alpha(theme.palette.primary.main, 0.2),
                borderRadius: 1.5,
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  width: `${progress}%`,
                  height: '100%',
                  bgcolor: theme.palette.primary.main,
                  transition: 'width 0.1s linear',
                }}
              />
            </Box>
          </Box>
        )}

        {/* Carrossel */}
        <Box
          sx={{ 
            position: 'relative', 
            width: '100%', 
            maxWidth: 800, 
            mx: 'auto', 
            mt: 2 
          }}
          onMouseEnter={isMobile ? undefined : pauseAutoPlay}
          onMouseLeave={isMobile ? undefined : resumeAutoPlay}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          tabIndex={0}
          onKeyDown={onKeyDown}
          role="region"
          aria-label="Depoimentos de usuários"
        >
          {/* Botões Desktop */}
          {!isMobile && (
            <>
              <IconButton
                onClick={prev}
                sx={{
                  position: 'absolute',
                  left: -60,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  bgcolor: 'background.paper',
                  color: 'primary.main',
                  boxShadow: 2,
                  zIndex: 2,
                  '&:hover': { 
                    bgcolor: 'primary.main', 
                    color: 'white', 
                    transform: 'translateY(-50%) scale(1.08)' 
                  },
                }}
                aria-label="Depoimento anterior"
              >
                <ArrowBackIosIcon />
              </IconButton>

              <IconButton
                onClick={next}
                sx={{
                  position: 'absolute',
                  right: -60,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  bgcolor: 'background.paper',
                  color: 'primary.main',
                  boxShadow: 2,
                  zIndex: 2,
                  '&:hover': { 
                    bgcolor: 'primary.main', 
                    color: 'white', 
                    transform: 'translateY(-50%) scale(1.08)' 
                  },
                }}
                aria-label="Próximo depoimento"
              >
                <ArrowForwardIosIcon />
              </IconButton>

              {/* Play/Pause Desktop */}
              <IconButton
                onClick={togglePlayPause}
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  bgcolor: alpha(theme.palette.background.paper, 0.9),
                  color: 'primary.main',
                  zIndex: 2,
                  opacity: 0.7,
                  '&:hover': { 
                    opacity: 1,
                    bgcolor: 'primary.main',
                    color: 'white',
                  },
                }}
                size="small"
                aria-label={isPlaying ? "Pausar" : "Reproduzir"}
              >
                {isPlaying ? <PauseIcon fontSize="small" /> : <PlayArrowIcon fontSize="small" />}
              </IconButton>
            </>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: isMobile ? 50 : 0, y: isMobile ? 0 : 30 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: isMobile ? -50 : 0, y: isMobile ? 0 : -30 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              style={{ width: '100%' }}
            >
              <Card
                sx={{
                  borderRadius: 4,
                  boxShadow: '0 12px 40px rgba(0,0,0,0.1)',
                  p: { xs: 2.5, md: 4 },
                  bgcolor: 'background.paper',
                  border: '2px solid',
                  borderColor: alpha(theme.palette.primary.main, 0.2),
                  transition: 'all 0.3s ease',
                  mx: { xs: 2, md: 0 },
                  '&:hover': !isMobile ? {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 18px 48px rgba(0,0,0,0.14)',
                    borderColor: alpha(theme.palette.primary.main, 0.35),
                  } : {},
                }}
              >
                <CardContent sx={{ textAlign: 'center', p: 0 }}>
                  {/* Avatar */}
                  <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: 'primary.main',
                        width: { xs: 60, md: 80 },
                        height: { xs: 60, md: 80 },
                        fontSize: { xs: '1.2rem', md: '1.5rem' },
                        fontWeight: 'bold',
                        mx: 'auto',
                        border: '4px solid',
                        borderColor: 'background.paper',
                        boxShadow: '0 4px 20px rgba(76, 175, 80, 0.3)',
                      }}
                    >
                      {testimonials[active].avatar}
                    </Avatar>
                    {testimonials[active].verified && (
                      <VerifiedIcon
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          right: 0,
                          color: 'primary.main',
                          bgcolor: 'background.paper',
                          borderRadius: '50%',
                          fontSize: { xs: 20, md: 24 },
                        }}
                        aria-label="Usuário verificado"
                      />
                    )}
                  </Box>

                  {/* Rating */}
                  <Rating
                    value={testimonials[active].rating}
                    readOnly
                    icon={<StarIcon fontSize="small" />}
                    emptyIcon={<StarIcon fontSize="small" />}
                    sx={{ mb: 1.5, color: '#FFD700' }}
                    size={isMobile ? "small" : "medium"}
                  />

                  {/* Depoimento */}
                  <Typography
                    variant="h6"
                    sx={{
                      fontStyle: 'italic',
                      mb: 2,
                      lineHeight: 1.6,
                      maxWidth: 620,
                      mx: 'auto',
                      fontSize: { xs: '0.95rem', md: '1.2rem' },
                      color: 'text.primary',
                      px: { xs: 1, md: 0 },
                    }}
                  >
                    &ldquo;{testimonials[active].text}&rdquo;
                  </Typography>

                  {/* Resultado */}
                  <Chip
                    label={testimonials[active].result}
                    color="success"
                    variant="outlined"
                    sx={{ 
                      mb: 2, 
                      fontWeight: 600, 
                      fontSize: { xs: '0.8rem', md: '0.9rem' }, 
                      px: 1.5 
                    }}
                    size={isMobile ? "small" : "medium"}
                  />

                  {/* Nome e profissão */}
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 800, 
                      color: 'text.primary', 
                      mb: 0.5,
                      fontSize: { xs: '1rem', md: '1.25rem' }
                    }}
                  >
                    {testimonials[active].name}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'text.secondary', 
                      fontStyle: 'italic',
                      fontSize: { xs: '0.85rem', md: '0.875rem' }
                    }}
                  >
                    {testimonials[active].role}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </Box>

        {/* Indicadores melhorados */}
        <Box sx={{ mt: { xs: 3, md: 4 }, display: 'flex', justifyContent: 'center', gap: 1 }}>
          {testimonials.map((_, idx) => (
            <Box
              key={idx}
              onClick={() => {
                setActive(idx);
                setProgress(0);
              }}
              sx={{
                width: idx === active ? { xs: 20, md: 28 } : { xs: 8, md: 12 },
                height: { xs: 6, md: 10 },
                borderRadius: { xs: 3, md: 6 },
                bgcolor: idx === active ? 'primary.main' : 'divider',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                '&:hover': {
                  bgcolor: idx === active ? 'primary.main' : 'primary.light',
                  transform: 'scale(1.1)',
                },
              }}
              aria-label={`Ir para depoimento ${idx + 1}`}
            />
          ))}
        </Box>

        {/* Dica de swipe (apenas mobile) */}
        {isMobile && (
          <Typography
            variant="caption"
            align="center"
            sx={{
              display: 'block',
              mt: 2,
              color: theme.palette.text.secondary,
              fontStyle: 'italic',
              fontSize: '0.75rem',
            }}
          >
            Deslize para navegar entre os depoimentos
          </Typography>
        )}
      </Container>
    </Box>
  );
}