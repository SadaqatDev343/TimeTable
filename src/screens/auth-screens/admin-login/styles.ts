import { Platform, StyleSheet } from 'react-native';
import { height, width } from '../../../utills/Diamension';
const styles = StyleSheet.create({
  mainViewContainer: {
    height: Platform?.OS === 'ios' ? height(100) + height(5) : height(100),
    paddingTop: height(2),
    alignItems: 'center',
  },
  back: {
    alignSelf: 'flex-start',
    marginLeft: -6,
  },
  logo: {
    width: width(60),
    alignSelf: 'flex-start',
    marginTop: width(5),
    marginLeft: -8,
  },
  heading: {
    marginVertical: height(3),
    width: width(80),
  },
  contact: {
    flexDirection: 'row',
    alignSelf: 'center',
    position: 'absolute',
    bottom: height(6),
  },
});
export default styles;
