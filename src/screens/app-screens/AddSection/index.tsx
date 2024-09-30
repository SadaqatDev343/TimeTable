import {yupResolver} from '@hookform/resolvers/yup';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Image, TouchableOpacity, View} from 'react-native';
import {useCreateSection} from '../../../api/section';
import {useGetAllTeachers} from '../../../api/teacher'; // Import the teacher fetching API hook
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

// Define a type for the teacher data
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
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null); // State to hold selected teacher
  const [teacherModalVisible, setTeacherModalVisible] = useState(false);
  const [teachers, setTeachers] = useState<Teacher[]>([]); // Array of Teacher objects

  // Fetch all teachers
  const {data: teachersData, isLoading} = useGetAllTeachers();

  useEffect(() => {
    if (teachersData?.ok) {
      setTeachers(teachersData.response.data.data); // Set teachers data from API
    }
  }, [teachersData]);

  const toggleTeacherModal = () => setTeacherModalVisible(!teacherModalVisible);

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
    resolver: yupResolver(sectionSchema),
  });

  const {mutate, isPending} = useCreateSection();

  const onSubmit = (data: any) => {
    if (!selectedTeacher) {
      errorMessage('Select teacher first');
      return;
    }
    const payload = {
      name: data.name,
      code: data.code,
      teacher: selectedTeacher?.name, // Pass the selected teacher ID
      description: data.description || undefined,
      department: departmentId,
      discipline: disciplineId,
      semester: semesterId,
      capacity: data.capacity,
    };

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

          {/* Teacher Dropdown */}
          <DropDownButton
            placeHolder="Select Teacher"
            Icon
            title="Teacher"
            placeholderColor={AppColors.grey10}
            containerStyle={styles.dropdown}
            onPress={toggleTeacherModal}
            value={selectedTeacher?.name || 'Select Teacher'}
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

        {/* Teacher Dropdown Modal */}
        <DropDownModal
          isVisible={teacherModalVisible}
          Data={teachers} // Pass teacher data to the dropdown modal
          onClose={toggleTeacherModal}
          onPress={teacher => {
            setSelectedTeacher(teacher); // Set the selected teacher
            toggleTeacherModal();
          }}
        />
      </ScreenWrapper>
    </Gradient>
  );
}
