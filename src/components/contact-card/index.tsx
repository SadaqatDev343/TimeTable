import React from 'react';
import {TouchableOpacity, View} from 'react-native';

import styles from './style';
import {CustomText} from '../texts';
import AppColors from '../../utills/Colors';
import {FontFamily} from '../../utills/FontFamily';
import {VerticalLine} from '../line';
import {width} from '../../utills/Diamension';
interface Props {
  title: string;
  onPress: () => void;
  Icon: JSX.Element;
  showVerticalLine?: boolean;
}
const ContactCard = ({
  title,
  onPress,
  Icon,
  showVerticalLine = false,
}: Props) => {
  return (
    <View style={styles.container} testID={'contact-card'}>
      <TouchableOpacity
        style={styles.rowContainer}
        onPress={onPress}
        testID="press-icon">
        <View style={styles.icon}>{Icon}</View>
        <CustomText
          size={3.8}
          color={AppColors.white}
          font={FontFamily.appFontSemiBold}>
          {title}
        </CustomText>
      </TouchableOpacity>
      <View style={styles.verticalLine}>
        {showVerticalLine && (
          <VerticalLine
            customHeight={width(9)}
            color={AppColors.black}
            strokWidth={width(0.85)}
          />
        )}
      </View>
    </View>
  );
};
export default ContactCard;
