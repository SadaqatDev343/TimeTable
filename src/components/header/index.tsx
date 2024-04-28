import React from 'react';
import {Pressable, TouchableOpacity, View, ViewStyle} from 'react-native';

import styles from './styles';
import AppColors from '../../utills/Colors';
import {height, width} from '../../utills/Diamension';
import {CommonStyles} from '../../utills/CommonStyle';
import {Back} from '../../assets/svg';
import {CustomText} from '../texts';
import {HorizontalLine} from '../line';

interface Props {
  title?: string;
  onPress?: () => void;
  isBack?: boolean;
  iconColor?: string;
  textColor?: string;
  containerStyle?: ViewStyle | ViewStyle[];
  size?: number;
  textStyle?: ViewStyle;
  numberOfLines?: number;
}
const Header = ({
  onPress,
  numberOfLines,
  title,
  containerStyle,
  isBack = true,
  textColor = AppColors.black,
  iconColor = AppColors.black,
  size = 4.2,
  textStyle,
}: Props) => {
  return (
    <View style={[styles.headerView, containerStyle]} testID="header">
      {isBack && (
        <View style={{flex: width(1)}}>
          <Pressable onPress={onPress} testID="isback">
            <Back color={iconColor} />
          </Pressable>
        </View>
      )}
      {title && (
        <View
          style={{
            flex: width(12),
          }}>
          <CustomText
            color={textColor}
            fontWeight="bold"
            center
            size={size}
            numberOfLines={numberOfLines}
            textStyles={[CommonStyles.paddingTop_0, textStyle]}>
            {title}
          </CustomText>
        </View>
      )}
      {isBack && <View style={{flex: width(1)}} />}
    </View>
  );
};
export default Header;
interface TabsHeader {
  title: string;
  onPressFilter?: () => void;
  onPressSearch?: () => void;
  onPressTab1: () => void;
  onPressTab2: () => void;
  onPressFav?: () => void;
  onPressLocation?: () => void;
  bottomBorder?: boolean;
  isFav?: boolean;
  focusedColor?: string;
  onBack?: () => void;
  focused?: boolean;
  image?: string;
  title2?: string;
  topBar?: boolean;
  backColorIcon?: string;
  notFocusedColor?: string;
  horizontalLineStyling?: ViewStyle;
}
export const TabsHeader = ({
  bottomBorder = true,
  title,
  onBack,
  onPressFilter,
  onPressSearch,
  focused,
  onPressTab1,
  onPressTab2,
  isFav = false,
  onPressFav,
  onPressLocation,
  title2 = 'Map',
  topBar = true,
  focusedColor = AppColors.white,
  backColorIcon = AppColors.black,
  notFocusedColor = AppColors.black30,
  horizontalLineStyling = {},
}: TabsHeader) => {
  return (
    <View style={styles.heading}>
      {topBar && (
        <View style={styles.innerView}>
          <Pressable onPress={onBack}>
            <Back color={backColorIcon} />
          </Pressable>
        </View>
      )}
      <View style={styles.tabView}>
        <TouchableOpacity onPress={onPressTab1}>
          <CustomText
            fontWeight="bold"
            lineHeight={height(3.5)}
            size={3.5}
            color={focused ? focusedColor : notFocusedColor}
            textStyles={styles.title}>
            {`    ${title}    `}
          </CustomText>
          {focused && <HorizontalLine strokWidth={2} color={focusedColor} />}
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressTab2}>
          <CustomText
            fontWeight="bold"
            lineHeight={height(3.5)}
            size={3.5}
            color={!focused ? focusedColor : notFocusedColor}
            textStyles={styles.title}>
            {`    ${title2}    `}
          </CustomText>
          {!focused && <HorizontalLine strokWidth={2} color={focusedColor} />}
        </TouchableOpacity>
      </View>
      {bottomBorder && (
        <HorizontalLine
          containerStyles={horizontalLineStyling}
          color={AppColors.grey}
          strokWidth={width(0.3)}
        />
      )}
    </View>
  );
};
