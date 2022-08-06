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
  });
};
