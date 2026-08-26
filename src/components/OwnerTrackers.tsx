import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Crown, Shield, ExternalLink, Activity, Radio, RefreshCw } from 'lucide-react';
import { Language, LanyardData } from '../types';

interface OwnerTrackersProps {
  language: Language;
}

interface OwnerCardProps {
  roleTitle: string;
  roleIcon: React.ReactNode;
  userId: string;
  language: Language;
  defaultName: string;
}

const DiscordUserIsland: React.FC<OwnerCardProps> = ({
  roleTitle,
  roleIcon,
  userId,
  language,
  defaultName,
}) => {
  const [data, setData] = useState<LanyardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchLanyard = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setData(json.data);
        }
      }
    } catch (e) {
      console.warn('Lanyard fetch error for', userId, e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLanyard();
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchLanyard, 30000);
    return () => clearInterval(interval);
  }, [userId]);

  // Status mapping
  const statusColors = {
    online: 'bg-emerald-500 shadow-[0_0_10px_#10b981]',
    idle: 'bg-amber-500 shadow-[0_0_10px_#f59e0b]',
    dnd: 'bg-rose-500 shadow-[0_0_10px_#f43f5e]',
    offline: 'bg-zinc-500',
  };

  const statusLabels = {
    online: { ru: 'В сети', en: 'Online' },
    idle: { ru: 'Не активен', en: 'Idle' },
    dnd: { ru: 'Не беспокоить', en: 'Do Not Disturb' },
    offline: { ru: 'Не в сети', en: 'Offline' },
  };

  const currentStatus = data?.discord_status || 'offline';
  const username = data?.discord_user?.global_name || data?.discord_user?.username || defaultName;
  const userTag = data?.discord_user?.username ? `@${data.discord_user.username}` : `@${defaultName.toLowerCase()}`;
  
  const avatarUrl = data?.discord_user?.avatar
    ? `https://cdn.discordapp.com/avatars/${userId}/${data.discord_user.avatar}.png?size=128`
    : null;

  return (
    <div className="flex flex-col items-center w-full">
      {/* Title above the island */}
      <div className="flex items-center gap-2 mb-3">
        <div className="p-1 rounded bg-red-950/60 border border-red-500/40 text-red-400">
          {roleIcon}
        </div>
        <h3 className="font-orbitron font-extrabold text-lg sm:text-xl text-zinc-100 tracking-wider uppercase text-shadow-[0_0_10px_rgba(255,0,0,0.5)]">
          {roleTitle}
        </h3>
      </div>

      {/* Neon Island Box */}
      <div className="neon-owner-island w-full rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between group">
        {/* Subtle Top Red Edge Glow */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-500/80 to-transparent" />

        {/* User Card Content */}
        <div className="flex items-start gap-4">
          {/* Avatar with Status Dot */}
          <div className="relative flex-shrink-0">
            <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-red-500/40 overflow-hidden flex items-center justify-center p-0.5 group-hover:border-red-400/80 transition-colors shadow-[0_0_15px_rgba(255,0,0,0.15)]">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={username}
                  className="w-full h-full object-cover rounded-xl"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-red-950 to-zinc-900 flex items-center justify-center rounded-xl font-orbitron font-bold text-red-400 text-lg">
                  {defaultName.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            {/* Status indicator */}
            <span
              title={statusLabels[currentStatus][language]}
              className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#121216] ${statusColors[currentStatus]} transition-all`}
            />
          </div>

          {/* User Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1">
              <h4 className="font-jakarta font-bold text-base sm:text-lg text-white truncate tracking-tight">
                {username}
              </h4>
              <button
                onClick={fetchLanyard}
                title={language === 'ru' ? 'Обновить статус' : 'Refresh status'}
                className="text-zinc-500 hover:text-red-400 p-1 transition-colors cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-red-500' : ''}`} />
              </button>
            </div>

            <p className="text-xs text-zinc-400 font-mono truncate">{userTag}</p>

            {/* Live Status Badge */}
            <div className="mt-2 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-[11px] font-jakarta font-medium text-zinc-300">
                <span className={`w-1.5 h-1.5 rounded-full ${statusColors[currentStatus]}`} />
                <span>{statusLabels[currentStatus][language]}</span>
              </span>

              {data?.active_on_discord_mobile && (
                <span className="text-[10px] text-zinc-400 px-2 py-0.5 rounded-full bg-zinc-900/90 border border-zinc-800 font-jakarta" title="Active on mobile">
                  📱 Mobile
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Custom Status / Activity if available */}
        {data?.custom_status?.text && (
          <div className="mt-3 px-3 py-1.5 rounded-lg bg-zinc-900/60 border border-red-500/15 text-xs text-zinc-300 italic truncate flex items-center gap-1.5 font-jakarta">
            <Radio className="w-3 h-3 text-red-400 flex-shrink-0 animate-pulse" />
            <span className="truncate">"{data.custom_status.text}"</span>
          </div>
        )}

        {/* Live Activity (Game / Spotify) */}
        {data?.activities && data.activities.length > 0 && data.activities[0].name !== 'Custom Status' && (
          <div className="mt-3 px-3 py-1.5 rounded-lg bg-red-950/30 border border-red-500/20 text-xs text-red-300 flex items-center gap-2 truncate font-jakarta">
            <Activity className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
            <span className="truncate font-medium">
              {language === 'ru' ? 'Играет в' : 'Playing'}: {data.activities[0].name}
            </span>
          </div>
        )}

        {/* Open Profile Button Footer */}
        <div className="mt-4 pt-3 border-t border-red-500/20">
          <a
            id={`open-profile-${userId}`}
            href={`https://discord.com/users/${userId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-zinc-900/90 hover:bg-red-950/70 text-zinc-300 hover:text-white border border-red-500/30 hover:border-red-500/70 text-xs font-jakarta font-semibold tracking-wide transition-all duration-300 shadow-[0_0_10px_rgba(255,0,0,0.08)] hover:shadow-[0_0_18px_rgba(255,0,0,0.25)] cursor-pointer"
          >
            <span>{language === 'ru' ? 'Перейти на профиль' : 'Open Profile'}</span>
            <ExternalLink className="w-3.5 h-3.5 text-red-400 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
};

export const OwnerTrackers: React.FC<OwnerTrackersProps> = ({ language }) => {
  return (
    <section id="owners-section" className="relative py-14 px-4 max-w-5xl mx-auto">
      {/* Outer Neon Island with Background Image */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative rounded-[28px] overflow-hidden border border-red-500/45 p-6 sm:p-10 shadow-[0_0_35px_rgba(255,20,20,0.22),0_15px_40px_rgba(0,0,0,0.9)] hover:border-red-500/75 hover:shadow-[0_0_50px_rgba(255,20,20,0.35)] transition-all duration-500"
      >
        {/* Background Image with Dark Vignette Overlay */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <img
            src="https://i.pinimg.com/736x/dd/e7/ef/dde7efe1864c1a845f50208ab8928a88.jpg"
            alt="Creators Background"
            className="w-full h-full object-cover object-center scale-105 filter brightness-50 contrast-125"
            referrerPolicy="no-referrer"
          />
          {/* Gradients to blend and guarantee perfect legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#08080a]/90 via-[#0d070a]/85 to-[#08080a]/95 backdrop-blur-[4px]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,20,30,0.12),transparent_70%)]" />
        </div>

        {/* Header: Создатели проекта */}
        <div className="text-center mb-8 sm:mb-10 relative">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/70 border border-red-500/40 text-red-300 text-xs font-rajdhani font-normal uppercase tracking-widest mb-3 shadow-[0_0_15px_rgba(255,0,0,0.2)]">
            <Crown className="w-3.5 h-3.5 text-red-400" />
            <span>
              <span className="font-normal">{language === 'ru' ? 'команда' : 'team'}</span>{' '}
              <span className="font-bold text-red-400">The Revenge</span>
            </span>
          </div>
          <h2 className="font-orbitron text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-widest text-zinc-100 neon-text-red">
            {language === 'ru' ? 'Создатели проекта' : 'Project Creators'}
          </h2>
        </div>

        {/* Two Island Columns: Left (Owner) & Right (Co. Owner) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start relative z-10">
          {/* Left Island: Owner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full"
          >
            <DiscordUserIsland
              roleTitle="Owner"
              roleIcon={<Crown className="w-4 h-4" />}
              userId="1175477012970885251"
              language={language}
              defaultName="Owner"
            />
          </motion.div>

          {/* Right Island: Co. Owner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full"
          >
            <DiscordUserIsland
              roleTitle="Co. Owner"
              roleIcon={<Shield className="w-4 h-4" />}
              userId="1406731212919144469"
              language={language}
              defaultName="Co. Owner"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
