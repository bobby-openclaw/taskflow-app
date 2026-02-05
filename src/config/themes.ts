export const themes = {
  light: { name: 'Light', class: '' },
  dark: { name: 'Dark', class: 'dark' },
  blue: { name: 'Ocean', class: 'theme-blue' },
  green: { name: 'Forest', class: 'theme-green' },
} as const;

export type ThemeName = keyof typeof themes;
