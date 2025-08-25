// src/components/landing/Features.tsx
'use client';

import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  useTheme,
} from '@mui/material';
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
    category: 'ia'
  },
  {
    title: '📸 Análise Inteligente de Imagens',
    description:
      'Fotografe qualquer refeição e receba instantaneamente informações detalhadas sobre macronutrientes e calorias.',
    icon: <PhotoCameraIcon sx={{ fontSize: 48 }} color="primary" />,
    category: 'ia'
  },
  {
    title: '💬 Chat Personalizado',
    description:
      'Converse naturalmente com a Lina sobre dúvidas nutricionais, substitutos de alimentos e dicas personalizadas.',
    icon: <ChatIcon sx={{ fontSize: 48 }} color="primary" />,
    category: 'ia'
  },
  {
    title: '📚 E-book: Guia Prático de Marmitas',
    description:
      'Manual completo com cardápios balanceados, listas de compras inteligentes, receitas passo a passo e técnicas de conservação.',
    icon: <MenuBookIcon sx={{ fontSize: 48 }} color="primary" />,
    category: 'conteudo'
  },
  {
    title: '🎛️ Central de Comandos',
    description:
      'Seu painel de controle nutricional com calculadoras inteligentes, conteúdo educativo e templates para otimizar o chat.',
    icon: <DashboardIcon sx={{ fontSize: 48 }} color="primary" />,
    category: 'ferramentas'
  },
  {
    title: '⚖️ Calculadoras Inteligentes',
    description:
      'IMC, Taxa Metabólica Basal, Hidratação Personalizada e muito mais para monitorar sua saúde.',
    icon: <CalculateIcon sx={{ fontSize: 48 }} color="primary" />,
    category: 'ferramentas'
  },
  {
    title: '⚙️ Configurações Ultra-Personalizadas',
    description:
      'Definição de objetivos (perda, ganho ou manutenção), perfil completo e acompanhamento inteligente com ajustes automáticos.',
    icon: <SettingsIcon sx={{ fontSize: 48 }} color="primary" />,
    category: 'personalizacao'
  },
  {
    title: '🎓 Suporte e Aprendizado',
    description:
      'Tutoriais interativos, dicas práticas e suporte contínuo para maximizar seus resultados na plataforma.',
    icon: <SupportAgentIcon sx={{ fontSize: 48 }} color="primary" />,
    category: 'suporte'
  },
];

export default function Features() {
  const theme = useTheme();
  const reduced = useReducedMotion();

  return (
    <Box
      component="section"
      id="features"
      sx={{
        py: 8,
        px: 2,
        backgroundColor: theme.palette.background.paper,
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
          mb: 2
        }}
      >
        🚀 Funcionalidades Revolucionárias
      </Typography>
      
      <Typography 
        variant="h6" 
        align="center" 
        color="text.secondary"
        sx={{ mb: 6, maxWidth: '800px', mx: 'auto' }}
      >
        Com o NutriFlow, você não apenas conta calorias - você transforma sua relação com a alimentação e constrói hábitos saudáveis sustentáveis para toda vida!
      </Typography>

      {/* Grid de funcionalidades (CSS Grid) */}
      <Box
        sx={{
          display: 'grid',
          gap: 4,
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, minmax(0, 1fr))',
            lg: 'repeat(3, minmax(0, 1fr))',
          },
          justifyItems: 'stretch',
          mt: 2,
        }}
      >
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={reduced ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
          >
            <Card
              sx={{
                height: '100%',
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                p: 3,
                bgcolor: theme.palette.background.default,
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                border: '1px solid',
                borderColor: 'transparent',
                '&:hover': { 
                  transform: 'translateY(-8px) scale(1.02)', 
                  boxShadow: '0 12px 40px rgba(76, 175, 80, 0.15)',
                  borderColor: theme.palette.primary.main,
                  '& .feature-icon': {
                    transform: 'scale(1.1) rotate(5deg)',
                    color: theme.palette.primary.main,
                  }
                },
              }}
            >
              <Box 
                className="feature-icon"
                aria-hidden
                sx={{ 
                  mb: 2,
                  transition: 'all 0.3s ease',
                  p: 1,
                  borderRadius: '50%',
                  bgcolor: `${theme.palette.primary.main}10`,
                }}
              >
                {f.icon}
              </Box>
              <CardContent sx={{ p: 0, flexGrow: 1 }}>
                <Typography 
                  variant="h6" 
                  gutterBottom
                  sx={{ 
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    lineHeight: 1.3,
                    mb: 2
                  }}
                >
                  {f.title}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ 
                    lineHeight: 1.6,
                    fontSize: '0.95rem'
                  }}
                >
                  {f.description}
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </Box>

      {/* Seção de destaque */}
      <Box
        sx={{
          mt: 8,
          p: 4,
          borderRadius: 3,
          background: `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.secondary.main}15)`,
          border: '2px solid',
          borderColor: `${theme.palette.primary.main}30`,
          textAlign: 'center',
        }}
      >
        <Typography 
          variant="h4" 
          gutterBottom
          sx={{ 
            fontWeight: 'bold',
            color: theme.palette.primary.main,
            mb: 2
          }}
        >
          🎯 Resultados Únicos e Personalizados
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            fontSize: '1.1rem',
            lineHeight: 1.7,
            maxWidth: '900px',
            mx: 'auto',
            color: theme.palette.text.primary
          }}
        >
          Nossa plataforma combina inteligência artificial avançada com conhecimento nutricional especializado 
          para entregar uma experiência completamente personalizada. Cada recomendação, cada análise e cada 
          dica são adaptadas especificamente para <strong>você</strong> e seus objetivos únicos.
        </Typography>
      </Box>
    </Box>
  );
}
