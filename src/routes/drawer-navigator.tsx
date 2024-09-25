import {createDrawerNavigator, DrawerItem} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import Profile from '../screens/app-screens/profile';
import ScreenNames from './routes';
import UserStack from './user-stack';
import {errorMessage, successMessage} from '../utills/method';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();

const Logout = () => {
  const navigation = useNavigation();

  return (
    <View style={{flex: 1}}>
      <DrawerItem
        label="Logout"
        onPress={async () => {
          try {
            await AsyncStorage.removeItem('token');
            successMessage('Logout successful');
            //@ts-ignore
            navigation.replace(ScreenNames.LOGIN);
          } catch (error) {
            errorMessage('Error logging out');
          }
        }}
      />
    </View>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator screenOptions={{headerShown: false}}>
      <Drawer.Screen name="Department" component={UserStack} />
      <Drawer.Screen name="Profile" component={Profile} />

      {/* Refactor Logout screen */}
      <Drawer.Screen name="Logout" options={{drawerLabel: 'Logout'}}>
        {() => <Logout />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
