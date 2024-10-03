import {yupResolver} from '@hookform/resolvers/yup';
import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Image, TouchableOpacity, View} from 'react-native';
import {
  useCreateDepartment,
  useGetDepartmentById,
  useUpdateDepartmentById,
} from '../../../api/department';
import {AppLogo} from '../../../assets/images';
import {Back} from '../../../assets/svg';
import {
  Button,
  DropDownButton,
  H1,
  ScreenWrapper,
  TextField,
} from '../../../components';
import DropDownModal from '../../../components/drop-down-modal';
import AppColors from '../../../utills/Colors';
import {CommonStyles} from '../../../utills/CommonStyle';
import {FontFamily} from '../../../utills/FontFamily';
import {errorMessage, successMessage} from '../../../utills/method';
import {departmentSchema} from '../../../utills/YupSchemaEditProfile';
import styles from './style';

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

export default function AddDepartmentScreen({navigation, route}: any) {
  const departmentId = route?.params?.departmentId;
  const [departmentModalVisible, setDepartmentModalVisible] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null,
  );

  const {data, isLoading} = useGetDepartmentById(departmentId);

  // Create the form using useForm
  const {
    control,
    handleSubmit,
    reset, // Reset the form when the data is loaded
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

  const {mutate: updateDepartment, isPending: isUpdating} =
    useUpdateDepartmentById();
  const {mutate: createDepartment, isPending: isCreating} =
    useCreateDepartment();

  useEffect(() => {
    if (data?.ok) {
      // Reset the form with the fetched department data
      reset({
        headOfDepartment: data.response.data.headOfDepartment,
        description: data.response.data.description,
        email: data.response.data.email,
        phoneNumber: data.response.data.phoneNumber,
      });
      setSelectedDepartment(data.response.data.name); // Set selected department
    }
  }, [data, reset]);

  const onSubmit = (formData: any) => {
    if (!selectedDepartment) {
      errorMessage('Please select a department');
      return;
    }

    const payload = {
      ...formData,
      name: selectedDepartment,
    };

    if (departmentId) {
      // Update existing department
      updateDepartment(
        {...payload, id: departmentId}, // Include department ID in the payload
        {
          onSuccess: response => {
            if (response.ok) {
              successMessage('Department updated successfully');
              navigation.goBack();
            } else {
              errorMessage('Something went wrong');
            }
          },
          onError: error => {
            errorMessage('Update failed: ' + error.message); // Handle error
          },
        },
      );
    } else {
      // Create a new department
      createDepartment(payload, {
        onSuccess: response => {
          if (response.ok) {
            successMessage('Department created successfully');
            navigation.goBack();
          } else {
            errorMessage('Something went wrong');
          }
        },
        onError: error => {
          errorMessage('Creation failed: ' + error.message); // Handle error
        },
      });
    }
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
          {departmentId ? 'Update Department' : 'Add Department'}
        </H1>

        <DropDownButton
          placeHolder="Select Department"
          Icon
          title="Department"
          placeholderColor={AppColors.grey10}
          containerStyle={styles.dropdown}
          onPress={toggleDepartmentModal}
          value={selectedDepartment || 'Select Department'}
        />

        <TextField
          title="Head of Department"
          control={control}
          name="headOfDepartment"
          returnKeyType="next"
          placeholder="Enter head of department"
          containerStyle={CommonStyles.marginTop_2}
        />

        <TextField
          title="Description"
          control={control}
          name="description"
          returnKeyType="next"
          placeholder="Enter department description (optional)"
        />

        <TextField
          title="Email"
          control={control}
          name="email"
          returnKeyType="next"
          placeholder="Enter email (optional)"
        />

        <TextField
          title="Phone Number"
          control={control}
          name="phoneNumber"
          returnKeyType="next"
          placeholder="Enter phone number (optional)"
        />

        <Button
          title={departmentId ? 'Update Department' : 'Add Department'}
          isLoading={isUpdating || isCreating}
          containerStyle={CommonStyles.marginTop_2}
          onPress={handleSubmit(onSubmit)}
          disabled={isUpdating || isCreating}
        />
      </View>

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
