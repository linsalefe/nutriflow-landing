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
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { motion } from 'framer-motion';

const faqs = [
  {
    id: 'faq1',
    question: 'Como funciona a análise por foto?',
    answer:
      'Você envia uma foto e nossa IA retorna calorias e macros detalhados em segundos, sem precisar de cadastro adicional.',
  },
  {
    id: 'faq2',
    question: 'Qual o limite de uso?',
    answer:
      'Planos pagos oferecem uso ilimitado de análises de fotos, histórico completo e recomendações personalizadas.',
  },
  {
    id: 'faq3',
    question: 'Posso cancelar a qualquer momento?',
    answer:
      'Sim! Sem fidelidade: cancele sua assinatura pelo painel de usuário sempre que quiser, sem taxas extras.',
  },
];

export default function FAQ() {
  const theme = useTheme();
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Box
      component="section"
      sx={{
        py: 8,
        px: 2,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Perguntas Frequentes
      </Typography>

      {faqs.map((f, i) => (
        <motion.div
          key={f.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
        >
          <Accordion
            expanded={expanded === f.id}
            onChange={handleChange(f.id)}
            sx={{
              boxShadow: 'none',
              borderBottom: `1px solid ${theme.palette.divider}`,
            }}
            disableGutters
          >
            <AccordionSummary
              expandIcon={
                expanded === f.id ? (
                  <RemoveIcon color="primary" />
                ) : (
                  <AddIcon color="primary" />
                )
              }
              aria-controls={`${f.id}-content`}
              id={`${f.id}-header`}
              sx={{
                px: 0,
                '& .MuiAccordionSummary-content': { margin: 0 },
              }}
            >
              <Typography variant="h6">{f.question}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 0, pt: 1 }}>
              <Typography variant="body2">{f.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        </motion.div>
      ))}
    </Box>
  );
}
