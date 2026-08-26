export type Language = 'ru' | 'en';

export interface FaqItem {
  id: string;
  questionRu: string;
  questionEn: string;
  answerRu: string;
  answerEn: string;
}

export interface DiscordUserData {
  id: string;
  username: string;
  global_name?: string | null;
  avatar?: string | null;
  discriminator?: string;
  avatar_decoration_data?: any;
}

export interface LanyardData {
  discord_user: DiscordUserData;
  discord_status: 'online' | 'idle' | 'dnd' | 'offline';
  active_on_discord_web?: boolean;
  active_on_discord_desktop?: boolean;
  active_on_discord_mobile?: boolean;
  activities?: Array<{
    id: string;
    name: string;
    type: number;
    state?: string;
    details?: string;
    timestamps?: { start?: number; end?: number };
    assets?: {
      large_image?: string;
      large_text?: string;
      small_image?: string;
      small_text?: string;
    };
  }>;
  custom_status?: {
    text?: string;
    emoji?: {
      name?: string;
      id?: string;
      animated?: boolean;
    };
  } | null;
}
