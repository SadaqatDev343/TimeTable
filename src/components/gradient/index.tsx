import LinearGradient from 'react-native-linear-gradient';

import {ViewStyle} from 'react-native';
import styles from './style';
import AppColors from '../../utills/Colors';

interface Props {
  children?: React.ReactNode;
  containerStyle?: ViewStyle | ViewStyle[];
}
export default function Gradient({children, containerStyle}: Props) {
  return (
    <LinearGradient
      style={[styles.mainViewContainer, containerStyle]}
      colors={AppColors.gradientColor}
      locations={[0, 0.9, 1]}>
      {children}
    </LinearGradient>
  );
}
