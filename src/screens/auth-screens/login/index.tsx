import {yupResolver} from '@hookform/resolvers/yup';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import axios from 'axios';
import React, {useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Image, View} from 'react-native';
import {AppLogo} from '../../../assets/images';
import {
  Button,
  CustomText,
  Gradient,
  H1,
  ScreenWrapper,
  TextField,
} from '../../../components';
import {HorizontalLine} from '../../../components/line';
import ScreenNames, {RootStackParamList} from '../../../routes/routes';
import AppColors from '../../../utills/Colors';
import {CommonStyles} from '../../../utills/CommonStyle';
import {width} from '../../../utills/Diamension';
import {FontFamily} from '../../../utills/FontFamily';
import {loginSchema} from '../../../utills/YupSchemaEditProfile';
import styles from './styles';
import Header from '../../../components/header';

export default function Dashboard({
  navigation,
}: NativeStackScreenProps<RootStackParamList, ScreenNames.LOGIN>) {
  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
  } = useForm({
    mode: 'all',
    defaultValues: {
      email: __DEV__ ? 'mdanyalchaudhary@gmail.com' : '',
      password: __DEV__ ? '123qwe' : '',
    },
    resolver: yupResolver(loginSchema),
  });
  const passwordRef = useRef<any>(null);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async () => {
    const {email, password} = getValues();
    try {
      // const response = await axios.post('http://localhost:3000/auth/login', {
      //   email,
      //   password,
      // });
      // // Handle successful login (e.g., store tokens, navigate to another screen)
      // console.log('Login success:', response.data);
      navigation.navigate(ScreenNames.USERHOMESCREEN);
    } catch (error) {
      // Handle login error (e.g., show error message)
      // console.error('Login error:', error);
    }
  };

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
          <View style={styles.logo}>
            <Image
              resizeMode="contain"
              source={AppLogo.logo}
              style={styles.imageStyle}
            />
          </View>
          <H1
            textStyles={CommonStyles.marginVertical_2}
            color={AppColors.white}
            size={6}
            fontFam={FontFamily.appFontMedium}>
            LOGIN
          </H1>

          <View>
            <TextField
              title="Email"
              keyboardType="email-address"
              control={control}
              name="email"
              autoCapitalize="none"
              returnKeyType="next"
              placeholder="Enter your email address"
              onSubmitEditing={() => passwordRef?.current?.focus()}
            />
            {errors.email && (
              <CustomText color="red">{errors.email.message}</CustomText>
            )}
            <TextField
              title="Password"
              secureTextEntry={!showPassword}
              control={control}
              name="password"
              placeholder="Enter your password"
              ref={passwordRef}
              showPasswordIcon={true}
              isPasswordVisible={showPassword}
              onPressIcon={() => setShowPassword(!showPassword)}
            />
            {errors.password && (
              <CustomText color="red">{errors.password.message}</CustomText>
            )}

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
              onPress={handleSubmit(onSubmit)}
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
