import {yupResolver} from '@hookform/resolvers/yup';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {Image, TouchableOpacity, View} from 'react-native';
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
import DropDownModal from '../../../components/drop-down-modal';
import ScreenNames, {RootStackParamList} from '../../../routes/routes';
import AppColors from '../../../utills/Colors';
import {CommonStyles} from '../../../utills/CommonStyle';
import {FontFamily} from '../../../utills/FontFamily';
import {semesterSchema} from '../../../utills/YupSchemaEditProfile';
import styles from './style';
import {errorMessage, successMessage} from '../../../utills/method';
import {useCreateSemester} from '../../../api/semester';

export default function AddSemesterScreen({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, ScreenNames.ADD_SEMESTER>) {
  const departments = [
    {name: 'Computer Science', value: 'cs'},
    {name: 'Mathematics', value: 'math'},
    {name: 'Physics', value: 'physics'},
    {name: 'Chemistry', value: 'chemistry'},
  ];

  const disciplines = [
    {name: 'Mathematical Analysis', value: 'math_analysis'},
    {name: 'Quantum Mechanics', value: 'quantum_mechanics'},
    {name: 'Organic Chemistry', value: 'organic_chemistry'},
    {name: 'Data Structures', value: 'data_structures'},
  ];

  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null,
  );
  const [selectedDiscipline, setSelectedDiscipline] = useState<string | null>(
    null,
  );
  const [departmentModalVisible, setDepartmentModalVisible] = useState(false);
  const [disciplineModalVisible, setDisciplineModalVisible] = useState(false);

  const toggleDepartment = () =>
    setDepartmentModalVisible(!departmentModalVisible);
  const toggleDiscipline = () =>
    setDisciplineModalVisible(!disciplineModalVisible);

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
    if (!selectedDepartment) {
      errorMessage('Select department first');
      return;
    }

    if (!selectedDiscipline) {
      errorMessage('Select discipline first');
      return;
    }

    const payload = {
      name: data.name,
      code: data.code,
      description: data.description || undefined,
      department: selectedDepartment,
      discipline: selectedDiscipline,
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

          {/* Department Dropdown */}
          <DropDownButton
            placeHolder="Select Department"
            Icon
            title="Department"
            placeholderColor={AppColors.grey10}
            containerStyle={styles.dropdown}
            onPress={toggleDepartment}
            value={selectedDepartment || 'Select Department'}
          />

          {/* Department Dropdown Modal */}
          <DropDownModal
            isVisible={departmentModalVisible}
            Data={departments}
            onClose={toggleDepartment}
            onPress={val => {
              setSelectedDepartment(val?.name);
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
            value={selectedDiscipline || 'Select Discipline'}
          />

          {/* Discipline Dropdown Modal */}
          <DropDownModal
            isVisible={disciplineModalVisible}
            Data={disciplines}
            onClose={toggleDiscipline}
            onPress={val => {
              setSelectedDiscipline(val?.name);
              toggleDiscipline();
            }}
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
