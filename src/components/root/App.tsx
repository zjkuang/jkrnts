import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {HelloWorld} from '../hello-world';
import {useTheme} from '../hooks';
import {themedStyles} from './style';

export const App = () => {
  const theme = useTheme();

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
