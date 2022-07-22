import darkThemeColors from './dark';
import lightThemeColors from './light';

export type Theme = 'dark' | 'light';

export interface Colors {
  background: string;
  text: string;
}

export function colors(theme: Theme) {
  switch (theme) {
    case 'dark':
      return darkThemeColors;
    case 'light':
      return lightThemeColors;
  }
}
