import React from 'react';
import { motion } from 'motion/react';
import { Flame, ExternalLink, Calendar, ShieldCheck, Sparkles } from 'lucide-react';
import { Language } from '../types';

interface DiscordServerCardProps {
  language: Language;
}

export const DiscordServerCard: React.FC<DiscordServerCardProps> = ({ language }) => {
  const discordInviteUrl = 'https://discord.gg/98s29q7vms';

  return (
    <section id="discord-section" className="relative py-12 sm:py-20 px-4 max-w-xl mx-auto flex flex-col items-center">
      {/* Background ambient lighting behind Discord widget */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md h-80 sm:h-96 pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(240, 30, 40, 0.14) 0%, rgba(0, 0, 0, 0) 70%)',
        }}
      />

      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="text-center mb-6 sm:mb-8"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-500/40 text-red-400 text-xs font-jakarta font-semibold uppercase tracking-widest mb-2.5 shadow-[0_0_12px_rgba(255,20,20,0.2)]">
          <Sparkles className="w-3.5 h-3.5 text-red-400" />
          <span>{language === 'ru' ? 'Официальное сообщество' : 'Official Community'}</span>
        </div>
        <h2 className="font-jakarta text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
          {language === 'ru' ? 'Наш Discord сервер' : 'Our Discord Server'}
        </h2>
      </motion.div>

      {/* Discord Embed Card */}
      <motion.div
        id="discord-server-card"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-md rounded-[24px] sm:rounded-[28px] bg-gradient-to-b from-[#14080b]/95 via-[#0e070a]/95 to-[#080709]/98 border border-red-500/35 hover:border-red-500/60 overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.85),0_0_30px_rgba(255,20,20,0.12)] transition-all duration-300 relative group"
      >
        {/* Top glowing crimson edge */}
        <div className="absolute top-0 left-8 right-8 h-[1.5px] bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_10px_#ff0000] z-20" />

        {/* Banner with requested image */}
        <div className="h-32 sm:h-36 w-full relative overflow-hidden bg-black">
          <img
            src="https://i.pinimg.com/1200x/e6/41/3f/e6413f1af080d1e56fb43dd4011dfaca.jpg"
            alt="The Revenge Discord Banner"
            className="w-full h-full object-cover object-center pointer-events-none"
            referrerPolicy="no-referrer"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#14080b]" />
        </div>

        {/* Card Content Area */}
        <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 relative bg-transparent">
          {/* Server Icon with overlapping negative margin */}
          <div className="-mt-12 sm:-mt-14 mb-3.5 relative flex items-end justify-between">
            <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-[20px] sm:rounded-[22px] bg-[#0c0c0e] p-1 border-4 border-[#14080b] shadow-2xl relative overflow-hidden">
              <div className="w-full h-full rounded-[14px] sm:rounded-[16px] bg-black flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-radial from-red-600/35 to-black" />
                <div className="absolute w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-red-500 via-red-600 to-red-950 shadow-[0_0_12px_rgba(255,0,0,0.85)] opacity-90" />
                <div className="relative z-10 text-center leading-none select-none">
                  <span className="font-orbitron font-extrabold text-[7.5px] sm:text-[8px] tracking-tight text-red-300 block drop-shadow-[0_0_3px_#ff0000]">
                    THE
                  </span>
                  <span className="font-orbitron font-black text-[8.5px] sm:text-[9px] tracking-tight text-red-500 block drop-shadow-[0_0_5px_#ff0000]">
                    REVENGE
                  </span>
                </div>
              </div>
            </div>

            {/* Online Pulse Indicator */}
            <div className="mb-1.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-[11px] sm:text-xs font-jakarta font-medium shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
              <span>{language === 'ru' ? 'Активен 24/7' : 'Active 24/7'}</span>
            </div>
          </div>

          {/* Server Name & Badges */}
          <div className="space-y-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-jakarta font-extrabold text-lg sm:text-xl text-white tracking-tight">
                  The Revenge
                </h3>
                <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-pink-400 to-rose-400 flex items-center justify-center shadow-sm" title="Partnered Community">
                  <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 text-zinc-950 fill-current">
                    <path d="M12 2L14.5 7.5L20.5 8L16 12.5L17.5 18.5L12 15.5L6.5 18.5L8 12.5L3.5 8L9.5 7.5L12 2Z" />
                  </svg>
                </div>
              </div>

              <p className="text-zinc-400 text-xs sm:text-sm font-jakarta font-normal mt-1 leading-normal">
                {language === 'ru'
                  ? 'Официальный хаб проекта: обновления, скрипты, поддержка и новости.'
                  : 'Official project hub: updates, scripts, 24/7 support and community.'}
              </p>
            </div>

            {/* Tags & Meta */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-1">
              {/* ROBLOX Category Badge */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#22242a] border border-white/5 text-zinc-200 text-xs font-jakarta font-semibold">
                <Flame className="w-3 h-3 text-amber-500 fill-amber-500" />
                <span className="text-[11px] tracking-wide">ROBLOX</span>
              </div>

              {/* Founded Date Badge */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#1a1b22] border border-white/5 text-zinc-400 text-xs font-jakarta">
                <Calendar className="w-3 h-3 text-zinc-500" />
                <span className="text-[11px]">
                  {language === 'ru' ? 'Дек. 2025' : 'Dec 2025'}
                </span>
              </div>

              {/* Verified Security Tag */}
              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-950/40 border border-red-500/20 text-red-300 text-xs font-jakarta">
                <ShieldCheck className="w-3 h-3 text-red-400" />
                <span className="text-[11px] font-medium">{language === 'ru' ? 'Проверен' : 'Verified'}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Join Button */}
      <div className="mt-5 sm:mt-6 w-full max-w-md">
        <a
          id="discord-join-btn"
          href={discordInviteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-crimson-flow group relative w-full flex items-center justify-center gap-2.5 px-6 py-3.5 sm:py-4 rounded-2xl text-white font-jakarta font-bold text-sm sm:text-base tracking-wide transition-all duration-200 active:scale-98 cursor-pointer"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
          </svg>
          <span>{language === 'ru' ? 'Присоединиться к серверу' : 'Join Discord Server'}</span>
          <ExternalLink className="w-4 h-4 opacity-85 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>
    </section>
  );
};
