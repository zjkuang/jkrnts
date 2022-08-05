import React from 'react';
import {BackHandler} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

// https://reactnavigation.org/docs/custom-android-back-button-handling/
export function useHardwareBackBlock() {
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        // Just don't do anything when the back button is pressed on this screen. 🤷‍♂️
        // Returning true means that we handled the back button successfully, even though that means doing nothing.
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );
}
