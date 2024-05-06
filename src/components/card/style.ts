import {StyleSheet} from 'react-native';
import {height, width} from '../../utills/Diamension';
import AppColors from '../../utills/Colors';

const styles = StyleSheet.create({
  categoryButton: {
    height: width(24),
    paddingTop: width(3),
    alignItems: 'center',
    width: width(23.5),
    alignSelf: 'center',
  },
  crowdBtn: {
    margin: width(2),
    backgroundColor: '#D9D9D9',
    borderRadius: width(5),
    alignItems: 'center',
    justifyContent: 'center',
    height: height(10),
    width: width(25),
    shadowColor: AppColors.white,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingHorizontal: width(1),
  },
});
export default styles;
