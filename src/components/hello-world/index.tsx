import React from 'react';
import {Text, View} from 'react-native';
import {observer} from 'mobx-react-lite';
import {useStores} from '../../models';
import {i18nextStrings, isChinese} from '../../assets/strings';
import {useChangeLanguage, useTheme} from '../hooks';
import {Button} from '../styled';
import {fixedStyles, themedStyles} from './style';

export const HelloWorld = observer(() => {
  const changeLanguage = useChangeLanguage();
  const [count, setCount] = React.useState(0);
  const {
    preferences: {theme: perferredTheme, setTheme},
  } = useStores();
  const theme = useTheme();

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
        {i18nextStrings.Greetings.HelloWorld()}
      </Text>
      <Text style={themedStyles(theme).text}>
        {i18nextStrings.Greetings.GreetingTo('Hi', 'David')}
      </Text>
      <Text style={themedStyles(theme).text}>
        {i18nextStrings.Statements.ICameFrom()}
      </Text>
      {!isChinese() && (
        <Text style={themedStyles(theme).text}>
          {i18nextStrings.Statements.IHaveSomeChildren(count)}
        </Text>
      )}
      {!isChinese() && (
        <View style={fixedStyles.rowView}>
          <Button
            title={'-'}
            flavor={'ios-bordered'}
            onPress={() => {
              count > 0 && setCount(count - 1);
            }}
          />
          <Text style={themedStyles(theme).text}>{count}</Text>
          <Button
            title={'+'}
            flavor={'ios-bordered'}
            onPress={() => {
              setCount(count + 1);
            }}
          />
        </View>
      )}
      <View style={fixedStyles.rowView}>
        <Button
          title={'dark'}
          flavor={'ios-bordered'}
          onPress={() => {
            setTheme('dark');
          }}
          textStyle={perferredTheme === 'dark' ? fixedStyles.textSelected : {}}
        />
        <Button
          title={'light'}
          flavor={'ios-bordered'}
          onPress={() => {
            setTheme('light');
          }}
          textStyle={perferredTheme === 'light' ? fixedStyles.textSelected : {}}
        />
        <Button
          title={'system'}
          flavor={'ios-bordered'}
          onPress={() => {
            setTheme('system');
          }}
          textStyle={
            perferredTheme === 'system' ? fixedStyles.textSelected : {}
          }
        />
      </View>
    </View>
  );
});
