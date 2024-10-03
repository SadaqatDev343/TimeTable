import {TouchableOpacity} from 'react-native';
import {ICardProps} from '../../types';
import {CommonStyles} from '../../utills/CommonStyle';
import {FontFamily} from '../../utills/FontFamily';
import {CustomText} from '../texts';
import styles from './style';
const Card = ({
  title,
  onPress,
  Icon,
  containerStyle,
  onLongPress,
}: ICardProps) => {
  return (
    <TouchableOpacity
      style={[containerStyle, styles.crowdBtn]}
      onPress={onPress}
      onLongPress={onLongPress}>
      {Icon}
      <CustomText
        size={4}
        center
        font={FontFamily.appFontMedium}
        textStyles={CommonStyles.marginTop_1}>
        {title}
      </CustomText>
    </TouchableOpacity>
  );
};

export default Card;
