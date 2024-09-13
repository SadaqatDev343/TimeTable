import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Image, Pressable, ScrollView, View} from 'react-native';
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

import {Back} from '../../../assets/svg';
import {styles} from './style';

export default function SemesterScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, ScreenNames.SEMESTERSCREEN>) {
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
            <CustomText
              size={5}
              textStyles={[
                CommonStyles.marginTop_2,
                CommonStyles.alignSelfCenter,
              ]}
              font={FontFamily.appFontSemiBold}
              color={AppColors.white}>
              Semester
            </CustomText>
            <View
              style={{
                margin: 2,
                alignSelf: 'center',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  margin: 2,
                  alignSelf: 'center',
                  flexDirection: 'column',
                }}>
                <Card
                  title=" Semester 1"
                  onPress={() => navigation.navigate(ScreenNames.SECTIONSCREEN)}
                  containerStyle={{}}
                />
                <Card
                  title=" Semester 2"
                  onPress={() => navigation.navigate(ScreenNames.SECTIONSCREEN)}
                  containerStyle={{}}
                />
                <Card
                  title=" Semester 3"
                  onPress={() => navigation.navigate(ScreenNames.SECTIONSCREEN)}
                  containerStyle={{}}
                />
                <Card
                  title=" Semester 4"
                  onPress={() => navigation.navigate(ScreenNames.SECTIONSCREEN)}
                  containerStyle={{}}
                />
              </View>
              <View
                style={{
                  margin: 2,
                  alignSelf: 'center',
                  flexDirection: 'column',
                }}>
                <Card
                  title=" Semester 5"
                  onPress={() => navigation.navigate(ScreenNames.SECTIONSCREEN)}
                  containerStyle={{}}
                />
                <Card
                  title=" Semester 6"
                  onPress={() => navigation.navigate(ScreenNames.SECTIONSCREEN)}
                  containerStyle={{}}
                />
                <Card
                  title=" Semester 7"
                  onPress={() => navigation.navigate(ScreenNames.SECTIONSCREEN)}
                  containerStyle={{}}
                />
                <Card
                  title=" Semester 8"
                  onPress={() => navigation.navigate(ScreenNames.SECTIONSCREEN)}
                  containerStyle={{}}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </ScreenWrapper>
    </Gradient>
  );
}
