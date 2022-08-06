import React from 'react';
import {Text, View} from 'react-native';
import {lStr, isChinese} from '../../assets/strings';
import {useChangeLanguage, useTheme} from '../hooks';
import {Button} from '../styled';
import {fixedStyles, themedStyles} from './style';

export const HelloWorld = () => {
  const theme = useTheme();
  const changeLanguage = useChangeLanguage();
  const [count, setCount] = React.useState(0);

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
      <Text style={themedStyles(theme).text}>
        {lStr('greeting', {
          greeting: isChinese() ? '你好' : 'Hello',
          to: isChinese() ? '中文世界' : 'English world',
        })}
      </Text>
      <Text style={themedStyles(theme).text}>
        {lStr('iHaveSomeChildren', {count})}
      </Text>
      <View style={fixedStyles.rowView}>
        <Button
          title={'-'}
          flavor={'ios-bordered'}
          onPress={() => {
            count > 0 && setCount(count - 1);
          }}
        />
        <Text>{count}</Text>
        <Button
          title={'+'}
          flavor={'ios-bordered'}
          onPress={() => {
            setCount(count + 1);
          }}
        />
      </View>
    </View>
  );
};