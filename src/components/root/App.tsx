import React from 'react';
import {SafeAreaView, StatusBar, Text, View} from 'react-native';
import {lStr} from '../../assets/strings';
import {useTheme} from '../hooks';
import {Button} from '../styled';
import {themedStyles} from './style';

export const App = () => {
  const theme = useTheme();

  return (
    <SafeAreaView style={themedStyles(theme).safeArea}>
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <View style={themedStyles(theme).baseView}>
        <Button
          title={'test'}
          style={{
            borderWidth: 1,
            borderColor: 'lightGray',
            marginHorizontal: 8,
            marginVertical: 2,
          }}
        />
        <Text style={themedStyles(theme).text}>{lStr('helloWorld')}</Text>
        <Text style={themedStyles(theme).text}>
          {lStr('iHaveSomeChildren', {count: 2})}
        </Text>
      </View>
    </SafeAreaView>
  );
};
