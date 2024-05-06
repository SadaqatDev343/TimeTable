import {StyleSheet} from 'react-native';
import {height, width} from '../../utills/Diamension';
import AppColors from '../../utills/Colors';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: width(5),
  },
  header: {
    backgroundColor: 'transparent',
    borderBottomColor: AppColors.white,
    borderBottomWidth: width(0.2),
  },
  bottomContainer: {
    marginTop: height(5),
  },
});
export default styles;
