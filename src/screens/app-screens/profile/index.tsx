import AsyncStorage from '@react-native-async-storage/async-storage';
import {yupResolver} from '@hookform/resolvers/yup';
import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, Image, TouchableOpacity, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {AppLogo} from '../../../assets/images';
import {
  Button,
  DropDownButton,
  Gradient,
  H1,
  ScreenWrapper,
  TextField,
} from '../../../components';
import DropDownModal from '../../../components/drop-down-modal';
import AppColors from '../../../utills/Colors';
import {CommonStyles} from '../../../utills/CommonStyle';
import {width} from '../../../utills/Diamension';
import {FontFamily} from '../../../utills/FontFamily';
import {UserType} from '../../../utills/userType';
import {profileSchema} from '../../../utills/YupSchemaEditProfile';
import styles from './style';
import {useGetUserByEmail, useUpdateUserById} from '../../../api/auth';
import {useForm} from 'react-hook-form';
import {errorMessage, successMessage} from '../../../utills/method';

export default function Profile({navigation}: any) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');
  const [originalData, setOriginalData] = useState({
    name: '',
    contact: '',
    role: '',
  }); // Store original data
  const toggleCategory = () => setCategoryModalVisible(!categoryModalVisible);
  const emailRef = useRef<any>(null);

  // Retrieve email from AsyncStorage
  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('email');
        if (storedEmail) {
          setEmail(storedEmail);
        }
      } catch (error) {
        console.error('Failed to fetch email from storage:', error);
      }
    };
    fetchEmail();
  }, []);

  const {data, isLoading, refetch} = useGetUserByEmail(email);

  // Use useForm to manage form state
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: {errors, isValid},
  } = useForm({
    mode: 'all',
    defaultValues: {
      name: '',
      contact: '',
    },
    resolver: yupResolver(profileSchema),
  });

  useEffect(() => {
    if (data?.ok) {
      const details = data.response.data.data[0];
      setSelectedCategory(details.role);
      setValue('contact', details.contact);
      setValue('name', details.name);
      setId(details._id);

      // Store original values for comparison
      setOriginalData({
        name: details.name,
        contact: details.contact,
        role: details.role,
      });
    }
  }, [data]);

  const {mutate, isPending} = useUpdateUserById();

  // Handle form submission
  const handleProfile = (data: any) => {
    mutate(
      {
        id: id,
        name: data.name,
        contact: data.contact,
        role: String(selectedCategory).toLowerCase(),
      },
      {
        onSuccess: res => {
          if (res.ok) {
            successMessage('User updated successfully');
            refetch();
          } else {
            errorMessage('Something went wrong');
          }
        },
      },
    );
  };

  // Check if the form data is the same as the original data
  const isDataSame =
    originalData.name === getValues('name') &&
    originalData.contact === getValues('contact') &&
    originalData.role === selectedCategory;

  return (
    <Gradient>
      <ScreenWrapper
        paddinTop={0}
        paddingBottom={0}
        scrollEnabled
        transclucent
        statusBarColor={AppColors.transparent}
        barStyle="light-content">
        <View style={styles.mainViewContainer}>
          <View
            style={{
              flexDirection: 'row',
              borderBottomColor: AppColors.white,
              borderBottomWidth: 1,
              width: width(100),
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={styles.leftlogo}>
              <FontAwesome name="navicon" size={24} color="white" />
            </TouchableOpacity>
            <View style={{marginLeft: -24}}>
              <H1
                color={AppColors.white}
                size={5}
                fontFam={FontFamily.appFontBold}>
                UNIVERSITY OF KOTLI AJ&K
              </H1>
            </View>
            <View style={styles.rightlogo}>
              <Image
                resizeMode="contain"
                source={AppLogo.logo}
                style={styles.imageStyle2}
              />
            </View>
          </View>
          {isLoading ? (
            <ActivityIndicator
              size="large"
              color={AppColors.white}
              style={CommonStyles.marginTop_1}
            />
          ) : (
            <>
              <TextField
                title="Full Name"
                control={control}
                name="name"
                returnKeyType="next"
                placeholder="Enter your full name"
                containerStyle={CommonStyles.marginTop_3}
                onSubmitEditing={() => emailRef?.current?.focus()}
              />
              <TextField
                title="Contact Number"
                control={control}
                name="contact"
                returnKeyType="next"
                placeholder="Enter your Contact Number"
                onSubmitEditing={() => emailRef?.current?.focus()}
              />
              <DropDownButton
                placeHolder="Role"
                Icon
                title="Role"
                placeholderColor={AppColors.grey10}
                containerStyle={styles.dropdown}
                onPress={toggleCategory}
                value={selectedCategory}
              />
              <View style={styles.checkBoxView}>
                <Button
                  title="Update Profile"
                  containerStyle={CommonStyles.marginTop_2}
                  onPress={handleSubmit(handleProfile)}
                  isLoading={isPending}
                  disabled={isDataSame} // Disable the button if data is the same
                />
              </View>
            </>
          )}
        </View>
        <DropDownModal
          isVisible={categoryModalVisible}
          Data={UserType}
          onClose={toggleCategory}
          onPress={val => {
            setSelectedCategory(val?.name);
            toggleCategory();
          }}
        />
      </ScreenWrapper>
    </Gradient>
  );
}
