import {StyleSheet} from 'react-native';
import {height, width} from '../../../utills/Diamension';
import AppColors from '../../../utills/Colors';

const styles = StyleSheet.create({
  mainViewContainer: {
    paddingTop: height(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    borderBottomColor: AppColors.white,
    borderBottomWidth: width(0.2),
    backgroundColor: 'transparent',
  },
  logo: {
    width: width(60),

    alignSelf: 'center',
    marginLeft: -5,
  },
  heading: {
    marginVertical: height(1),
    alignSelf: 'center',
    width: width(20),
  },
  avatarContainer: {
    alignSelf: 'center',
  },
  imageStyle: {
    alignSelf: 'center',
    width: width(25),
    height: width(25),
  },
  checkBoxView: {
    flexDirection: 'row',
    marginTop: height(2),
    justifyContent: 'space-between',
  },
  checkBoxStyle: {
    tintColor: AppColors.white,
    marginRight: width(2),
    width: width(5),
  },
  unCheckBoxStyle: {
    width: width(5),
    marginTop: height(0.4),
    tintColor: AppColors.white,
    marginRight: width(2),
  },
  back: {
    position: 'absolute',
    left: width(3),
    top: height(3.5),
  },
  text: {
    width: width(73),
    lineHeight: width(5.5),
  },
  row: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: height(3),
  },
  dropdown: {
    marginTop: height(1),
    backgroundColor: AppColors.white,
    borderColor: AppColors.white,
    borderWidth: 1,
  },
});
export default styles;
