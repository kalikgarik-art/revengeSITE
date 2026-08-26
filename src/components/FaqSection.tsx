import React from 'react';
import { motion } from 'motion/react';
import { Zap, Cpu, RotateCw, MessageCircle, Sparkles, Compass, HelpCircle } from 'lucide-react';
import { Language } from '../types';

interface FaqSectionProps {
  language: Language;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ language }) => {
  const faqList = [
    {
      id: 'faq-why-us',
      icon: Zap,
      questionRu: 'Почему The Revenge?',
      questionEn: 'Why The Revenge?',
      answerRu: 'Потому что наш функционал не стоит на месте и постоянно развивается в лучшую сторону.',
      answerEn: 'Because our functionality never stands still and is constantly evolving for the best experience.',
    },
    {
      id: 'faq-fps-optimization',
      icon: Cpu,
      questionRu: 'Фризит ли игра с вашим скриптом?',
      questionEn: 'Does the game freeze with your script?',
      answerRu: 'Нет, скрипт полностью оптимизирован и пролагов быть не должно.',
      answerEn: 'No, the script is thoroughly optimized so there will be no lag or performance drops.',
    },
    {
      id: 'faq-updates',
      icon: RotateCw,
      questionRu: 'Часто ли выходят обновления?',
      questionEn: 'Do updates release often?',
      answerRu: 'Мы стараемся делать обновления как можно быстрее — с новыми функциями, фиксами багов и улучшениями.',
      answerEn: 'We release updates promptly with new features, bug fixes, and continuous improvements.',
    },
    {
      id: 'faq-support',
      icon: MessageCircle,
      questionRu: 'Есть ли у вас поддержка чтобы можно было задавать вопросы?',
      questionEn: 'Do you have support to ask questions?',
      answerRu: 'Да, поддержка работает 24/7 в нашем дискорд сервере.',
      answerEn: 'Yes, our dedicated support operates 24/7 in our Discord server.',
    },
    {
      id: 'faq-features-bugs',
      icon: Sparkles,
      questionRu: 'Могу ли я лично попросить вас добавить функцию в скрипт, или пожаловаться на баг?',
      questionEn: 'Can I personally request a feature or report a bug?',
      answerRu: 'Да, все так же в нашем дискорд сервере все это предусмотрено.',
      answerEn: 'Yes, our Discord server has dedicated channels specifically for this.',
    },
    {
      id: 'faq-community',
      icon: Compass,
      questionRu: 'Где вас найти?',
      questionEn: 'Where can you find us?',
      answerRu: 'В нашем официальном Discord сервере — пролистайте ниже, чтобы присоединиться.',
      answerEn: 'In our official Discord server — scroll down below to join our community.',
    },
  ];

  return (
    <section id="faq-section" className="relative py-20 px-4 max-w-6xl mx-auto">
      {/* Background Ambient Crimson Spotlight */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[450px] pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(220, 20, 30, 0.14) 0%, rgba(0, 0, 0, 0) 70%)',
        }}
      />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-center mb-12 sm:mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/60 border border-red-500/40 text-red-400 text-xs font-jakarta font-semibold uppercase tracking-widest mb-3 shadow-[0_0_15px_rgba(255,20,20,0.2)]">
          <HelpCircle className="w-3.5 h-3.5 text-red-400" />
          <span>{language === 'ru' ? 'Вопрос — Ответ' : 'FAQ / Information'}</span>
        </div>
        <h2 className="font-orbitron text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-wider text-white neon-text-red">
          {language === 'ru' ? 'Часто задаваемые вопросы' : 'Frequently Asked Questions'}
        </h2>
      </motion.div>

      {/* Unique Red Cyber Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {faqList.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.id}
              id={item.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: idx * 0.07, ease: 'easeOut' }}
              className="group relative rounded-[24px] bg-gradient-to-b from-[#130709]/95 via-[#0d070a]/90 to-[#08070a]/95 border border-red-500/25 hover:border-red-500/70 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(255,20,20,0.06)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.9),0_0_30px_rgba(255,30,30,0.25)] hover:-translate-y-1 overflow-hidden"
            >
              {/* Inner glowing top-border highlight */}
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent group-hover:via-red-500 transition-all duration-500" />

              <div>
                {/* Header: Red Neon Icon Box & Step Number */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-red-950/50 border border-red-500/40 flex items-center justify-center text-red-400 group-hover:text-red-300 group-hover:border-red-500/80 group-hover:bg-red-900/50 group-hover:shadow-[0_0_18px_rgba(255,30,30,0.45)] transition-all duration-300">
                    <Icon className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <span className="font-orbitron font-bold text-xs text-red-500/40 group-hover:text-red-400/80 transition-colors tracking-widest">
                    #{String(idx + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Question Title */}
                <h3 className="font-jakarta font-bold text-lg sm:text-[19px] text-white tracking-tight leading-snug mb-3 group-hover:text-red-100 transition-colors">
                  {language === 'ru' ? item.questionRu : item.questionEn}
                </h3>

                {/* Red Subtle Divider */}
                <div className="h-[1px] w-full bg-gradient-to-r from-red-500/30 via-red-500/10 to-transparent mb-3.5 group-hover:from-red-500/50 transition-colors" />

                {/* Answer Content */}
                <p className="text-zinc-300 text-sm leading-relaxed font-normal">
                  {language === 'ru' ? item.answerRu : item.answerEn}
                </p>
              </div>

              {/* Bottom Subtle Status Accent */}
              <div className="mt-5 pt-3 flex items-center gap-2 text-[11px] font-jakarta text-zinc-500 group-hover:text-red-400/80 transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500/50 group-hover:bg-red-400 group-hover:shadow-[0_0_8px_#ff0000] transition-all" />
                <span className="font-medium tracking-wide">{language === 'ru' ? 'The Revenge Hub' : 'The Revenge Hub'}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};


