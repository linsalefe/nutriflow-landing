// src/app/page.tsx
'use client';

import { Container, Box } from '@mui/material';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import Testimonials from '../components/landing/Testimonials';
import PricingTeaser from '../components/landing/PricingTeaser';
import FAQ from '../components/landing/FAQ';
import Footer from '../components/landing/Footer';

export default function HomePage() {
  return (
    <Container maxWidth="lg" disableGutters>
      <Box component="main" sx={{ bgcolor: 'background.default', color: 'text.primary' }}>
        <Hero />
        <Features />
        <Testimonials />
        <PricingTeaser />
        <FAQ />
      </Box>
      <Footer />
    </Container>
  );
}
