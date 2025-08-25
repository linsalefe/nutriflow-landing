// src/components/landing/FAQ.tsx
'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
  Chip,
  Button,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
import { motion } from 'framer-motion';

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
    question: '🤖 Como a Lina funciona? É realmente inteligente?',
    answer:
      'A Lina é nossa assistente nutricional baseada em IA GPT-4, treinada especificamente para nutrição. Ela analisa suas fotos de refeições usando visão computacional avançada, identifica ingredientes, calcula macronutrientes e oferece orientações personalizadas baseadas em seus objetivos e perfil nutricional.',
    category: 'ia',
    icon: <SmartToy />,
  },
  {
    question: '📸 Quão precisa é a análise de imagens?',
    answer:
      'Nossa tecnologia de visão computacional tem 95% de precisão na identificação de alimentos e 90% na estimativa de porções. Usamos algoritmos de machine learning treinados com milhares de imagens de refeições brasileiras para garantir resultados mais precisos.',
    category: 'tecnologia',
    icon: <PhotoCamera />,
  },
  {
    question: '📚 O e-book de marmitas está incluído?',
    answer:
      'Sim! O "Guia Prático de Marmitas Saudáveis" vem incluso em todos os planos. São mais de 50 páginas com receitas balanceadas, listas de compras inteligentes, técnicas de conservação e dicas de economia. É seu para sempre, mesmo se cancelar.',
    category: 'conteudo',
    icon: <Help />,
  },
  {
    question: '⚙️ Como personalizo meus objetivos?',
    answer:
      'No painel de configurações, você define seu objetivo (perda de peso, ganho de massa magra ou manutenção), informa dados biométricos (idade, altura, peso, sexo) e nível de atividade física. A Lina ajusta automaticamente suas recomendações e metas de macronutrientes.',
    category: 'personalizacao',
    icon: <Settings />,
  },
  {
    question: '📊 Como acompanho meu progresso?',
    answer:
      'Seu dashboard mostra gráficos de evolução de peso, consumo de calorias e macronutrientes ao longo do tempo. Você pode filtrar por período, visualizar tendências e receber insights automáticos sobre seus hábitos alimentares.',
    category: 'progresso',
    icon: <Timeline />,
  },
  {
    question: '🔒 Meus dados estão seguros?',
    answer:
      'Absolutamente! Usamos criptografia SSL/TLS para todas as transferências e armazenamos dados em servidores seguros com backup automático. Nunca compartilhamos informações pessoais e você pode excluir sua conta a qualquer momento.',
    category: 'seguranca',
    icon: <Security />,
  },
  {
    question: '💳 Posso cancelar a qualquer momento?',
    answer:
      'Sim! Oferecemos garantia incondicional de 7 dias. Após esse período, você pode cancelar a qualquer momento sem multas ou taxas. O acesso permanece ativo até o final do período pago.',
    category: 'pagamento',
    icon: <Payment />,
  },
  {
    question: '🎓 Vocês oferecem suporte?',
    answer:
      'Temos suporte completo! Tutoriais interativos dentro da plataforma, base de conhecimento detalhada e suporte via email. Nosso objetivo é garantir que você aproveite ao máximo todas as funcionalidades do NutriFlow.',
    category: 'suporte',
    icon: <Support />,
  },
  {
    question: '📱 Funciona no celular?',
    answer:
      'Perfeitamente! O NutriFlow é 100% responsivo e otimizado para celulares. Você pode fotografar, analisar refeições e conversar com a Lina diretamente pelo navegador do seu smartphone, sem precisar baixar apps.',
    category: 'tecnologia',
    icon: <PhotoCamera />,
  },
  {
    question: '🍽️ Funciona com comida brasileira?',
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
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('all');
  const [expanded, setExpanded] = useState<string | false>(false);

  const filteredFaqs =
    selectedCategory === 'all'
      ? faqs
      : faqs.filter((faq) => faq.category === selectedCategory);

  const handleAccordionChange =
    (panel: string) =>
    (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Box
      component="section"
      id="faq"
      sx={{
        py: 8,
        px: 2,
        background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.primary.main}05 100%)`,
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
        ❓ Perguntas Frequentes
      </Typography>

      <Typography
        variant="h6"
        align="center"
        color="text.secondary"
        sx={{ mb: 6, maxWidth: '700px', mx: 'auto' }}
      >
        Tire todas suas dúvidas sobre o NutriFlow e descubra como nossa
        plataforma pode transformar sua jornada nutricional
      </Typography>

      {/* Filtros por categoria */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 1,
          mb: 4,
        }}
      >
        {categories.map((category) => {
          const chipColor: ChipColor =
            selectedCategory === category.key ? category.color : 'default';
          return (
            <Chip
              key={category.key}
              label={category.label}
              onClick={() => setSelectedCategory(category.key)}
              color={chipColor}
              variant={selectedCategory === category.key ? 'filled' : 'outlined'}
              sx={{
                fontWeight:
                  selectedCategory === category.key ? 'bold' : 'normal',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            />
          );
        })}
      </Box>

      {/* Contador de resultados */}
      <Typography
        variant="body2"
        align="center"
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        {filteredFaqs.length} pergunta
        {filteredFaqs.length !== 1 ? 's' : ''} encontrada
        {filteredFaqs.length !== 1 ? 's' : ''}
      </Typography>

      {/* Acordeões */}
      <Box sx={{ maxWidth: 900, mx: 'auto' }}>
        {filteredFaqs.map((faq, idx) => (
          <motion.div
            key={`${selectedCategory}-${idx}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
          >
            <Accordion
              expanded={expanded === `panel${idx}`}
              onChange={handleAccordionChange(`panel${idx}`)}
              sx={{
                borderRadius: 3,
                mb: 2,
                border: '2px solid',
                borderColor:
                  expanded === `panel${idx}`
                    ? theme.palette.primary.main
                    : 'transparent',
                boxShadow:
                  expanded === `panel${idx}`
                    ? '0 8px 30px rgba(76, 175, 80, 0.2)'
                    : '0 2px 10px rgba(0,0,0,0.08)',
                transition: 'all 0.3s ease',
                '&:before': { display: 'none' },
                '&:hover': {
                  borderColor: `${theme.palette.primary.main}60`,
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 25px rgba(76, 175, 80, 0.15)',
                },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    sx={{
                      color:
                        expanded === `panel${idx}`
                          ? theme.palette.primary.main
                          : 'inherit',
                      transition: 'color 0.3s ease',
                    }}
                  />
                }
                sx={{
                  bgcolor:
                    expanded === `panel${idx}`
                      ? `${theme.palette.primary.main}10`
                      : alpha(theme.palette.background.paper, 0.8),
                  minHeight: 70,
                  '& .MuiAccordionSummary-content': {
                    my: 2,
                    alignItems: 'center',
                  },
                  transition: 'background-color 0.3s ease',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    width: '100%',
                  }}
                >
                  <Box
                    sx={{
                      color:
                        expanded === `panel${idx}`
                          ? theme.palette.primary.main
                          : theme.palette.text.secondary,
                      transition: 'color 0.3s ease',
                    }}
                    aria-hidden
                  >
                    {faq.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      fontSize: { xs: '1rem', sm: '1.1rem' },
                      color:
                        expanded === `panel${idx}`
                          ? theme.palette.primary.main
                          : theme.palette.text.primary,
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {faq.question}
                  </Typography>
                </Box>
              </AccordionSummary>

              <AccordionDetails sx={{ pt: 0, pb: 3, px: 3 }}>
                <Typography
                  variant="body1"
                  sx={{
                    color: theme.palette.text.secondary,
                    lineHeight: 1.7,
                    fontSize: '1rem',
                    ml: 5, // Alinha com o texto da pergunta
                  }}
                >
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </motion.div>
        ))}
      </Box>

      {/* Call to Action */}
      <Box
        sx={{
          mt: 8,
          p: 4,
          borderRadius: 3,
          background: `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.secondary.main}15)`,
          border: '2px solid',
          borderColor: `${theme.palette.primary.main}30`,
          textAlign: 'center',
          maxWidth: 600,
          mx: 'auto',
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: 'bold', color: theme.palette.primary.main, mb: 2 }}
        >
          💬 Ainda tem dúvidas?
        </Typography>

        <Typography
          variant="body1"
          sx={{ mb: 3, lineHeight: 1.6, color: theme.palette.text.primary }}
        >
          Nossa equipe está pronta para ajudar! Entre em contato conosco e tire
          todas suas dúvidas sobre o NutriFlow.
        </Typography>

        <Button
          variant="contained"
          size="large"
          href="https://pay.kiwify.com.br/SEyg6iA"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            py: 1.5,
            px: 4,
            fontSize: '1.1rem',
            fontWeight: 'bold',
            borderRadius: 3,
            background: 'linear-gradient(45deg, #4CAF50, #45a049)',
            boxShadow: '0 6px 20px rgba(76, 175, 80, 0.3)',
            '&:hover': {
              background: 'linear-gradient(45deg, #45a049, #4CAF50)',
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 25px rgba(76, 175, 80, 0.4)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          🚀 Experimente Grátis por 7 Dias
        </Button>
      </Box>
    </Box>
  );
}
