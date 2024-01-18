import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ArtScreen, HomeScreen, ArtistScreen} from '../screens';
import {MuseumStacksRoutePrams} from './route.types';
import {ROUTES} from './routes';
import {BackButton} from '../components/BackButton.tsx';

const Stack = createNativeStackNavigator<MuseumStacksRoutePrams>();

export const MuseumStackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.HOME}
      screenOptions={{headerLeft: BackButton}}>
      <Stack.Screen
        name={ROUTES.HOME}
        component={HomeScreen}
        options={{headerLeft: undefined}}
      />
      <Stack.Screen
        name={ROUTES.ART}
        component={ArtScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ROUTES.ARTIST}
        component={ArtistScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
