import {changeLanguage} from '../../assets/strings';
import {useRefresh} from './useRefresh';

export const useChangeLanguage = (language: string) => {
  const refresh = useRefresh();
  changeLanguage(language);
  refresh();
};
