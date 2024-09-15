import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Image, Pressable, ScrollView, TouchableOpacity, View} from 'react-native';
import {AppLogo} from '../../../assets/images';
import {
  Card,
  CustomText,
  Gradient,
  H1,
  ScreenWrapper,
} from '../../../components';
import ScreenNames, {RootStackParamList} from '../../../routes/routes';
import AppColors from '../../../utills/Colors';
import {CommonStyles} from '../../../utills/CommonStyle';
import {height, width} from '../../../utills/Diamension';
import {FontFamily} from '../../../utills/FontFamily';

import {Add, Back} from '../../../assets/svg';
import {styles} from './style';

export default function DesciplineScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, ScreenNames.DESCIPLINESCREEN>) {
  const handleAddDescipline = () => {
    navigation.navigate(ScreenNames.ADD_DISCIPLINE); // Replace 'ADD_DEPARTMENT' with your actual route name
  };
 
  return (
    <Gradient>
    <ScreenWrapper
      backgroundColor={AppColors.black}
      transclucent
      scrollEnabled
      paddinTop={0}
      paddingBottom={0}
      statusBarColor={AppColors.transparent}
      barStyle="light-content">
      <View style={styles.mainViewContainer}>
        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: AppColors.white,
            borderBottomWidth: 1,
            width: width(100),
            alignItems: 'center',
            paddingHorizontal:10
          }}>
         <Pressable onPress={() => navigation.goBack()}>
              <Back width={24} height={24} color={AppColors.white} />
            </Pressable>
          <View style={{marginLeft: 35}}>
            <H1
              color={AppColors.white}
              size={5}
              fontFam={FontFamily.appFontBold}>
              UNIVERSITY OF KOTLI AJ&K
            </H1>
          </View>

          <View style={styles.rightlogo}>
            <Image
              resizeMode="contain"
              source={AppLogo.logo}
              style={styles.imageStyle2}
            />
          </View>
        </View>
        <ScrollView style={{height: height(90)}}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',padding:10, paddingHorizontal:20}}>
          <CustomText
            size={5}
            font={FontFamily.appFontSemiBold}
            color={AppColors.white}>
          Disclpine
          </CustomText>
        <TouchableOpacity onPress={handleAddDescipline}>
        <Add width={20} height={20} color={AppColors.white} />
      </TouchableOpacity>
    </View>


        
          <View
            style={{
              marginHorizontal: 2,
              alignSelf: 'center',
              flexDirection: 'row',
            }}>
            <View
              style={{
                marginHorizontal: 2,

                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
             <Card
              title="BS SE "
              onPress={() =>
                navigation.navigate(ScreenNames.SEMESTERSCREEN)
              }
            />
             <Card
              title="BS SE "
              onPress={() =>
                navigation.navigate(ScreenNames.SEMESTERSCREEN)
              }
            />
              <Card
              title="BS SE "
              onPress={() =>
                navigation.navigate(ScreenNames.SEMESTERSCREEN)
              }
            />
            </View>
          </View>
          <View
            style={{
              marginHorizontal: 2,
              alignSelf: 'center',
              flexDirection: 'row',
            }}>
            <View
              style={{
                marginHorizontal: 2,

                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
           <Card
              title="BS SE "
              onPress={() =>
                navigation.navigate(ScreenNames.SEMESTERSCREEN)
              }
            />
             <Card
              title="BS SE "
              onPress={() =>
                navigation.navigate(ScreenNames.SEMESTERSCREEN)
              }
            />
            <Card
              title="BS SE "
              onPress={() =>
                navigation.navigate(ScreenNames.SEMESTERSCREEN)
              }
            />
            </View>
          </View>
          <View
            style={{
              marginHorizontal: 2,
              alignSelf: 'center',
              flexDirection: 'row',
            }}>
            <View
              style={{
                marginHorizontal: 2,

                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
           <Card
              title="BS SE "
              onPress={() =>
                navigation.navigate(ScreenNames.SEMESTERSCREEN)
              }
            />
             <Card
              title="BS SE "
              onPress={() =>
                navigation.navigate(ScreenNames.SEMESTERSCREEN)
              }
            />
            <Card
              title="BS SE "
              onPress={() =>
                navigation.navigate(ScreenNames.SEMESTERSCREEN)
              }
            />
            </View>
          </View>
          <View
            style={{
              marginHorizontal: 2,
              alignSelf: 'center',
              flexDirection: 'row',
            }}>
            <View
              style={{
                marginHorizontal: 2,

                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
           <Card
              title="BS SE "
              onPress={() =>
                navigation.navigate(ScreenNames.SEMESTERSCREEN)
              }
            />
             <Card
              title="BS SE "
              onPress={() =>
                navigation.navigate(ScreenNames.SEMESTERSCREEN)
              }
            />
            <Card
              title="BS SE "
              onPress={() =>
                navigation.navigate(ScreenNames.SEMESTERSCREEN)
              }
            />
            </View>
          </View>
          <View
            style={{
              marginHorizontal: 2,
              alignSelf: 'center',
              flexDirection: 'row',
            }}>
            <View
              style={{
                marginHorizontal: 2,

                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
           <Card
              title="BS SE "
              onPress={() =>
                navigation.navigate(ScreenNames.SEMESTERSCREEN)
              }
            />
             <Card
              title="BS SE "
              onPress={() =>
                navigation.navigate(ScreenNames.SEMESTERSCREEN)
              }
            />
            <Card
              title="BS SE "
              onPress={() =>
                navigation.navigate(ScreenNames.SEMESTERSCREEN)
              }
            />
            </View>
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  </Gradient>
  );
}
