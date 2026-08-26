/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Language } from './types';
import { Navbar } from './components/Navbar';
import { SecurityGate } from './components/SecurityGate';
import { HeroSection } from './components/HeroSection';
import { OwnerTrackers } from './components/OwnerTrackers';
import { FaqSection } from './components/FaqSection';
import { DiscordServerCard } from './components/DiscordServerCard';
import { PricingSection } from './components/PricingSection';
import { SakuraPetals } from './components/SakuraPetals';
import { DevOnlyDownloadButton } from './components/DevOnlyDownloadButton';

export default function App() {
  const [language, setLanguage] = useState<Language>('ru');
  const [isVerified, setIsVerified] = useState<boolean>(false);

  return (
    <div className="relative min-h-screen bg-radial-page text-zinc-100 ambient-grid overflow-x-hidden selection:bg-red-600 selection:text-white">
      {/* Anti-Bot / Robot Security Gate Verification */}
      <AnimatePresence>
        {!isVerified && (
          <SecurityGate 
            language={language} 
            onVerified={() => setIsVerified(true)} 
          />
        )}
      </AnimatePresence>

      {/* Falling Red Sakura Petals */}
      <SakuraPetals />

      {/* Atmospheric Ambient Red Gradients & Lighting */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] ambient-glow-red pointer-events-none -z-10" />
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[650px] ambient-glow-bottom pointer-events-none -z-10" />
      <div className="fixed top-1/2 left-0 -translate-y-1/2 w-[350px] h-[500px] bg-red-600/5 blur-[120px] pointer-events-none -z-10" />
      <div className="fixed top-1/2 right-0 -translate-y-1/2 w-[350px] h-[500px] bg-red-600/5 blur-[120px] pointer-events-none -z-10" />
      
      {/* Top Cyber Navigation Bar */}
      <Navbar 
        language={language} 
        onToggleLanguage={setLanguage} 
      />

      {/* Main Content Layout */}
      <main className="relative z-10 flex flex-col pt-8 sm:pt-12">
        {/* 1. Hero Section (Основное лого) */}
        <HeroSection language={language} />

        {/* 2. Owner & Co. Owner Discord Trackers (Создатели) */}
        <OwnerTrackers language={language} />

        {/* 3. FAQ / Q&A Islands (Часто задаваемые вопросы) */}
        <FaqSection language={language} />

        {/* 4. Discord Server Embed & Join (Дискорд сервер) */}
        <DiscordServerCard language={language} />

        {/* 5. Pricing & Access Section (Получить доступ) */}
        <PricingSection language={language} />
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-12 text-center border-t border-red-500/15 text-xs text-zinc-500 font-rajdhani tracking-wider">
        <div className="max-w-4xl mx-auto px-4 flex flex-col items-center gap-4">
          <p className="flex items-center justify-center gap-2">
            <span className="text-zinc-400 font-semibold">The Revenge</span>
            <span className="text-red-500">•</span>
            <span>Strong FTAP Script</span>
            <span className="text-red-500">•</span>
            <span>2026</span>
          </p>
        </div>
      </footer>

      {/* Private Download Button: Only rendered in AI Studio preview / localhost, completely hidden on file:/// and production */}
      <DevOnlyDownloadButton />
    </div>
  );
}
