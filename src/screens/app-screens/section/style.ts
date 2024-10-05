import {Platform, StyleSheet} from 'react-native';
import {height, width} from '../../../utills/Diamension';
import AppColors from '../../../utills/Colors';
import {FontFamily} from '../../../utills/FontFamily';

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
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContainer: {
    backgroundColor: AppColors.white,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.black,
    width: '90%',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  modalButtonText: {
    color: AppColors.white,
    fontSize: 16,
    marginLeft: 10,
    fontFamily: FontFamily.appFontSemiBold,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 8,
    backgroundColor: '#fff',
    color: 'black',
    width: '80%',
  },
});
