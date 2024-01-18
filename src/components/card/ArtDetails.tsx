import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {MotiView as Box, MotiText as Text} from 'moti';
import {ROUTES} from '../../router/routes';
import {Bookmark, Download} from '../icons';
import {ArtObject, RijksDataApiResponse} from '../../api/types';
import {
  AppStackNavigation,
  RootTabNavigationParams,
  MuseumStacksRoutePrams,
} from '../../router/route.types';
import {useTheme} from '../../store';
import {ToggleThemeButton} from '../ToggleTheme';

type ArtDetailsProps = {
  router: AppStackNavigation<
    keyof RootTabNavigationParams | keyof MuseumStacksRoutePrams
  >;
  params: Readonly<ArtObject>;
  artPiece?: RijksDataApiResponse;
  bookmarkStatus: 'Bookmarked' | 'Bookmark';
  getIsImgSavedInGallery: () => boolean | undefined;
  getBookmarkById: (id?: string | undefined) => ArtObject | undefined;
  handleBookmarkStatusClick: (id?: string) => void;
  handleDownloadImage: (id: string, url: string) => Promise<void>;
};
export const ArtDetails = ({
  router,
  params,
  artPiece,
  bookmarkStatus,
  getIsImgSavedInGallery,
  handleBookmarkStatusClick,
  getBookmarkById,
  handleDownloadImage,
}: ArtDetailsProps) => {
  const {theme} = useTheme();

  return artPiece ? (
    <>
      <Box from={{translateY: theme.sizes.xl}} animate={{translateY: 0}}>
        <TouchableWithoutFeedback
          onPress={() => {
            if (artPiece?.artObject?.principalMaker) {
              router.navigate(ROUTES.ARTIST, {
                name: artPiece.artObject.principalMaker,
              });
            }
          }}>
          <Text style={styles.artist}>
            {artPiece?.artObject?.principalMaker}
          </Text>
        </TouchableWithoutFeedback>
      </Box>

      <Box
        from={{translateY: theme.sizes.lg}}
        animate={{translateY: 0}}
        style={styles.download}>
        <TouchableOpacity
          style={styles.artQuickAction}
          onPress={() => handleBookmarkStatusClick(params?.id)}
          disabled={getBookmarkById(params.id) !== undefined}>
          <Bookmark
            fill={
              getBookmarkById(params.id) !== undefined
                ? theme.colors.primary
                : theme.colors.text
            }
          />
          <Text style={{color: theme.colors.text}}>{bookmarkStatus}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={getIsImgSavedInGallery()}
          onPress={async () => {
            if (params?.id && params.webImage?.url) {
              await handleDownloadImage(params?.id, params.webImage?.url);
            }
          }}
          style={styles.artQuickAction}>
          <Download
            width={theme.sizes.lg}
            height={theme.sizes.lg}
            color={
              getIsImgSavedInGallery()
                ? theme.colors.primary
                : theme.colors.text
            }
          />
          <Text style={[styles.subLabel, {color: theme.colors.text}]}>
            {' '}
            {getIsImgSavedInGallery() ? 'Saved in Gallery' : 'Download image'}
          </Text>
        </TouchableOpacity>

        <ToggleThemeButton width={theme.sizes.lg} height={theme.sizes.lg} />
      </Box>

      <Box from={{translateY: theme.sizes.lg}} animate={{translateY: 0}}>
        <Text style={[styles.title, {color: theme.colors.text}]}>
          {params?.longTitle}
        </Text>
      </Box>

      <Box
        from={{translateY: theme.sizes.lg, opacity: 0}}
        animate={{translateY: 0, opacity: 1}}>
        <Text style={[styles.subLabel, {color: theme.colors.text}]}>
          {artPiece?.artObject?.plaqueDescriptionEnglish}
        </Text>
        <Text style={[styles.subLabel, {color: theme.colors.text}]}>
          {artPiece?.artObject?.label?.makerLine}
        </Text>
        <Text style={[styles.subLabel, {color: theme.colors.text}]}>
          {artPiece?.artObject?.label?.description}
        </Text>
        <Text style={[styles.subLabel, {color: theme.colors.text}]}>
          Dimensions: {artPiece?.artObject?.subTitle}
        </Text>
        {artPiece.artObject?.location && (
          <Text style={[styles.subLabel, {color: theme.colors.text}]}>
            Location:{' '}
            {
              <Text style={{color: theme.colors.primary}}>
                {artPiece.artObject.location}
              </Text>
            }
          </Text>
        )}
      </Box>
    </>
  ) : null;
};

const theme = useTheme.getState().theme;
const styles = StyleSheet.create({
  artist: {
    fontSize: theme.sizes.lg,
    fontWeight: '700',
    marginVertical: 8,
    color: theme.colors.primary,
  },
  artQuickAction: {
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  title: {
    fontSize: theme.sizes.xl,
    fontWeight: '700',
  },
  description: {
    fontSize: theme.sizes.lg,
    fontWeight: '500',
    paddingVertical: theme.sizes.md,
    marginHorizontal: theme.sizes.sm,
  },
  subLabel: {
    fontSize: theme.sizes.lg,
    fontWeight: '500',
    paddingVertical: theme.sizes.md,
    paddingHorizontal: theme.sizes.sm,
  },
  download: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.sizes.lg,
  },
});
