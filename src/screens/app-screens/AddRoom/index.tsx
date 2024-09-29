import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import {Image, TouchableOpacity, View} from 'react-native';
import {AppLogo} from '../../../assets/images';
import {Back} from '../../../assets/svg';
import {Button, H1, ScreenWrapper, TextField} from '../../../components';
import AppColors from '../../../utills/Colors';
import {CommonStyles} from '../../../utills/CommonStyle';
import {FontFamily} from '../../../utills/FontFamily';
import {errorMessage, successMessage} from '../../../utills/method';
import styles from './style';
import {useCreateRoom} from '../../../api/room'; // Create room API hook
import {roomSchema} from '../../../utills/YupSchemaEditProfile';

export default function AddRoom({navigation}: any) {
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
    reset,
  } = useForm({
    mode: 'all',
    defaultValues: {
      buildingName: '',
      floorNumber: '',
      roomNumber: '',
    },
    resolver: yupResolver(roomSchema), // Use room validation schema
  });

  const {mutate, isPending} = useCreateRoom(); // Room creation API hook

  const onSubmit = (data: any) => {
    mutate(data, {
      onSuccess: response => {
        if (response.ok) {
          successMessage('Room added successfully');
          reset(); // Clear form fields after successful submission
          navigation.goBack();
        } else {
          errorMessage('Something went wrong');
        }
      },
    });
  };

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
          Add Room
        </H1>

        {/* Building Name */}
        <TextField
          title="Building Name"
          control={control}
          name="buildingName"
          returnKeyType="next"
          placeholder="Enter building name"
          containerStyle={CommonStyles.marginTop_3}
        />

        {/* Floor Number */}
        <TextField
          title="Floor Number"
          control={control}
          name="floorNumber"
          returnKeyType="next"
          placeholder="Enter floor number"
          containerStyle={CommonStyles.marginTop_2}
        />

        {/* Room Number */}
        <TextField
          title="Room Number"
          control={control}
          name="roomNumber"
          returnKeyType="next"
          placeholder="Enter room number"
          containerStyle={CommonStyles.marginTop_2}
        />

        {/* Submit Button */}
        <Button
          title={isPending ? 'Adding...' : 'Add Room'}
          containerStyle={CommonStyles.marginTop_2}
          onPress={handleSubmit(onSubmit)}
          disabled={isPending}
        />
      </View>
    </ScreenWrapper>
  );
}
