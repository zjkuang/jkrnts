import i18next from 'i18next';
import 'intl-pluralrules';
import {translation_en} from './translations/en';
import {translation_zh} from './translations/zh';
import {translation_zh_CN} from './translations/zh_CN';
import {translation_zh_HK} from './translations/zh_HK';
import {translation_zh_TW} from './translations/zh_TW';

if (!i18next.isInitialized) {
  i18next.init({
    lng: 'en', // if you're using a language detector, do not define the lng option
    debug: true,
    resources: {
      en: {
        translation: translation_en,
      },
      zh: {
        translation: translation_zh,
      },
      zh_CN: {
        translation: translation_zh_CN,
      },
      zh_HK: {
        translation: translation_zh_HK,
      },
      zh_TW: {
        translation: translation_zh_TW,
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
export * from './i18nextStrings';
