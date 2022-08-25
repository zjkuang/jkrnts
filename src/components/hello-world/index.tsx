import React from 'react';
import {Text, View} from 'react-native';
import {observer} from 'mobx-react-lite';
import {add, multiply, hello} from '@zjkuang/react-native-utils';
import {useTheme} from '../hooks';
import {themedStyles} from './style';

export const HelloWorld = observer(() => {
  const [helloResult, setHelloResult] = React.useState<string>();
  const [addResult, setAddResult] = React.useState<number>();
  const [multiplyResult, setMultiplyResult] = React.useState<number>();
  const theme = useTheme();

  const greeting = 'hi';
  const whom = 'there';
  const a = 3;
  const b = 7;

  React.useEffect(() => {
    hello(greeting, whom).then(setHelloResult).catch(setHelloResult);
    add(a, b)
      .then(v => {
        setAddResult(v);
      })
      .catch(reason => {
        console.log(`add() failed: ${JSON.stringify(reason)}`);
      });
    multiply(a, b)
      .then(v => {
        setMultiplyResult(v);
      })
      .catch(reason => {
        console.log(`multiply() failed: ${JSON.stringify(reason)}`);
      });
  }, []);

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
    </View>
  );
});
