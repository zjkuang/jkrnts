import React from 'react';
import {Text, TouchableOpacity, TextProps} from 'react-native';

// TODO: observe theme change

interface ButtonProps extends TextProps {
  title: string;
}
export const Button = (props: ButtonProps) => {
  return (
    <TouchableOpacity>
      <Text {...props}>{props.title}</Text>
    </TouchableOpacity>
  );
};
