import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {MotiView as Box, MotiText as Text} from 'moti';
import {PinkNoiseContainer} from './shader/PinkNoiseContainer';
import {useTheme} from '../store';

const {height: SCREEN_HEIGHT} = Dimensions.get('screen');
export const EmptyList = () => {
  const {theme} = useTheme();
  return (
    <PinkNoiseContainer reflectionSpeed={1.0} height={SCREEN_HEIGHT * 0.05}>
      <Box style={styles.container}>
        <Text style={[styles.title, {color: theme.colors.text}]}>Empty...</Text>
      </Box>
    </PinkNoiseContainer>
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
    fontSize: theme.sizes.xl,
    fontWeight: '700',
  },
});
