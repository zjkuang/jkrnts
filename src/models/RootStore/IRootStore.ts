import {Example} from '../example';
import {Preferences} from '../preferences';

export interface IRootStore {
  example: Example;
  preferences: Preferences;

  reset(): void;
}
