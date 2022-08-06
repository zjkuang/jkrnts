import React from 'react';
import {LogBox, SafeAreaView, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {HelloWorld} from '../hello-world';
import {useTheme} from '../hooks';
import {themedStyles} from './style';

export const App = () => {
  const theme = useTheme();

  LogBox.ignoreLogs([
    RegExp('^.*i18next::pluralResolver: no plural rule found for:.*$'),
  ]);

  return (
    <NavigationContainer>
      <SafeAreaView style={themedStyles(theme).safeArea}>
        <StatusBar
          barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        />
        <HelloWorld />
      </SafeAreaView>
    </NavigationContainer>
  );
};
