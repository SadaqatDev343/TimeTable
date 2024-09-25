import {NativeStackScreenProps} from '@react-navigation/native-stack';
import ScreenNames, {RootStackParamList} from '../../../routes/routes';
import {
  Button,
  CustomText,
  Gradient,
  ScreenWrapper,
  TextField,
} from '../../../components';
import AppColors from '../../../utills/Colors';
import {TextInput, View} from 'react-native';
import {CommonStyles} from '../../../utills/CommonStyle';
import React, {useRef, useState} from 'react';
import styles from './styles';
import {Header} from 'react-native/Libraries/NewAppScreen';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {resetPasswordSchema} from '../../../utills/YupSchemaEditProfile';
import {CreatePasswordSVG} from '../../../assets/svg';
import {errorMessage, successMessage} from '../../../utills/method';
import {useResetPassword} from '../../../api/auth';

export default function CreatePassword({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, ScreenNames.CREATE_PASSWORD>) {
  const passwordRef = useRef<TextInput>(null);
  const {mutate} = useResetPassword();
  const [isLoading, setIsLoading] = useState(false);
  const {email} = route.params;

  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    mode: 'all',
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(resetPasswordSchema),
  });

  const onSubmit = (data: {password: string; confirmPassword: string}) => {
    setIsLoading(true);
    const payload = {
      email: email,
      newPassword: data.password,
    };
    mutate(payload, {
      onSuccess: async response => {
        if (response?.ok) {
          setIsLoading(false);
          successMessage('Password updated successfully');
          navigation.navigate(ScreenNames.LOGIN);
        } else {
          setIsLoading(false);
          errorMessage('Something went wrong');
        }
      },
    });
  };

  return (
    <Gradient>
      <ScreenWrapper
        barStyle="light-content"
        paddinTop={0}
        transclucent
        statusBarColor={AppColors.transparent}
        paddingBottom={0}
        scrollEnabled>
        <View style={styles.mainViewContainer}>
          <Header
            containerStyle={styles.header}
            textColor={AppColors.white}
            iconColor={AppColors.white}
            title="CREATE PASSWORD"
            onPress={() => navigation.goBack()}
          />
          <CreatePasswordSVG />
          <CustomText
            color={AppColors.white}
            textStyles={CommonStyles.marginTop_2}>
            Create your new password for your account
          </CustomText>
          <View>
            <TextField
              title="New Password"
              control={control}
              name="password"
              returnKeyType="next"
              placeholder="Enter your password"
              containerStyle={CommonStyles.marginTop_4}
              secureTextEntry={!showPassword}
              onSubmitEditing={() => passwordRef?.current?.focus()}
              showPasswordIcon={true}
              isPasswordVisible={showPassword}
              onPressIcon={() => setShowPassword(!showPassword)}
            />
          </View>
          <View>
            <TextField
              title="Confirm Password"
              ref={passwordRef}
              control={control}
              placeholder="Confirm your password"
              name="confirmPassword"
              containerStyle={CommonStyles.marginTop_2}
              secureTextEntry={!showPassword}
              showPasswordIcon={true}
              isPasswordVisible={showPassword}
              onPressIcon={() => setShowPassword(!showPassword)}
            />
          </View>
          <Button
            title="Update Password"
            containerStyle={CommonStyles.marginTop_4}
            onPress={handleSubmit(onSubmit)}
            isLoading={isLoading}
          />
        </View>
      </ScreenWrapper>
    </Gradient>
  );
}
