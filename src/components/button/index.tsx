import React, {useRef} from 'react';
import {
  ActivityIndicator,
  ColorValue,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import AppColors from '../../utills/Colors';
import styles from './style';
import {FontFamily} from '../../utills/FontFamily';

import {CommonStyles} from '../../utills/CommonStyle';
import {height, width} from '../../utills/Diamension';
import {Search, RightArrowSvg, ArrowDown} from '../../assets/svg';
import {CustomText} from '../texts';
import Input from '../input';
type IButtonCommonProps = {
  title?: string;
  onPress?: () => void;
  disabled?: boolean;
  containerStyle?: ViewStyle;
};

type IButtonProps = IButtonCommonProps & {
  isLoading?: boolean;
  loaderColor?: string;
  color?: string;
  size?: number;
  testID?: string;
  activeOpacity?: number;
};
const Button: React.FC<IButtonProps> = ({
  title,
  onPress,
  disabled = false,
  isLoading = false,
  loaderColor = AppColors.white,
  activeOpacity = 0.7,
  containerStyle = {},
  color = AppColors.white,
  size = 3.8,
  testID = 'button',
}) => {
  return (
    <TouchableOpacity
      testID={testID}
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={activeOpacity}
      style={[styles.container, containerStyle]}>
      {isLoading ? (
        <ActivityIndicator color={loaderColor} size="large" testID="loader" />
      ) : (
        <CustomText
          color={color}
          letterSpacing={3}
          size={size}
          font={FontFamily.appFontSemiBold}>
          {title}
        </CustomText>
      )}
    </TouchableOpacity>
  );
};

export default Button;

type IDropDownProps = IButtonCommonProps & {
  placeHolder?: string;
  value: string | null | undefined;
  searchIcon?: boolean;
  placeholderColor?: string;
  valColor?: string;
  mainContainer?: ViewStyle;
  Icon?: boolean;
};

export const DropDownButton: React.FC<IDropDownProps> = ({
  value,
  placeHolder = '',
  containerStyle,
  onPress,
  Icon = false,
  searchIcon = false,
  disabled = false,
  placeholderColor = AppColors.black40,
  title = '',
  valColor = AppColors.black,
  mainContainer,
}) => {
  return (
    <View style={mainContainer}>
      {title && (
        <CustomText
          fontFam={FontFamily.appFontMedium}
          size={4}
          color={AppColors.white}
          textStyles={styles.title}>
          {title}
        </CustomText>
      )}
      <TouchableOpacity
        testID="dropdownButton"
        activeOpacity={0.9}
        style={[styles.selectContainer, containerStyle]}
        disabled={disabled}
        onPress={onPress}>
        <CustomText
          color={value ? valColor : placeholderColor}
          size={3.5}
          font={FontFamily.appFontLight}
          numberOfLines={2}>
          {value ?? placeHolder}
        </CustomText>
        {/* {Icon ? (
          <Image
            source={Icons.downArrow}
            style={styles.iconStyle}
            testID={'arrowIcon'}
          />
        ) : (
          <View />
        )} */}
        {searchIcon && <Search />}
      </TouchableOpacity>
    </View>
  );
};
type IStateDropDown = {
  value: string | null | undefined;
  mainContainer?: ViewStyle;
  onPress: () => void;
  onSearch: (value: string) => void;
};
export const StateDropDown: React.FC<IStateDropDown> = ({
  value,
  mainContainer,
  onPress,
  onSearch,
}) => {
  return (
    <View style={[mainContainer]}>
      <View style={styles.stateContainer}>
        <TouchableOpacity
          testID="dropdownButton"
          activeOpacity={0.9}
          style={[styles.states]}
          onPress={onPress}>
          <CustomText
            size={3.4}
            color={AppColors.white}
            textStyles={styles.statetext}>
            States
          </CustomText>
          <ArrowDown width={10} height={10} />
        </TouchableOpacity>
      </View>
      <View style={styles.input}>
        <Input
          placeholder="Search for State"
          value={value!}
          onChange={newValue => onSearch(newValue)}
          innerContainerStyle={styles.stateSearchView}
        />
      </View>

      <View style={styles.searchicon}>
        <Search width={15} height={15} color="black" />
      </View>
    </View>
  );
};

type IMenuProps = IButtonCommonProps & {
  ButtonIcon?: JSX.Element;
};

export const MenuButton: React.FC<IMenuProps> = ({
  title,
  disabled = false,
  onPress = () => {},
  containerStyle,
  ButtonIcon,
}) => {
  const containerRef = useRef() as React.RefObject<Animatable.View & View>;
  function onPressFunc() {
    containerRef?.current!.pulse!(500);
    onPress();
  }

  return (
    <Animatable.View
      ref={containerRef}
      useNativeDriver
      style={[menuStyles.shadow, containerStyle]}>
      <TouchableOpacity
        testID="menuButton"
        style={menuStyles.container}
        onPress={onPressFunc}
        activeOpacity={0.8}
        disabled={disabled}>
        <View style={styles.row}>
          <View style={styles.leftIcon}>{ButtonIcon}</View>
          <CustomText
            size={3.2}
            color={AppColors.white}
            letterSpacing={1}
            textStyles={CommonStyles.marginLeft_3}>
            {title}
          </CustomText>
        </View>
        <RightArrowSvg width={8} height={15} />
      </TouchableOpacity>
    </Animatable.View>
  );
};

type IButtonCircleProps = IButtonCommonProps & {
  textColor: string;
  activeOpacity?: number;
  isLoading?: boolean;
  loaderColor?: string;
};

export const ButtonCircle: React.FC<IButtonCircleProps> = ({
  title,
  onPress,
  disabled = false,
  isLoading = false,
  loaderColor = AppColors.white,
  activeOpacity = 0.7,
  containerStyle = {},
  textColor = AppColors.white,
}) => {
  return (
    <TouchableOpacity
      testID="circleBtn"
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={activeOpacity}
      style={[styles.circleContainer, containerStyle]}>
      {isLoading ? (
        <ActivityIndicator color={loaderColor} size="small" testID="loader" />
      ) : (
        <>
          <CustomText
            color={textColor}
            letterSpacing={3}
            size={4.5}
            center
            font={FontFamily.appFontMedium}>
            {title}
          </CustomText>
        </>
      )}
    </TouchableOpacity>
  );
};
type IButtonWithIcon = IButtonCommonProps & {
  textStyle?: TextStyle;
  isLoading?: boolean;
  loaderColor?: ColorValue;
  activeOpacity?: number;
  Icon?: ImageSourcePropType;
};
export const ButtonWithIcon: React.FC<IButtonWithIcon> = ({
  title,
  onPress,
  disabled = false,
  isLoading = false,
  loaderColor = AppColors.white,
  activeOpacity = 0.7,
  containerStyle = {},
  Icon,
}) => {
  return (
    <TouchableOpacity
      testID="buttonWithIcon"
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={activeOpacity}
      style={[styles.btnIconContainer, containerStyle]}>
      {isLoading ? (
        <ActivityIndicator color={loaderColor} size="small" testID="loader" />
      ) : (
        <>
          <CustomText
            color={AppColors.white}
            letterSpacing={3}
            size={3.8}
            font={FontFamily.appFontSemiBold}>
            {title}
          </CustomText>
          {Icon && <Image source={Icon} style={styles.iconStyle} />}
        </>
      )}
    </TouchableOpacity>
  );
};
const menuStyles = StyleSheet.create({
  shadow: {
    width: width(85),
    alignSelf: 'center',
    height: height(6),
    paddingBottom: 1.5,
    paddingTop: 1,
    paddingHorizontal: 1,
    marginTop: height(1),
    borderBottomWidth: width(0.3),
    borderBottomColor: AppColors.white,
  },
  container: {
    height: '100%',
    width: width(85),
    alignSelf: 'center',
    borderRadius: width(2),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: '3%',
  },
  iconContainer: {
    backgroundColor: AppColors.primary,
    borderRadius: height(1),
    padding: height(0.7),
    marginRight: width(5),
  },
  icon: {
    height: height(2.5),
    width: height(2.5),
    resizeMode: 'contain',
    tintColor: AppColors.white,
  },
  arrowRight: {
    transform: [{rotate: '180deg'}],
  },
});
