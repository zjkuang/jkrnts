import React from 'react';
import {changeLanguage} from '../../assets/strings';

export const useChangeLanguage = () => {
  const [, setLang] = React.useState<string>();
  return React.useCallback((language: string) => {
    changeLanguage(language);
    setLang(language);
  }, []);
};
