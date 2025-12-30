import 'react-native-gesture-handler';
import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { StackNavigator } from './presentation/navigation/StackNavigator';
import { useColorScheme } from 'react-native';
import { AuthProvider } from './presentation/providers/AuthProvider';

export const ProductsApp = () => {
  const colorScheme = useColorScheme();
  const evaTheme = colorScheme === 'dark' ? eva.dark : eva.light;

  const backgroundColor =
    colorScheme === 'dark' ? evaTheme['color-basic-800'] : evaTheme['color-basic-100'];

  const navigationTheme = {
    ...(colorScheme === 'dark' ? DarkTheme : DefaultTheme),
    colors: {
      ...(colorScheme === 'dark' ? DarkTheme.colors : DefaultTheme.colors),
      primary: evaTheme['color-primary-500'],
      background: backgroundColor,
      card: evaTheme['color-basic-100'],
      text: evaTheme['text-basic-color'],
      border: evaTheme['color-primary-800'],
      notification: evaTheme['color-primary-500'],
    },
  };

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={evaTheme}>
        <NavigationContainer theme={navigationTheme}>
          <AuthProvider>
            <StackNavigator/>
          </AuthProvider>
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
};
