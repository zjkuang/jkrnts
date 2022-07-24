import React from 'react';
import {SafeAreaView, StatusBar, Text, View} from 'react-native';
import {lStr, changeLanguage as chgLang} from '../../assets/strings';
import {useRefresh, useTheme} from '../hooks';
import {Button} from '../styled';
import {themedStyles} from './style';

export const App = () => {
  const theme = useTheme();
  const [disablePlural, setDisablePlural] = React.useState(false);

  const refresh = useRefresh();
  const changeLanguage = React.useCallback(
    (language: string) => {
      chgLang(language);
      refresh();
    },
    [refresh],
  );

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
              setDisablePlural(false);
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
              setDisablePlural(true);
            }}
            textProps={{numberOfLines: 1}}
          />
        </View>
        <Text style={themedStyles(theme).text}>{lStr('helloWorld')}</Text>
        {!disablePlural && (
          <Text style={themedStyles(theme).text}>
            {lStr('iHaveSomeChildren', {count: 1})}
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};
