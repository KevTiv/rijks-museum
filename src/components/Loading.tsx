import React from 'react';
import {StyleSheet} from 'react-native';
import {MotiView as Box, MotiText as Text, AnimatePresence} from 'moti';
import {appTheme} from '../theme';
import {useTheme} from '../store';

export const Loading = () => {
  const {theme} = useTheme();

  return (
    <AnimatePresence>
      <Box style={styles.container}>
        <Text style={[styles.title, {color: theme.colors.text}]}>
          Loading...
        </Text>
      </Box>
    </AnimatePresence>
  );
};

const theme = useTheme.getState().theme;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: theme.sizes['2xl'],
    fontWeight: '700',
    color: appTheme.colors.text,
  },
});
