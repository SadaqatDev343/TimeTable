import {Platform, StyleSheet} from 'react-native';
import AppColors from '../../utills/Colors';
import { height, width } from '../../utills/Diamension';
import { FontFamily } from '../../utills/FontFamily';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: width(2),
    backgroundColor: AppColors.black,
    height: height(6),
    width: width(80),
    alignSelf: 'center',
  },
  stateContainer: {
    width: width(20),
    backgroundColor: 'black',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    height: height(5.5),
    marginBottom: height(2),
  },
  inputContainer: {
    width: width(50),
    borderWidth: width(0),
    borderColor: AppColors.white,
    borderRadius: width(0),
  },
  states: {
    borderTopLeftRadius: width(1),
    borderBottomLeftRadius: width(1),
    height: height(5.5),
    flexDirection: 'row',
    paddingLeft: width(2.5),
    alignItems: 'center',
  },
  searchstates: {
    paddingHorizontal: width(2),
    height: Platform.OS === 'android' ? height(5.5) : height(6),
    width: width(60),
    alignSelf: 'center',

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchicon: {
    position: 'absolute',
    marginLeft: width(71),
    marginTop: height(1.7),
  },
  selectContainer: {
    paddingHorizontal: width(2),
    height: height(5.5),
    width: width(80),
    alignSelf: 'center',
    borderWidth: width(0.3),
    borderColor: AppColors.black30,
    borderRadius: width(1),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftIcon: {
    width: width(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  statetext: {
    paddingRight: width(1),
  },
  searchstatetext: {
    paddingRight: width(8),
    paddingLeft: width(4),
  },
  title: {
    left: width(1),
  },
  btnIconContainer: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: width(2),
    backgroundColor: AppColors.black,
    height: height(6),
    minWidth: width(35),
    paddingHorizontal: width(3),
    alignSelf: 'center',
    flexDirection: 'row',
  },
  iconStyle: {
    resizeMode: 'contain',
    tintColor: AppColors.black,
    height: height(6),
    width: width(4),
  },
  circleContainer: {
    height: width(25),
    width: width(25),
    backgroundColor: AppColors.lightBlue,
    borderRadius: width(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  badge: {
    position: 'absolute',
    backgroundColor: AppColors.red,
    height: height(2.5),
    width: height(2.5),
    borderRadius: width(100),
    alignItems: 'center',
    justifyContent: 'center',
    top: -height(1),
  },
  badgeText: {
    color: AppColors.white,
    fontFamily: FontFamily.appFontBold,
  },
  input: {
    width: width(40),
    marginLeft: width(26),
  },
  stateSearchView: {
    width: width(50),
    height: height(5.5),
    borderWidth: width(0),
    borderColor: AppColors.white,
    borderRadius: width(0),
  },
});
export default styles;
