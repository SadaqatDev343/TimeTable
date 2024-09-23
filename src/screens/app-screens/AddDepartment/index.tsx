import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  Button,
  Gradient,
  H1,
  ScreenWrapper,
  TextField,
} from '../../../components';
import AppColors from '../../../utills/Colors';
import ScreenNames, {RootStackParamList} from '../../../routes/routes';
import {Image, View, TouchableOpacity} from 'react-native'; // Import TouchableOpacity
import {AppLogo} from '../../../assets/images';
import {FontFamily} from '../../../utills/FontFamily';
import {CommonStyles} from '../../../utills/CommonStyle';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {departmentSchema} from '../../../utills/YupSchemaEditProfile'; // Updated schema import
import styles from './style';
import {Back} from '../../../assets/svg';

export default function AddDepartmentScreen({navigation, route}: any) {
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    mode: 'all',
    defaultValues: {
      name: '',
      headOfDepartment: '',
      description: '',
      email: '',
      phoneNumber: '',
    },
    resolver: yupResolver(departmentSchema), // Updated resolver
  });

  const onSubmit = (data: any) => {
    console.log('Form Data:', data);
    // Handle your form submission here
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
        {/* Back button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton} // Add your styling here
        >
          <Back width={24} height={24} color={AppColors.white} />
        </TouchableOpacity>

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
            Add Department
          </H1>

          {/* Department Name */}
          <TextField
            title="Department Name"
            control={control}
            name="name"
            returnKeyType="next"
            placeholder="Enter department name"
            containerStyle={CommonStyles.marginTop_3}
          />

          {/* Head of Department */}
          <TextField
            title="Head of Department"
            control={control}
            name="headOfDepartment"
            returnKeyType="next"
            placeholder="Enter head of department"
            containerStyle={CommonStyles.marginTop_2}
          />

          {/* Description */}
          <TextField
            title="Description"
            control={control}
            name="description"
            returnKeyType="next"
            placeholder="Enter department description (optional)"
            containerStyle={CommonStyles.marginTop_2}
          />

          {/* Email */}
          <TextField
            title="Email"
            control={control}
            name="email"
            returnKeyType="next"
            placeholder="Enter email (optional)"
            containerStyle={CommonStyles.marginTop_2}
          />

          {/* Phone Number */}
          <TextField
            title="Phone Number"
            control={control}
            name="phoneNumber"
            returnKeyType="next"
            placeholder="Enter phone number (optional)"
            containerStyle={CommonStyles.marginTop_2}
          />

          {/* Submit Button */}
          <Button
            title="Add Department"
            containerStyle={CommonStyles.marginTop_2}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </ScreenWrapper>
    </Gradient>
  );
}
