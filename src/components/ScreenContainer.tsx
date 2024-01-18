import React from 'react';
import {StyleSheet, ViewProps} from 'react-native';
import {MotiView as Box} from 'moti';
import {useTheme} from '../store';

type Props = ViewProps;
export const ScreenContainer = ({children}: Props) => {
  return <Box style={styles.container}>{children}</Box>;
};

const theme = useTheme.getState().theme;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: theme.sizes.lg,
  },
});
