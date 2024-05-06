import {NativeStackScreenProps} from '@react-navigation/native-stack';
import ScreenNames, {RootStackParamList} from '../../../routes/routes';
import {
  Button,
  CustomText,
  Gradient,
  H1,
  ScreenWrapper,
  TextField,
} from '../../../components';
import AppColors from '../../../utills/Colors';
import Header from '../../../components/header';
import styles from './styles';
import {Image, View} from 'react-native';
import {CommonStyles} from '../../../utills/CommonStyle';
import {FontFamily} from '../../../utills/FontFamily';
import {ForgetPassword} from '../../../assets/svg';
import {AppLogo} from '../../../assets/images';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {forgetPassSchema} from '../../../utills/YupSchemaEditProfile';

export default function ForgotPassword({
  navigation,
}: NativeStackScreenProps<RootStackParamList, ScreenNames.FORGET_PASSWORD>) {
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    mode: 'all',
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(forgetPassSchema),
  });
  return (
    <Gradient>
      <ScreenWrapper
        barStyle="light-content"
        paddinTop={0}
        statusBarColor={AppColors.transparent}
        paddingBottom={0}
        scrollEnabled
        transclucent
        headerUnScrollable={() => (
          <Header
            containerStyle={styles.header}
            textColor={AppColors.white}
            iconColor={AppColors.white}
            title="FORGOT PASSWORD"
            onPress={() => navigation.goBack()}
          />
        )}>
        <View style={styles.container}>
          <ForgetPassword />

          <H1
            textStyles={styles.heading}
            color={AppColors.white}
            size={5}
            textAlign={'center'}
            fontFam={FontFamily.appFontMedium}>
            Forget Your Password
          </H1>

          <CustomText
            color={AppColors.white}
            center
            textStyles={CommonStyles.marginTop_2}>
            Provide your account's email for which you want to reset your
            password!
          </CustomText>
          <TextField
            title="Email"
            placeholder="Enter your email address"
            containerStyle={CommonStyles.marginTop_5}
            control={control}
            autoCapitalize="none"
            keyboardType="email-address"
            name="email"
          />
          <Button
            title="RESET PASSWORD"
            onPress={() => console.log('----')}
            containerStyle={CommonStyles.marginTop_3}
          />
        </View>
        <View style={styles.contact}>
          <CustomText
            font={FontFamily.appFontMedium}
            color={AppColors.white}
            onPress={() => navigation.navigate(ScreenNames.CONTACT_US)}>
            Contact Support
          </CustomText>
        </View>
      </ScreenWrapper>
    </Gradient>
  );
}
