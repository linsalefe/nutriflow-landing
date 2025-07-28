// src/components/landing/FAQ.tsx
'use client';

import React from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { alpha } from '@mui/material/styles';

const faqs = [
  {
    question: 'Como o NutriFlow calcula calorias e macros?',
    answer:
      'Nosso algoritmo de visão computacional analisa a foto da refeição identificando ingredientes e quantidades, cruzando com nossa base nutricional para estimar calorias, proteínas, carboidratos e gorduras.',
  },
  {
    question: 'Preciso criar perfil e informar meus dados?',
    answer:
      'Sim! No cadastro inicial você informa peso, altura e objetivos (emagrecer, ganhar massa, manter peso) para que o NutriFlow personalize suas recomendações.',
  },
  {
    question: 'Como funciona o histórico de refeições?',
    answer:
      'Tudo que você fotografa fica salvo no seu dashboard. Você pode filtrar por data, macro ou refeição para revisar sua evolução ao longo do tempo.',
  },
  {
    question: 'Posso cancelar a qualquer momento?',
    answer:
      'Claro. Você tem garantia de 30 dias. Depois disso, pode cancelar a assinatura diretamente no painel de configurações, sem burocracia.',
  },
];

export default function FAQ() {
  const theme = useTheme();

  return (
    <Box
      component="section"
      id="faq"
      sx={{
        py: 8,
        px: 2,
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Perguntas Frequentes
      </Typography>

      <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
        {faqs.map((faq, idx) => (
          <Accordion
            key={idx}
            sx={{
              borderRadius: 2,
              mb: 2,
              '&:before': { display: 'none' },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                bgcolor: alpha(theme.palette.primary.main, 0.05),
                '& .MuiAccordionSummary-content': { m: 0 },
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 600, color: theme.palette.text.primary }}
              >
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary">
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
}
