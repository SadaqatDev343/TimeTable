import {yupResolver} from '@hookform/resolvers/yup';
import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {Image, TouchableOpacity, View} from 'react-native';
import {
  useCreateSemester,
  useGetSemesterById,
  useUpdateSemesterById,
} from '../../../api/semester';
import {AppLogo} from '../../../assets/images';
import {Back} from '../../../assets/svg';
import {
  Button,
  Gradient,
  H1,
  ScreenWrapper,
  TextField,
} from '../../../components';
import AppColors from '../../../utills/Colors';
import {CommonStyles} from '../../../utills/CommonStyle';
import {FontFamily} from '../../../utills/FontFamily';
import {errorMessage, successMessage} from '../../../utills/method';
import {semesterSchema} from '../../../utills/YupSchemaEditProfile';
import styles from './style';

export default function AddSemesterScreen({navigation, route}: any) {
  const departmentId = route.params.departmentId;
  const disciplineId = route.params.disciplineId;
  const semesterId = route.params.semesterId;

  // Fetch semester data if editing an existing semester
  const {data} = useGetSemesterById(semesterId);

  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors, isValid},
  } = useForm({
    mode: 'all',
    defaultValues: {
      name: '',
      code: '',
      description: '',
    },
    resolver: yupResolver(semesterSchema),
  });

  useEffect(() => {
    if (data?.ok) {
      // Populate form fields with existing semester data
      const semesterData = data.response.data;
      setValue('name', semesterData.name);
      setValue('code', semesterData.code);
      setValue('description', semesterData.description || '');
    }
  }, [data, setValue]);

  const {mutate: createSemester, isPending: isCreating} = useCreateSemester();
  const {mutate: updateSemester, isPending: isUpdating} =
    useUpdateSemesterById();

  const onSubmit = (formData: any) => {
    const payload = {
      name: formData.name,
      code: formData.code,
      description: formData.description || undefined,
      department: departmentId,
      discipline: disciplineId,
    };

    // Check if we are editing an existing semester
    if (semesterId) {
      // Update existing semester
      updateSemester(
        {id: semesterId, payload},
        {
          onSuccess: response => {
            if (response.ok) {
              successMessage('Semester updated successfully');
              navigation.goBack();
            } else {
              errorMessage('Something went wrong while updating');
            }
          },
        },
      );
    } else {
      // Create new semester
      createSemester(payload, {
        onSuccess: response => {
          if (response.ok) {
            successMessage('Semester created successfully');
            navigation.goBack();
          } else {
            errorMessage('Something went wrong while creating');
          }
        },
      });
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
        {/* Back button */}
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
            {semesterId ? 'Edit Semester' : 'Add Semester'}
          </H1>

          {/* Semester Name */}
          <TextField
            title="Semester Name"
            control={control}
            name="name"
            returnKeyType="next"
            placeholder="Enter semester name"
            containerStyle={CommonStyles.marginTop_3}
          />

          {/* Semester Code */}
          <TextField
            title="Semester Code"
            control={control}
            name="code"
            returnKeyType="next"
            placeholder="Enter semester code"
          />

          {/* Description */}
          <TextField
            title="Description"
            control={control}
            name="description"
            returnKeyType="next"
            placeholder="Enter semester description (optional)"
          />

          {/* Submit Button */}
          <Button
            title={semesterId ? 'Update Semester' : 'Add Semester'}
            containerStyle={CommonStyles.marginTop_2}
            onPress={handleSubmit(onSubmit)}
            isLoading={isCreating || isUpdating}
          />
        </View>
      </ScreenWrapper>
    </Gradient>
  );
}
