import { Image, View, Alert } from 'react-native';
import {
  Button,
  CustomText,
  Gradient,
  H1,
  ScreenWrapper,
  TextField,
} from '../../../components';
import AppColors from '../../../utills/Colors';
import styles from './styles';
import { Back } from '../../../assets/svg';
import { FontFamily } from '../../../utills/FontFamily';
import { CommonStyles } from '../../../utills/CommonStyle';
import ScreenNames, { RootStackParamList } from '../../../routes/routes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useRef, useState } from 'react';
import { AppLogo } from '../../../assets/images';
import Header from '../../../components/header';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Validation schema
const schema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .email('Email format is invalid'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password should be at least 6 characters long'),
});

export default function Admin_LOGIN({
  navigation,
}: NativeStackScreenProps<RootStackParamList, ScreenNames.Admin_LOGIN>) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'all',
    defaultValues: {
      email: __DEV__ ? 'admin@gmail.com' : '',
      password: __DEV__ ? '123qwe' : '',
    },
    resolver: yupResolver(schema),
  });
  const passwordRef = useRef<any>(null);

  const onLogin = async (data: any) => {
    try {
      const response = await fetch('http://192.168.100.28:3000/user/adminLogin', { // Replace with your actual API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        // Handle successful login
        console.log('Login successful:', result);
        navigation.navigate(ScreenNames.ADMINHOMESCREEN);
      } else {
        // Handle errors
        throw new Error(result.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login failed:', error);
      Alert.alert('Login Failed');
    }
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
        barStyle="light-content"
        headerUnScrollable={() => (
          <Header
            containerStyle={styles.header}
            textColor={AppColors.white}
            iconColor={AppColors.white}
            title="ADMIN LOGIN"
            onPress={() => navigation.goBack()}
          />
        )}>
        <View style={styles.mainViewContainer}>
          <View style={styles.logo}>
            <Image
              resizeMode="contain"
              source={AppLogo.logo}
              style={styles.imageStyle}
            />
          </View>

          <TextField
            title="Email"
            keyboardType="email-address"
            control={control}
            name="email"
            returnKeyType="next"
            autoCapitalize="none"
            placeholder="Enter your email address"
            onSubmitEditing={() => passwordRef?.current?.focus()}
          />
          <View>
            <TextField
              title="Password"
              control={control}
              name="password"
              secureTextEntry={!showPassword}
              ref={passwordRef}
              placeholder="Enter your password"
              showPasswordIcon={true}
              isPasswordVisible={showPassword}
              onPressIcon={() => setShowPassword(!showPassword)}
            />
          </View>

          <Button
            title="LOGIN"
            onPress={handleSubmit(onLogin)} // Use handleSubmit to trigger onLogin
            containerStyle={CommonStyles.marginTop_3}
          />
          <View style={styles.contact}>
            <CustomText
              font={FontFamily.appFontMedium}
              color={AppColors.white}
              // Uncomment the following line if you want to add Contact Support functionality
              // onPress={() => navigation.navigate(ScreenNames.CONTACT_US)}
            >
              Contact Support
            </CustomText>
          </View>
        </View>
      </ScreenWrapper>
    </Gradient>
  );
}
