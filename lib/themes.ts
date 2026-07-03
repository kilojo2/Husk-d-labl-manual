export type ThemeId = "default" | "galaxy" | "apple" | "retro";

export interface Theme {
  id: ThemeId;
  label: string;
  icon: string;
  description: string;
}

export const themes: Theme[] = [
  {
    id: "default",
    label: "Husk'd Labl",
    icon: "HL",
    description: "Тёмная тема по умолчанию",
  },
  {
    id: "galaxy",
    label: "Deep Space",
    icon: "✦",
    description: "Космическая галактика",
  },
  {
    id: "apple",
    label: "Apple Style",
    icon: "",
    description: "Минимализм iOS/macOS",
  },
  {
    id: "retro",
    label: "Retro 80/90",
    icon: "♫",
    description: "Ностальгия по 80-90м",
  },
];

export function getTheme(id: ThemeId): Theme {
  return themes.find((t) => t.id === id) ?? themes[0];
}
