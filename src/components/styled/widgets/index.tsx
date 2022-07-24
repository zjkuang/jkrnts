import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleProp,
  TextProps,
  TouchableOpacityProps,
} from 'react-native';

// TODO: observe theme change

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  textStyle?: StyleProp<TextProps>;
  textProps: TextProps;
}
export const Button = (props: ButtonProps) => {
  return (
    <TouchableOpacity {...props}>
      <Text style={props.textStyle} {...props.textProps}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};
