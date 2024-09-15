import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import React, { useState } from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Profile from '../screens/app-screens/profile';
import UserStack from './user-stack';
import { useNavigation } from '@react-navigation/native';
import ScreenNames from './routes'; // Assuming ScreenNames is imported correctly

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const navigation = useNavigation();

  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Department" component={UserStack} />
      <Drawer.Screen name="Profile" component={Profile} />

    
      <Drawer.Screen
        name="Logout"
        component={() => (
          <View style={{ flex: 1 }}>
            <DrawerItem
              label="Logout"
              onPress={()=>{ navigation.navigate(ScreenNames.LOGIN)}} // Open modal on press
            />

        
           
          </View>
        )}
        options={{ drawerLabel: 'Logout' }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

