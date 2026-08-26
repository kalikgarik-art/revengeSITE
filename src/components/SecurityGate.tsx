import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, ShieldAlert, Cpu, Lock, CheckCircle2, RefreshCw } from 'lucide-react';
import { Language } from '../types';

interface SecurityGateProps {
  onVerified: () => void;
  language: Language;
}

export const SecurityGate: React.FC<SecurityGateProps> = ({ onVerified, language }) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [status, setStatus] = useState<'idle' | 'verifying' | 'success'>('idle');
  const [progress, setProgress] = useState<number>(0);
  const [rayId, setRayId] = useState<string>('');

  useEffect(() => {
    // Generate a realistic cyber Ray ID
    const randomId = Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 8);
    setRayId(randomId.toUpperCase());
  }, []);

  const handleVerify = () => {
    if (status !== 'idle') return;
    setIsChecked(true);
    setStatus('verifying');

    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 25) + 15;
      if (current >= 100) {
        current = 100;
        setProgress(100);
        clearInterval(interval);
        setStatus('success');
        setTimeout(() => {
          onVerified();
        }, 900);
      } else {
        setProgress(current);
      }
    }, 180);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#070709] text-zinc-100 p-4 selection:bg-red-600 selection:text-white"
    >
      {/* Background Red Ambient Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[450px] pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(220, 20, 30, 0.18) 0%, rgba(180, 10, 20, 0.05) 50%, rgba(0, 0, 0, 0) 80%)',
        }}
      />
      
      {/* Cyber Grid Lines */}
      <div className="absolute inset-0 ambient-grid opacity-60 pointer-events-none" />

      {/* Main Verification Card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative w-full max-w-md rounded-[26px] bg-[#0e0f14]/95 border border-red-500/35 p-7 sm:p-9 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_35px_rgba(255,20,20,0.18)] backdrop-blur-xl"
      >
        {/* Top glowing line */}
        <div className="absolute top-0 left-8 right-8 h-[1.5px] bg-gradient-to-r from-transparent via-red-500/70 to-transparent" />

        {/* Logo / Header */}
        <div className="text-center mb-7">
          <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-red-600 to-red-950 p-[2px] mb-4 shadow-[0_0_25px_rgba(255,20,20,0.4)]">
            <div className="w-full h-full rounded-[14px] overflow-hidden bg-[#0b0c10]">
              <img
                src="https://i.pinimg.com/736x/bd/93/ff/bd93ff2a540eff18278309dc3135dc3c.jpg"
                alt="The Revenge"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-red-950 border border-red-500 flex items-center justify-center shadow-[0_0_8px_#ff0000]">
              <Lock className="w-3.5 h-3.5 text-red-400" />
            </div>
          </div>

          <h2 className="font-orbitron font-extrabold text-2xl text-white uppercase tracking-wider neon-text-red">
            The Revenge
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm font-jakarta mt-1">
            {language === 'ru'
              ? 'Проверка безопасности перед входом на сайт'
              : 'Security check before entering the website'}
          </p>
        </div>

        {/* Cloudflare-style Interactive Cyber Captcha Box */}
        <div 
          onClick={handleVerify}
          className={`relative rounded-2xl border transition-all duration-300 p-4 sm:p-5 flex items-center justify-between cursor-pointer select-none ${
            status === 'success'
              ? 'bg-emerald-950/30 border-emerald-500/50 shadow-[0_0_25px_rgba(16,185,129,0.15)]'
              : status === 'verifying'
              ? 'bg-red-950/40 border-red-500/60 shadow-[0_0_25px_rgba(255,20,20,0.2)]'
              : 'bg-[#14161f] border-zinc-700/60 hover:border-red-500/50 hover:bg-[#181a24] shadow-[0_4px_20px_rgba(0,0,0,0.4)]'
          }`}
        >
          <div className="flex items-center gap-4">
            {/* Custom Checkbox Button */}
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300 ${
                status === 'success'
                  ? 'bg-emerald-500 text-black shadow-[0_0_12px_#10b981]'
                  : status === 'verifying'
                  ? 'bg-red-950 border border-red-500 text-red-400'
                  : 'border-2 border-zinc-500 bg-zinc-900 group-hover:border-red-400'
              }`}
            >
              {status === 'verifying' && (
                <RefreshCw className="w-4 h-4 animate-spin text-red-400" />
              )}
              {status === 'success' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </motion.div>
              )}
            </div>

            {/* Label text */}
            <span className="font-jakarta text-sm sm:text-base font-semibold text-zinc-200">
              {status === 'verifying'
                ? (language === 'ru' ? 'Проверка...' : 'Verifying...')
                : status === 'success'
                ? (language === 'ru' ? 'Успешно подтверждено' : 'Successfully Verified')
                : (language === 'ru' ? 'Я человек (не робот)' : 'I am a human (not a robot)')}
            </span>
          </div>

          {/* Shield Brand Icon */}
          <div className="flex flex-col items-center justify-center pl-2 border-l border-zinc-800">
            <ShieldCheck className={`w-6 h-6 ${status === 'success' ? 'text-emerald-400' : 'text-red-400'}`} />
            <span className="text-[9px] font-orbitron text-zinc-500 uppercase tracking-tighter mt-0.5">
              Guard
            </span>
          </div>
        </div>

        {/* Verification Progress Bar when verifying */}
        <AnimatePresence>
          {status === 'verifying' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4"
            >
              <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden border border-red-500/20">
                <motion.div
                  className="h-full bg-gradient-to-r from-red-600 to-red-400 shadow-[0_0_10px_#ff0000]"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] font-mono text-zinc-400 mt-1.5">
                <span>{language === 'ru' ? 'Анализ браузера...' : 'Analyzing browser...'}</span>
                <span className="text-red-400 font-bold">{progress}%</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Security Meta Footer */}
        <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span>Ray ID: {rayId}</span>
          </div>
          <span>The Revenge DDoS Shield</span>
        </div>
      </motion.div>
    </motion.div>
  );
};
