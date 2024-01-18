import React from 'react';
import {FlashList} from '@shopify/flash-list';
import {useQuery} from '@tanstack/react-query';
import {AnimatePresence} from 'moti';
import {ROUTES} from '../router/routes';
import {getRijksArtCollection} from '../api/rijksMuseum';
import {ArtCollectionItem} from '../components/card/ArtCollectionItem';
import {ScreenContainer} from '../components/ScreenContainer';
import {Loading} from '../components/Loading';
import {EmptyList} from '../components/EmptyList';

export const HomeScreen = () => {
  const {data: homeArtList, isLoading} = useQuery({
    queryKey: [ROUTES.MUSEUM],
    queryFn: () => getRijksArtCollection({resultsPerPage: 450}),
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ScreenContainer>
      <AnimatePresence>
        {homeArtList && (
          <FlashList
            data={homeArtList.artObjects}
            keyExtractor={(item, index) => item?.id ?? index.toString()}
            renderItem={({item}) => <ArtCollectionItem {...item} />}
            estimatedItemSize={150}
            ListEmptyComponent={EmptyList}
          />
        )}
      </AnimatePresence>
    </ScreenContainer>
  );
};
