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

export default function SectionScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, ScreenNames.SECTIONSCREEN>) {
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
              textStyles={[CommonStyles.marginTop_2, CommonStyles.marginLeft_3]}
              font={FontFamily.appFontSemiBold}
              color={AppColors.white}>
              Sections
            </CustomText>
            <View
              style={{
                margin: 2,
                alignSelf: 'center',
                flexDirection: 'column',
              }}>
              <Card
                title=" section A"
                onPress={() => console.log('BS SE ')}
                containerStyle={{}}
              />
              <Card title="section B" onPress={() => console.log('CS ')} />
              <Card
                title="section C "
                onPress={() => console.log('BS SE ')}
                containerStyle={{
                  marginRight: width(5),
                }}
              />
              <Card title="section D" onPress={() => console.log('CS ')} />
            </View>
          </ScrollView>
        </View>
      </ScreenWrapper>
    </Gradient>
  );
}
