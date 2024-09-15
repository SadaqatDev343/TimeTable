import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  Button,
  DropDownButton,
  Gradient,
  H1,
  ScreenWrapper,
  TextField,
} from '../../../components';
import AppColors from '../../../utills/Colors';
import ScreenNames, {RootStackParamList} from '../../../routes/routes';
import {Image, View, TouchableOpacity} from 'react-native';
import {AppLogo} from '../../../assets/images';
import {FontFamily} from '../../../utills/FontFamily';
import {CommonStyles} from '../../../utills/CommonStyle';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import styles from './style';
import { disciplineSchema } from '../../../utills/YupSchemaEditProfile';
import { Back } from '../../../assets/svg';
import React, { useState } from 'react';
import DropDownModal from '../../../components/drop-down-modal';

// Dummy data for dropdowns
const departments = [
  {label: 'Computer Science', value: 'cs'},
  {label: 'Mathematics', value: 'math'},
  {label: 'Physics', value: 'physics'},
  {label: 'Chemistry', value: 'chemistry'},
];

const disciplines = [
  {label: 'Mathematics', value: 'math'},
  {label: 'Physics', value: 'physics'},
  {label: 'Chemistry', value: 'chemistry'},
];

const semesters = [
  {label: 'Semester 1', value: 'sem1'},
  {label: 'Semester 2', value: 'sem2'},
  {label: 'Semester 3', value: 'sem3'},
];

export default function AddSectionScreen({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, ScreenNames.ADD_SECTION>) {
  // State for dropdown modals
  const [departmentModalVisible, setDepartmentModalVisible] = useState(false);
  const [disciplineModalVisible, setDisciplineModalVisible] = useState(false);
  const [semesterModalVisible, setSemesterModalVisible] = useState(false);

  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [selectedDiscipline, setSelectedDiscipline] = useState<string | null>(null);
  const [selectedSemester, setSelectedSemester] = useState<string | null>(null);

  const toggleDepartment = () => setDepartmentModalVisible(!departmentModalVisible);
  const toggleDiscipline = () => setDisciplineModalVisible(!disciplineModalVisible);
  const toggleSemester = () => setSemesterModalVisible(!semesterModalVisible);

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
      department: '',
      discipline: '',
      semester: '',
      capacity: 1,
    },
    resolver: yupResolver(disciplineSchema),
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
            error={errors.name?.message}
          />

          {/* Section Code */}
          <TextField
            title="Section Code"
            control={control}
            name="code"
            returnKeyType="next"
            placeholder="Enter section code"
            containerStyle={CommonStyles.marginTop_2}
            error={errors.code?.message}
          />

          {/* Teacher */}
          <TextField
            title="Teacher"
            control={control}
            name="teacher"
            returnKeyType="next"
            placeholder="Enter teacher name"
            containerStyle={CommonStyles.marginTop_2}
            error={errors.teacher?.message}
          />

          {/* Description */}
          <TextField
            title="Description"
            control={control}
            name="description"
            returnKeyType="next"
            placeholder="Enter section description (optional)"
            containerStyle={CommonStyles.marginTop_2}
            error={errors.description?.message}
          />

          {/* Department Dropdown */}
          <DropDownButton
            placeHolder="Select Department"
            Icon
            title="Department"
            placeholderColor={AppColors.grey10}
            containerStyle={styles.dropdown}
            onPress={toggleDepartment}
            value={selectedDepartment}
          />

          {/* Discipline Dropdown */}
          <DropDownButton
            placeHolder="Select Discipline"
            Icon
            title="Discipline"
            placeholderColor={AppColors.grey10}
            containerStyle={styles.dropdown}
            onPress={toggleDiscipline}
            value={selectedDiscipline}
          />

          {/* Semester Dropdown */}
          <DropDownButton
            placeHolder="Select Semester"
            Icon
            title="Semester"
            placeholderColor={AppColors.grey10}
            containerStyle={styles.dropdown}
            onPress={toggleSemester}
            value={selectedSemester}
          />

          {/* Dropdown modals */}
          <DropDownModal
            isVisible={departmentModalVisible}
            Data={departments}
            onClose={toggleDepartment}
            onPress={val => {
              setSelectedDepartment(val?.label); 
              toggleDepartment();
            }}
          />

          <DropDownModal
            isVisible={disciplineModalVisible}
            Data={disciplines}
            onClose={toggleDiscipline}
            onPress={val => {
              setSelectedDiscipline(val?.label); 
              toggleDiscipline();
            }}
          />

          <DropDownModal
            isVisible={semesterModalVisible}
            Data={semesters}
            onClose={toggleSemester}
            onPress={val => {
              setSelectedSemester(val?.label); 
              toggleSemester();
            }}
          />

          {/* Capacity */}
          <TextField
            title="Capacity"
            control={control}
            name="capacity"
            returnKeyType="next"
            placeholder="Enter section capacity"
            containerStyle={CommonStyles.marginTop_2}
            keyboardType="numeric"
            error={errors.capacity?.message}
          />

          {/* Submit Button */}
          <Button
            title="Add Section"
            containerStyle={CommonStyles.marginTop_2}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </ScreenWrapper>
    </Gradient>
  );
}
