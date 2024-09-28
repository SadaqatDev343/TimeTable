import {yupResolver} from '@hookform/resolvers/yup';
import React from 'react';
import {useForm} from 'react-hook-form';
import {Image, TouchableOpacity, View} from 'react-native';
import {useCreateSemester} from '../../../api/semester';
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

  const {
    control,
    handleSubmit,
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

  const {mutate, isPending} = useCreateSemester();

  const onSubmit = (data: any) => {
    const payload = {
      name: data.name,
      code: data.code,
      description: data.description || undefined,
      department: departmentId,
      discipline: disciplineId,
    };

    mutate(payload, {
      onSuccess: response => {
        if (response.ok) {
          successMessage('Semester created successfully');
          navigation.goBack();
        } else {
          errorMessage('Something went wrong');
        }
      },
    });
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
            Add Semester
          </H1>

          {/* Discipline Name */}
          <TextField
            title="Semester Name"
            control={control}
            name="name"
            returnKeyType="next"
            placeholder="Enter discipline name"
            containerStyle={CommonStyles.marginTop_3}
          />

          {/* Discipline Code */}
          <TextField
            title="Semester Code"
            control={control}
            name="code"
            returnKeyType="next"
            placeholder="Enter discipline code"
          />

          {/* Description */}
          <TextField
            title="Description"
            control={control}
            name="description"
            returnKeyType="next"
            placeholder="Enter discipline description (optional)"
          />

          {/* Submit Button */}
          <Button
            title="Add Semester"
            containerStyle={CommonStyles.marginTop_2}
            onPress={handleSubmit(onSubmit)}
            isLoading={isPending}
          />
        </View>
      </ScreenWrapper>
    </Gradient>
  );
}
