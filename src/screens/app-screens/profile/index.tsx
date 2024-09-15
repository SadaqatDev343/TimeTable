import {yupResolver} from '@hookform/resolvers/yup';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Alert, Image, TouchableOpacity, View} from 'react-native';
import ScreenNames, { RootStackParamList } from '../../../routes/routes';
import { Button, CustomText, DropDownButton, Gradient, H1, ScreenWrapper, TextField } from '../../../components';
import AppColors from '../../../utills/Colors';
import { Header } from 'react-native/Libraries/NewAppScreen';
import styles from './style';
import { CommonStyles } from '../../../utills/CommonStyle';
import DropDownModal from '../../../components/drop-down-modal';
import { UserType } from '../../../utills/userType';
import { authSchema } from '../../../utills/YupSchemaEditProfile';
import { AppLogo } from '../../../assets/images';
import { FontFamily } from '../../../utills/FontFamily';
import { CheckBox, UnCheckBox } from '../../../assets/svg';
import { width } from '../../../utills/Diamension';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function Profile({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, ScreenNames.PROFILE>) {
  const [isDirectlyInvolve, setDirectlyInvolve] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const toggleCategory = () => setCategoryModalVisible(!categoryModalVisible);
  const emailRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
    resolver: yupResolver(authSchema),
  });
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
              {/* Replacing text with Drawer Icon */}
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
            ref={emailRef}
            title="Email"
            control={control}
            name="email"
            returnKeyType="next"
            placeholder="Enter your email address"
            keyboardType="email-address"
            autoCapitalize="none"
            onSubmitEditing={() => passwordRef?.current?.focus()}
          />
          <TextField
            title="Contact Number"
            control={control}
            name="Contact"
            returnKeyType="next"
            placeholder="Enter your Contact Number"
            containerStyle={CommonStyles.marginTop_3}
            onSubmitEditing={() => emailRef?.current?.focus()}
          />
          <View>
            <TextField
              ref={passwordRef}
              title="Password"
              control={control}
              name="password"
              placeholder="Enter your password"
              secureTextEntry={!showPassword}
              showPasswordIcon={true}
              isPasswordVisible={showPassword}
              onPressIcon={() => setShowPassword(!showPassword)}
            />
          </View>
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
            title="Update profile"
            containerStyle={CommonStyles.marginTop_2}
            onPress={() => console.log('--')}
            // onPress={handleSubmit(registerUser)}
          />
           </View>
        
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