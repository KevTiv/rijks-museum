/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-reanimated';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {TabNavigator} from './src/router';
import {ColorSchemeProvider} from './src/theme/ColorSchemeProvider';
import {FallbackComponent} from './src/components/FallBackComponent.tsx';
import ErrorBoundary from 'react-native-error-boundary';
import {StyleSheet} from 'react-native';

const client = new QueryClient();
const errorHandler = (error: Error, stackTrace: string | undefined) => {
  console.error(error, stackTrace);
};

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider style={styles.container}>
        <ErrorBoundary
          FallbackComponent={FallbackComponent}
          onError={errorHandler}>
          <QueryClientProvider client={client}>
            <ColorSchemeProvider>
              <TabNavigator />
            </ColorSchemeProvider>
          </QueryClientProvider>
        </ErrorBoundary>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
