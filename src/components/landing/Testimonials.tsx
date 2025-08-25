// src/components/landing/Testimonials.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  IconButton,
  useTheme,
  useMediaQuery,
  Rating,
  Chip,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import StarIcon from '@mui/icons-material/Star';
import VerifiedIcon from '@mui/icons-material/Verified';

const testimonials = [
  { name: 'Marina Silva', text: 'A Lina mudou completamente minha relação com a comida! Em 2 meses perdi 8kg de forma saudável. A análise de fotos é incrível, muito precisa!',
    avatar: 'MS', role: 'Nutricionista', rating: 5, result: '8kg perdidos em 2 meses', verified: true },
  { name: 'Carlos Eduardo', text: 'Como engenheiro, adoro a tecnologia por trás do NutriFlow. O chat com IA é impressionante e me ajuda a manter foco nos meus objetivos.',
    avatar: 'CE', role: 'Engenheiro de Software', rating: 5, result: 'Ganhou 5kg de massa magra', verified: true },
  { name: 'Ana Paula', text: 'Depois dos 40, pensava que seria impossível emagrecer. O NutriFlow provou que estava errada! A personalização é incrível.',
    avatar: 'AP', role: 'Empresária', rating: 5, result: '12kg perdidos em 4 meses', verified: true },
  { name: 'Roberto Santos', text: 'O e-book de marmitas salvou minha vida corrida! Agora como bem e economizo tempo e dinheiro. A Lina sempre tem dicas perfeitas.',
    avatar: 'RS', role: 'Executivo', rating: 5, result: 'Economiza 3h por semana', verified: true },
  { name: 'Juliana Costa', text: 'Tentei várias dietas antes, mas só com o NutriFlow consegui resultados duradouros. A abordagem científica faz toda diferença!',
    avatar: 'JC', role: 'Médica', rating: 5, result: '15kg perdidos em 6 meses', verified: true },
  { name: 'Thiago Oliveira', text: 'Como personal trainer, recomendo o NutriFlow para todos meus alunos. A integração entre exercício e nutrição é fantástica!',
    avatar: 'TO', role: 'Personal Trainer', rating: 5, result: 'Clientes com 90% mais resultados', verified: true },
];

export default function Testimonials() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [active, setActive] = useState(0);

  // Use number para funcionar bem no DOM; window.setTimeout retorna number.
  const timeoutRef = useRef<number | null>(null);

  const next = () => setActive((prev) => (prev + 1) % testimonials.length);
  const prev = () => setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  // Auto-play mais lento para dar tempo de ler
  useEffect(() => {
    // limpa qualquer timer anterior
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    // agenda o próximo
    timeoutRef.current = window.setTimeout(next, 7000);

    // cleanup SEM nunca retornar null
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [active]); // eslint-disable-line react-hooks/exhaustive-deps

  // Pausar/retomar auto-play no hover
  const pauseAutoPlay = () => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };
  const resumeAutoPlay = () => {
    if (timeoutRef.current === null) {
      timeoutRef.current = window.setTimeout(next, 7000);
    }
  };

  return (
    <Box 
      component="section" 
      id="testimonials"
      sx={{ 
        py: 8, 
        px: 2, 
        background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.primary.main}08 100%)`,
      }}
    >
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, #4CAF50, #2196F3)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          mb: 2,
        }}
      >
        ⭐ O que nossos usuários dizem
      </Typography>

      <Typography
        variant="h6"
        align="center"
        color="text.secondary"
        sx={{ mb: 6, maxWidth: '700px', mx: 'auto' }}
      >
        Transformações reais de pessoas que escolheram revolucionar sua alimentação com o NutriFlow
      </Typography>

      {/* Estatísticas rápidas */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mb: 6, flexWrap: 'wrap' }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" fontWeight="bold" color="primary">
            10,000+
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Usuários ativos
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" fontWeight="bold" color="success.main">
            4.9/5
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Avaliação média
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" fontWeight="bold" color="info.main">
            50,000+
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Refeições analisadas
          </Typography>
        </Box>
      </Box>

      {/* Carrossel de depoimentos */}
      <Box 
        sx={{ position: 'relative', width: '100%', maxWidth: 800, mx: 'auto', mt: 4 }}
        onMouseEnter={pauseAutoPlay}
        onMouseLeave={resumeAutoPlay}
      >
        {!isMobile && (
          <>
            <IconButton 
              onClick={prev} 
              sx={{ 
                position: 'absolute', left: -60, top: '50%', transform: 'translateY(-50%)',
                bgcolor: 'background.paper', color: 'primary.main', boxShadow: 2, zIndex: 2,
                '&:hover': { bgcolor: 'primary.main', color: 'white', transform: 'translateY(-50%) scale(1.1)' }
              }} 
              aria-label="Depoimento anterior"
            >
              <ArrowBackIosIcon />
            </IconButton>
            
            <IconButton 
              onClick={next} 
              sx={{ 
                position: 'absolute', right: -60, top: '50%', transform: 'translateY(-50%)',
                bgcolor: 'background.paper', color: 'primary.main', boxShadow: 2, zIndex: 2,
                '&:hover': { bgcolor: 'primary.main', color: 'white', transform: 'translateY(-50%) scale(1.1)' }
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
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{ width: '100%' }}
          >
            <Card 
              sx={{ 
                borderRadius: 4, 
                boxShadow: '0 12px 40px rgba(0,0,0,0.1)', 
                p: { xs: 2, md: 4 },
                bgcolor: theme.palette.background.paper,
                border: '2px solid',
                borderColor: `${theme.palette.primary.main}20`,
                transition: 'all 0.3s ease',
                '&:hover': { 
                  transform: 'translateY(-5px)',
                  boxShadow: '0 20px 50px rgba(76, 175, 80, 0.15)',
                  borderColor: `${theme.palette.primary.main}40`,
                }
              }}
            >
              <CardContent sx={{ textAlign: 'center', p: 0 }}>
                {/* Avatar e badges */}
                <Box sx={{ position: 'relative', display: 'inline-block', mb: 3 }}>
                  <Avatar 
                    sx={{ 
                      bgcolor: theme.palette.primary.main, 
                      width: 80, height: 80, fontSize: '1.5rem', fontWeight: 'bold', mx: 'auto',
                      border: '4px solid', borderColor: 'background.paper',
                      boxShadow: '0 4px 20px rgba(76, 175, 80, 0.3)',
                    }}
                  >
                    {testimonials[active].avatar}
                  </Avatar>
                  {testimonials[active].verified && (
                    <VerifiedIcon
                      sx={{
                        position: 'absolute', bottom: 0, right: 0,
                        color: 'primary.main', bgcolor: 'background.paper',
                        borderRadius: '50%', fontSize: 24,
                      }}
                    />
                  )}
                </Box>

                {/* Rating */}
                <Rating
                  value={testimonials[active].rating}
                  readOnly
                  icon={<StarIcon fontSize="small" />}
                  emptyIcon={<StarIcon fontSize="small" />}
                  sx={{ mb: 2, color: '#FFD700' }}
                />

                {/* Depoimento */}
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontStyle: 'italic', mb: 3, lineHeight: 1.6, maxWidth: 600, mx: 'auto',
                    fontSize: { xs: '1rem', md: '1.25rem' }, color: 'text.primary',
                  }}
                >
                  &ldquo;{testimonials[active].text}&rdquo;
                </Typography>

                {/* Resultado destacado */}
                <Chip
                  label={`🎯 ${testimonials[active].result}`}
                  color="success"
                  variant="outlined"
                  sx={{ mb: 3, fontWeight: 'bold', fontSize: '0.9rem', px: 2 }}
                />

                {/* Nome e profissão */}
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 0.5 }}>
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
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 1 }}>
        {testimonials.map((_, idx) => (
          <Box
            key={idx}
            onClick={() => setActive(idx)}
            sx={{
              width: idx === active ? 32 : 12,
              height: 12,
              borderRadius: 6,
              bgcolor: idx === active ? theme.palette.primary.main : theme.palette.divider,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: idx === active ? theme.palette.primary.main : theme.palette.primary.light,
                transform: 'scale(1.1)',
              }
            }}
          />
        ))}
      </Box>

      {/* Botões mobile */}
      {isMobile && (
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
          <IconButton 
            onClick={prev}
            sx={{ bgcolor: 'primary.main', color: 'white', '&:hover': { bgcolor: 'primary.dark' } }}
          >
            <ArrowBackIosIcon />
          </IconButton>
          <IconButton 
            onClick={next}
            sx={{ bgcolor: 'primary.main', color: 'white', '&:hover': { bgcolor: 'primary.dark' } }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
}
