import {Platform, StyleSheet} from 'react-native';
import {height, width} from '../../../utills/Diamension';

const styles = StyleSheet.create({
  mainViewContainer: {
    height: Platform?.OS === 'ios' ? height(100) + height(5) : height(100),
    paddingTop: height(2),
    alignItems: 'center',
  },
  logo: {
    width: width(60),
    alignItems: 'center',
  },
  LoginButtonTopMargin: {
    marginTop: height(1),
  },
  unusedInput: {
    width: 1,
    height: 1,
  },
  imageStyle: {
    width: width(25),
    height: width(25),
  },
  row: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: height(5),
  },
  contactUs: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: height(6),
  },
  contact: {
    flexDirection: 'row',
    alignSelf: 'center',
    position: 'absolute',
    bottom: height(6),
  },
  forgotContainer: {width: width(40), alignSelf: 'flex-end'},
});
export default styles;
