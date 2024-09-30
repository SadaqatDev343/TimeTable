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
import AdminHomeScreen from '../screens/app-screens/admin';
import ContactUs from '../screens/common-screens';
import DrawerNavigator from './drawer-navigator';
import DesciplineScreen from '../screens/app-screens/discipline';
import SemesterScreen from '../screens/app-screens/semester';
import SectionScreen from '../screens/app-screens/section';
import AddDisciplineScreen from '../screens/app-screens/AddDiscipline';
import AddDepartmentScreen from '../screens/app-screens/AddDepartment';
import AddSectionScreen from '../screens/app-screens/AddSection';
import AddSemesterScreen from '../screens/app-screens/AddSemester';
import ViewTable from '../screens/app-screens/ViewTable';
import AddTableScreen from '../screens/app-screens/AddTable';

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
        <Stack.Screen name={ScreenNames.CONTACT_US} component={ContactUs} />
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
        <Stack.Screen
          name={ScreenNames.ADD_DEPARTMENT}
          component={AddDepartmentScreen}
        />
        <Stack.Screen
          name={ScreenNames.ADD_DISCIPLINE}
          component={AddDisciplineScreen}
        />
        <Stack.Screen
          name={ScreenNames.ADD_SECTION}
          component={AddSectionScreen}
        />
        <Stack.Screen
          name={ScreenNames.ADD_SEMESTER}
          component={AddSemesterScreen}
        />
        <Stack.Screen
          name={ScreenNames.ADMINHOMESCREEN}
          component={AdminHomeScreen}
        />
        <Stack.Screen name={ScreenNames.VIEWTABLE} component={ViewTable} />
        <Stack.Screen name={ScreenNames.ADD_TABLE} component={AddTableScreen} />
        <Stack.Screen
          name={ScreenNames.DRAWER}
          children={({route}) => <DrawerNavigator role={route.params?.role} />}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
