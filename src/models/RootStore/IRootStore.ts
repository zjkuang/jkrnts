import {Example} from '../example';

export interface IRootStore {
  example: Example;

  reset(): void;
}
