import {yupResolver} from '@hookform/resolvers/yup';
import React, {useEffect, useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {
  useCreateSection,
  useGetSectionById,
  useUpdateSectionById,
} from '../../../api/section';
import {useGetAllTeachers} from '../../../api/teacher';
import {AppLogo} from '../../../assets/images';
import {Back} from '../../../assets/svg';
import {
  Button,
  DropDownButton,
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
import DropDownModal from '../../../components/drop-down-modal';
import {useForm} from 'react-hook-form';

type Teacher = {
  _id: string;
  name: string;
  designation: string;
  email: string;
  phoneNumber: string;
  subjectTaught: string;
};

export default function AddSectionScreen({navigation, route}: any) {
  const departmentId = route.params.departmentId;
  const disciplineId = route.params.disciplineId;
  const semesterId = route.params.semesterId;
  const sectionId = route.params.sectionId;

  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [teacherModalVisible, setTeacherModalVisible] = useState(false);
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  const {data: teachersData} = useGetAllTeachers();
  const {data} = useGetSectionById(sectionId);

  useEffect(() => {
    if (teachersData?.ok) {
      setTeachers(teachersData.response.data.data);
    }
  }, [teachersData]);

  useEffect(() => {
    if (data?.ok) {
      const section = data.response.data.data;
      setSelectedTeacher(section.teacher);
      setValue('name', section.name);
      setValue('code', section.code);
      setValue('description', section.description);
      setValue('capacity', section.capacity.toString());
    }
  }, [data]);

  const toggleTeacherModal = () => setTeacherModalVisible(!teacherModalVisible);

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
      capacity: undefined,
    },
    resolver: yupResolver(sectionSchema),
  });

  const {mutate: updateSection, isPending: isUpdating} = useUpdateSectionById();
  const {mutate, isPending} = useCreateSection();

  const onSubmit = (data: any) => {
    if (!selectedTeacher) {
      errorMessage('Select teacher first');
      return;
    }

    const payload = {
      name: data.name,
      code: data.code,
      teacher: selectedTeacher?._id,
      description: data.description || undefined,
      department: departmentId,
      discipline: disciplineId,
      semester: semesterId,
      capacity: data.capacity,
    };

    if (sectionId) {
      // If sectionId exists, update the section
      updateSection(
        {id: sectionId, payload},
        {
          onSuccess: response => {
            if (response.ok) {
              successMessage('Section updated successfully');
              navigation.goBack();
            } else {
              console.log(response.error.response?.data);
              errorMessage('Something went wrong');
            }
          },
        },
      );
    } else {
      // Otherwise, create a new section
      mutate(payload, {
        onSuccess: response => {
          if (response.ok) {
            successMessage('Section created successfully');
            navigation.goBack();
          } else {
            errorMessage('Something went wrong');
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
            {sectionId ? 'Update Section' : 'Add Section'}{' '}
            {/* Change title based on action */}
          </H1>

          <TextField
            title="Section Name"
            control={control}
            name="name"
            returnKeyType="next"
            placeholder="Enter section name"
            containerStyle={CommonStyles.marginTop_3}
          />

          <TextField
            title="Section Code"
            control={control}
            name="code"
            returnKeyType="next"
            placeholder="Enter section code"
          />

          <DropDownButton
            placeHolder="Select Teacher"
            Icon
            title="Teacher"
            placeholderColor={AppColors.grey10}
            containerStyle={styles.dropdown}
            onPress={toggleTeacherModal}
            value={selectedTeacher?.name || 'Select Teacher'}
          />

          <TextField
            title="Capacity"
            control={control}
            name="capacity"
            returnKeyType="next"
            placeholder="Enter section capacity"
            keyboardType="numeric"
          />

          <TextField
            title="Description"
            control={control}
            name="description"
            returnKeyType="next"
            placeholder="Enter section description (optional)"
          />

          <Button
            title={sectionId ? 'Update Section' : 'Add Section'} // Change button title based on action
            containerStyle={CommonStyles.marginTop_2}
            onPress={handleSubmit(onSubmit)}
            isLoading={isPending || isUpdating} // Loading state if either action is pending
          />
        </View>

        <DropDownModal
          isVisible={teacherModalVisible}
          Data={teachers}
          onClose={toggleTeacherModal}
          onPress={teacher => {
            setSelectedTeacher(teacher);
            toggleTeacherModal();
          }}
        />
      </ScreenWrapper>
    </Gradient>
  );
}
