import {Platform, StyleSheet} from 'react-native';
import {height, width} from '../../../utills/Diamension';
import AppColors from '../../../utills/Colors';

export const styles = StyleSheet.create({
  mainViewContainer: {
    height: height(100),
    paddingTop: height(2),
    alignItems: 'center',
  },
  leftlogo: {
    width: width(20),
    marginBottom: width(2),
    marginHorizontal: width(2),
    alignItems: 'flex-start',
  },
  rightlogo: {
    width: width(20),
    marginBottom: width(2),

    alignItems: 'flex-end',
  },
  imageStyle1: {
    marginLeft: width(2),
    width: width(10),
    height: width(10),
  },
  imageStyle2: {
    width: width(10),
    height: width(10),
    alignSelf: 'center',
  },
  header: {
    borderBottomColor: AppColors.white,
    borderBottomWidth: width(0.2),
    backgroundColor: 'transparent',
  },
});

