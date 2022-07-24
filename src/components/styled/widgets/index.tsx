import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleProp,
  TextProps,
  TouchableOpacityProps,
} from 'react-native';
import {useTheme} from '../../hooks';
import {themedStyles} from './style';

// TODO: observe theme change

export type ButtonFlavor = 'ios-borderless' | 'ios-bordered' | 'plain';
interface ButtonProps extends TouchableOpacityProps {
  title: string;
  flavor?: ButtonFlavor;
  textStyle?: StyleProp<TextProps>;
  textProps?: TextProps; // such as numberOfLines
}
export const Button = (props: ButtonProps) => {
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
  return (
    <TouchableOpacity style={[{...flavorStyleButton}, props.style]} {...props}>
      <Text
        style={[{...flavorStyleText}, props.textStyle]}
        {...props.textProps}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};
