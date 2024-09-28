import {yupResolver} from '@hookform/resolvers/yup';
import React from 'react';
import {useForm} from 'react-hook-form';
import {Image, TouchableOpacity, View} from 'react-native';
import {useCreateSection} from '../../../api/section';
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
import {sectionSchema} from '../../../utills/YupSchemaEditProfile';
import styles from './style';

export default function AddSectionScreen({navigation, route}: any) {
  const departmentId = route.params.departmentId;
  const disciplineId = route.params.disciplineId;
  const semesterId = route.params.semesterId;
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
    resolver: yupResolver(sectionSchema),
  });

  const {mutate, isPending} = useCreateSection();

  const onSubmit = (data: any) => {
    const payload = {
      name: data.name,
      code: data.code,
      teacher: data.teacher,
      description: data.description || undefined,
      department: departmentId,
      discipline: disciplineId,
      semester: semesterId,
      capacity: data.capacity,
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
            Add Section
          </H1>

          {/* Section Name */}
          <TextField
            title="Section Name"
            control={control}
            name="name"
            returnKeyType="next"
            placeholder="Enter section name"
            containerStyle={CommonStyles.marginTop_3}
          />

          {/* Section Code */}
          <TextField
            title="Section Code"
            control={control}
            name="code"
            returnKeyType="next"
            placeholder="Enter section code"
          />

          {/* Teacher */}
          <TextField
            title="Teacher"
            control={control}
            name="teacher"
            returnKeyType="next"
            placeholder="Enter teacher name"
          />

          {/* Capacity */}
          <TextField
            title="Capacity"
            control={control}
            name="capacity"
            returnKeyType="next"
            placeholder="Enter section capacity"
            keyboardType="numeric"
          />

          {/* Description */}
          <TextField
            title="Description"
            control={control}
            name="description"
            returnKeyType="next"
            placeholder="Enter section description (optional)"
          />

          {/* Submit Button */}
          <Button
            title="Add Section"
            containerStyle={CommonStyles.marginTop_2}
            onPress={handleSubmit(onSubmit)}
            isLoading={isPending}
          />
        </View>
      </ScreenWrapper>
    </Gradient>
  );
}
