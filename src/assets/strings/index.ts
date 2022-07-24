import i18next from 'i18next';

interface Glossary {
  helloWorld: string;
  iHaveSomeChildren_one: string;
  iHaveSomeChildren_other: string;
}

const translation_en: Glossary = {
  helloWorld: 'Hello, English world!',
  iHaveSomeChildren_one: 'I have one child.',
  iHaveSomeChildren_other: 'I have {{count}} children.',
};

if (!i18next.isInitialized) {
  i18next.init({
    lng: 'en', // if you're using a language detector, do not define the lng option
    debug: true,
    resources: {
      en: {
        translation: translation_en,
      },
    },
  });
  console.log('i18next initialized.');
}

// lStr: localized string
export const lStr = (key: string, params?: object) => {
  return i18next.t(key, params);
};
