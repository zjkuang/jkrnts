import i18next from 'i18next';
import 'intl-pluralrules';
import {translation_en} from '../strings/generated/translations/en';
import {translation_zh} from '../strings/generated/translations/zh';
import {translation_zh_CN} from '../strings/generated/translations/zh_CN';
import {translation_zh_HK} from '../strings/generated/translations/zh_HK';
import {translation_zh_TW} from '../strings/generated/translations/zh_TW';

// There is no plural rule for Chinese. So only _zero could be recognized in the key for Chinese.
// e.g. In en (English) we could have
//   'IHaveSomeChildren_zero': 'I have no child.',
//   'IHaveSomeChildren_one': 'I have a child.',
//   'IHaveSomeChildren_two': 'I have two children.',
//   'IHaveSomeChildren_other': 'I have some children.',
// but in zh_CN (Chinese Simplified) we could only have
//   'IHaveSomeChildren_zero': '我没有孩子。',
//   'IHaveSomeChildren': '我有孩子。',
//   // IHaveSomeChildren_one, IHaveSomeChildren_two, IHaveSomeChildren_other... couldn't be recognized.

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
export * from '../strings/generated/i18nextStrings';
