import {Platform, StyleSheet} from 'react-native';
import {height, width} from '../../../utills/Diamension';
import AppColors from '../../../utills/Colors';
const styles = StyleSheet.create({
  mainViewContainer: {
    height: height(90),
    paddingTop: height(2),
    alignItems: 'center',
  },
  header: {
    borderBottomColor: AppColors.white,
    borderBottomWidth: width(0.2),
    backgroundColor: 'transparent',
  },
  back: {
    alignSelf: 'flex-start',
    marginLeft: -6,
  },
  imageStyle: {
    alignSelf: 'center',
    width: width(25),
    height: width(25),
  },
  logo: {
    width: width(60),
    alignSelf: 'center',
    marginTop: width(5),
  },
  heading: {
    marginVertical: height(3),
    width: width(80),
  },
  contact: {
    flexDirection: 'row',
    alignSelf: 'center',
    position: 'absolute',
    bottom: height(0),
  },
});
export default styles;
