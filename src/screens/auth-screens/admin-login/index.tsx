import {yupResolver} from '@hookform/resolvers/yup';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Alert, Image, View} from 'react-native';
import * as yup from 'yup';
import {useAdminLogin} from '../../../api/auth';
import {AppLogo} from '../../../assets/images';
import {
  Button,
  CustomText,
  Gradient,
  ScreenWrapper,
  TextField,
} from '../../../components';
import Header from '../../../components/header';
import ScreenNames, {RootStackParamList} from '../../../routes/routes';
import AppColors from '../../../utills/Colors';
import {CommonStyles} from '../../../utills/CommonStyle';
import {FontFamily} from '../../../utills/FontFamily';
import styles from './styles';
import {errorMessage, successMessage} from '../../../utills/method';

// Validation schema for the form
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
  const passwordRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {mutate} = useAdminLogin();

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    mode: 'all',
    defaultValues: {
      email: __DEV__ ? 'johndoe@example.com' : '',
      password: __DEV__ ? 'p@ssw0rd123' : '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    setIsLoading(true);
    mutate(data, {
      onSuccess: response => {
        if (response?.ok) {
          setIsLoading(false);
          successMessage('Login Successful');
        } else {
          setIsLoading(false);
          errorMessage('Login Failed');
        }
      },
    });
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

          {/* Email Input Field */}
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

          {/* Password Input Field */}
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

          {/* Login Button */}
          <Button
            title="LOGIN"
            onPress={handleSubmit(onSubmit)}
            isLoading={isLoading}
            containerStyle={CommonStyles.marginTop_3}
          />

          {/* Contact Support */}
          <View style={styles.contact}>
            <CustomText font={FontFamily.appFontMedium} color={AppColors.white}>
              Contact Support
            </CustomText>
          </View>
        </View>
      </ScreenWrapper>
    </Gradient>
  );
}
