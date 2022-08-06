import React from 'react';
import {Text, View} from 'react-native';
import {lStr, isChinese} from '../../assets/strings';
import {useChangeLanguage, useTheme} from '../hooks';
import {Button} from '../styled';
import {fixedStyles, themedStyles} from './style';

export const HelloWorld = () => {
  const theme = useTheme();
  const changeLanguage = useChangeLanguage();

  return (
    <View style={themedStyles(theme).baseView}>
      <View style={fixedStyles.rowView}>
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
  );
};
