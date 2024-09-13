import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import UserHomeScreen from '../screens/app-screens/user';
import DesciplineScreen from '../screens/app-screens/discipline';
import SemesterScreen from '../screens/app-screens/semester';
import SectionScreen from '../screens/app-screens/section';
import ScreenNames from './routes';

const Stack = createNativeStackNavigator();

const UserStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={ScreenNames.USERHOMESCREEN}
        component={UserHomeScreen}
      />
      <Stack.Screen
        name={ScreenNames.DESCIPLINESCREEN}
        component={DesciplineScreen}
      />
      <Stack.Screen
        name={ScreenNames.SEMESTERSCREEN}
        component={SemesterScreen}
      />
      <Stack.Screen
        name={ScreenNames.SECTIONSCREEN}
        component={SectionScreen}
      />
    </Stack.Navigator>
  );
};
export default UserStack;
