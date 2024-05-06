import React, {forwardRef} from 'react';

import {TextInput, TouchableOpacity, View, ViewStyle} from 'react-native';

import styles from './styles';
import AppColors from '../../utills/Colors';
import {FontFamily} from '../../utills/FontFamily';
import {width} from '../../utills/Diamension';
import HidePassword from '../../assets/svg/hidePassword';
import ShowPassword from '../../assets/svg/showPassword';
import {CommonStyles} from '../../utills/CommonStyle';
import {CustomText} from '../texts';
import {Controller} from 'react-hook-form';

type KeyboardVariation =
  | 'default'
  | 'email-address'
  | 'number-pad'
  | 'decimal-pad'
  | 'numeric'
  | 'url'
  | 'phone-pad';

type KeyType =
  | 'done'
  | 'go'
  | 'next'
  | 'search'
  | 'send'
  | 'none'
  | 'previous'
  | 'default'
  | 'emergency-call'
  | 'google'
  | 'join'
  | 'route'
  | 'yahoo';

type AutoCapitalize = 'none' | 'sentences' | 'words' | 'characters';

interface Props {
  containerStyle?: ViewStyle;
  innerContainerStyle?: ViewStyle;
  iconContainerStyle?: ViewStyle;
  inputStyle?: ViewStyle;
  placeholder?: string;
  name: string;
  keyboardType?: KeyboardVariation;
  returnKeyType?: KeyType;
  maxlength?: number;
  multiline?: boolean;
  numberOfLines?: number;
  secureTextEntry?: boolean;
  textAlignVertical?: 'auto' | 'center' | 'top' | 'bottom';
  autofocus?: boolean;
  control?: any;
  icon?: () => React.ReactNode | void;
  title?: string;
  titleTextSize?: number;
  showPasswordIcon?: boolean;
  value?: string;
  onSubmitEditing?: () => void;
  autoCapitalize?: AutoCapitalize;
  titleColor?: string;
  isPasswordVisible?: boolean;
  onPressIcon?: () => void;
}

const TextField = forwardRef<TextInput, Props>(
  (
    {
      isPasswordVisible = false,
      showPasswordIcon = false,
      onPressIcon = () => true,
      containerStyle = {},
      innerContainerStyle = {},
      iconContainerStyle = {},
      inputStyle = {},
      placeholder = 'Enter text here!',
      name,
      keyboardType = 'default',
      returnKeyType = 'default',
      maxlength,
      multiline = false,
      numberOfLines,
      secureTextEntry = false,
      textAlignVertical = 'center',
      autofocus = false,
      control,
      titleColor = AppColors.white,
      title = 'TextInput',
      titleTextSize = 4,
      onSubmitEditing,
      autoCapitalize = 'sentences',
    }: Props,
    ref,
  ) => {
    return (
      <View style={[styles.container, containerStyle]} testID="textField">
        <CustomText
          fontFam={FontFamily.appFontMedium}
          size={titleTextSize}
          color={titleColor}
          textStyles={styles.title}>
          {title}
        </CustomText>
        <Controller
          control={control}
          render={({field: {onChange, value}, fieldState: {error}}) => (
            <>
              <View style={[styles.innerContainer, innerContainerStyle]}>
                <TextInput
                  ref={ref}
                  placeholder={placeholder}
                  keyboardType={keyboardType}
                  returnKeyType={returnKeyType}
                  autoCapitalize={autoCapitalize}
                  maxLength={maxlength}
                  multiline={multiline}
                  value={value}
                  onChangeText={onChange}
                  numberOfLines={numberOfLines}
                  secureTextEntry={secureTextEntry}
                  textAlignVertical={textAlignVertical}
                  autoFocus={autofocus}
                  placeholderTextColor={AppColors.grey10}
                  style={[
                    styles.inputStyle,
                    inputStyle,
                    {
                      width: showPasswordIcon ? width(68) : width(77),
                    },
                  ]}
                  onSubmitEditing={onSubmitEditing}
                  testID="input"
                />
                {showPasswordIcon && value?.length > 0 ? (
                  <View style={[iconContainerStyle, styles.iconstyle]}>
                    <TouchableOpacity onPress={onPressIcon}>
                      {isPasswordVisible ? <HidePassword /> : <ShowPassword />}
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
              <CustomText
                size={3}
                color={AppColors.red}
                textStyles={CommonStyles.marginTop_0_5}>
                {error ? `*${error?.message}` : ''}
              </CustomText>
            </>
          )}
          name={name}
        />
      </View>
    );
  },
);

export default TextField;
