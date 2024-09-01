import { yupResolver } from '@hookform/resolvers/yup';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { View, Alert } from 'react-native';
import { ForgetPassword } from '../../../assets/svg';
import {
  Button,
  CustomText,
  Gradient,
  H1,
  ScreenWrapper,
  TextField,
} from '../../../components';
import Header from '../../../components/header';
import ScreenNames, { RootStackParamList } from '../../../routes/routes';
import AppColors from '../../../utills/Colors';
import { CommonStyles } from '../../../utills/CommonStyle';
import { FontFamily } from '../../../utills/FontFamily';
import { forgetPassSchema } from '../../../utills/YupSchemaEditProfile';
import styles from './styles';

type FormData = {
  email: string;
};

// Define the API function
const forgetPasswordApi = async (email: string) => {
  try {
    const response = await fetch(`http://192.168.18.49:3000/user/fogetPassword`, {
      method: 'POST', // Changed to POST
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }), // Send email in the body as JSON
    });
      console.log({response});
      
    if (!response.ok) {
      throw new Error('Failed to send OTP');
    }

    // Parse the response JSON
    const data = await response.json();
    
    // Log the entire response data
    console.log('Response Data:', data);
    
    // Log specific data if needed
    console.log('Extracted Data:', data.data); // Adjust based on actual response structure

    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error; // Optionally re-throw the error if you want to handle it further up the call stack
  }
};



export default function ForgotPassword({
  navigation,
}: NativeStackScreenProps<RootStackParamList, ScreenNames.FORGET_PASSWORD>) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    getValues, // Use getValues to access form values
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: 'all',
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(forgetPassSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async () => {
    try {
      setIsLoading(true); // Start loading
      const email = getValues('email'); // Retrieve the email from form values
  
      if (!email) {
        Alert.alert('Email is required');
        return;
      }
  
      // Example API call to send OTP
      const result = await forgetPasswordApi(email);
  
      // Check if the status code is 200
      if (result.statusCode === 200) {
        console.log('Email sent:', result);
        // Navigate to the OTP verification screen with the email from the form
        navigation.navigate(ScreenNames.VERIFY_OTP, { email });
      } else {
        // Handle other status codes if needed
       // Alert.alert('Failed to send OTP. Please try again.');
      }
    } catch (error: any) {
      console.error('Error:', error.message);
      Alert.alert('Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false); // End loading
    }
  };
  
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
        )}
      >
        <View style={styles.container}>
          <ForgetPassword />

          <H1
            textStyles={styles.heading}
            color={AppColors.white}
            size={5}
            textAlign={'center'}
            fontFam={FontFamily.appFontMedium}
          >
            Forget Your Password
          </H1>

          <CustomText
            color={AppColors.white}
            center
            textStyles={CommonStyles.marginTop_2}
          >
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
            title={isLoading ? "Sending..." : "RESET PASSWORD"}
            onPress={handleSubmit(onSubmit)}
            containerStyle={CommonStyles.marginTop_3}
            disabled={isLoading} // Disable button while loading
          />
        </View>

        <View style={styles.contact}>
          <CustomText
            font={FontFamily.appFontMedium}
            color={AppColors.white}
            onPress={() => navigation.navigate(ScreenNames.CONTACT_US)}
          >
            Contact Support
          </CustomText>
        </View>
      </ScreenWrapper>
    </Gradient>
  );
}
