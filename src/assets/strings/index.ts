import i18next from 'i18next';
import 'intl-pluralrules';
import {translation_en} from './en';
import {translation_zh_CN} from './zh_CN';

if (!i18next.isInitialized) {
  i18next.init({
    lng: 'en', // if you're using a language detector, do not define the lng option
    debug: true,
    resources: {
      en: {
        translation: translation_en,
      },
      zh_CN: {
        translation: translation_zh_CN,
      },
    },
  });
  console.log('i18next initialized.');
}

export const isChinese = () => {
  return i18next.language?.substring(0, 2) === 'zh';
};
export const isEnglish = () => {
  return i18next.language?.substring(0, 2) === 'en';
};

export const changeLanguage = (language: string) => {
  i18next.changeLanguage(language);
};

// lStr: localized string
export const lStr = (key: string, params?: object) => {
  return i18next.t(key, params);
};
