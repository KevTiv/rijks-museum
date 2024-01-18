import {create, StateCreator} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ArtObject} from '../api/types';
import {appLightTheme, appTheme} from '../theme';

export type BookmarkedArtObject = {
  bookmarks: ArtObject[];
  getBookmarks: () => ArtObject[];
  addBookMarks: (artObject: ArtObject) => void;
  deleteBookmarks: (artObjectId: string) => void;
  getBookmarkById: (id?: string) => ArtObject | undefined;
  updateBookmarks: (artObject: ArtObject) => void;
};

export type UserAction = 'manage' | 'search' | undefined;
type BookmarkUserAction = {
  action?: UserAction;
  getCurrentAction: () => UserAction;
  setCurrentAction: (action: UserAction) => void;
};

type themeProperties = typeof appTheme;
export type ThemeSlice = {
  colorSchemeName: 'light' | 'dark';
  theme: themeProperties;
  toggleTheme: () => void;
};

const createThemeStore: StateCreator<ThemeSlice> = set => ({
  colorSchemeName: 'dark',
  theme: appTheme,
  toggleTheme: () =>
    set(state => ({
      theme: state.theme === appTheme ? appLightTheme : appTheme,
      colorSchemeName: state.theme === appTheme ? 'light' : 'dark',
    })),
});

export const createBookmarkedArtObjectSlice: StateCreator<
  BookmarkedArtObject
> = (set, get) => ({
  bookmarks: [],
  getBookmarks: () => get().bookmarks,
  addBookMarks: artObject => {
    set(state => ({
      bookmarks: [...state.bookmarks, artObject],
    }));
  },
  deleteBookmarks: artObjectId => {
    set(state => ({
      bookmarks: state.bookmarks.filter(obj => obj.id !== artObjectId),
    }));
  },
  getBookmarkById: id => {
    return get().bookmarks.find(entry => entry.id === id);
  },
  updateBookmarks: artObject => {
    set(state => ({
      bookmarks: state.bookmarks.map(obj =>
        obj.id === artObject.id ? artObject : obj,
      ),
    }));
  },
});

const createUserBookMarksAction: StateCreator<BookmarkUserAction> = (
  set,
  get,
) => ({
  action: undefined,
  getCurrentAction: () => get().action,
  setCurrentAction: action => set({action}),
});

export const useTheme = create(
  persist(createThemeStore, {
    name: 'theme', // unique name for persisting the state
    // include other persist configuration if needed
    storage: createJSONStorage(() => AsyncStorage),
  }),
);

export const useBookmarkStore = create(
  persist(createBookmarkedArtObjectSlice, {
    name: 'bookmarked-art-objects', // unique name for persisting the state
    // include other persist configuration if needed
    storage: createJSONStorage(() => AsyncStorage),
  }),
);

export const userUserAction = create(createUserBookMarksAction);
