import {StyleSheet} from 'react-native';
import {height, width} from '../../utills/Diamension';
import AppColors from '../../utills/Colors';

const styles = StyleSheet.create({
  mainContainer: {
    width: width(90),
    borderRadius: 20,
    alignSelf: 'center',
    paddingBottom: height(2),
    paddingTop: height(1),
  },
  viewStyle: {
    width: '85%',
    alignSelf: 'center',
    paddingVertical: height(1),
    paddingLeft: width(2),
    marginTop: height(1),
    borderBottomWidth: width(0.3),
    borderBottomColor: AppColors.lightGray,
  },
  inputContainer: {
    paddingTop: height(2),
    backgroundColor: AppColors.white,
  },
  flatStyle: {
    maxHeight: height(50),
  },
  autoFlat: {maxHeight: 'auto'},
});
export default styles;
