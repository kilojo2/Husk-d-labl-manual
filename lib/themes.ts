export type ThemeId = 'dark' | 'light' | 'midnight' | 'graphite';

export type AccentId = 'purple' | 'blue' | 'green' | 'orange' | 'red';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  colors: {
    background: string;
    backgroundSecondary: string;
    surface: string;
    surfaceHover: string;
    border: string;
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
    sidebarBackground: string;
    codeBackground: string;
  };
}

export const themeConfigs: Record<ThemeId, ThemeConfig> = {
  dark: {
    id: 'dark',
    name: 'Dark',
    colors: {
      background: '#0b0c0e',
      backgroundSecondary: '#101114',
      surface: '#15171a',
      surfaceHover: '#1c1e23',
      border: 'rgba(255,255,255,0.08)',
      textPrimary: '#f5f5f5',
      textSecondary: '#a1a1aa',
      textMuted: '#71717a',
      sidebarBackground: '#0e0f11',
      codeBackground: '#15171a',
    },
  },
  light: {
    id: 'light',
    name: 'Light',
    colors: {
      background: '#ffffff',
      backgroundSecondary: '#f7f7f8',
      surface: '#ffffff',
      surfaceHover: '#f4f4f5',
      border: 'rgba(0,0,0,0.1)',
      textPrimary: '#18181b',
      textSecondary: '#52525b',
      textMuted: '#a1a1aa',
      sidebarBackground: '#f7f7f8',
      codeBackground: '#f4f4f5',
    },
  },
  midnight: {
    id: 'midnight',
    name: 'Midnight',
    colors: {
      background: '#0f1117',
      backgroundSecondary: '#12141c',
      surface: '#181b26',
      surfaceHover: '#1e2130',
      border: 'rgba(255,255,255,0.06)',
      textPrimary: '#e8eaed',
      textSecondary: '#9aa0a6',
      textMuted: '#6b7280',
      sidebarBackground: '#0d0f15',
      codeBackground: '#181b26',
    },
  },
  graphite: {
    id: 'graphite',
    name: 'Graphite',
    colors: {
      background: '#1a1b1e',
      backgroundSecondary: '#1e1f22',
      surface: '#232427',
      surfaceHover: '#2a2b2f',
      border: 'rgba(255,255,255,0.07)',
      textPrimary: '#e4e4e7',
      textSecondary: '#8f9098',
      textMuted: '#63646b',
      sidebarBackground: '#161719',
      codeBackground: '#232427',
    },
  },
};

export const accentColors: Record<AccentId, { hex: string; hover: string; subtle: string; name: string }> = {
  purple: { hex: '#8b5cf6', hover: '#7c3aed', subtle: 'rgba(139,92,246,0.1)', name: 'Purple' },
  blue: { hex: '#3b82f6', hover: '#2563eb', subtle: 'rgba(59,130,246,0.1)', name: 'Blue' },
  green: { hex: '#22c55e', hover: '#16a34a', subtle: 'rgba(34,197,94,0.1)', name: 'Green' },
  orange: { hex: '#f97316', hover: '#ea580c', subtle: 'rgba(249,115,22,0.1)', name: 'Orange' },
  red: { hex: '#ef4444', hover: '#dc2626', subtle: 'rgba(239,68,68,0.1)', name: 'Red' },
};

export const themeNames: { id: ThemeId; label: string }[] = [
  { id: 'dark', label: 'Dark' },
  { id: 'light', label: 'Light' },
  { id: 'midnight', label: 'Midnight' },
  { id: 'graphite', label: 'Graphite' },
];

export function getThemeConfig(id: ThemeId): ThemeConfig {
  return themeConfigs[id] ?? themeConfigs.dark;
}

export function getAccentColor(accent: AccentId) {
  return accentColors[accent] ?? accentColors.purple;
}
