import {useColorScheme} from 'react-native';
import {Theme} from '../../themes/colors';

export const useTheme = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const theme: Theme = isDarkMode ? 'dark' : 'light';
  return theme;
};
