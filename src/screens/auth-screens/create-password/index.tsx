import {NativeStackScreenProps} from '@react-navigation/native-stack';
import ScreenNames, {RootStackParamList} from '../../../routes/routes';
import {Gradient, ScreenWrapper} from '../../../components';
import AppColors from '../../../utills/Colors';

export default function CreatePassword({
  navigation,
}: NativeStackScreenProps<RootStackParamList, ScreenNames.CREATE_PASSWORD>) {
  return (
    <Gradient>
      <ScreenWrapper
        barStyle="light-content"
        paddinTop={0}
        transclucent
        statusBarColor={AppColors.transparent}
        paddingBottom={0}
        scrollEnabled></ScreenWrapper>
    </Gradient>
  );
}
