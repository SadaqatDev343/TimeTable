import {yupResolver} from '@hookform/resolvers/yup';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Alert, Image, TouchableOpacity, View} from 'react-native';
import {AppLogo} from '../../../assets/images';
import {CheckBox, UnCheckBox} from '../../../assets/svg';
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
import ScreenNames, {RootStackParamList} from '../../../routes/routes';
import AppColors from '../../../utills/Colors';
import {CommonStyles} from '../../../utills/CommonStyle';
import {FontFamily} from '../../../utills/FontFamily';
import {UserType} from '../../../utills/userType';
import {authSchema} from '../../../utills/YupSchemaEditProfile';
import styles from './styles';
import {useUserRegister} from '../../../api/auth';
import {errorMessage, successMessage} from '../../../utills/method';

export default function Signup({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, ScreenNames.SIGNUP>) {
  const [isDirectlyInvolve, setDirectlyInvolve] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);

  const toggleCategory = () => setCategoryModalVisible(!categoryModalVisible);
  const emailRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    mode: 'all',
    defaultValues: {
      email: __DEV__ ? 'test@example.com' : '',
      password: __DEV__ ? 'testPassword123' : '',
      name: __DEV__ ? 'John Doe' : '',
      contact: __DEV__ ? '123-456-7890' : '',
    },
    resolver: yupResolver(authSchema),
  });

  const {mutate} = useUserRegister();

  const onSubmit = (data: any) => {
    setIsLoading(true);
    if (selectedCategory) {
      const formData = {
        ...data,
        role: String(selectedCategory).toLowerCase(),
      };

      mutate(formData, {
        onSuccess: response => {
          if (response.ok) {
            console.log('User Registered Successfully:', response);
            setIsLoading(false);
            navigation.navigate(ScreenNames.LOGIN);
            successMessage('User regiserted successfully');
          } else {
            setIsLoading(false);
            errorMessage('Failed to register user');
          }
        },
      });
    } else {
      setIsLoading(false);
      errorMessage('Please select a role');
    }
  };

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
            placeholder="Enter your Contact Number"
            containerStyle={CommonStyles.marginTop_3}
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
            placeHolder="Role"
            Icon
            title="Role"
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
            disabled={!isDirectlyInvolve}
            onPress={handleSubmit(onSubmit)}
            isLoading={isLoading}
          />
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
