import {yupResolver} from '@hookform/resolvers/yup';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {ActivityIndicator, Image, View} from 'react-native';
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
import {useUserLogin} from '../../../api/auth';
import {errorMessage, successMessage} from '../../../utills/method';
import {CommonActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Dashboard({
  navigation,
}: NativeStackScreenProps<RootStackParamList, ScreenNames.LOGIN>) {
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingToken, setIsCheckingToken] = useState(true);

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const role = await AsyncStorage.getItem('role');
      if (token) {
        if (role === 'admin') {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: ScreenNames.DRAWER, params: {role}}],
            }),
          );
        } else {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: ScreenNames.DRAWER, params: {role}}],
            }),
          );
        }
      }
    } catch (error) {
      errorMessage('Error checking token');
    } finally {
      setIsCheckingToken(false);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
  } = useForm({
    mode: 'all',
    defaultValues: {
      email: __DEV__ ? 'itsbk1023@gmail.com' : '',
      password: __DEV__ ? '123456' : '',
    },
    resolver: yupResolver(loginSchema),
  });

  const passwordRef = useRef<any>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {mutate: loginUser} = useUserLogin();

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    const {email, password} = data;
    loginUser(
      {email, password},
      {
        onSuccess: async response => {
          if (response.ok) {
            const token = response.response.data.data.access_Token;
            const role = 'notAdmin';
            try {
              await AsyncStorage.setItem('token', token);
              await AsyncStorage.setItem('role', role);
            } catch (error) {
              errorMessage('Unexpected error occurred');
            }
            setIsLoading(false);
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: ScreenNames.DRAWER, params: {role}}],
              }),
            );
            successMessage('Login success');
          } else {
            setIsLoading(false);
            errorMessage('Login failed');
          }
        },
      },
    );
  };

  if (isCheckingToken) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={AppColors.white} />
      </View>
    );
  }

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
              isLoading={isLoading}
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
        </View>
      </ScreenWrapper>
    </Gradient>
  );
}
