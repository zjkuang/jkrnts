import {SnapshotOut, types} from 'mobx-state-tree';
import {ExampleModel} from '../example';
import {IRootStore} from './IRootStore';

/**
 * A RootStore model. To avoid circular reference problems, you
 * MUST add your type to IRootStore.ts as well
 */
export const RootStoreModel = types
  .model('RootStore', {
    example: types.optional(ExampleModel, {}),
  })
  .actions(self => ({
    afterCreate() {
      //
    },
    reset() {
      self.example.reset();
    },
  }));

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}

export async function setupRootStore(snapshot?: Partial<RootStoreSnapshot>) {
  let rootStore: IRootStore;

  // load data from storage
  rootStore = RootStoreModel.create(snapshot || {});

  return rootStore;
}
