import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';

import {
  Button,
  CustomText,
  Gradient,
  H1,
  ScreenWrapper,
  TextField,
} from '../../../components';
import ScreenNames, {RootStackParamList} from '../../../routes/routes';
import AppColors from '../../../utills/Colors';

import styles from './styles';
import {CommonStyles} from '../../../utills/CommonStyle';
import {FontFamily} from '../../../utills/FontFamily';
import {HorizontalLine} from '../../../components/line';
import showPassword from '../../../assets/svg/showPassword';
import {width} from '../../../utills/Diamension';
import {TextInput} from 'react-native-paper';
import {Image, View} from 'react-native';
import {AppLogo} from '../../../assets/images';
export default function Dashboard({
  navigation,
}: NativeStackScreenProps<RootStackParamList, ScreenNames.LOGIN>) {
  return (
    <Gradient>
      <ScreenWrapper
        backgroundColor={AppColors.black}
        transclucent
        scrollEnabled
        paddingBottom={0}
        paddinTop={0}
        statusBarColor={AppColors.transparent}
        barStyle="light-content">
        <View style={styles.mainViewContainer}>
          <H1
            textStyles={CommonStyles.marginVertical_2}
            color={AppColors.white}
            size={6}
            fontFam={FontFamily.appFontMedium}>
            Login
          </H1>
          <View style={styles.logo}>
            <Image
              resizeMode="contain"
              source={AppLogo.logo}
              style={styles.imageStyle}
            />
          </View>

          <View>
            <TextInput style={styles.unusedInput} />
            <TextField
              title="Password"
              secureTextEntry={!showPassword}
              name="password"
              placeholder="Enter your password"
              showPasswordIcon={true}
            />
            <TextField
              title="Password"
              secureTextEntry={!showPassword}
              name="password"
              placeholder="Enter your password"
              showPasswordIcon={true}
            />

            <View style={styles.forgotContainer}>
              <CustomText
                textStyles={CommonStyles.marginTop_2}
                right
                font={FontFamily.appFontSemiBold}
                color={AppColors.white}
                onPress={() =>
                  navigation.navigate(ScreenNames.FORGET_PASSWORD)
                }>
                Forgot Password?
              </CustomText>
            </View>
            <Button
              title="LOGIN"
              onPress={() => console.log('log')}
              // onPress={handleSubmit(loginMethod)}
              containerStyle={CommonStyles.marginTop_3}
            />
            <View style={styles.row}>
              <CustomText color={AppColors.white}>
                Don't have an account?{' '}
              </CustomText>
              <CustomText
                font={FontFamily.appFontSemiBold}
                color={AppColors.white}
                onPress={() => navigation.navigate(ScreenNames.SIGNUP)}>
                Register
              </CustomText>
            </View>
          </View>
          <View style={styles.row}>
            <HorizontalLine
              strokWidth={1.5}
              containerStyles={CommonStyles.marginTop_1}
              customWidth={width(35)}
              color={AppColors.white}
            />
            <CustomText
              center
              size={4}
              color={AppColors.white}
              font={FontFamily.appFontSemiBold}
              textStyles={CommonStyles.marginHorizontal_2}>
              OR
            </CustomText>
            <HorizontalLine
              strokWidth={1.5}
              containerStyles={CommonStyles.marginTop_1}
              customWidth={width(35)}
              color={AppColors.white}
            />
          </View>
          <CustomText
            font={FontFamily.appFontSemiBold}
            color={AppColors.white}
            center
            textStyles={CommonStyles.marginTop_5}
            onPress={() => navigation.navigate(ScreenNames.Admin_LOGIN)}>
            Continue as Admin
          </CustomText>
          <View style={styles.contact}>
            <CustomText
              font={FontFamily.appFontMedium}
              color={AppColors.white}
              onPress={() => navigation.navigate(ScreenNames.CONTACT_US)}>
              Contact Support
            </CustomText>
          </View>
        </View>
      </ScreenWrapper>
    </Gradient>
  );
}
