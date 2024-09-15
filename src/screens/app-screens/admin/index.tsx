import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import {
  Card,
  CustomText,
  Gradient,
  H1,
  ScreenWrapper,
} from '../../../components';
import ScreenNames, {RootStackParamList} from '../../../routes/routes';
import AppColors from '../../../utills/Colors';

import {AppLogo} from '../../../assets/images';
import {CommonStyles} from '../../../utills/CommonStyle';
import {height, width} from '../../../utills/Diamension';
import {FontFamily} from '../../../utills/FontFamily';
import {styles} from './style';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
export default function AdminHomeScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, ScreenNames.ADMINHOMESCREEN>) {
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
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={styles.leftlogo}>
            {/* Replacing text with Drawer Icon */}
            <FontAwesome name="navicon" size={24} color="white" />
          </TouchableOpacity>
          <View style={{marginLeft: -24}}>
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
          <CustomText
            size={5}
            textStyles={[CommonStyles.marginVertical_3, CommonStyles.alignSelfCenter]}
            font={FontFamily.appFontSemiBold}
            color={AppColors.white}>
            Department
          </CustomText>
         
        
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
                navigation.navigate(ScreenNames.DESCIPLINESCREEN)
              }
            />
             <Card
              title="BS SE "
              onPress={() =>
                navigation.navigate(ScreenNames.DESCIPLINESCREEN)
              }
            />
              <Card
              title="BS SE "
              onPress={() =>
                navigation.navigate(ScreenNames.DESCIPLINESCREEN)
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
                navigation.navigate(ScreenNames.DESCIPLINESCREEN)
              }
            />
             <Card
              title="BS SE "
              onPress={() =>
                navigation.navigate(ScreenNames.DESCIPLINESCREEN)
              }
            />
            <Card
              title="BS SE "
              onPress={() =>
                navigation.navigate(ScreenNames.DESCIPLINESCREEN)
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
                navigation.navigate(ScreenNames.DESCIPLINESCREEN)
              }
            />
             <Card
              title="BS SE "
              onPress={() =>
                navigation.navigate(ScreenNames.DESCIPLINESCREEN)
              }
            />
            <Card
              title="BS SE "
              onPress={() =>
                navigation.navigate(ScreenNames.DESCIPLINESCREEN)
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
                navigation.navigate(ScreenNames.DESCIPLINESCREEN)
              }
            />
             <Card
              title="BS SE "
              onPress={() =>
                navigation.navigate(ScreenNames.DESCIPLINESCREEN)
              }
            />
            <Card
              title="BS SE "
              onPress={() =>
                navigation.navigate(ScreenNames.DESCIPLINESCREEN)
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
                navigation.navigate(ScreenNames.DESCIPLINESCREEN)
              }
            />
             <Card
              title="BS SE "
              onPress={() =>
                navigation.navigate(ScreenNames.DESCIPLINESCREEN)
              }
            />
            <Card
              title="BS SE "
              onPress={() =>
                navigation.navigate(ScreenNames.DESCIPLINESCREEN)
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
