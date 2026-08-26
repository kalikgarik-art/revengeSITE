import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ShoppingCart } from 'lucide-react';
import { Language } from '../types';

interface HeroSectionProps {
  language: Language;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ language }) => {
  const fullText = 'My revenge has just begun. | FTAP';
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const typingSpeed = isDeleting ? 35 : 75;
    const pauseDelay = 3500;

    let timeout: NodeJS.Timeout;

    if (!isDeleting && index < fullText.length) {
      timeout = setTimeout(() => {
        setDisplayedText(fullText.slice(0, index + 1));
        setIndex(prev => prev + 1);
      }, typingSpeed);
    } else if (!isDeleting && index === fullText.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, pauseDelay);
    } else if (isDeleting && index > 0) {
      timeout = setTimeout(() => {
        setDisplayedText(fullText.slice(0, index - 1));
        setIndex(prev => prev - 1);
      }, typingSpeed);
    } else if (isDeleting && index === 0) {
      setIsDeleting(false);
    }

    return () => clearTimeout(timeout);
  }, [index, isDeleting, fullText]);

  const scrollToPricing = () => {
    const el = document.getElementById('pricing-section');
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero-section" 
      className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden pt-24 pb-16"
    >
      {/* Smooth Ambient Neon Backlight */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[450px] pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(220, 20, 30, 0.18) 0%, rgba(220, 20, 30, 0.05) 45%, rgba(0, 0, 0, 0) 75%)',
        }}
      />

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="max-w-4xl mx-auto flex flex-col items-center justify-center space-y-6"
      >
        {/* Big Red Neon Title */}
        <div className="relative select-none py-2 inline-flex items-center justify-center">
          <h1
            id="main-title"
            className="font-orbitron font-extrabold tracking-widest text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase leading-tight neon-text-red"
          >
            The Revenge
          </h1>
        </div>

        {/* Small White Neon Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
          className="relative px-4"
        >
          <p
            id="main-subtitle"
            className="font-rajdhani font-semibold text-base sm:text-lg md:text-xl lg:text-2xl tracking-wider uppercase text-zinc-100 neon-text-white"
          >
            Strong FTAP script with rich functionality
          </p>
        </motion.div>

        {/* Typewriter Grey Quote */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
          className="inline-flex items-center justify-center min-h-[28px] px-3 py-1 rounded-md bg-white/[0.02] border border-white/[0.05]"
        >
          <span
            id="typewriter-quote"
            className="font-mono text-xs sm:text-sm md:text-base text-zinc-400 tracking-wide select-none"
          >
            {displayedText}
            <span className="inline-block w-2 h-4 ml-1 align-middle bg-zinc-400 animate-pulse" />
          </span>
        </motion.div>

        {/* Action Button: Get Access */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
          className="flex items-center justify-center pt-4"
        >
          <button
            id="hero-get-access-btn"
            onClick={scrollToPricing}
            className="btn-crimson-flow flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-white font-jakarta font-bold text-sm tracking-wide shadow-[0_0_25px_rgba(255,0,0,0.4)] hover:shadow-[0_0_35px_rgba(255,0,0,0.6)] transition-all duration-300 active:scale-95 cursor-pointer"
          >
            <ShoppingCart className="w-4 h-4 text-white" />
            <span>{language === 'ru' ? 'Получить доступ' : 'Get Access'}</span>
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};
