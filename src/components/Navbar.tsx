import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, HelpCircle, Users, MessageSquare, Languages } from 'lucide-react';
import { Language } from '../types';

interface NavbarProps {
  language: Language;
  onToggleLanguage: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ language, onToggleLanguage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Typewriter effect state for brand text
  const fullText = 'The Revenge';
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const currentLength = displayedText.length;

    if (!isDeleting && currentLength < fullText.length) {
      timeout = setTimeout(() => {
        setDisplayedText(fullText.substring(0, currentLength + 1));
      }, 150);
    } else if (!isDeleting && currentLength === fullText.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 4000);
    } else if (isDeleting && currentLength > 0) {
      timeout = setTimeout(() => {
        setDisplayedText(fullText.substring(0, currentLength - 1));
      }, 80);
    } else if (isDeleting && currentLength === 0) {
      timeout = setTimeout(() => {
        setIsDeleting(false);
      }, 800);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -80; // Header height offset
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const navItems = [
    {
      id: 'nav-contacts',
      labelRu: 'Контакты',
      labelEn: 'Contacts',
      target: 'owners-section',
      icon: Users,
    },
    {
      id: 'nav-faq',
      labelRu: 'FAQ',
      labelEn: 'FAQ',
      target: 'faq-section',
      icon: HelpCircle,
    },
    {
      id: 'nav-discord',
      labelRu: 'Дискорд',
      labelEn: 'Discord',
      target: 'discord-section',
      icon: MessageSquare,
    },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#08080c]/90 backdrop-blur-md border-b border-red-500/20 py-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          {/* Logo Avatar Image */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-red-600 to-red-950 p-[1.5px] shadow-[0_0_15px_rgba(255,0,0,0.5)] group-hover:shadow-[0_0_22px_rgba(255,20,20,0.8)] transition-all duration-300 relative overflow-hidden flex-shrink-0">
            <div className="w-full h-full rounded-full bg-[#0b0c10] overflow-hidden flex items-center justify-center">
              <img
                src="https://i.pinimg.com/736x/bd/93/ff/bd93ff2a540eff18278309dc3135dc3c.jpg"
                alt="The Revenge Avatar"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Logo Text with Typewriter Animation */}
          <div className="flex items-center font-orbitron font-extrabold text-base sm:text-lg tracking-wider text-white group-hover:text-red-400 transition-colors min-w-[130px]">
            <span>{displayedText}</span>
            <span className="w-[2px] h-3.5 sm:h-4 bg-white/90 ml-1 inline-block animate-pulse shadow-[0_0_6px_rgba(255,255,255,0.7)]" />
          </div>
        </div>

        {/* Center: Desktop Navigation Links with Snake Border */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-5">
          {navItems.map((item) => (
            <div key={item.id} className="snake-border-btn">
              <button
                onClick={() => scrollToSection(item.target)}
                className="snake-content px-4 py-1.5 font-jakarta font-semibold text-xs sm:text-sm text-zinc-200 hover:text-white transition-colors duration-200 cursor-pointer"
              >
                <span>{language === 'ru' ? item.labelRu : item.labelEn}</span>
              </button>
            </div>
          ))}
        </nav>

        {/* Right: Actions (Language + Get Access) */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language Toggle */}
          <button
            onClick={() => onToggleLanguage(language === 'ru' ? 'en' : 'ru')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700/60 hover:border-red-500/50 text-zinc-300 hover:text-white text-xs font-jakarta font-semibold transition-all duration-200 cursor-pointer"
            title={language === 'ru' ? 'Сменить язык' : 'Change language'}
          >
            <Languages className="w-3.5 h-3.5 text-red-400" />
            <span>{language.toUpperCase()}</span>
          </button>

          {/* Get Access Pill Button in Crimson Flow Red Style */}
          <button
            onClick={() => scrollToSection('pricing-section')}
            className="btn-crimson-flow flex items-center gap-2 px-5 py-2 rounded-full text-white font-jakarta font-bold text-xs sm:text-sm tracking-tight transition-all duration-300 active:scale-95 cursor-pointer"
          >
            <span>{language === 'ru' ? 'Получить доступ' : 'Get Access'}</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => onToggleLanguage(language === 'ru' ? 'en' : 'ru')}
            className="px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-700 text-xs font-bold text-zinc-300"
          >
            {language.toUpperCase()}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-zinc-900 border border-red-500/30 text-zinc-300 hover:text-white focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0c0d12]/95 backdrop-blur-xl border-b border-red-500/30 px-6 py-5 shadow-2xl"
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.target)}
                    className="flex items-center gap-3 text-left font-jakarta font-semibold text-base text-zinc-200 hover:text-red-400 py-2 border-b border-zinc-800/60"
                  >
                    <Icon className="w-4 h-4 text-red-500" />
                    <span>{language === 'ru' ? item.labelRu : item.labelEn}</span>
                  </button>
                );
              })}

              <button
                onClick={() => scrollToSection('pricing-section')}
                className="btn-crimson-flow w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-jakarta font-bold text-sm shadow-[0_0_20px_rgba(255,0,0,0.5)] mt-2"
              >
                <span>{language === 'ru' ? 'Получить доступ' : 'Get Access'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
