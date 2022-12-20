import * as React from 'react';
import {Text, View} from 'react-native';
import {observer} from 'mobx-react-lite';
import {hello, add, multiply} from '@zjkuang/react-native-utils';
import {i18nextStrings} from '../../assets/strings';
import {Button} from '../styled';
import {useTheme, useChangeLanguage} from '../hooks';
import {themedStyles} from './style';

export const HelloWorld = observer(() => {
  const [helloResult, setHelloResult] = React.useState<string>();
  const [addResult, setAddResult] = React.useState<number>();
  const [multiplyResult, setMultiplyResult] = React.useState<number>();
  const [numberOfGeese, setNumberOfGeese] = React.useState(0);
  const theme = useTheme();
  const changeLanguage = useChangeLanguage();

  const greeting = 'hi';
  const whom = 'there';
  const a = 3;
  const b = 7;

  React.useEffect(() => {
    hello(greeting, whom).then(setHelloResult).catch(setHelloResult);
    add(a, b)
      .then(setAddResult)
      .catch(reason => {
        console.log(`add() failed: ${JSON.stringify(reason)}`);
      });
    multiply(a, b)
      .then(setMultiplyResult)
      .catch(reason => {
        console.log(`multiply() failed: ${JSON.stringify(reason)}`);
      });
  }, []);

  const onPressNumberOfGeeseChange = React.useCallback(
    (action: '-' | '+') => {
      if (action === '-') {
        if (numberOfGeese > 0) {
          setNumberOfGeese(numberOfGeese - 1);
        }
      } else if (action === '+') {
        setNumberOfGeese(numberOfGeese + 1);
      }
    },
    [numberOfGeese],
  );

  const onPressLanguageButton = (
    language: 'en' | 'zh' | 'zh_CN' | 'zh_HK' | 'zh_TW',
  ) => {
    changeLanguage(language);
  };

  return (
    <View style={themedStyles(theme).baseView}>
      <Text style={themedStyles(theme).text}>{helloResult}</Text>
      {addResult !== undefined && (
        <Text style={themedStyles(theme).text}>
          {`${a} + ${b} = ${String(addResult)}`}
        </Text>
      )}
      {multiplyResult !== undefined && (
        <Text style={themedStyles(theme).text}>
          {`${a} x ${b} = ${String(multiplyResult)}`}
        </Text>
      )}
      <Text style={themedStyles(theme).text}>
        {i18nextStrings.Greetings.HelloWorld()}
      </Text>
      <Text style={themedStyles(theme).text}>
        {i18nextStrings.Statements.ICameFrom()}
      </Text>
      <View style={themedStyles(theme).horizontalContainer}>
        <Button
          title="-"
          flavor="ios-bordered"
          textProps={{style: themedStyles(theme).text}}
          onPress={() => onPressNumberOfGeeseChange('-')}
        />
        <Text style={themedStyles(theme).text}>
          {i18nextStrings.Statements.ISawGoose(numberOfGeese)}
        </Text>
        <Button
          title="+"
          flavor="ios-bordered"
          textProps={{style: themedStyles(theme).text}}
          onPress={() => onPressNumberOfGeeseChange('+')}
        />
      </View>
      <View style={themedStyles(theme).horizontalContainer}>
        <Button
          title="English"
          flavor="ios-bordered"
          textProps={{style: themedStyles(theme).text}}
          onPress={() => onPressLanguageButton('en')}
        />
        <Button
          title="中国大陆"
          flavor="ios-bordered"
          textProps={{style: themedStyles(theme).text}}
          onPress={() => onPressLanguageButton('zh_CN')}
        />
        <Button
          title="香港"
          flavor="ios-bordered"
          textProps={{style: themedStyles(theme).text}}
          onPress={() => onPressLanguageButton('zh_HK')}
        />
        <Button
          title="台灣"
          flavor="ios-bordered"
          textProps={{style: themedStyles(theme).text}}
          onPress={() => onPressLanguageButton('zh_TW')}
        />
      </View>
    </View>
  );
});
