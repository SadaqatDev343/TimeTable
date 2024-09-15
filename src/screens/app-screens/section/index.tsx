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

export default function SectionScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, ScreenNames.SECTIONSCREEN>) {
  const handleAddSection = () => {
    navigation.navigate(ScreenNames.ADD_SECTION); // Replace 'ADD_DEPARTMENT' with your actual route name
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
            }}>
            <Pressable onPress={() => navigation.goBack()}>
              <Back width={24} height={24} color={AppColors.white} />
            </Pressable>
            <View style={styles.leftlogo}>
              <Image
                resizeMode="contain"
                source={AppLogo.logo}
                style={styles.imageStyle1}
              />
            </View>
            <View style={{marginLeft: -24}}>
              <H1
                color={AppColors.white}
                size={5}
                fontFam={FontFamily.appFontBold}>
                UNIVERSITY OF KOTLI AJ&K
              </H1>
            </View>

            <View style={styles.rightlogo}>
              {/* <Image
                resizeMode="contain"
                source={AppLogo.logo}
                style={styles.imageStyle2}
              /> */}
            </View>
          </View>
          <ScrollView style={{height: height(90)}}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',padding:10, paddingHorizontal:20}}>
          <CustomText
            size={5}
            font={FontFamily.appFontSemiBold}
            color={AppColors.white}>
          section
          </CustomText>
        <TouchableOpacity onPress={handleAddSection}>
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
                navigation.navigate(ScreenNames.SECTIONSCREEN)
              }
            />
             <Card
              title="BS SE "
              onPress={() =>
                navigation.navigate(ScreenNames.SECTIONSCREEN)
              }
            />
              <Card
              title="BS SE "
              onPress={() =>
                navigation.navigate(ScreenNames.SECTIONSCREEN)
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
                navigation.navigate(ScreenNames.SECTIONSCREEN)
              }
            />
             <Card
              title="BS SE "
              onPress={() =>
                navigation.navigate(ScreenNames.SECTIONSCREEN)
              }
            />
            <Card
              title="BS SE "
              onPress={() =>
                navigation.navigate(ScreenNames.SECTIONSCREEN)
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
                navigation.navigate(ScreenNames.SECTIONSCREEN)
              }
            />
             <Card
              title="BS SE "
              onPress={() =>
                navigation.navigate(ScreenNames.SECTIONSCREEN)
              }
            />
            <Card
              title="BS SE "
              onPress={() =>
                navigation.navigate(ScreenNames.SECTIONSCREEN)
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
                navigation.navigate(ScreenNames.SECTIONSCREEN)
              }
            />
             <Card
              title="BS SE "
              onPress={() =>
                navigation.navigate(ScreenNames.SECTIONSCREEN)
              }
            />
            <Card
              title="BS SE "
              onPress={() =>
                navigation.navigate(ScreenNames.SECTIONSCREEN)
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
                navigation.navigate(ScreenNames.SECTIONSCREEN)
              }
            />
             <Card
              title="BS SE "
              onPress={() =>
                navigation.navigate(ScreenNames.SECTIONSCREEN)
              }
            />
            <Card
              title="BS SE "
              onPress={() =>
                navigation.navigate(ScreenNames.SECTIONSCREEN)
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
