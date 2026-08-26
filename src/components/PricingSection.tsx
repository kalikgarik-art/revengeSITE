import React from 'react';
import { motion } from 'motion/react';
import { Check, Sparkles, Zap, Shield, MessageSquare, ArrowRight } from 'lucide-react';
import { Language } from '../types';

interface PricingSectionProps {
  language: Language;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ language }) => {
  const discordInviteUrl = 'https://discord.gg/98s29q7vms';

  const features = [
    {
      ru: 'Полный доступ ко всем функциям скрипта',
      en: 'Full access to all script features',
    },
    {
      ru: 'Регулярные и оперативные обновления',
      en: 'Regular and prompt script updates',
    },
    {
      ru: 'Круглосуточная поддержка 24/7 в Discord',
      en: '24/7 dedicated Discord support',
    },
    {
      ru: 'Быстрая выдача и помощь с настройкой',
      en: 'Fast delivery & setup assistance',
    },
  ];

  return (
    <section id="pricing-section" className="relative py-20 px-4 max-w-2xl mx-auto flex flex-col items-center">
      {/* Background ambient red spotlight */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-[480px] pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(230, 25, 35, 0.16) 0%, rgba(0, 0, 0, 0) 70%)',
        }}
      />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/60 border border-red-500/40 text-red-400 text-xs font-jakarta font-semibold uppercase tracking-widest mb-3 shadow-[0_0_15px_rgba(255,20,20,0.2)]">
          <Zap className="w-3.5 h-3.5 text-red-400" />
          <span>{language === 'ru' ? 'Тариф и приобретение' : 'Pricing & Access'}</span>
        </div>

        <h2 className="font-jakarta text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2.5">
          {language === 'ru' ? 'Получить доступ' : 'Get Access'}
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base font-normal max-w-md mx-auto">
          {language === 'ru'
            ? 'Быстрое и безопасное получение через наш официальный Discord'
            : 'Fast and secure acquisition via our official Discord community'}
        </p>
      </motion.div>

      {/* Main Pricing Island Card */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
        className="w-full max-w-md rounded-[28px] bg-gradient-to-b from-[#14080b]/95 via-[#0e070a]/95 to-[#080709]/98 border border-red-500/35 hover:border-red-500/60 p-7 sm:p-9 flex flex-col justify-between transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_35px_rgba(255,20,20,0.14)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_45px_rgba(255,20,20,0.28)] relative group overflow-hidden"
      >
        {/* Top glowing crimson edge */}
        <div className="absolute top-0 left-10 right-10 h-[1.5px] bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_12px_#ff0000]" />

        <div>
          {/* Card Plan Title */}
          <div className="text-center mb-6">
            <h3 className="font-jakarta font-extrabold text-xl sm:text-2xl text-white tracking-tight mb-2">
              The Revenge Premium
            </h3>

            {/* Price Badge */}
            <div className="my-4 flex items-center justify-center gap-1.5">
              <span className="font-jakarta font-black text-4xl sm:text-5xl text-white tracking-tight drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                {language === 'ru' ? 'от 550₽' : 'from $5.5'}
              </span>
            </div>

            {/* Short subtitle */}
            <p className="text-zinc-400 text-xs sm:text-sm font-normal">
              {language === 'ru'
                ? 'Полный доступ к эксплойту + обновления + поддержка'
                : 'Full exploit access + all updates + 24/7 support'}
            </p>
          </div>

          {/* Divider */}
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-red-500/30 to-transparent my-6" />

          {/* Features List */}
          <ul className="space-y-3.5 mb-8">
            {features.map((feat, idx) => (
              <li key={idx} className="flex items-center gap-3 text-zinc-200 text-sm font-jakarta">
                <div className="w-5 h-5 rounded-full bg-red-950/70 border border-red-500/50 flex items-center justify-center text-red-400 flex-shrink-0 shadow-[0_0_10px_rgba(255,20,20,0.3)]">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <span>{language === 'ru' ? feat.ru : feat.en}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Call to Action Button */}
        <div className="w-full">
          <a
            id="pricing-discord-btn"
            href={discordInviteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-crimson-flow group/btn relative w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl text-white font-jakarta font-bold text-sm sm:text-base tracking-wide transition-all duration-300 transform active:scale-98 cursor-pointer"
          >
            {/* Discord SVG */}
            <svg className="w-5 h-5 fill-current group-hover/btn:scale-110 transition-transform duration-300" viewBox="0 0 24 24">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
            <span>{language === 'ru' ? 'Перейти в Discord' : 'Join Discord to Buy'}</span>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </a>
        </div>
      </motion.div>
    </section>
  );
};
