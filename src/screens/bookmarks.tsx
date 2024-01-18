import React, {useCallback, useState} from 'react';
import {FlashList} from '@shopify/flash-list';

import {useBookmarkStore, UserAction, userUserAction} from '../store';
import {ScreenContainer} from '../components/ScreenContainer';
import {BookmarkItem} from '../components/card/BookmarkItem';
import {BookmarksUserActions} from '../components/BookmarksUserActions';
import {EmptyList} from '../components/EmptyList';

export const BookmarksScreen = () => {
  const [userInput, setUserInput] = useState<string>('');

  const {getBookmarks} = useBookmarkStore();
  const {setCurrentAction, getCurrentAction} = userUserAction();
  const handleAction = useCallback(
    (action: UserAction) =>
      setCurrentAction(getCurrentAction() !== action ? action : undefined),
    [getCurrentAction, setCurrentAction],
  );
  const getFilteredBookmarks = useCallback(() => {
    return userInput?.length > 0
      ? getBookmarks().filter(
          entry =>
            entry.title?.includes(userInput) ||
            entry.principalOrFirstMaker?.includes(userInput),
        )
      : getBookmarks();
  }, [getBookmarks, userInput]);

  return (
    <ScreenContainer>
      <BookmarksUserActions
        handleAction={handleAction}
        userInput={userInput}
        setUserInput={setUserInput}
      />
      {getBookmarks().length > 0 && (
        <FlashList
          data={getFilteredBookmarks()}
          estimatedItemSize={50}
          keyExtractor={item => item.id!}
          numColumns={2}
          renderItem={({item}) => <BookmarkItem {...item} />}
          ListEmptyComponent={EmptyList}
        />
      )}
    </ScreenContainer>
  );
};
