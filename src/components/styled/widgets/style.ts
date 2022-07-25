import {StyleSheet} from 'react-native';
import {colors, Theme} from '../../../themes';

export const fixedStyles = StyleSheet.create({
  centerizeContents: {
    justifyContent: 'center', // along primary axis
    alignItems: 'center', // along secondary axis
  },
});

export const themedStyles = (theme: Theme) => {
  return StyleSheet.create({
    iosButtonText: {
      color: colors(theme).iOSButton,
    },
    plainButtonText: {
      color: colors(theme).text,
    },
    iosButtonBordered: {
      margin: 8,
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderWidth: 0.5,
      borderColor: colors(theme).border,
      borderRadius: 6,
    },
    iosButtonBorderless: {
      margin: 8,
    },
    plainButton: {
      margin: 8,
      paddingHorizontal: 8,
      paddingVertical: 2,
      // A plain Button must have a border otherwise it looks exactly like a Text
      borderWidth: 0.5,
      borderColor: colors(theme).border,
      borderRadius: 6,
    },
  });
};
