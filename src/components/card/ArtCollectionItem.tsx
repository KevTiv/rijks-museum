import React, {useCallback} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {MotiView as Box, MotiText as Text} from 'moti';
import {ArtObject} from '../../api/types';
import {ArrowForward, Bookmark, EmptyBookmark} from '../icons';
import {useAppNavigation} from '../../hooks/appNavigation';
import {ROUTES} from '../../router/routes';
import {useBookmarkStore, useTheme} from '../../store';

type ArtCollectionItemProps = ArtObject;
export const ArtCollectionItem = (props: ArtCollectionItemProps) => {
  const {theme} = useTheme();
  const {id, webImage, longTitle, principalOrFirstMaker} = props;
  const router = useAppNavigation();
  const {addBookMarks, getBookmarks} = useBookmarkStore();
  const getIsBookmarkSelected = useCallback(
    (bookmarkId?: string) =>
      getBookmarks().some(entry => entry.id === bookmarkId),
    [getBookmarks],
  );

  return (
    <Box style={styles.container}>
      <TouchableOpacity
        onPress={() => addBookMarks(props)}
        disabled={getIsBookmarkSelected(id)}
        style={styles.bookmarkBtn}>
        {getIsBookmarkSelected(id) ? (
          <Bookmark
            stroke={theme.colors.text}
            width={theme.sizes['3xl']}
            height={theme.sizes['3xl']}
            fill={theme.colors.text}
          />
        ) : (
          <EmptyBookmark
            stroke={theme.colors.text}
            width={theme.sizes['3xl']}
            height={theme.sizes['3xl']}
            fill={theme.colors.text}
          />
        )}
      </TouchableOpacity>
      <FastImage
        style={styles.imgContainer}
        source={{uri: webImage?.url}}
        resizeMode={FastImage.resizeMode.cover}
      />
      <Box
        from={{translateY: theme.sizes.lg}}
        animate={{translateY: 0}}
        style={styles.info}>
        <Text style={[styles.cardTitle, {color: theme.colors.text}]}>
          {longTitle}
        </Text>
        <Text style={[styles.artist, {color: theme.colors.text}]}>
          By {principalOrFirstMaker}
        </Text>
      </Box>
      <TouchableOpacity
        style={[styles.bottomNavBtn, {backgroundColor: theme.colors.text}]}
        disabled={id === undefined}
        onPress={() => {
          if (id) {
            router.navigate(ROUTES.ART, props);
          }
        }}>
        <ArrowForward
          stroke={theme.colors.background}
          width={theme.sizes['3xl']}
          height={theme.sizes['3xl']}
        />
      </TouchableOpacity>
    </Box>
  );
};

const theme = useTheme.getState().theme;
const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    marginVertical: theme.sizes.sm,
  },
  imgContainer: {
    width: '100%',
    height: 650,
    borderRadius: theme.sizes.md,
    opacity: 0.9,
  },
  bookmarkBtn: {
    position: 'absolute',
    top: theme.sizes.lg,
    right: theme.sizes.lg,
    zIndex: 5,
  },
  bottomNavBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1,
    borderRadius: 100,
    width: '20%',
    flex: 2,
    position: 'absolute',
    bottom: theme.sizes.lg,
    right: theme.sizes.lg,
    zIndex: 5,
    overflow: 'hidden',
  },
  info: {
    flex: 1,
    position: 'absolute',
    width: '70%',
    bottom: theme.sizes.lg,
    left: theme.sizes.lg,
    display: 'flex',
  },
  cardTitle: {
    fontSize: theme.sizes['2xl'],
    fontWeight: '700',
  },
  artist: {
    fontSize: theme.sizes.lg,
    fontWeight: '500',
    paddingVertical: 8,
  },
});
