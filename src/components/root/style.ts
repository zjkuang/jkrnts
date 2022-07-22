import {StyleSheet} from 'react-native';
import {colors, Theme} from '../../themes';

export const fixedStyles = StyleSheet.create({
  //
});

export const themedStyles = (theme: Theme) => {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors(theme).background,
    },
    baseView: {
      width: '100%',
      height: '100%',
      backgroundColor: colors(theme).background,
      justifyContent: 'center', // along primary axis
      alignItems: 'center', // along secondary axis
    },
    text: {
      color: colors(theme).text,
    },
  });
};
