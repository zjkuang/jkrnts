import React from 'react';
import {observer} from 'mobx-react-lite';
import {
  Text,
  TouchableOpacity,
  StyleProp,
  TextProps,
  TouchableOpacityProps,
  TextStyle,
} from 'react-native';
import {useTheme} from '../../hooks';
import {themedStyles} from './style';

// Example
// <Button
//   title={'Submit\nForm'}
//   flavor={'ios-bordered'}
//   onPress={() => {
//     submit();
//   }}
//   textProps={{numberOfLines: 2, style: {fontWeight: 'bold'}}}
// />
export type ButtonFlavor = 'ios-borderless' | 'ios-bordered' | 'plain';
interface ButtonProps extends TouchableOpacityProps {
  title: string;
  flavor?: ButtonFlavor;
  textStyle?: StyleProp<TextStyle>;
  textProps?: TextProps; // such as numberOfLines
}
export const Button = observer((props: ButtonProps) => {
  const theme = useTheme();
  let flavorStyleButton = {};
  let flavorStyleText = {};
  switch (props.flavor) {
    case 'ios-bordered':
      flavorStyleButton = {...themedStyles(theme).iosButtonBordered};
      flavorStyleText = {...themedStyles(theme).iosButtonText};
      break;
    case 'plain':
      flavorStyleButton = {...themedStyles(theme).plainButton};
      flavorStyleText = {...themedStyles(theme).plainButtonText};
      break;
    case 'ios-borderless':
    default:
      flavorStyleButton = {...themedStyles(theme).iosButtonBorderless};
      flavorStyleText = {...themedStyles(theme).iosButtonText};
      break;
  }
  console.log(
    `*** *** Button :: flavorStyleButton: ${JSON.stringify(flavorStyleButton)}`,
  );
  return (
    <TouchableOpacity style={[{...flavorStyleButton}, props.style]} {...props}>
      <Text
        style={[{...flavorStyleText}, props.textStyle]}
        {...props.textProps}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
});
