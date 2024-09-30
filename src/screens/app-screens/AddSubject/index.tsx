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
import {subjectSchema} from '../../../utills/YupSchemaEditProfile'; // Update Yup schema for subject
import styles from './style';
import {useCreateSubject} from '../../../api/subject'; // Change API call to useCreateSubject

export default function AddSubject({navigation, route}: any) {
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
    reset,
  } = useForm({
    mode: 'all',
    defaultValues: {
      courseCode: '',
      name: '',
    },
    resolver: yupResolver(subjectSchema), // Update Yup schema for subject
  });

  const {mutate, isPending} = useCreateSubject(); // Change API call to useCreateSubject

  const onSubmit = (data: any) => {
    mutate(data, {
      onSuccess: response => {
        if (response.ok) {
          successMessage('Subject added successfully');
          reset(); // Reset form fields after successful submission
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
          Add Subject
        </H1>

        {/* Course Code */}
        <TextField
          title="Course Code"
          control={control}
          name="courseCode"
          returnKeyType="next"
          placeholder="Enter course code"
          containerStyle={CommonStyles.marginTop_3}
        />

        {/* Subject Name */}
        <TextField
          title="Subject Name"
          control={control}
          name="name"
          returnKeyType="next"
          placeholder="Enter subject name"
          containerStyle={CommonStyles.marginTop_2}
        />

        {/* Credits */}
        <TextField
          title="Credits"
          control={control}
          name="credits"
          returnKeyType="next"
          placeholder="Enter subject credits"
          containerStyle={CommonStyles.marginTop_2}
        />

        {/* Submit Button */}
        <Button
          title={isPending ? 'Adding...' : 'Add Subject'}
          containerStyle={CommonStyles.marginTop_2}
          onPress={handleSubmit(onSubmit)}
          disabled={isPending}
        />
      </View>
    </ScreenWrapper>
  );
}
