import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import {Image, TouchableOpacity, View} from 'react-native';
import {useCreateDepartment} from '../../../api/department';
import {AppLogo} from '../../../assets/images';
import {Back} from '../../../assets/svg';
import {Button, H1, ScreenWrapper, TextField} from '../../../components';
import AppColors from '../../../utills/Colors';
import {CommonStyles} from '../../../utills/CommonStyle';
import {FontFamily} from '../../../utills/FontFamily';
import {errorMessage, successMessage} from '../../../utills/method';
import {departmentSchema} from '../../../utills/YupSchemaEditProfile';
import styles from './style';

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
    resolver: yupResolver(departmentSchema),
  });

  const {mutate, isPending} = useCreateDepartment();

  const onSubmit = (data: any) => {
    mutate(data, {
      onSuccess: response => {
        if (response.ok) {
          successMessage('Department created successfully');
          navigation.goBack();
        } else {
          errorMessage('Something went wrong');
        }
      },
    });
  };

  return (
    <ScreenWrapper
      backgroundColor="#3333ff"
      statusBarColor="#3333ff"
      scrollEnabled
      barStyle="light-content">
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
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
          title={isPending ? 'Adding...' : 'Add Department'}
          containerStyle={CommonStyles.marginTop_2}
          onPress={handleSubmit(onSubmit)}
          disabled={isPending}
        />
      </View>
    </ScreenWrapper>
  );
}
