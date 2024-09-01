import {View, Text} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import ScreenNames, {RootStackParamList} from '../../../routes/routes';

export default function UserHomeScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, ScreenNames.USERHOMESCREEN>) {
  return (
    <View>
      <Text>UserHomeScreen</Text>
    </View>
  );
}
