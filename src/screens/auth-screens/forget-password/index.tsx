import {NativeStackScreenProps} from '@react-navigation/native-stack';
import ScreenNames, {RootStackParamList} from '../../../routes/routes';
import {Gradient, ScreenWrapper} from '../../../components';
import AppColors from '../../../utills/Colors';
import Header from '../../../components/header';
import styles from './styles';

export default function ForgotPassword({
  navigation,
}: NativeStackScreenProps<RootStackParamList, ScreenNames.FORGET_PASSWORD>) {
  return (
    <Gradient>
      <ScreenWrapper
        barStyle="light-content"
        paddinTop={0}
        statusBarColor={AppColors.transparent}
        paddingBottom={0}
        scrollEnabled
        transclucent
        headerUnScrollable={() => (
          <Header
            containerStyle={styles.header}
            textColor={AppColors.white}
            iconColor={AppColors.white}
            title="FORGOT PASSWORD"
            onPress={() => navigation.goBack()}
          />
        )}></ScreenWrapper>
    </Gradient>
  );
}
