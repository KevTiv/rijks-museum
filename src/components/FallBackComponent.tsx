import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {MotiView as Box, MotiText as Text} from 'moti';
import {useTheme} from '../store';
import {ScreenContainer} from './ScreenContainer.tsx';

type FallbackComponentProps = {
  error?: Error;
  resetError?: () => void;
};

export const FallbackComponent = ({
  error,
  resetError,
}: FallbackComponentProps) => {
  const {theme} = useTheme();

  return (
    <ScreenContainer>
      <Box
        style={styles.container}
        transition={{type: 'timing', duration: 500}}>
        <Text style={[styles.errorTitle, {color: theme.colors.text}]}>
          Something happened!
        </Text>
        <Text style={[styles.errorMessage, {color: theme.colors.text}]}>
          {error?.toString() ?? 'Try again later...'}
        </Text>
        <Pressable onPress={resetError}>
          <Text style={[styles.retryButton, {color: theme.colors.text}]}>
            Try again
          </Text>
        </Pressable>
      </Box>
    </ScreenContainer>
  );
};

const theme = useTheme.getState().theme;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.sizes.xl,
  },
  errorTitle: {
    fontSize: theme.sizes.lg,
    fontWeight: 'bold',
    marginBottom: theme.sizes.md,
  },
  errorMessage: {
    fontSize: theme.sizes.lg,
    marginBottom: theme.sizes.xl,
    textAlign: 'center',
  },
  retryButton: {
    borderRadius: 5,
  },
});
