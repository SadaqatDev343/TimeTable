import {StyleSheet} from 'react-native';
import {width} from '../../utills/Diamension';
import AppColors from '../../utills/Colors';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: width(70),
  },
  icon: {
    width: width(14),
    height: width(14),
    backgroundColor: AppColors.black,
    borderRadius: width(100),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: width(5),
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verticalLine: {
    width: width(14),
  },
});
export default styles;
