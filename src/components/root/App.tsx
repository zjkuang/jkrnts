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
            title={'Eng-\nlish'}
            flavor={'ios-bordered'}
            onPress={() => {
              changeLanguage('en');
            }}
            textProps={{numberOfLines: 2}}
          />
          <Button
            title={'中\n文'}
            flavor={'ios-bordered'}
            onPress={() => {
              changeLanguage('zh_CN');
            }}
            textProps={{
              numberOfLines: 2,
              style: {
                fontWeight: 'bold',
                color: 'red',
              },
            }}
          />
        </View>
        <Text style={themedStyles(theme).text}>{lStr('helloWorld')}</Text>
        {!isChinese() && (
          <Text style={themedStyles(theme).text}>
            {lStr('iHaveSomeChildren', {count: 2})}
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};
