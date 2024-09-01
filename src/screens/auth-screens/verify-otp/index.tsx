import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, CustomText, Gradient, ScreenWrapper } from '../../../components';
import AppColors from '../../../utills/Colors';
import ScreenNames, { RootStackParamList } from '../../../routes/routes';
import styles from './styles';
import Header from '../../../components/header';
import { VerifyOTP } from '../../../assets/svg';
import { CommonStyles } from '../../../utills/CommonStyle';
import { height, width } from '../../../utills/Diamension';
import { FontFamily } from '../../../utills/FontFamily';
import { HorizontalLine } from '../../../components/line';
// Replacing the OTPInputView import
import OtpInputs from 'react-native-otp-inputs';

export default function VerifyOtp({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, ScreenNames.VERIFY_OTP>) {
  const [code, setCode] = useState(''); // State for OTP code
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const { email } = route.params || {};

  // Function to handle OTP verification
  const verifyOtp = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://192.168.18.49:3000/user/verifyOTP', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          OTP: code,
          email: email, // Assuming email is passed as a route param
        }),
      });

      const result = await response.json();

      if (response.ok && result.statusCode === 200) {
        Alert.alert('OTP Verified', 'You can now proceed!');
        navigation.navigate(ScreenNames.CREATE_PASSWORD); // Navigate to the next screen
      } else {
        Alert.alert('Verification Failed', result.message || 'Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Failed to verify OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

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
            Enter 4 digit code sent to your email address here
          </CustomText>
          <View style={styles.otpContainer}>
            <OtpInputs
              handleChange={setCode} // Update code when input changes
              numberOfInputs={4} // Number of OTP inputs
              autofillFromClipboard={false} // Disable autofill if not required
              style={styles.otpView}
              inputStyles={styles.underlineStyleBase} // Style individual inputs
            />
          </View>
          <Button
            title="Continue"
            containerStyle={CommonStyles.marginTop_5}
            onPress={verifyOtp} // Call the verification function
            disabled={isLoading || code.length !== 6} // Disable button if not 6 digits
          />
          <View style={styles.footerContainer}>
            <CustomText color={AppColors.white}>
              Didn't receive code?
            </CustomText>
            <CustomText
              color={AppColors.white}
              textStyles={CommonStyles.marginLeft_1}
              font={FontFamily.appFontSemiBold}
              onPress={() => {
                console.log('--');
                // Handle resend code
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
              If you do not see the email in a few minutes, check your “junk mail” folder or “spam” folder.
            </CustomText>
          </View>
        </View>
      </ScreenWrapper>
    </Gradient>
  );
}
