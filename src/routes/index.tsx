import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import ScreenNames, {RootStackParamList} from './routes';
import {
  Admin_LOGIN,
  CreatePassword,
  ForgotPassword,
  Login,
  Signup,
  VerifyOtp,
} from '../screens/auth-screens';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export default function Routes() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={ScreenNames.LOGIN}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={ScreenNames.LOGIN} component={Login} />
        <Stack.Screen name={ScreenNames.SIGNUP} component={Signup} />
        <Stack.Screen
          name={ScreenNames.FORGET_PASSWORD}
          component={ForgotPassword}
        />
        <Stack.Screen name={ScreenNames.VERIFY_OTP} component={VerifyOtp} />
        <Stack.Screen
          name={ScreenNames.CREATE_PASSWORD}
          component={CreatePassword}
        />
        <Stack.Screen name={ScreenNames.Admin_LOGIN} component={Admin_LOGIN} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
