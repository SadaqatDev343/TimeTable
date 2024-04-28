import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Gradient, ScreenWrapper} from '../../../components';
import AppColors from '../../../utills/Colors';
import ScreenNames, {RootStackParamList} from '../../../routes/routes';

export default function Signup({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, ScreenNames.SIGNUP>) {
  return (
    <Gradient>
      <ScreenWrapper
        paddinTop={0}
        paddingBottom={0}
        scrollEnabled
        transclucent
        statusBarColor={AppColors.transparent}
        barStyle="light-content"></ScreenWrapper>
    </Gradient>
  );
}
