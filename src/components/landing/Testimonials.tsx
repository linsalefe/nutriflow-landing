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
  const reduced = useReducedMotion();

  const [active, setActive] = useState(0);
  const timeoutRef = useRef<number | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInViewRef = useRef(true);

  // Navegação
  const next = () => setActive((prev) => (prev + 1) % testimonials.length);
  const prev = () => setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  // Autoplay: pausa com prefers-reduced-motion, fora de visão e quando a aba estiver oculta
  const clearTimer = () => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const scheduleNext = () => {
    if (!reduced && isInViewRef.current && !document.hidden) {
      timeoutRef.current = window.setTimeout(next, 7000);
    }
  };

  useEffect(() => {
    clearTimer();
    scheduleNext();
    return clearTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, reduced]);

  // Pausar/retomar no hover (desktop) e foco
  const pauseAutoPlay = () => clearTimer();
  const resumeAutoPlay = () => {
    clearTimer();
    scheduleNext();
  };

  // Pausar quando seção sair de vista
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isInViewRef.current = entry.isIntersecting && entry.intersectionRatio > 0.3;
        if (!isInViewRef.current) {
          clearTimer();
        } else {
          resumeAutoPlay();
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75] }
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Pausar quando a aba fica oculta
  useEffect(() => {
    const onVis = () => {
      if (document.hidden) clearTimer();
      else resumeAutoPlay();
    };
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Swipe (touch)
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    pauseAutoPlay();
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };
  const onTouchEnd = () => {
    if (touchStartX.current !== null) {
      const dx = touchDeltaX.current;
      if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
    resumeAutoPlay();
  };

  // Teclado (acessibilidade)
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
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
          sx={{ mb: { xs: 4, md: 6 }, maxWidth: 700, mx: 'auto', px: { xs: 2, md: 0 }, fontSize: { xs: '1rem', md: '1.15rem' } }}
        >
          Transformações reais de pessoas que escolheram revolucionar sua alimentação com o NutriFlow
        </Typography>

        {/* Estatísticas rápidas */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: { xs: 3, md: 4 },
            mb: { xs: 4, md: 6 },
            flexWrap: 'wrap',
            px: { xs: 2, md: 0 },
          }}
        >
          <Box sx={{ textAlign: 'center', minWidth: 120 }}>
            <Typography variant="h4" fontWeight={800} color="primary">
              10,000+
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Usuários ativos
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center', minWidth: 120 }}>
            <Typography variant="h4" fontWeight={800} color="success.main">
              4.9/5
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Avaliação média
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center', minWidth: 120 }}>
            <Typography variant="h4" fontWeight={800} color="info.main">
              50,000+
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Refeições analisadas
            </Typography>
          </Box>
        </Box>

        {/* Carrossel de depoimentos */}
        <Box
          sx={{ position: 'relative', width: '100%', maxWidth: 800, mx: 'auto', mt: 2 }}
          onMouseEnter={pauseAutoPlay}
          onMouseLeave={resumeAutoPlay}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          tabIndex={0}
          onKeyDown={onKeyDown}
          role="region"
          aria-label="Depoimentos de usuários"
        >
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
                  '&:hover': { bgcolor: 'primary.main', color: 'white', transform: 'translateY(-50%) scale(1.08)' },
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
                  '&:hover': { bgcolor: 'primary.main', color: 'white', transform: 'translateY(-50%) scale(1.08)' },
                }}
                aria-label="Próximo depoimento"
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
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
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 18px 48px rgba(0,0,0,0.14)',
                    borderColor: alpha(theme.palette.primary.main, 0.35),
                  },
                }}
              >
                <CardContent sx={{ textAlign: 'center', p: 0 }}>
                  {/* Avatar e badge */}
                  <Box sx={{ position: 'relative', display: 'inline-block', mb: 2.5 }}>
                    <Avatar
                      sx={{
                        bgcolor: 'primary.main',
                        width: 80,
                        height: 80,
                        fontSize: '1.5rem',
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
                          fontSize: 24,
                        }}
                        aria-label="Usuário verificado"
                      />
                    )}
                  </Box>

                  {/* Nota */}
                  <Rating
                    value={testimonials[active].rating}
                    readOnly
                    icon={<StarIcon fontSize="small" />}
                    emptyIcon={<StarIcon fontSize="small" />}
                    sx={{ mb: 1.5, color: '#FFD700' }}
                    aria-label={`Avaliação ${testimonials[active].rating} de 5`}
                  />

                  {/* Depoimento (aria-live) */}
                  <Box role="status" aria-live="polite">
                    <Typography
                      variant="h6"
                      sx={{
                        fontStyle: 'italic',
                        mb: 2.5,
                        lineHeight: 1.6,
                        maxWidth: 620,
                        mx: 'auto',
                        fontSize: { xs: '1rem', md: '1.2rem' },
                        color: 'text.primary',
                      }}
                    >
                      &ldquo;{testimonials[active].text}&rdquo;
                    </Typography>
                  </Box>

                  {/* Resultado */}
                  <Chip
                    label={`🎯 ${testimonials[active].result}`}
                    color="success"
                    variant="outlined"
                    sx={{ mb: 2.5, fontWeight: 700, fontSize: '0.9rem', px: 2 }}
                  />

                  {/* Nome e profissão */}
                  <Typography variant="h6" sx={{ fontWeight: 800, color: 'text.primary', mb: 0.5 }}>
                    {testimonials[active].name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                    {testimonials[active].role}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </Box>

        {/* Indicadores */}
        <Box sx={{ mt: { xs: 3, md: 4 }, display: 'flex', justifyContent: 'center', gap: 1 }}>
          {testimonials.map((_, idx) => (
            <Box
              key={idx}
              onClick={() => setActive(idx)}
              sx={{
                width: idx === active ? 28 : 12,
                height: 10,
                borderRadius: 6,
                bgcolor: idx === active ? 'primary.main' : 'divider',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                '&:hover': {
                  bgcolor: idx === active ? 'primary.main' : 'primary.light',
                  transform: 'scale(1.08)',
                },
              }}
              aria-label={`Ir para depoimento ${idx + 1}`}
            />
          ))}
        </Box>

        {/* Botões mobile */}
        {isMobile && (
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3 }}>
            <IconButton
              onClick={prev}
              sx={{ bgcolor: 'primary.main', color: 'white', '&:hover': { bgcolor: 'primary.dark' } }}
              aria-label="Anterior"
            >
              <ArrowBackIosIcon />
            </IconButton>
            <IconButton
              onClick={next}
              sx={{ bgcolor: 'primary.main', color: 'white', '&:hover': { bgcolor: 'primary.dark' } }}
              aria-label="Próximo"
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
        )}
      </Container>
    </Box>
  );
}
