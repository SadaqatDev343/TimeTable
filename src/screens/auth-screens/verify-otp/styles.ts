import {StyleSheet} from 'react-native';
import { height, width } from '../../../utills/Diamension';
import AppColors from '../../../utills/Colors';

const styles = StyleSheet.create({
  mainViewContainer: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    backgroundColor: 'transparent',
  },
  footerContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: height(2.75),
  },
  otpView: {
    width: width(80),
    height: height(8),
    marginTop: height(3),
  },
  otpContainer: {
    width: width(80),
    height: height(8),
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: height(2),
    marginBottom: height(4),
  },
  row: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: height(7),
  },
  underlineStyleBase: {
    borderColor: AppColors.primary,
    borderBottomColor: AppColors.black80,
    borderBottomWidth: 2.5,
    borderWidth: 1,
    padding: 1,
    backgroundColor: AppColors.white,
    paddingVertical: 0,
    textAlignVertical: 'center',
    borderRadius: 1,
    width: width(10.3),
    height: height(6.5),
    fontSize: height(2.55),
    color: AppColors.black,
  },
  iconStyles: {
    marginLeft: width(8),
  },
  note: {
    width: width(80),
    alignItems: 'center',
    marginTop: height(3),
  },
});
export default styles;
