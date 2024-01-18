import React, {useCallback} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {AnimatePresence} from 'moti';
import {Trash, Download} from './icons';
import {useBookmarkStore, userUserAction, useTheme} from '../store';
import {useDownloadImage} from '../hooks/downloadImage';
import {MotiView as Box, MotiText as Text} from 'moti';

export const BookmarkOverlay = ({
  id = '',
  isOverlayApplied = false,
  url = '',
}) => {
  const {theme} = useTheme();
  const {getCurrentAction} = userUserAction();
  const {deleteBookmarks, getBookmarkById} = useBookmarkStore();
  const {handleDownloadImage} = useDownloadImage();
  const bookmark = getBookmarkById(id);
  const getIsImgSavedInGallery = useCallback(
    () => getBookmarkById(id)?.webImage?.url?.includes('file:///') ?? false,
    [getBookmarkById, id],
  );

  return isOverlayApplied ? (
    <Box style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <AnimatePresence presenceAffectsLayout={true}>
        {getCurrentAction() === 'manage' && (
          <>
            <TouchableOpacity
              disabled={!getBookmarkById(id)}
              onPress={() => handleDownloadImage(id, url)}>
              <Download
                width={theme.sizes['3xl']}
                height={theme.sizes['3xl']}
                color={
                  getIsImgSavedInGallery()
                    ? theme.colors.primary
                    : theme.colors.text
                }
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteBookmarks(id)}>
              <Trash
                width={theme.sizes['3xl']}
                height={theme.sizes['3xl']}
                fill={theme.colors.text}
              />
            </TouchableOpacity>
          </>
        )}
        {getCurrentAction() === 'search' && (
          <Box from={{translateY: theme.sizes.md}} animate={{translateY: 0}}>
            <Text style={[styles.location, {color: theme.colors.text}]}>
              {bookmark?.principalOrFirstMaker}
            </Text>
          </Box>
        )}
      </AnimatePresence>
    </Box>
  ) : null;
};

const theme = useTheme.getState().theme;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 1,
    borderRadius: theme.sizes.md,
    marginHorizontal: theme.sizes.sm,
    marginVertical: theme.sizes.sm,
    opacity: 0.5,
  },
  location: {
    fontWeight: 'bold',
    fontSize: theme.sizes.xl,
  },
});
