import React from 'react';
import { Languages } from 'lucide-react';
import { Language } from '../types';

interface LanguageToggleProps {
  language: Language;
  onToggle: (lang: Language) => void;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ language, onToggle }) => {
  return (
    <div className="fixed top-5 right-5 z-50">
      <button
        id="language-toggle-btn"
        onClick={() => onToggle(language === 'ru' ? 'en' : 'ru')}
        aria-label="Toggle language"
        className="group relative flex items-center gap-2.5 px-4 py-2 rounded-full bg-zinc-950/80 backdrop-blur-md border border-red-500/30 text-zinc-200 hover:border-red-500/80 hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(255,0,0,0.15)] hover:shadow-[0_0_22px_rgba(255,0,0,0.35)] cursor-pointer"
      >
        <Languages className="w-4 h-4 text-red-500 group-hover:rotate-12 transition-transform duration-300" />
        <span className="text-xs font-semibold tracking-wider uppercase font-orbitron flex items-center gap-1.5">
          <span className={language === 'ru' ? 'text-red-400 font-bold' : 'text-zinc-500'}>RU</span>
          <span className="text-zinc-600">/</span>
          <span className={language === 'en' ? 'text-red-400 font-bold' : 'text-zinc-500'}>EN</span>
        </span>
        <span className="absolute -bottom-8 right-0 px-2 py-0.5 rounded text-[10px] tracking-wide text-zinc-400 bg-zinc-900/90 border border-zinc-800 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          {language === 'ru' ? 'Сменить на English' : 'Switch to Русский'}
        </span>
      </button>
    </div>
  );
};
