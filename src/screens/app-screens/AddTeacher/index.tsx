import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import {Image, TouchableOpacity, View} from 'react-native';
import {AppLogo} from '../../../assets/images';
import {Back} from '../../../assets/svg';
import {Button, H1, ScreenWrapper, TextField} from '../../../components';
import AppColors from '../../../utills/Colors';
import {CommonStyles} from '../../../utills/CommonStyle';
import {FontFamily} from '../../../utills/FontFamily';
import {errorMessage, successMessage} from '../../../utills/method';
import {teacherSchema} from '../../../utills/YupSchemaEditProfile'; // Update Yup schema
import styles from './style';
import {useCreateTeacher} from '../../../api/teacher';

export default function AddTeachers({navigation, route}: any) {
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
    reset, // <-- Import the reset function from useForm
  } = useForm({
    mode: 'all',
    defaultValues: {
      name: '',
      subjectTaught: '',
      designation: '',
      email: '',
      phoneNumber: '',
    },
    resolver: yupResolver(teacherSchema), // Update Yup schema
  });

  const {mutate, isPending} = useCreateTeacher(); // Change API call

  const onSubmit = (data: any) => {
    mutate(data, {
      onSuccess: response => {
        if (response.ok) {
          successMessage('Teacher added successfully');
          reset(); // <-- Reset form fields after successful submission
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
          Add Teacher
        </H1>

        {/* Teacher Name */}
        <TextField
          title="Teacher Name"
          control={control}
          name="name"
          returnKeyType="next"
          placeholder="Enter teacher's name"
          containerStyle={CommonStyles.marginTop_3}
        />

        {/* Subject Taught */}
        <TextField
          title="Subject Taught"
          control={control}
          name="subjectTaught"
          returnKeyType="next"
          placeholder="Enter subject taught"
          containerStyle={CommonStyles.marginTop_2}
        />

        {/* Designation */}
        <TextField
          title="Designation"
          control={control}
          name="designation"
          returnKeyType="next"
          placeholder="Enter designation"
          containerStyle={CommonStyles.marginTop_2}
        />

        {/* Email */}
        <TextField
          title="Email"
          control={control}
          name="email"
          returnKeyType="next"
          placeholder="Enter email"
          containerStyle={CommonStyles.marginTop_2}
        />

        {/* Phone Number */}
        <TextField
          title="Phone Number"
          control={control}
          name="phoneNumber"
          returnKeyType="next"
          placeholder="Enter phone number"
          containerStyle={CommonStyles.marginTop_2}
        />

        {/* Submit Button */}
        <Button
          title={isPending ? 'Adding...' : 'Add Teacher'}
          containerStyle={CommonStyles.marginTop_2}
          onPress={handleSubmit(onSubmit)}
          disabled={isPending}
        />
      </View>
    </ScreenWrapper>
  );
}
