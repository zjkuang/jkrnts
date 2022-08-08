// Generated file. Don't edit.

import i18next from 'i18next';

export const i18nextStrings = {
  Greetings: {
    HelloWorld: () => {
      return i18next.t('Greetings.HelloWorld');
    },
    GreetingTo: (greeting: string, whom: string) => {
      return i18next.t('Greetings.GreetingTo', {
        greeting,
        whom,
      });
    },
  },
  Statements: {
    ICameFrom: () => {
      return i18next.t('Statements.ICameFrom');
    },
    IHaveSomeChildren: (count: number) => {
      return i18next.t('Statements.IHaveSomeChildren', {
        count,
      });
    },
  },
};
