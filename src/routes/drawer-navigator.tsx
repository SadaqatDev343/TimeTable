import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import Profile from '../screens/app-screens/profile';
import UserStack from './user-stack';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator screenOptions={{headerShown: false}}>
      <Drawer.Screen name="UserDrawer" component={UserStack} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
