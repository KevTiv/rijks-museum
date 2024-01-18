import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {Moon, Sun} from './icons';
import {useTheme} from '../store';
import {useColorScheme} from '../theme/ColorSchemeProvider';

type ToggleThemeButtonProps = {
  width?: number;
  height?: number;
};

export const ToggleThemeButton = ({width, height}: ToggleThemeButtonProps) => {
  const {theme, colorSchemeName} = useTheme();
  const {toggle, active} = useColorScheme();
  const tap = Gesture.Tap()
    .runOnJS(true)
    .onStart(e => {
      if (!active) {
        toggle(e.absoluteX, e.absoluteY);
      }
    });

  return (
    <GestureDetector gesture={tap}>
      <Pressable style={styles.container}>
        {colorSchemeName === 'dark' ? (
          <Moon width={width} height={height} fill={theme.colors.text} />
        ) : (
          <Sun width={width} height={height} fill={theme.colors.text} />
        )}
      </Pressable>
    </GestureDetector>
  );
};

const theme = useTheme.getState().theme;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.sizes.lg,
    maxWidth: theme.sizes['2xl'],
  },
});
