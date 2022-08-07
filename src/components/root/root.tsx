import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {observer} from 'mobx-react-lite';
import {HelloWorld} from '../hello-world';
import {useTheme} from '../hooks';
import {themedStyles} from './style';

export const Root = observer(() => {
  const theme = useTheme();

  return (
    <SafeAreaView style={themedStyles(theme).safeArea}>
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <HelloWorld />
    </SafeAreaView>
  );
});
