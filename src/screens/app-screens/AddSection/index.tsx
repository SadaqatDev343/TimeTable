import {yupResolver} from '@hookform/resolvers/yup';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {Image, TouchableOpacity, View} from 'react-native';
import {useCreateSection} from '../../../api/section';
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
import {errorMessage, successMessage} from '../../../utills/method';
import {sectionSchema} from '../../../utills/YupSchemaEditProfile';
import styles from './style';

// Dummy data for dropdowns
const departments = [
  {name: 'Computer Science', value: 'cs'},
  {name: 'Mathematics', value: 'math'},
  {name: 'Physics', value: 'physics'},
  {name: 'Chemistry', value: 'chemistry'},
];

const disciplines = [
  {name: 'Mathematics', value: 'math'},
  {name: 'Physics', value: 'physics'},
  {name: 'Chemistry', value: 'chemistry'},
];

const semesters = [
  {name: 'Semester 1', value: 'sem1'},
  {name: 'Semester 2', value: 'sem2'},
  {name: 'Semester 3', value: 'sem3'},
];

export default function AddSectionScreen({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, ScreenNames.ADD_SECTION>) {
  // State for dropdown modals
  const [departmentModalVisible, setDepartmentModalVisible] = useState(false);
  const [disciplineModalVisible, setDisciplineModalVisible] = useState(false);
  const [semesterModalVisible, setSemesterModalVisible] = useState(false);

  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null,
  );
  const [selectedDiscipline, setSelectedDiscipline] = useState<string | null>(
    null,
  );
  const [selectedSemester, setSelectedSemester] = useState<string | null>(null);

  const toggleDepartment = () =>
    setDepartmentModalVisible(!departmentModalVisible);
  const toggleDiscipline = () =>
    setDisciplineModalVisible(!disciplineModalVisible);
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
    },
    resolver: yupResolver(sectionSchema),
  });

  const {mutate, isPending} = useCreateSection();

  const onSubmit = (data: any) => {
    if (!selectedDepartment) {
      errorMessage('Select department first');
      return;
    }

    if (!selectedDiscipline) {
      errorMessage('Select discipline first');
      return;
    }

    if (!selectedSemester) {
      errorMessage('Select semester first');
      return;
    }

    const payload = {
      name: data.name,
      code: data.code,
      teacher: data.teacher,
      description: data.description || undefined,
      department: selectedDepartment,
      discipline: selectedDiscipline,
      semester: selectedSemester,
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
              setSelectedDepartment(val?.name);
              toggleDepartment();
            }}
          />

          <DropDownModal
            isVisible={disciplineModalVisible}
            Data={disciplines}
            onClose={toggleDiscipline}
            onPress={val => {
              setSelectedDiscipline(val?.name);
              toggleDiscipline();
            }}
          />

          <DropDownModal
            isVisible={semesterModalVisible}
            Data={semesters}
            onClose={toggleSemester}
            onPress={val => {
              setSelectedSemester(val?.name);
              toggleSemester();
            }}
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
