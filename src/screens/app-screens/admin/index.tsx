import {View, Text} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import ScreenNames, {RootStackParamList} from '../../../routes/routes';

export default function ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, ScreenNames.ADMINHOMESCREEN>) {
  return (
    <View>
      <Text>AdminHomeScreen</Text>
    </View>
  );
}
