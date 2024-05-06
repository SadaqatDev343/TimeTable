import {StyleSheet} from 'react-native';
import {height, width} from '../../../utills/Diamension';
import AppColors from '../../../utills/Colors';

const styles = StyleSheet.create({
  container: {
    paddingTop: width(5),
    width: width(80),
    height: height(90),
    alignItems: 'center',
  },
  logo: {
    width: width(60),
  },
  imageStyle: {
    width: width(50),
    height: width(50),
  },
  headerView: {
    paddingVertical: height(3),
    paddingLeft: width(4),
    backgroundColor: AppColors.white,
  },
  header: {
    borderBottomColor: AppColors.white,
    borderBottomWidth: width(0.2),
    backgroundColor: 'transparent',
  },
  heading: {
    marginTop: height(5),
    marginVertical: height(1),
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
