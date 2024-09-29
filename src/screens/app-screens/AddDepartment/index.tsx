import {yupResolver} from '@hookform/resolvers/yup';
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {Image, TouchableOpacity, View} from 'react-native';
import {useCreateDepartment} from '../../../api/department';
import {AppLogo} from '../../../assets/images';
import {Back} from '../../../assets/svg';
import {
  Button,
  DropDownButton,
  H1,
  ScreenWrapper,
  TextField,
} from '../../../components'; // Assuming you have a DropDownButton component
import DropDownModal from '../../../components/drop-down-modal'; // Assuming you have this modal component
import AppColors from '../../../utills/Colors';
import {CommonStyles} from '../../../utills/CommonStyle';
import {FontFamily} from '../../../utills/FontFamily';
import {errorMessage, successMessage} from '../../../utills/method';
import {departmentSchema} from '../../../utills/YupSchemaEditProfile';
import styles from './style';

export default function AddDepartmentScreen({navigation, route}: any) {
  // State for dropdown modal visibility and selected department
  const [departmentModalVisible, setDepartmentModalVisible] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null,
  );

  const departments = [
    {name: 'Computer Science', value: 'cs'},
    {name: 'Mathematics', value: 'math'},
    {name: 'Physics', value: 'phy'},
    {name: 'Chemistry', value: 'chem'},
    {name: 'Biology', value: 'bio'},
    {name: 'Electrical Engineering', value: 'ee'},
    {name: 'Mechanical Engineering', value: 'me'},
    {name: 'Civil Engineering', value: 'ce'},
    {name: 'Business Administration', value: 'ba'},
    {name: 'Economics', value: 'eco'},
  ];

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    mode: 'all',
    defaultValues: {
      headOfDepartment: '',
      description: '',
      email: '',
      phoneNumber: '',
    },
    resolver: yupResolver(departmentSchema),
  });

  const {mutate, isPending} = useCreateDepartment();

  const onSubmit = (data: any) => {
    if (!selectedDepartment) {
      errorMessage('Please select a department');
      return;
    }

    const payload = {
      ...data,
      name: selectedDepartment,
    };

    mutate(payload, {
      onSuccess: response => {
        if (response.ok) {
          successMessage('Department created successfully');
          navigation.goBack();
        } else {
          errorMessage('Something went wrong');
        }
      },
    });
  };

  const toggleDepartmentModal = () =>
    setDepartmentModalVisible(!departmentModalVisible);

  return (
    <ScreenWrapper
      backgroundColor="#3333ff"
      statusBarColor="#3333ff"
      scrollEnabled
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
          Add Department
        </H1>

        {/* Department Dropdown */}
        <DropDownButton
          placeHolder="Select Department"
          Icon
          title="Department"
          placeholderColor={AppColors.grey10}
          containerStyle={styles.dropdown}
          onPress={toggleDepartmentModal}
          value={selectedDepartment || 'Select Department'}
        />

        {/* Head of Department */}
        <TextField
          title="Head of Department"
          control={control}
          name="headOfDepartment"
          returnKeyType="next"
          placeholder="Enter head of department"
          containerStyle={CommonStyles.marginTop_2}
        />

        {/* Description */}
        <TextField
          title="Description"
          control={control}
          name="description"
          returnKeyType="next"
          placeholder="Enter department description (optional)"
        />

        {/* Email */}
        <TextField
          title="Email"
          control={control}
          name="email"
          returnKeyType="next"
          placeholder="Enter email (optional)"
        />

        {/* Phone Number */}
        <TextField
          title="Phone Number"
          control={control}
          name="phoneNumber"
          returnKeyType="next"
          placeholder="Enter phone number (optional)"
        />

        {/* Submit Button */}
        <Button
          title={isPending ? 'Adding...' : 'Add Department'}
          containerStyle={CommonStyles.marginTop_2}
          onPress={handleSubmit(onSubmit)}
          disabled={isPending}
        />
      </View>

      {/* Dropdown Modal for Departments */}
      <DropDownModal
        isVisible={departmentModalVisible}
        Data={departments}
        onClose={toggleDepartmentModal}
        onPress={val => {
          setSelectedDepartment(val?.name);
          toggleDepartmentModal();
        }}
      />
    </ScreenWrapper>
  );
}
