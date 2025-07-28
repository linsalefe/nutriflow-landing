// src/components/landing/ChatbotAI.tsx
'use client';

import React, { useState, useRef } from 'react';
import {
  Box,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  IconButton,
  Typography,
  Button,
  Avatar,
  useTheme,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';

// Perguntas de atalho
const SHORTCUTS = [
  'O que é o NutriFlow?',
  'Planos e preços',
  'Como faço para cancelar?',
];

export default function ChatbotAI() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState<{ role: string; content: string }[]>([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const send = async (msg?: string) => {
    const content = msg ?? message;
    if (!content.trim()) return;
    setLoading(true);
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: content, history }),
    });
    const { reply, history: newHist } = await res.json();
    setHistory(newHist);
    setMessage('');
    setLoading(false);
    inputRef.current?.focus();
  };

  return (
    <>
      {/* Avatar + Nome acima do botão */}
      <Box
        onClick={() => setOpen(true)}
        sx={{
          position: 'fixed',
          bottom: 88,
          right: 24,
          display: 'flex',
          alignItems: 'center',
          bgcolor: theme.palette.background.paper,
          px: 1,
          py: 0.5,
          borderRadius: 8,
          boxShadow: 3,
          cursor: 'pointer',
          zIndex: 1300,
        }}
      >
        <Avatar
          src="/avatar-lina.png"
          alt="Lina"
          sx={{ width: 32, height: 32, mr: 1 }}
        />
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 600, color: theme.palette.text.primary }}
        >
          Fale com Lina
        </Typography>
      </Box>

      <Fab
        color="primary"
        onClick={() => setOpen(true)}
        sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1300 }}
      >
        <ChatIcon />
      </Fab>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle sx={{ m: 0, p: 2 }}>
          Chat de Suporte
          <IconButton
            aria-label="fechar"
            onClick={() => setOpen(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Atalhos */}
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {SHORTCUTS.map((qt) => (
              <Button
                key={qt}
                size="small"
                onClick={() => send(qt)}
                sx={{ textTransform: 'none' }}
              >
                {qt}
              </Button>
            ))}
          </Box>

          {/* Histórico de mensagens (sem system) */}
          {history
            .filter((m) => m.role !== 'system')
            .map((m, i) => {
              const isUser = m.role === 'user';
              return (
                <Box
                  key={i}
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: isUser ? 'flex-end' : 'flex-start',
                    gap: 1,
                  }}
                >
                  {/* Avatar só para Lina */}
                  {!isUser && (
                    <Avatar
                      src="/avatar-lina.png"
                      alt="Lina"
                      sx={{ width: 28, height: 28 }}
                    />
                  )}

                  <Box
                    sx={{
                      maxWidth: '80%',
                      bgcolor: isUser
                        ? theme.palette.primary.main
                        : theme.palette.background.paper,
                      color: isUser
                        ? theme.palette.primary.contrastText
                        : theme.palette.text.primary,
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      wordBreak: 'break-word',
                    }}
                  >
                    <Typography variant="body2">{m.content}</Typography>
                  </Box>

                  {/* Espaço reservado quando for usuário */}
                  {isUser && <Box sx={{ width: 28, height: 28 }} />}
                </Box>
              );
            })}

          {/* Input */}
          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
            <TextField
              fullWidth
              placeholder="Digite sua dúvida..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              inputRef={inputRef}
            />
            <IconButton color="primary" disabled={loading} onClick={() => send()}>
              <SendIcon />
            </IconButton>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
