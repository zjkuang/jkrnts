import React from 'react';
import {Text, View} from 'react-native';
import {observer} from 'mobx-react-lite';
// import {multiply} from '@zjkuang/react-native-utils';
import {add, multiply} from 'react-native-yet-another-utils';
import {useTheme} from '../hooks';
import {themedStyles} from './style';

export const HelloWorld = observer(() => {
  const [addResult, setAddResult] = React.useState<number>();
  const [multiplyResult, setMultiplyResult] = React.useState<number>();
  const theme = useTheme();

  React.useEffect(() => {
    add(3, 7)
      .then(v => {
        setAddResult(v);
      })
      .catch(reason => {
        console.log(`add() failed: ${JSON.stringify(reason)}`);
      });
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
      <Text style={themedStyles(theme).text}>
        {`addResult: ${
          addResult === undefined ? 'undefined' : String(addResult)
        }`}
      </Text>
      <Text style={themedStyles(theme).text}>
        {`multiplyResult: ${
          multiplyResult === undefined ? 'undefined' : String(multiplyResult)
        }`}
      </Text>
    </View>
  );
});
