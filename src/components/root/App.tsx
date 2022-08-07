import React from 'react';
import {LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {IRootStore, RootStoreProvider, setupRootStore} from '../../models';
import {Root} from './root';

export const App = () => {
  const [rootStore, setRootStore] = React.useState<IRootStore>();

  LogBox.ignoreLogs([
    RegExp('^.*i18next::pluralResolver: no plural rule found for:.*$'),
  ]);

  React.useEffect(() => {
    setupRootStore().then(setRootStore);
  }, []);

  return rootStore ? (
    <RootStoreProvider value={rootStore}>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    </RootStoreProvider>
  ) : (
    <></>
  );
};
