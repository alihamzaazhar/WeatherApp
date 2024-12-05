import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from '../utils/types';
import DetailsScreen from '../screens/DetailsScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const MainStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name={'HomeScreen'} component={HomeScreen} />
        <Stack.Screen name={'DetailsScreen'} component={DetailsScreen} />
        <Stack.Screen name={'SettingsScreen'} component={SettingsScreen} />
      </Stack.Navigator>
    );
  };

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
};

export default RootNavigator;
