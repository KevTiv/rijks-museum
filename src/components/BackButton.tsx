import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';
import React, {useCallback} from 'react';
import {useAppNavigation} from '../hooks/appNavigation';
import {ArrowHead} from './icons';
import {useTheme} from '../store';

type BackButtonProps = {
  style?: StyleProp<ViewStyle>;
};
export const BackButton = ({style}: BackButtonProps) => {
  const {theme} = useTheme();
  const router = useAppNavigation();
  const handleGoBack = useCallback(async () => {
    if (router.canGoBack()) {
      router.goBack();
    }
  }, [router]);

  return (
    <TouchableOpacity style={style} onPress={handleGoBack}>
      <ArrowHead color={theme.colors.primary} />
    </TouchableOpacity>
  );
};
