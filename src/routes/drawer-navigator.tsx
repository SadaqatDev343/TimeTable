import {
  createDrawerNavigator,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import Profile from '../screens/app-screens/profile';
import ScreenNames from './routes';
import UserStack from './user-stack';
import {errorMessage, successMessage} from '../utills/method';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AdminHomeScreen from '../screens/app-screens/admin';
import AddTeachers from '../screens/app-screens/AddTeacher';
import AddRoom from '../screens/app-screens/AddRoom';
import {ScreenWrapper} from '../components';
import AddSubject from '../screens/app-screens/AddSubject';

const Drawer = createDrawerNavigator();

const Logout = () => {
  const navigation = useNavigation();

  return (
    <ScreenWrapper
      backgroundColor="#3333ff"
      statusBarColor="#3333ff"
      barStyle="light-content">
      <View style={{flex: 1, justifyContent: 'center'}}>
        <DrawerItem
          label="Logout"
          style={{backgroundColor: 'white', alignSelf: 'center', width: '80%'}}
          onPress={async () => {
            try {
              await AsyncStorage.removeItem('token');
              await AsyncStorage.removeItem('role');
              successMessage('Logout successful');
              //@ts-ignore
              navigation.replace(ScreenNames.LOGIN);
            } catch (error) {
              errorMessage('Error logging out');
            }
          }}
        />
      </View>
    </ScreenWrapper>
  );
};

const DrawerNavigator = ({role}: {role: 'admin' | 'notAdmin'}) => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#3333ff', // Set the background color to blue
        },
        drawerActiveTintColor: 'white', // Active item text color
        drawerInactiveTintColor: 'lightgray', // Inactive item text color
      }}>
      {role === 'admin' ? (
        <>
          <Drawer.Screen
            name={ScreenNames.ADMINHOMESCREEN}
            component={AdminHomeScreen}
          />
          <Drawer.Screen name="Add Teacher" component={AddTeachers} />
          <Drawer.Screen name="Add Room" component={AddRoom} />
          <Drawer.Screen name="Add Subject" component={AddSubject} />
          <Drawer.Screen name="Profile" component={Profile} />
          <Drawer.Screen name="Logout" options={{drawerLabel: 'Logout'}}>
            {() => <Logout />}
          </Drawer.Screen>
        </>
      ) : (
        <>
          <Drawer.Screen name="Department" component={UserStack} />
          <Drawer.Screen name="Profile" component={Profile} />
          <Drawer.Screen name="Logout" options={{drawerLabel: 'Logout'}}>
            {() => <Logout />}
          </Drawer.Screen>
        </>
      )}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
