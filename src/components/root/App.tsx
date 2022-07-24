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
            style={{
              margin: 8,
              borderWidth: 1,
              borderColor: 'lightGray',
              borderRadius: 6,
              paddingHorizontal: 8,
              paddingVertical: 2,
            }}
            title={'English'}
            onPress={() => {
              console.log('*** Setting en...');
              changeLanguage('en');
            }}
            textProps={{numberOfLines: 1}}
          />
          <Button
            style={{
              margin: 8,
              borderWidth: 1,
              borderColor: 'lightGray',
              borderRadius: 6,
              paddingHorizontal: 8,
              paddingVertical: 2,
            }}
            title={'中文'}
            onPress={() => {
              console.log('*** Setting zh_CN...');
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
