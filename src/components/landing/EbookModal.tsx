// src/components/landing/EbookModal.tsx
'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Typography,
  Box,
  useTheme,
} from '@mui/material';

export default function EbookModal() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');

  const handleSend = () => {
    // TODO: integrar com seu backend de envio de e-book
    setOpen(false);
    // opcional: mostrar snackbar de confirmação
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={() => setOpen(true)}
        sx={{ borderRadius: 2, textTransform: 'none', mt: 2 }}
      >
        Baixar E-book Grátis
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Baixe seu E-book de Receitas</DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 2 }}>
            Insira seu e-mail para receber imediatamente o PDF com receitas saudáveis:
          </Typography>
          <TextField
            autoFocus
            fullWidth
            label="E-mail"
            type="email"
            variant="outlined"
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button
            onClick={handleSend}
            variant="contained"
            sx={{ textTransform: 'none', borderRadius: 2 }}
          >
            Enviar PDF
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
