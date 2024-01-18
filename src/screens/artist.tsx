import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import {AnimatePresence, MotiView as Box, SafeAreaView} from 'moti';
import {useQuery} from '@tanstack/react-query';
import {useAppRoute} from '../hooks/appNavigation';
import {ROUTES} from '../router/routes';
import {getRijksArtCollection} from '../api/rijksMuseum';
import {ArtCollectionItem} from '../components/card/ArtCollectionItem';
import {ScreenContainer} from '../components/ScreenContainer';
import {Loading} from '../components/Loading';
import {EmptyList} from '../components/EmptyList';
import {useTheme} from '../store';
import {BackButton} from '../components/BackButton';

export const ArtistScreen = () => {
  const {theme} = useTheme();
  const {params} = useAppRoute<typeof ROUTES.ARTIST>();

  const {data: artist, isLoading} = useQuery({
    queryKey: [ROUTES.ARTIST, params.name],
    queryFn: () =>
      getRijksArtCollection({
        artist: params.name,
        resultsPerPage: 45,
      }),
    enabled: !!params.name,
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScreenContainer>
        <BackButton />

        <AnimatePresence>
          {artist && (
            <>
              <Box
                from={{translateY: 16}}
                animate={{translateY: 0}}
                style={styles.titleContainer}>
                <Text style={[styles.artistName, {color: theme.colors.text}]}>
                  {params.name}
                </Text>
              </Box>
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
    </SafeAreaView>
  );
};

const theme = useTheme.getState().theme;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    paddingVertical: theme.sizes.md,
  },
  artistName: {
    fontSize: theme.sizes.xl,
    fontWeight: '700',
  },
});
