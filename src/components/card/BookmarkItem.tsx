import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {MotiView as Box, MotiText as Text} from 'moti';
import {ArtObject} from '../../api/types';
import {BookmarkOverlay} from '../BookmarkOverlay';
import {userUserAction, useTheme} from '../../store';
import {useAppNavigation} from '../../hooks/appNavigation';
import {ROUTES} from '../../router/routes';

export const BookmarkItem = (props: ArtObject) => {
  const router = useAppNavigation();
  const {theme} = useTheme();
  const {getCurrentAction} = userUserAction();
  const isOverlayApplied = getCurrentAction() !== undefined;

  return (
    <TouchableOpacity
      onPress={() => router.navigate(ROUTES.ART, props)}
      disabled={isOverlayApplied}
      style={styles.container}>
      <FastImage
        style={{
          width: '100%',
          height: '100%',
          borderRadius: theme.sizes.md,
        }}
        source={{uri: props.webImage?.url}}
        resizeMode={FastImage.resizeMode.cover}
      />
      {!isOverlayApplied && (
        <Box from={{translateY: theme.sizes.sm}} animate={{translateY: 0}}>
          <Text style={[styles.title, {color: theme.colors.text}]}>
            {props.title}
          </Text>
        </Box>
      )}
      <BookmarkOverlay
        isOverlayApplied={isOverlayApplied}
        id={props.id}
        url={props.webImage?.url}
      />
    </TouchableOpacity>
  );
};

const theme = useTheme.getState().theme;
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 300,
    borderRadius: theme.sizes.md,
    paddingHorizontal: theme.sizes.sm,
    paddingVertical: theme.sizes.sm,
    overflow: 'hidden',
    zIndex: 0,
  },
  title: {
    position: 'absolute',
    bottom: theme.sizes.md,
    left: theme.sizes.md,
    width: '80%',
    fontWeight: '700',
  },
});
