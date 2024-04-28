import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Gradient, ScreenWrapper} from '../../../components';
import AppColors from '../../../utills/Colors';
import ScreenNames, {RootStackParamList} from '../../../routes/routes';

export default function VerifyOtp({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, ScreenNames.VERIFY_OTP>) {
  return (
    <Gradient>
      <ScreenWrapper
        barStyle="light-content"
        paddinTop={0}
        statusBarColor={AppColors.transparent}
        paddingBottom={0}
        transclucent
        scrollEnabled></ScreenWrapper>
    </Gradient>
  );
}
