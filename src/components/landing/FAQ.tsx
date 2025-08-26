// src/components/landing/FAQ.tsx
'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
  useMediaQuery,
  Chip,
  Button,
  Collapse,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterListIcon from '@mui/icons-material/FilterList';
import { alpha } from '@mui/material/styles';
import {
  SmartToy,
  PhotoCamera,
  Security,
  Payment,
  Support,
  Settings,
  Timeline,
  Help,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

type ChipColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'error'
  | 'info'
  | 'success'
  | 'warning';

type FaqCategory =
  | 'ia'
  | 'tecnologia'
  | 'conteudo'
  | 'personalizacao'
  | 'progresso'
  | 'seguranca'
  | 'pagamento'
  | 'suporte';

type CategoryKey = 'all' | 'ia' | 'tecnologia' | 'personalizacao' | 'seguranca';

type FaqItem = {
  question: string;
  answer: string;
  category: FaqCategory;
  icon: React.ReactNode;
};

const faqs: FaqItem[] = [
  {
    question: 'Como a Lina funciona? É realmente inteligente?',
    answer:
      'A Lina é nossa assistente nutricional baseada em inteligência artificial avançada, treinada especificamente para nutrição. Ela analisa suas fotos de refeições usando visão computacional, identifica ingredientes, calcula macronutrientes e oferece orientações personalizadas baseadas em seus objetivos e perfil nutricional.',
    category: 'ia',
    icon: <SmartToy />,
  },
  {
    question: 'Quão precisa é a análise de imagens?',
    answer:
      'Nossa tecnologia de visão computacional tem 95% de precisão na identificação de alimentos e 90% na estimativa de porções. Usamos algoritmos de machine learning treinados com milhares de imagens de refeições brasileiras para garantir resultados mais precisos.',
    category: 'tecnologia',
    icon: <PhotoCamera />,
  },
  {
    question: 'O e-book de marmitas está incluído?',
    answer:
      'Sim! O "Guia Prático de Marmitas Saudáveis" vem incluso em todos os planos. São mais de 50 páginas com receitas balanceadas, listas de compras inteligentes, técnicas de conservação e dicas de economia. É seu para sempre, mesmo se cancelar.',
    category: 'conteudo',
    icon: <Help />,
  },
  {
    question: 'Como personalizo meus objetivos?',
    answer:
      'No painel de configurações, você define seu objetivo (perda de peso, ganho de massa magra ou manutenção), informa dados biométricos (idade, altura, peso, sexo) e nível de atividade física. A Lina ajusta automaticamente suas recomendações e metas de macronutrientes.',
    category: 'personalizacao',
    icon: <Settings />,
  },
  {
    question: 'Como acompanho meu progresso?',
    answer:
      'Seu dashboard mostra gráficos de evolução de peso, consumo de calorias e macronutrientes ao longo do tempo. Você pode filtrar por período, visualizar tendências e receber insights automáticos sobre seus hábitos alimentares.',
    category: 'progresso',
    icon: <Timeline />,
  },
  {
    question: 'Meus dados estão seguros?',
    answer:
      'Absolutamente! Usamos criptografia SSL/TLS para todas as transferências e armazenamos dados em servidores seguros com backup automático. Nunca compartilhamos informações pessoais e você pode excluir sua conta a qualquer momento.',
    category: 'seguranca',
    icon: <Security />,
  },
  {
    question: 'Posso cancelar a qualquer momento?',
    answer:
      'Sim! Oferecemos garantia incondicional de 7 dias. Após esse período, você pode cancelar a qualquer momento sem multas ou taxas. O acesso permanece ativo até o final do período pago.',
    category: 'pagamento',
    icon: <Payment />,
  },
  {
    question: 'Vocês oferecem suporte?',
    answer:
      'Temos suporte completo! Tutoriais interativos dentro da plataforma, base de conhecimento detalhada e suporte via email. Nosso objetivo é garantir que você aproveite ao máximo todas as funcionalidades do NutriFlow.',
    category: 'suporte',
    icon: <Support />,
  },
  {
    question: 'Funciona no celular?',
    answer:
      'Perfeitamente! O NutriFlow é 100% responsivo e otimizado para celulares. Você pode fotografar, analisar refeições e conversar com a Lina diretamente pelo navegador do seu smartphone, sem precisar baixar apps.',
    category: 'tecnologia',
    icon: <PhotoCamera />,
  },
  {
    question: 'Funciona com comida brasileira?',
    answer:
      'Claro! Nossa IA foi treinada especialmente com a culinária brasileira. Reconhece pratos típicos como feijoada, prato feito, tapioca, açaí, pastéis e muito mais. Temos o banco nutricional mais completo do Brasil.',
    category: 'ia',
    icon: <SmartToy />,
  },
];

const categories: Array<{ key: CategoryKey; label: string; color: Exclude<ChipColor, 'default'> }> = [
  { key: 'all', label: 'Todas', color: 'primary' },
  { key: 'ia', label: 'IA & Lina', color: 'success' },
  { key: 'tecnologia', label: 'Tecnologia', color: 'info' },
  { key: 'personalizacao', label: 'Personalização', color: 'warning' },
  { key: 'seguranca', label: 'Segurança', color: 'error' },
];

export default function FAQ() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('all');
  const [expanded, setExpanded] = useState<string | false>(false);
  const [showFilters, setShowFilters] = useState(false);

  const filteredFaqs =
    selectedCategory === 'all'
      ? faqs
      : faqs.filter((faq) => faq.category === selectedCategory);

  const handleAccordionChange =
    (panel: string) =>
    (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleCategoryChange = (category: CategoryKey) => {
    setSelectedCategory(category);
    if (isMobile) {
      setShowFilters(false);
    }
  };

  return (
    <Box
      component="section"
      id="faq"
      sx={{
        py: { xs: 6, md: 8 },
        background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
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
            background: 'linear-gradient(45deg, #4CAF50, #2196F3)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: { xs: 1.5, md: 2 },
            lineHeight: 1.2,
          }}
        >
          Perguntas Frequentes
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
            fontSize: { xs: '1rem', md: '1.15rem' },
            lineHeight: 1.5,
          }}
        >
          Tire todas suas dúvidas sobre o NutriFlow e descubra como nossa
          plataforma pode transformar sua jornada nutricional
        </Typography>

        {/* Filtros Mobile/Desktop */}
        {isMobile ? (
          <Box sx={{ mb: 4, px: 2 }}>
            <Button
              onClick={() => setShowFilters(!showFilters)}
              startIcon={<FilterListIcon />}
              variant="outlined"
              fullWidth
              sx={{
                mb: 2,
                py: 1.5,
                borderRadius: 3,
                textTransform: 'none',
                fontWeight: 600,
                borderColor: alpha(theme.palette.primary.main, 0.3),
                '&:hover': {
                  borderColor: theme.palette.primary.main,
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                },
              }}
            >
              Filtrar por categoria ({selectedCategory === 'all' ? 'Todas' : categories.find(c => c.key === selectedCategory)?.label})
            </Button>

            <Collapse in={showFilters}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  p: 2,
                  bgcolor: alpha(theme.palette.background.paper, 0.8),
                  borderRadius: 3,
                  border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                }}
              >
                {categories.map((category) => (
                  <Chip
                    key={category.key}
                    label={category.label}
                    onClick={() => handleCategoryChange(category.key)}
                    color={selectedCategory === category.key ? category.color : 'default'}
                    variant={selectedCategory === category.key ? 'filled' : 'outlined'}
                    sx={{
                      justifyContent: 'flex-start',
                      fontWeight: selectedCategory === category.key ? 700 : 500,
                      py: 2,
                      fontSize: '0.9rem',
                      '&:hover': {
                        transform: 'translateX(4px)',
                      },
                      transition: 'all 0.2s ease',
                    }}
                  />
                ))}
              </Box>
            </Collapse>
          </Box>
        ) : (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: 1,
              mb: 4,
            }}
          >
            {categories.map((category) => (
              <Chip
                key={category.key}
                label={category.label}
                onClick={() => handleCategoryChange(category.key)}
                color={selectedCategory === category.key ? category.color : 'default'}
                variant={selectedCategory === category.key ? 'filled' : 'outlined'}
                sx={{
                  fontWeight: selectedCategory === category.key ? 700 : 500,
                  px: 2,
                  py: 0.5,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              />
            ))}
          </Box>
        )}

        <Typography
          variant="body2"
          align="center"
          color="text.secondary"
          sx={{ 
            mb: { xs: 3, md: 4 },
            fontSize: { xs: '0.85rem', md: '0.875rem' },
          }}
        >
          {filteredFaqs.length} pergunta{filteredFaqs.length !== 1 ? 's' : ''} encontrada{filteredFaqs.length !== 1 ? 's' : ''}
        </Typography>

        <Box sx={{ maxWidth: 900, mx: 'auto', px: { xs: 2, md: 0 } }}>
          <AnimatePresence mode="wait">
            {filteredFaqs.map((faq, idx) => (
              <motion.div
                key={`${selectedCategory}-${idx}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
              >
                <Accordion
                  expanded={expanded === `panel${idx}`}
                  onChange={handleAccordionChange(`panel${idx}`)}
                  sx={{
                    borderRadius: { xs: 2, md: 3 },
                    mb: 2,
                    border: '2px solid',
                    borderColor: expanded === `panel${idx}`
                      ? theme.palette.primary.main
                      : 'transparent',
                    boxShadow: expanded === `panel${idx}`
                      ? '0 8px 30px rgba(76, 175, 80, 0.2)'
                      : '0 2px 10px rgba(0,0,0,0.08)',
                    transition: 'all 0.3s ease',
                    '&:before': { display: 'none' },
                    '&:hover': !isMobile ? {
                      borderColor: alpha(theme.palette.primary.main, 0.6),
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 25px rgba(76, 175, 80, 0.15)',
                    } : {},
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <ExpandMoreIcon
                        sx={{
                          color: expanded === `panel${idx}`
                            ? theme.palette.primary.main
                            : 'inherit',
                          transition: 'color 0.3s ease',
                          fontSize: { xs: '1.5rem', md: '1.5rem' },
                        }}
                      />
                    }
                    sx={{
                      bgcolor: expanded === `panel${idx}`
                        ? alpha(theme.palette.primary.main, 0.1)
                        : alpha(theme.palette.background.paper, 0.8),
                      minHeight: { xs: 60, md: 70 },
                      px: { xs: 2, md: 3 },
                      '& .MuiAccordionSummary-content': {
                        my: { xs: 1.5, md: 2 },
                        alignItems: 'center',
                      },
                      transition: 'background-color 0.3s ease',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: { xs: 1.5, md: 2 },
                        width: '100%',
                      }}
                    >
                      <Box
                        sx={{
                          color: expanded === `panel${idx}`
                            ? theme.palette.primary.main
                            : theme.palette.text.secondary,
                          transition: 'color 0.3s ease',
                          fontSize: { xs: '1.2rem', md: '1.5rem' },
                          flexShrink: 0,
                        }}
                      >
                        {faq.icon}
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          fontSize: { xs: '0.95rem', md: '1.1rem' },
                          color: expanded === `panel${idx}`
                            ? theme.palette.primary.main
                            : theme.palette.text.primary,
                          transition: 'color 0.3s ease',
                          lineHeight: 1.3,
                        }}
                      >
                        {faq.question}
                      </Typography>
                    </Box>
                  </AccordionSummary>

                  <AccordionDetails 
                    sx={{ 
                      pt: 0, 
                      pb: { xs: 2.5, md: 3 }, 
                      px: { xs: 2, md: 3 } 
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        color: theme.palette.text.secondary,
                        lineHeight: 1.7,
                        fontSize: { xs: '0.9rem', md: '1rem' },
                        ml: { xs: 4, md: 5 },
                        pr: { xs: 1, md: 0 },
                      }}
                    >
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </motion.div>
            ))}
          </AnimatePresence>
        </Box>

        {/* Call to Action */}
        <Box
          sx={{
            mt: { xs: 6, md: 8 },
            mx: { xs: 2, md: 'auto' },
            p: { xs: 3, md: 4 },
            borderRadius: 3,
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.15)}, ${alpha(theme.palette.secondary.main, 0.15)})`,
            border: '2px solid',
            borderColor: alpha(theme.palette.primary.main, 0.3),
            textAlign: 'center',
            maxWidth: 600,
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{ 
              fontWeight: 700, 
              color: theme.palette.primary.main, 
              mb: 2,
              fontSize: { xs: '1.3rem', md: '1.5rem' },
            }}
          >
            Ainda tem dúvidas?
          </Typography>

          <Typography
            variant="body1"
            sx={{ 
              mb: 3, 
              lineHeight: 1.6, 
              color: theme.palette.text.primary,
              fontSize: { xs: '0.95rem', md: '1rem' },
            }}
          >
            Nossa equipe está pronta para ajudar! Entre em contato conosco e tire
            todas suas dúvidas sobre o NutriFlow.
          </Typography>

          <Button
            variant="contained"
            size="large"
            href="#pricing"
            sx={{
              py: { xs: 1.5, md: 1.5 },
              px: { xs: 3, md: 4 },
              fontSize: { xs: '1rem', md: '1.1rem' },
              fontWeight: 700,
              borderRadius: 3,
              background: 'linear-gradient(45deg, #4CAF50, #45a049)',
              boxShadow: '0 6px 20px rgba(76, 175, 80, 0.3)',
              textTransform: 'none',
              '&:hover': {
                background: 'linear-gradient(45deg, #45a049, #4CAF50)',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px rgba(76, 175, 80, 0.4)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Ver Planos e Preços
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
