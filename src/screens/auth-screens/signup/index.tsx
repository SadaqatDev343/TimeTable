import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Image, TouchableOpacity, View } from 'react-native';
import { AppLogo } from '../../../assets/images';
import { CheckBox, UnCheckBox } from '../../../assets/svg';
import {
  Button,
  CustomText,
  DropDownButton,
  Gradient,
  H1,
  ScreenWrapper,
  TextField,
} from '../../../components';
import DropDownModal from '../../../components/drop-down-modal';
import ScreenNames, { RootStackParamList } from '../../../routes/routes';
import AppColors from '../../../utills/Colors';
import { CommonStyles } from '../../../utills/CommonStyle';
import { FontFamily } from '../../../utills/FontFamily';
import { UserType } from '../../../utills/userType';
import styles from './styles';
import { authSchema } from '../../../utills/YupSchemaEditProfile';
import { ISignUpFormValues } from '../../../types';
import { yupResolver } from '@hookform/resolvers/yup';

export default function Signup({
  navigation,
}: NativeStackScreenProps<RootStackParamList, ScreenNames.SIGNUP>) {
  const [isDirectlyInvolve, setDirectlyInvolve] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  
  const toggleCategory = () => setCategoryModalVisible(!categoryModalVisible);
  
  const emailRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);

  const onSubmit: SubmitHandler<ISignUpFormValues> = async (data) => {
    console.log('onSubmit triggered', data);

    try {
      const response = await fetch('http://192.168.100.28:3000/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          role: selectedCategory, // Add role to the request body
        }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('User registered successfully:', result);
        navigation.navigate(ScreenNames.LOGIN);
      } else {
        throw new Error(result.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const { control, handleSubmit, formState: { errors } } = useForm<any>({
    mode: 'all',
    defaultValues: {
      name: '',
      contact: '',
      email: '',
      password: '',
    },
    resolver: yupResolver(authSchema),
  });

  return (
    <Gradient>
      <ScreenWrapper
        paddinTop={0}
        paddingBottom={0}
        scrollEnabled
        transclucent
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
            center={true}
            textStyles={styles.heading}
            color={AppColors.white}
            size={5}
            fontFam={FontFamily.appFontMedium}>
            SIGN UP
          </H1>

          <TextField
            title="Full Name"
            control={control}
            name="name"
            returnKeyType="next"
            placeholder="Enter your full name"
            containerStyle={CommonStyles.marginTop_3}
            onSubmitEditing={() => emailRef?.current?.focus()}
          />
          <TextField
            ref={emailRef}
            title="Email"
            control={control}
            name="email"
            returnKeyType="next"
            placeholder="Enter your email address"
            keyboardType="email-address"
            autoCapitalize="none"
            onSubmitEditing={() => passwordRef?.current?.focus()}
          />
          <TextField
            title="Contact Number"
            control={control}
            name="contact"
            returnKeyType="next"
            placeholder="Enter your contact number"
            containerStyle={CommonStyles.marginTop_3}
            onSubmitEditing={() => emailRef?.current?.focus()}
          />
          <View>
            <TextField
              ref={passwordRef}
              title="Password"
              control={control}
              name="password"
              placeholder="Enter your password"
              secureTextEntry={!showPassword}
              showPasswordIcon={true}
              isPasswordVisible={showPassword}
              onPressIcon={() => setShowPassword(!showPassword)}
            />
          </View>
          <DropDownButton
            placeHolder="Category"
            Icon
            title="Category"
            placeholderColor={AppColors.grey10}
            containerStyle={styles.dropdown}
            onPress={toggleCategory}
            value={selectedCategory}
          />
       
          <View style={styles.checkBoxView}>
            <TouchableOpacity
              onPress={() => setDirectlyInvolve(!isDirectlyInvolve)}
              style={[
                styles.checkBoxStyle,
                isDirectlyInvolve
                  ? styles.checkBoxStyle
                  : styles.unCheckBoxStyle,
              ]}>
              {isDirectlyInvolve ? <CheckBox /> : <UnCheckBox />}
            </TouchableOpacity>
            <CustomText
              color={AppColors.white}
              size={3}
              justify
              textStyles={styles.text}>
              By clicking the box, you agree to use the app exclusively for
              facilitating university operations, academic activities, and
              approved testing and app administration
            </CustomText>
          </View>
          <Button
            title="SIGN UP"
            containerStyle={CommonStyles.marginTop_2}
            onPress={handleSubmit(onSubmit)}
          />
          {/* {isError && (
            <CustomText color={AppColors.red} center>
              An error occurred during registration: {error.message}
            </CustomText>
          )} */}
          <View style={styles.row}>
            <CustomText color={AppColors.white}>
              Already have an account?{' '}
            </CustomText>
            <CustomText
              font={FontFamily.appFontSemiBold}
              color={AppColors.white}
              onPress={() => navigation.navigate(ScreenNames.LOGIN)}>
              Login
            </CustomText>
          </View>
          <CustomText
            textStyles={[CommonStyles.marginTop_4, CommonStyles.marginBottom_2]}
            font={FontFamily.appFontSemiBold}
            center
            color={AppColors.white}
            onPress={() => navigation.navigate(ScreenNames.CONTACT_US)}>
            Contact Support
          </CustomText>
        </View>
        <DropDownModal
          isVisible={categoryModalVisible}
          Data={UserType}
          onClose={toggleCategory}
          onPress={val => {
            setSelectedCategory(val?.name);
            toggleCategory();
          }}
        />
      </ScreenWrapper>
    </Gradient>
  );
}
