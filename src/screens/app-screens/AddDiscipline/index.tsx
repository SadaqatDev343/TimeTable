import {yupResolver} from '@hookform/resolvers/yup';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {Image, TouchableOpacity, View} from 'react-native';
import {useCreateDiscipline} from '../../../api/discipline';
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
import {disciplineSchema} from '../../../utills/YupSchemaEditProfile';
import styles from './style';

export default function AddDisciplineScreen({navigation, route}: any) {
  const departmentId = route.params.departmentId;

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    mode: 'all',
    defaultValues: {
      name: '',
      code: '',
      teacher: '',
      description: '',
    },
    resolver: yupResolver(disciplineSchema),
  });

  const {mutate, isPending} = useCreateDiscipline();

  const onSubmit = (data: any) => {
    const payload = {
      name: data.name,
      code: data.code,
      teacher: data.teacher,
      description: data.description || undefined,
      department: departmentId,
    };

    mutate(payload, {
      onSuccess: response => {
        if (response.ok) {
          successMessage('Discipline created successfully');
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
            Add Discipline
          </H1>

          {/* Discipline Name */}
          <TextField
            title="Discipline Name"
            control={control}
            name="name"
            returnKeyType="next"
            placeholder="Enter discipline name"
            containerStyle={CommonStyles.marginTop_3}
          />

          {/* Discipline Code */}
          <TextField
            title="Discipline Code"
            control={control}
            name="code"
            returnKeyType="next"
            placeholder="Enter discipline code"
          />

          {/* Teacher */}
          <TextField
            title="Teacher"
            control={control}
            name="teacher"
            returnKeyType="next"
            placeholder="Enter teacher name"
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
            title="Add Discipline"
            containerStyle={CommonStyles.marginTop_4}
            onPress={handleSubmit(onSubmit)}
            isLoading={isPending}
          />
        </View>
      </ScreenWrapper>
    </Gradient>
  );
}
