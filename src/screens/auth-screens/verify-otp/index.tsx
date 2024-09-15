import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Button, CustomText, Gradient, ScreenWrapper} from '../../../components';
import AppColors from '../../../utills/Colors';
import ScreenNames, {RootStackParamList} from '../../../routes/routes';
import {View} from 'react-native';
import styles from './styles';
import Header from '../../../components/header';
import {VerifyOTP} from '../../../assets/svg';
import {CommonStyles} from '../../../utills/CommonStyle';
import {height, width} from '../../../utills/Diamension';
import {FontFamily} from '../../../utills/FontFamily';
import {HorizontalLine} from '../../../components/line';
import {OtpInput} from 'react-native-otp-entry';
export default function VerifyOtp({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, ScreenNames.VERIFY_OTP>) {
  return (
    <Gradient>
      <ScreenWrapper
        barStyle="light-content"
        paddinTop={0}
        statusBarColor={AppColors.transparent}
        paddingBottom={0}
        transclucent
        scrollEnabled>
        <View style={styles.mainViewContainer}>
          <Header
            containerStyle={styles.header}
            textColor={AppColors.white}
            iconColor={AppColors.white}
            title="OTP VERIFICATION"
            onPress={() => navigation.goBack()}
          />
          <View style={styles.iconStyles}>
            <VerifyOTP />
          </View>
          <CustomText
            size={5}
            fontWeight="bold"
            lineHeight={height(5)}
            color={AppColors.white}
            textStyles={CommonStyles.marginTop_4}>
            Enter Code
          </CustomText>
          <CustomText
            color={AppColors.white}
            textStyles={CommonStyles.marginTop_1}>
            Enter 6 digit code sent to your email address here
          </CustomText>
          <View style={styles.otpContainer}>
          <OtpInput
              numberOfDigits={4}
              focusColor={AppColors.white}
              secureTextEntry={true}
              focusStickBlinkingDuration={500}
              onTextChange={console.log()
              }
              textInputProps={{
                accessibilityLabel: 'One-Time Password',
              }}
              theme={{
                containerStyle: {paddingHorizontal: width(15)},
                pinCodeTextStyle: {color: AppColors.white},
              }}
            />
          </View>
          <Button
            title="Continue"
            containerStyle={CommonStyles.marginTop_5}
            onPress={() => navigation.navigate(ScreenNames.CREATE_PASSWORD)}
            // disabled={!isCode}
          />
          <View style={styles.footerContainer}>
            <CustomText color={AppColors.white}>
              Didn't received code?
            </CustomText>
            <CustomText
              color={AppColors.white}
              textStyles={CommonStyles.marginLeft_1}
              font={FontFamily.appFontSemiBold}
              onPress={() => {
                console.log('--');

                // resendCode();
              }}>
              Resend Code
            </CustomText>
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
              NOTE
            </CustomText>
            <HorizontalLine
              strokWidth={1.5}
              containerStyles={CommonStyles.marginTop_1}
              customWidth={width(35)}
              color={AppColors.white}
            />
          </View>
          <View style={styles.note}>
            <CustomText color={AppColors.white} justify>
              If you do not see the email in a few minutes, check your “junk
              mail” folder or “spam” folder.
            </CustomText>
          </View>
        </View>
      </ScreenWrapper>
    </Gradient>
  );
}
