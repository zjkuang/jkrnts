import {types, Instance, SnapshotOut, SnapshotIn, flow} from 'mobx-state-tree';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persist} from 'mst-persist';
import {withRootStore} from '../RootStore/WithRootStore';

// doc: https://github.com/agilgur5/mst-persist

const MY_NAME = 'Preferences';

export type PreferredTheme = 'dark' | 'light' | 'system';
export type PreferredLanguage = 'en' | 'zh_CN';

export const PreferencesModel = types
  .model(MY_NAME, {
    _language: types.frozen<PreferredLanguage>('en'),
    _theme: types.frozen<PreferredTheme>('system'),
  })
  .extend(withRootStore)
  .views(self => ({
    get theme(): PreferredTheme {
      return self._theme;
    },
    get language(): PreferredLanguage {
      return self._language;
    },
  }))
  .actions(self => ({
    setTheme(value: PreferredTheme) {
      self._theme = value;
    },
    setLanguage(value: PreferredLanguage) {
      self._language = value;
    },
  }))
  .actions(self => ({
    afterCreate: flow(function* loadFromStorage() {
      persist(MY_NAME, self, {
        storage: AsyncStorage,
        jsonify: true,
        whitelist: ['_language', '_theme'], // by default all will go into whitelist
        // blacklist: [],
      }).then(() => {
        console.log(`${MY_NAME} has been hydrated.`);
      });
    }),
    reset() {
      self.setLanguage('en');
      self.setTheme('system');
    },
  }));

export interface Preferences extends Instance<typeof PreferencesModel> {}
export interface PreferencesSnapshotOut
  extends SnapshotOut<typeof PreferencesModel> {}
export interface PreferencesSnapshotIn
  extends SnapshotIn<typeof PreferencesModel> {}
