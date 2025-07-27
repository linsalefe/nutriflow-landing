// src/components/landing/FAQ.tsx
'use client';

import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqs = [
  {
    q: 'Como funciona a análise por foto?',
    a: 'Você envia uma foto e nossa IA retorna calorias e macros detalhados.',
  },
  {
    q: 'Qual o limite do plano grátis?',
    a: 'Até X análises por mês no plano gratuito.',
  },
];

export default function FAQ() {
  return (
    <Box sx={{ py: 8, px: 2, backgroundColor: 'background.paper' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Perguntas Frequentes
      </Typography>
      {faqs.map((f) => (
        <Accordion key={f.q}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1">{f.q}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">{f.a}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
