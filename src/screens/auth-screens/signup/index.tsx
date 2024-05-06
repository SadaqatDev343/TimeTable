import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  Button,
  CustomText,
  DropDownButton,
  Gradient,
  H1,
  ScreenWrapper,
  TextField,
} from '../../../components';
import AppColors from '../../../utills/Colors';
import ScreenNames, {RootStackParamList} from '../../../routes/routes';
import {Image, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {AppLogo} from '../../../assets/images';
import {FontFamily} from '../../../utills/FontFamily';
import {CommonStyles} from '../../../utills/CommonStyle';
import {useRef, useState} from 'react';
import {CheckBox, UnCheckBox} from '../../../assets/svg';
import {UserType} from '../../../utills/userType';
import {Header} from 'react-native/Libraries/NewAppScreen';
import DropDownModal from '../../../components/drop-down-modal';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {authSchema} from '../../../utills/YupSchemaEditProfile';

export default function Signup({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, ScreenNames.SIGNUP>) {
  const [isDirectlyInvolve, setDirectlyInvolve] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
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
      email: '',
      password: '',
      name: '',
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
            name="Contact"
            returnKeyType="next"
            placeholder="Enter your Contact Number"
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
            onPress={() => console.log('--')}
            // onPress={handleSubmit(registerUser)}
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
