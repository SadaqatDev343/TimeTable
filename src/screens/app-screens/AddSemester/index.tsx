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
import {Image, View, TouchableOpacity} from 'react-native'; // Import TouchableOpacity
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
import { Types } from 'mongoose'; // Import Types from mongoose

export default function AddSemesterScreen({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, ScreenNames.ADD_SEMESTER>) {
  // Dummy data for department and discipline dropdowns
  const departments = [
    {label: 'Computer Science', value: 'cs'},
    {label: 'Mathematics', value: 'math'},
    {label: 'Physics', value: 'physics'},
    {label: 'Chemistry', value: 'chemistry'},
  ];

  const disciplines = [
    {label: 'Mathematical Analysis', value: 'math_analysis'},
    {label: 'Quantum Mechanics', value: 'quantum_mechanics'},
    {label: 'Organic Chemistry', value: 'organic_chemistry'},
    {label: 'Data Structures', value: 'data_structures'},
  ];

  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [selectedDiscipline, setSelectedDiscipline] = useState<string | null>(null);
  const [departmentModalVisible, setDepartmentModalVisible] = useState(false);
  const [disciplineModalVisible, setDisciplineModalVisible] = useState(false);

  const toggleDepartment = () => setDepartmentModalVisible(!departmentModalVisible);
  const toggleDiscipline = () => setDisciplineModalVisible(!disciplineModalVisible);

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
          style={styles.backButton}
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
            Add Semester
          </H1>

          {/* Discipline Name */}
          <TextField
            title="Discipline Name"
            control={control}
            name="name"
            returnKeyType="next"
            placeholder="Enter discipline name"
            containerStyle={CommonStyles.marginTop_3}
            error={errors.name?.message}
          />

          {/* Discipline Code */}
          <TextField
            title="Discipline Code"
            control={control}
            name="code"
            returnKeyType="next"
            placeholder="Enter discipline code"
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
            placeholder="Enter discipline description (optional)"
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
            value={selectedDepartment || "Select Department"}
          />
          
          {/* Department Dropdown Modal */}
          <DropDownModal
            isVisible={departmentModalVisible}
            Data={departments}
            onClose={toggleDepartment}
            onPress={val => {
              setSelectedDepartment(val?.label);
              toggleDepartment();
            }}
          />

          {/* Discipline Dropdown */}
          <DropDownButton
            placeHolder="Select Discipline"
            Icon
            title="Discipline"
            placeholderColor={AppColors.grey10}
            containerStyle={styles.dropdown}
            onPress={toggleDiscipline}
            value={selectedDiscipline || "Select Discipline"}
          />
          
          {/* Discipline Dropdown Modal */}
          <DropDownModal
            isVisible={disciplineModalVisible}
            Data={disciplines}
            onClose={toggleDiscipline}
            onPress={val => {
              setSelectedDiscipline(val?.label);
              toggleDiscipline();
            }}
          />

          {/* Submit Button */}
          <Button
            title="Add Semester"
            containerStyle={CommonStyles.marginTop_2}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </ScreenWrapper>
    </Gradient>
  );
}
