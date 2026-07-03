export type ThemeId = "apple" | "retro";

export interface Theme {
  id: ThemeId;
  label: string;
  icon: string; // SF Symbol name for the icon
  iconBg: string; // iOS-style rounded square background gradient
  description: string;
}

export const themes: Theme[] = [
  {
    id: "apple",
    label: "Apple Style",
    icon: "applelogo",
    iconBg: "linear-gradient(135deg, #007AFF, #5AC8FA)",
    description: "Минимализм iOS/macOS",
  },
  {
    id: "retro",
    label: "Retro 80/90",
    icon: "music.note",
    iconBg: "linear-gradient(135deg, #D97706, #F59E0B)",
    description: "Ностальгия по 80-90м",
  },
];

export function getTheme(id: ThemeId): Theme {
  return themes.find((t) => t.id === id) ?? themes[0];
}
