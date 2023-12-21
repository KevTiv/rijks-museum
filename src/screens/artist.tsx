import {StyleSheet, Text} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import {AnimatePresence, MotiView} from 'moti';
import {useQuery} from '@tanstack/react-query';
import {useAppRoute} from '../hooks/appNavigation';
import {ROUTES} from '../router/routes';
import {getRijksArtCollection} from '../api/rijksMuseum';
import {ArtCollectionItem} from '../components/Card/ArtCollectionItem';
import {ScreenContainer} from '../components/screenContainer';
import {appTheme} from '../theme';
import {Loading} from '../components/loading';
import {EmptyList} from '../components/emptyList';

export const ArtistScreen = () => {
  const {params} = useAppRoute<typeof ROUTES.ARTIST>();

  const {data: artist, isLoading} = useQuery({
    queryKey: [ROUTES.ARTIST, params.name],
    queryFn: () =>
      getRijksArtCollection({
        artist: params.name,
        resultsPerPage: 450,
      }),
    enabled: !!params.name,
  });

  return (
    <ScreenContainer>
      <Loading isLoading={isLoading} />
      <AnimatePresence>
        {artist && (
          <>
            <MotiView
              from={{translateY: 16}}
              animate={{translateY: 0}}
              style={styles.titleContainer}>
              <Text style={styles.artistName}>{params.name}</Text>
            </MotiView>
            <FlashList
              data={artist?.artObjects}
              keyExtractor={(item, index) => item?.id ?? index.toString()}
              renderItem={({item}) => <ArtCollectionItem {...item} />}
              estimatedItemSize={450}
              ListEmptyComponent={EmptyList}
            />
          </>
        )}
      </AnimatePresence>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    paddingVertical: 8,
  },
  artistName: {
    fontSize: 24,
    fontWeight: '700',
    color: appTheme.colors.text,
  },
});
