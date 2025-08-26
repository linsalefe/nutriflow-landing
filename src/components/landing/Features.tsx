// src/components/landing/Features.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  useTheme,
  alpha,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import ChatIcon from '@mui/icons-material/Chat';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalculateIcon from '@mui/icons-material/Calculate';
import SettingsIcon from '@mui/icons-material/Settings';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { motion, useReducedMotion } from 'framer-motion';

const features = [
  {
    title: '🤖 Lina - Sua Nutricionista Virtual',
    description:
      'Assistente nutricional baseada em IA que oferece análise inteligente de imagens, chat personalizado, acompanhamento de objetivos e registro automático de refeições.',
    icon: <SmartToyIcon sx={{ fontSize: 48 }} color="primary" />,
    category: 'ia',
  },
  {
    title: '📸 Análise Inteligente de Imagens',
    description:
      'Fotografe qualquer refeição e receba instantaneamente informações detalhadas sobre macronutrientes e calorias.',
    icon: <PhotoCameraIcon sx={{ fontSize: 48 }} color="primary" />,
    category: 'ia',
  },
  {
    title: '💬 Chat Personalizado',
    description:
      'Converse naturalmente com a Lina sobre dúvidas nutricionais, substitutos de alimentos e dicas personalizadas.',
    icon: <ChatIcon sx={{ fontSize: 48 }} color="primary" />,
    category: 'ia',
  },
  {
    title: '📚 E-book: Guia Prático de Marmitas',
    description:
      'Manual completo com cardápios balanceados, listas de compras inteligentes, receitas passo a passo e técnicas de conservação.',
    icon: <MenuBookIcon sx={{ fontSize: 48 }} color="primary" />,
    category: 'conteudo',
  },
  {
    title: '🎛️ Central de Comandos',
    description:
      'Seu painel de controle nutricional com calculadoras inteligentes, conteúdo educativo e templates para otimizar o chat.',
    icon: <DashboardIcon sx={{ fontSize: 48 }} color="primary" />,
    category: 'ferramentas',
  },
  {
    title: '⚖️ Calculadoras Inteligentes',
    description:
      'IMC, Taxa Metabólica Basal, Hidratação Personalizada e muito mais para monitorar sua saúde.',
    icon: <CalculateIcon sx={{ fontSize: 48 }} color="primary" />,
    category: 'ferramentas',
  },
  {
    title: '⚙️ Configurações Ultra-Personalizadas',
    description:
      'Definição de objetivos (perda, ganho ou manutenção), perfil completo e acompanhamento inteligente com ajustes automáticos.',
    icon: <SettingsIcon sx={{ fontSize: 48 }} color="primary" />,
    category: 'personalizacao',
  },
  {
    title: '🎓 Suporte e Aprendizado',
    description:
      'Tutoriais interativos, dicas práticas e suporte contínuo para maximizar seus resultados na plataforma.',
    icon: <SupportAgentIcon sx={{ fontSize: 48 }} color="primary" />,
    category: 'suporte',
  },
];

export default function Features() {
  const theme = useTheme();
  const reduced = useReducedMotion();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Atualiza os estados dos botões de navegação
  const updateScrollButtons = () => {
    if (!scrollRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    const handleScroll = () => {
      updateScrollButtons();
      
      // Calcula o índice atual baseado no scroll
      const cardWidth = scrollElement.clientWidth * 0.85; // 85% como definido no CSS
      const newIndex = Math.round(scrollElement.scrollLeft / cardWidth);
      setCurrentIndex(newIndex);
    };

    scrollElement.addEventListener('scroll', handleScroll);
    updateScrollButtons();

    return () => scrollElement.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    
    const cardWidth = scrollRef.current.clientWidth * 0.85;
    const targetScrollLeft = index * cardWidth;
    
    scrollRef.current.scrollTo({
      left: targetScrollLeft,
      behavior: 'smooth'
    });
  };

  const scrollLeft = () => {
    const newIndex = Math.max(0, currentIndex - 1);
    scrollToIndex(newIndex);
  };

  const scrollRight = () => {
    const newIndex = Math.min(features.length - 1, currentIndex + 1);
    scrollToIndex(newIndex);
  };

  return (
    <Box component="section" id="features" sx={{ py: { xs: 6, md: 10 }, backgroundColor: theme.palette.background.paper }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 800,
            fontSize: { xs: '1.8rem', md: '2.5rem' },
            lineHeight: { xs: 1.2, md: 1.25 },
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: { xs: 1.5, md: 2 },
          }}
        >
          🚀 Funcionalidades Revolucionárias
        </Typography>

        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          sx={{ 
            mb: { xs: 4, md: 6 }, 
            maxWidth: 800, 
            mx: 'auto', 
            fontSize: { xs: '1rem', md: '1.25rem' }, 
            px: { xs: 2, md: 0 } 
          }}
        >
          Com o NutriFlow, você não apenas conta calorias — você transforma sua relação com a alimentação e constrói hábitos
          saudáveis sustentáveis para toda a vida!
        </Typography>

        {/* Container do carrossel mobile */}
        {isMobile ? (
          <Box sx={{ position: 'relative' }}>
            {/* Botões de navegação */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              mb: 2,
              px: 2,
            }}>
              <IconButton
                onClick={scrollLeft}
                disabled={!canScrollLeft}
                sx={{
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main,
                  '&:disabled': {
                    bgcolor: alpha(theme.palette.text.disabled, 0.1),
                    color: theme.palette.text.disabled,
                  },
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.2),
                  }
                }}
              >
                <ArrowBackIosIcon fontSize="small" />
              </IconButton>

              {/* Indicadores de posição */}
              <Box sx={{ display: 'flex', gap: 1 }}>
                {features.map((_, index) => (
                  <Box
                    key={index}
                    onClick={() => scrollToIndex(index)}
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: currentIndex === index 
                        ? theme.palette.primary.main 
                        : alpha(theme.palette.text.secondary, 0.3),
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        transform: 'scale(1.2)',
                      }
                    }}
                  />
                ))}
              </Box>

              <IconButton
                onClick={scrollRight}
                disabled={!canScrollRight}
                sx={{
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main,
                  '&:disabled': {
                    bgcolor: alpha(theme.palette.text.disabled, 0.1),
                    color: theme.palette.text.disabled,
                  },
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.2),
                  }
                }}
              >
                <ArrowForwardIosIcon fontSize="small" />
              </IconButton>
            </Box>

            {/* Carrossel */}
            <Box
              ref={scrollRef}
              sx={{
                display: 'flex',
                gap: 2,
                overflowX: 'auto',
                scrollSnapType: 'x mandatory',
                WebkitOverflowScrolling: 'touch',
                overscrollBehaviorX: 'contain',
                px: 2,
                pb: 2,
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
                scrollbarWidth: 'none',
              }}
            >
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={reduced ? false : { opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: i * 0.08, duration: 0.55 }}
                  style={{ 
                    scrollSnapAlign: 'center',
                    minWidth: '85%',
                    maxWidth: '85%',
                  }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      borderRadius: 3,
                      boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      p: 3,
                      bgcolor: theme.palette.background.default,
                      transition: 'all 0.3s ease',
                      border: '1px solid',
                      borderColor: 'transparent',
                    }}
                  >
                    <Box
                      className="feature-icon"
                      aria-hidden
                      sx={{
                        mb: 2,
                        transition: 'all 0.25s ease',
                        p: 1,
                        borderRadius: '50%',
                        bgcolor: alpha(theme.palette.primary.main, 0.08),
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {f.icon}
                    </Box>
                    <CardContent sx={{ p: 0, flexGrow: 1 }}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{
                          fontWeight: 800,
                          fontSize: '1rem',
                          lineHeight: 1.3,
                          mb: 1.5,
                        }}
                      >
                        {f.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ lineHeight: 1.6, fontSize: '0.95rem' }}
                      >
                        {f.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </Box>

            {/* Dica de swipe */}
            <Typography
              variant="caption"
              align="center"
              sx={{
                display: 'block',
                mt: 2,
                color: theme.palette.text.secondary,
                fontStyle: 'italic',
              }}
            >
              👆 Deslize ou use as setas para ver mais
            </Typography>
          </Box>
        ) : (
          /* Grid desktop */
          <Box
            sx={{
              display: 'grid',
              gap: 4,
              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
              mt: 2,
            }}
          >
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={reduced ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.08, duration: 0.55 }}
              >
                <Card
                  sx={{
                    height: '100%',
                    borderRadius: 3,
                    boxShadow: '0 12px 40px rgba(0,0,0,0.10)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    p: 3,
                    bgcolor: theme.palette.background.default,
                    transition: 'all 0.3s ease',
                    border: '1px solid',
                    borderColor: 'transparent',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: '0 14px 44px rgba(0,0,0,0.14)',
                      borderColor: theme.palette.primary.main,
                      '& .feature-icon': {
                        transform: 'scale(1.06) rotate(3deg)',
                        color: theme.palette.primary.main,
                      },
                    },
                  }}
                >
                  <Box
                    className="feature-icon"
                    aria-hidden
                    sx={{
                      mb: 2,
                      transition: 'all 0.25s ease',
                      p: 1,
                      borderRadius: '50%',
                      bgcolor: alpha(theme.palette.primary.main, 0.08),
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {f.icon}
                  </Box>
                  <CardContent sx={{ p: 0, flexGrow: 1 }}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{
                        fontWeight: 800,
                        fontSize: '1.1rem',
                        lineHeight: 1.3,
                        mb: 1.5,
                      }}
                    >
                      {f.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ lineHeight: 1.6, fontSize: '0.95rem' }}
                    >
                      {f.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Box>
        )}

        {/* Seção de destaque */}
        <Box
          sx={{
            mt: { xs: 6, md: 8 },
            p: { xs: 3, md: 4 },
            borderRadius: 3,
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.09)}, ${alpha(
              theme.palette.secondary.main,
              0.09
            )})`,
            border: '2px solid',
            borderColor: alpha(theme.palette.primary.main, 0.3),
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{ 
              fontWeight: 800, 
              color: theme.palette.primary.main, 
              mb: 1.5, 
              fontSize: { xs: '1.4rem', md: '2rem' } 
            }}
          >
            🎯 Resultados Únicos e Personalizados
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '1rem', md: '1.1rem' },
              lineHeight: 1.7,
              maxWidth: 900,
              mx: 'auto',
              color: theme.palette.text.primary,
              px: { xs: 2, md: 0 },
            }}
          >
            Nossa plataforma combina inteligência artificial avançada com conhecimento nutricional especializado
            para entregar uma experiência completamente personalizada. Cada recomendação, cada análise e cada
            dica são adaptadas especificamente para <strong>você</strong> e seus objetivos únicos.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
