import {useCallback} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {MuseumStackNavigation} from './StackProvidder';
import {BookmarksScreen} from '../screens';
import {RootTabNavigationParams} from './route.types';
import {ROUTES} from './routes';
import {Museum} from '../components/icons';
import {Bookmark} from '../components/icons/bookmark';
import {BackButton} from '../components/BackButton';
import {ToggleThemeButton} from '../components/ToggleTheme.tsx';
import {useTheme} from '../store';

const Tab = createBottomTabNavigator<RootTabNavigationParams>();

export const TabNavigator = () => {
  const {theme} = useTheme();
  const handleFill = useCallback(
    (focused: boolean) =>
      focused ? theme.colors.icons.selected : theme.colors.icons.unselected,
    [theme.colors.icons.selected, theme.colors.icons.unselected],
  );

  return (
    <NavigationContainer theme={theme}>
      <Tab.Navigator
        backBehavior="history"
        initialRouteName={ROUTES.MUSEUM}
        screenOptions={{headerLeft: BackButton}}>
        <Tab.Screen
          name={ROUTES.MUSEUM}
          component={MuseumStackNavigation}
          options={{
            headerShown: false,
            tabBarIcon: ({focused, size, color}) => (
              <Museum
                stroke={color}
                width={size}
                height={size}
                fill={handleFill(focused)}
              />
            ),
          }}
        />
        <Tab.Screen
          name={ROUTES.BOOKMARKS}
          component={BookmarksScreen}
          options={{
            tabBarIcon: ({focused, size, color}) => (
              <Bookmark
                stroke={color}
                width={size}
                height={size}
                fill={handleFill(focused)}
              />
            ),
            headerLeft: undefined,
            headerRight: ToggleThemeButton,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
