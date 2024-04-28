import {Platform, StyleSheet} from 'react-native';
import { height, width } from '../../utills/Diamension';
import AppColors from '../../utills/Colors';
import { FontFamily } from '../../utills/FontFamily';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: width(80),
  },
  iconstyle: {
    marginLeft: width(70),
    width: width(10),
    height: width(10),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    alignSelf: 'center',
  },
  innerContainer: {
    flexDirection: 'row',
    width: width(80),
    borderWidth: width(0.2),
    borderColor: AppColors.primary,
    borderRadius: width(1),
    paddingHorizontal: width(1.8),
    paddingTop: width(0.5),
    backgroundColor: AppColors.white,
  },
  inputStyle: {
    width: width(77),
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
