import {StyleSheet} from 'react-native';
import { height, width } from '../../utills/Diamension';
import AppColors from '../../utills/Colors';

const styles = StyleSheet.create({
  headerView: {
    paddingVertical: height(2),
    paddingHorizontal: width(4),

    width: width(100),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heading: {
    alignItems: 'center',
  },
  innerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width(95),
    paddingLeft: width(4),
    paddingBottom: height(2),
    paddingTop: height(6),
  },
  iconView: {
    width: width(8),
    backgroundColor: AppColors.white,
    height: height(4),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: width(1),
    marginRight: width(2),
  },
  tabView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: width(1000),
    paddingBottom: height(0.3),
  },
  iconStyles: {
    resizeMode: 'contain',
    height: height(2),
    width: width(6),
  },
  title: {textTransform: 'uppercase'},
});
export default styles;
