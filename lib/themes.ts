export type ThemeId = "default" | "galaxy" | "apple" | "retro";

export interface Theme {
  id: ThemeId;
  label: string;
  icon: string; // SF Symbol name for the icon
  iconBg: string; // iOS-style rounded square background gradient
  description: string;
}

export const themes: Theme[] = [
  {
    id: "default",
    label: "Husk'd Labl",
    icon: "sparkles",
    iconBg: "linear-gradient(135deg, #007AFF, #5856D6)",
    description: "Тёмная тема по умолчанию",
  },
  {
    id: "galaxy",
    label: "Deep Space",
    icon: "moon.stars",
    iconBg: "linear-gradient(135deg, #A855F7, #6366F1)",
    description: "Космическая галактика",
  },
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
