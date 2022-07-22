import React from 'react';
import {SafeAreaView, StatusBar, Text, View} from 'react-native';
import {useTheme} from '../hooks';
import {themedStyles} from './style';

export const App = () => {
  const theme = useTheme();

  return (
    <SafeAreaView style={themedStyles(theme).safeArea}>
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <View style={themedStyles(theme).baseView}>
        <Text style={themedStyles(theme).text}>Hello, world!</Text>
      </View>
    </SafeAreaView>
  );
};
