import React from 'react';
import {SafeAreaView, StatusBar, Text, View} from 'react-native';
import {lStr, isChinese} from '../../assets/strings';
import {useChangeLanguage, useTheme} from '../hooks';
import {Button} from '../styled';
import {themedStyles} from './style';

export const App = () => {
  const theme = useTheme();
  const changeLanguage = useChangeLanguage();

  return (
    <SafeAreaView style={themedStyles(theme).safeArea}>
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <View style={themedStyles(theme).baseView}>
        <View style={{flexDirection: 'row'}}>
          <Button
            title={'English'}
            flavor={'ios-bordered'}
            onPress={() => {
              changeLanguage('en');
            }}
            textProps={{numberOfLines: 1}}
          />
          <Button
            title={'中文'}
            flavor={'ios-bordered'}
            onPress={() => {
              changeLanguage('zh_CN');
            }}
            textProps={{numberOfLines: 1}}
          />
        </View>
        <Text style={themedStyles(theme).text}>{lStr('helloWorld')}</Text>
        {!isChinese() && (
          <Text style={themedStyles(theme).text}>
            {lStr('iHaveSomeChildren', {count: 1})}
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};
