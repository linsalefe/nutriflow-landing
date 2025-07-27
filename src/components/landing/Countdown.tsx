'use client';
import React, { useEffect, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';

export default function Countdown() {
  const theme = useTheme();
  const target = new Date();
  target.setHours(target.getHours()+24); // 24h de urgência
  const [diff, setDiff] = useState<number>(target.getTime() - Date.now());

  useEffect(() => {
    const iv = setInterval(() => {
      setDiff(Math.max(0, target.getTime() - Date.now()));
    }, 1000);
    return () => clearInterval(iv);
  }, []);

  const hrs = Math.floor(diff/3600000);
  const mins = Math.floor((diff%3600000)/60000);
  const secs = Math.floor((diff%60000)/1000);

  return (
    <Box sx={{ textAlign:'center', py:2 }}>
      <Typography variant="h6" sx={{ color: theme.palette.error.main }}>
        Oferta termina em {hrs}h {mins}m {secs}s!
      </Typography>
    </Box>
  );
}
