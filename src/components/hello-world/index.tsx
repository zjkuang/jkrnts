import React from 'react';
import {Text, View} from 'react-native';
import {observer} from 'mobx-react-lite';
import {multiply} from '@zjkuang/react-native-utils';
import {useStores} from '../../models';
import {i18nextStrings} from '../../assets/strings';
import {useChangeLanguage, useTheme} from '../hooks';
import {Button} from '../styled';
import {fixedStyles, themedStyles} from './style';

export const HelloWorld = observer(() => {
  const changeLanguage = useChangeLanguage();
  const [count, setCount] = React.useState(0);
  const [multiplyResult, setMultiplyResult] = React.useState<number>();
  const {
    preferences: {theme: perferredTheme, setTheme},
  } = useStores();
  const theme = useTheme();

  React.useEffect(() => {
    multiply(3, 7)
      .then(v => {
        setMultiplyResult(v);
      })
      .catch(reason => {
        console.log(`multiply() failed: ${JSON.stringify(reason)}`);
      });
  }, []);

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
      <View style={fixedStyles.rowView}>
        <Button
          title={'-'}
          flavor={'ios-bordered'}
          onPress={() => {
            count > 0 && setCount(count - 1);
          }}
        />
        <Text style={themedStyles(theme).text}>
          {i18nextStrings.Statements.IHaveSomeChildren(count)}
        </Text>
        <Button
          title={'+'}
          flavor={'ios-bordered'}
          onPress={() => {
            setCount(count + 1);
          }}
        />
      </View>
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
      <Text style={themedStyles(theme).text}>
        {`multiplyResult: ${
          multiplyResult === undefined ? 'undefined' : String(multiplyResult)
        }`}
      </Text>
    </View>
  );
});
