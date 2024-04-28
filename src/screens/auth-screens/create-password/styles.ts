import {StyleSheet} from 'react-native';
import { height, width } from '../../../utills/Diamension';
import AppColors from '../../../utills/Colors';

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'transparent',
  },
  mainViewContainer: {
    flex: 1,
    alignItems: 'center',
  },
  iconStyles: {
    height: height(17),
    width: width(28),
    resizeMode: 'contain',
  },
});
export default styles;
