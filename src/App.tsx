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

      {/* Ultra-smooth Viewport-Constrained Sakura Petals (Mobile Optimized) */}
      <SakuraPetals />

      {/* GPU-friendly Ambient Lighting */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[450px] ambient-glow-red pointer-events-none -z-10" />
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[450px] ambient-glow-bottom pointer-events-none -z-10" />
      <div className="hidden md:block fixed top-1/2 left-0 -translate-y-1/2 w-[250px] h-[400px] bg-red-600/5 blur-[90px] pointer-events-none -z-10" />
      <div className="hidden md:block fixed top-1/2 right-0 -translate-y-1/2 w-[250px] h-[400px] bg-red-600/5 blur-[90px] pointer-events-none -z-10" />
      
      {/* Top Cyber Navigation Bar */}
      <Navbar 
        language={language} 
        onToggleLanguage={setLanguage} 
      />

      {/* Main Content Layout with lazy rendering for offscreen sections */}
      <main className="relative z-10 flex flex-col pt-6 sm:pt-12">
        {/* 1. Hero Section (Основное лого) */}
        <HeroSection language={language} />

        {/* 2. Owner & Co. Owner Discord Trackers (Создатели) */}
        <div className="content-auto-render">
          <OwnerTrackers language={language} />
        </div>

        {/* 3. FAQ / Q&A Islands (Часто задаваемые вопросы) */}
        <div className="content-auto-render">
          <FaqSection language={language} />
        </div>

        {/* 4. Discord Server Embed & Join (Дискорд сервер) */}
        <div className="content-auto-render">
          <DiscordServerCard language={language} />
        </div>

        {/* 5. Pricing & Access Section (Получить доступ) */}
        <div className="content-auto-render">
          <PricingSection language={language} />
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-10 text-center border-t border-red-500/15 text-xs text-zinc-500 font-rajdhani tracking-wider">
        <div className="max-w-4xl mx-auto px-4 flex flex-col items-center gap-3">
          <p className="flex items-center justify-center gap-2">
            <span className="text-zinc-400 font-semibold">The Revenge</span>
            <span className="text-red-500">•</span>
            <span>Strong FTAP Script</span>
            <span className="text-red-500">•</span>
            <span>2026</span>
          </p>
        </div>
      </footer>

      {/* Private Download Button: Only in dev preview */}
      <DevOnlyDownloadButton />
    </div>
  );
}
