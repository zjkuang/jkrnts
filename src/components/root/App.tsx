import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {themedStyles, Theme} from './style';

export const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const theme: Theme = isDarkMode ? 'dark' : 'light';

  return (
    <SafeAreaView style={themedStyles(theme).safeArea}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={themedStyles(theme).baseView}>
        <Text style={themedStyles(theme).text}>Hello, world!</Text>
      </View>
    </SafeAreaView>
  );
};
