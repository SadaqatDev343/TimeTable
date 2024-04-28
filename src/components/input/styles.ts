import {Platform, StyleSheet} from 'react-native';
import { height, width } from '../../utills/Diamension';
import AppColors from '../../utills/Colors';
import { FontFamily } from '../../utills/FontFamily';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: width(90),
  },
  innerContainer: {
    width: width(90),
    borderWidth: width(0.4),
    borderColor: AppColors.gray,
    borderRadius: width(1),
    paddingHorizontal: width(1.8),
    paddingTop: width(0.5),
    backgroundColor: AppColors.white,
    height: Platform?.OS === 'ios' ? height(5.5) : height(6),
    justifyContent: 'center',
  },
  inputStyle: {
    fontFamily: FontFamily.appFontLight,
    color: AppColors.black,
    fontSize: width(3.5),
    justifyContent: 'center',
    height: Platform?.OS === 'ios' ? height(5.5) : height(6),
  },
  title: {
    left: width(1),
    marginBottom: width(2),
  },
});

export default styles;
