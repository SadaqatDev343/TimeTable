import {yupResolver} from '@hookform/resolvers/yup';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {Image, TouchableOpacity, View} from 'react-native';
import {useCreateDiscipline} from '../../../api/discipline';
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
import {disciplineSchema} from '../../../utills/YupSchemaEditProfile';
import styles from './style';

export default function AddDisciplineScreen({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, ScreenNames.ADD_DISCIPLINE>) {
  const departments = [
    {name: 'Computer Science', value: 'cs'},
    {name: 'Mathematics', value: 'math'},
    {name: 'Physics', value: 'physics'},
    {name: 'Chemistry', value: 'chemistry'},
  ];

  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null,
  );
  const [departmentModalVisible, setDepartmentModalVisible] = useState(false);

  const toggleDepartment = () =>
    setDepartmentModalVisible(!departmentModalVisible);

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
    if (!selectedDepartment) {
      errorMessage('Select department first');
      return;
    }

    const payload = {
      name: data.name,
      code: data.code,
      teacher: data.teacher,
      description: data.description || undefined,
      department: selectedDepartment,
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

          {/* Dropdown modal */}
          <DropDownModal
            isVisible={departmentModalVisible}
            Data={departments}
            onClose={toggleDepartment}
            onPress={val => {
              setSelectedDepartment(val?.name);
              toggleDepartment();
            }}
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
