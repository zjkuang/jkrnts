import i18next from 'i18next';

interface Glossary {
  helloWorld: string;
  iHaveSomeChildren_one?: string;
  iHaveSomeChildren_other?: string;
}

const translation_en: Glossary = {
  helloWorld: 'Hello, English world!',
  iHaveSomeChildren_one: 'I have a child.',
  iHaveSomeChildren_other: 'I have children.',
};

const translation_zh_CN: Glossary = {
  helloWorld: '你好，中文世界!',
};

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

export const changeLanguage = (language: string) => {
  i18next.changeLanguage(language);
};

// lStr: localized string
export const lStr = (key: string, params?: object) => {
  return i18next.t(key, params);
};
