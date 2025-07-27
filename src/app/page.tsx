// src/app/page.tsx
'use client';

import React from 'react';
import { Container, Box } from '@mui/material';

import Header from '../components/landing/Header';
import Hero from '../components/landing/Hero';
import Countdown from '../components/landing/Countdown';
import TrustBadges from '../components/landing/TrustBadges';
import Demo from '../components/landing/Demo';
import Features from '../components/landing/Features';
import Testimonials from '../components/landing/Testimonials';
import PricingTeaser from '../components/landing/PricingTeaser';
import FAQ from '../components/landing/FAQ';
import Footer from '../components/landing/Footer';

export default function HomePage() {
  return (
    <>
      <Header />
      <Container maxWidth="lg" disableGutters>
        <Box component="main" sx={{ bgcolor: 'background.default', color: 'text.primary' }}>
          <Box id="hero"><Hero /></Box>
          <Countdown />
          <TrustBadges />
          <Demo />
          <Box id="features"><Features /></Box>
          <Box id="testimonials"><Testimonials /></Box>
          <Box id="pricing"><PricingTeaser /></Box>
          <Box id="faq"><FAQ /></Box>
        </Box>
        <Footer />
      </Container>
    </>
  );
}
