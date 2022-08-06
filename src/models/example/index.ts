import {types, Instance, SnapshotOut, SnapshotIn, flow} from 'mobx-state-tree';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persist} from 'mst-persist';
import {withRootStore} from '../RootStore/WithRootStore';

// doc: https://github.com/agilgur5/mst-persist

const MY_NAME = 'Example';

export enum DayOfWeek {
  Undefined = 'undefined',
  Sunday = 'Sunday',
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
}

export const ExampleModel = types
  .model(MY_NAME, {
    _value: types.optional(
      types.enumeration<DayOfWeek>(Object.values(DayOfWeek)),
      DayOfWeek.Sunday,
    ),
  })
  .extend(withRootStore)
  .views(self => ({
    get day(): number | undefined {
      switch (self._value) {
        case DayOfWeek.Sunday:
          return 1;
        case DayOfWeek.Monday:
          return 2;
        case DayOfWeek.Tuesday:
          return 3;
        case DayOfWeek.Wednesday:
          return 4;
        case DayOfWeek.Thursday:
          return 5;
        case DayOfWeek.Friday:
          return 6;
        case DayOfWeek.Saturday:
          return 7;
        default:
          return undefined;
      }
    },
  }))
  .actions(self => ({
    setValue(value: DayOfWeek) {
      self._value = value;
    },
  }))
  .actions(self => ({
    afterCreate: flow(function* loadFromStorage() {
      persist(MY_NAME, self, {
        storage: AsyncStorage,
        jsonify: true,
        // whitelist: ['_value'], // by default all will go into whitelist
        // blacklist: [],
      }).then(() => {
        console.log(`${MY_NAME} has been hydrated.`);
      });
    }),
    reset() {
      self.setValue(DayOfWeek.Sunday);
    },
  }))
  .actions(self => ({
    rotate() {
      switch (self._value) {
        case DayOfWeek.Sunday:
          self.setValue(DayOfWeek.Monday);
          break;
        case DayOfWeek.Monday:
          self.setValue(DayOfWeek.Tuesday);
          break;
        case DayOfWeek.Tuesday:
          self.setValue(DayOfWeek.Wednesday);
          break;
        case DayOfWeek.Wednesday:
          self.setValue(DayOfWeek.Thursday);
          break;
        case DayOfWeek.Thursday:
          self.setValue(DayOfWeek.Friday);
          break;
        case DayOfWeek.Friday:
          self.setValue(DayOfWeek.Saturday);
          break;
        case DayOfWeek.Saturday:
          self.setValue(DayOfWeek.Sunday);
          break;
        default:
          break;
      }
    },
  }));

export interface Example extends Instance<typeof ExampleModel> {}
export interface ExampleSnapshotOut extends SnapshotOut<typeof ExampleModel> {}
export interface ExampleSnapshotIn extends SnapshotIn<typeof ExampleModel> {}
