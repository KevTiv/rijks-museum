// import {appLightTheme, appTheme} from '../theme';
// import {useCallback, useMemo, useState} from 'react';
//
// export default function useTheme() {
//   const [theme, setTheme] = useState<'light' | 'dark'>('dark');
//   const HandleToggleTheme = () =>
//     setTheme(theme === 'light' ? 'dark' : 'light');
//
//   const currentTheme = useMemo(
//     () => (theme === 'light' ? appLightTheme : appTheme),
//     [theme],
//   );
//
//   return {theme: currentTheme, ToggleTheme: HandleToggleTheme};
// }
