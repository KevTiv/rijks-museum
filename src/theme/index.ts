import {DarkTheme, DefaultTheme} from '@react-navigation/native';

const sizes = {
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24,
  '2xl': 32,
  '3xl': 48,
};
export const appTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: 'rgb(255, 45, 85)',
    background: 'rgb(1, 1, 1)',
    card: 'rgb(18, 18, 18)',
    text: 'rgb(229, 229, 231)',
    border: 'rgb(39, 39, 41)',
    icons: {
      selected: 'rgba(255, 255, 255, 1)',
      unselected: 'rgba(255, 255, 255, 0.7)',
    },
  },
  sizes: sizes,
};

export const appLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 45, 85)',
    background: 'rgb(244,244,244)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(27,27,30)',
    border: 'rgb(116,115,115)',
    icons: {
      selected: 'rgba(28, 28, 30, 1)',
      unselected: 'rgba(28, 28, 30, 0.7)',
    },
  },
  sizes: sizes,
};
