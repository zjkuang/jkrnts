import {useColorScheme} from 'react-native';
import {useStores} from '../../models';
import {Theme} from '../../themes/colors';

export const useTheme = (): Theme => {
  const {
    preferences: {theme},
  } = useStores();
  const isDarkMode =
    (useColorScheme() === 'dark' && theme === 'system') || theme === 'dark';
  return isDarkMode ? 'dark' : 'light';
};
