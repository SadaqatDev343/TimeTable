import React, {forwardRef} from 'react';
import {TextInput, View, ViewStyle} from 'react-native';
import styles from './styles';
import AppColors from '../../utills/Colors';

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
  inputStyle?: ViewStyle;
  placeholder?: string;
  keyboardType?: KeyboardVariation;
  returnKeyType?: KeyType;
  maxlength?: number;
  multiline?: boolean;
  numberOfLines?: number;
  secureTextEntry?: boolean;
  textAlignVertical?: 'auto' | 'center' | 'top' | 'bottom';
  autofocus?: boolean;
  onChange: (value: string) => void;
  title?: string;
  titleTextSize?: number;
  showPasswordIcon?: boolean;
  onPressIcon?(): void;
  value?: string;
  onSubmitEditing?: () => void;
  autoCapitalize?: AutoCapitalize;
  titleColor?: string;
}

const Input = forwardRef<TextInput, Props>(
  (
    {
      containerStyle = {},
      innerContainerStyle = {},
      inputStyle = {},
      placeholder = 'Enter text here!',
      onChange,
      keyboardType = 'default',
      returnKeyType = 'default',
      maxlength,
      multiline = false,
      numberOfLines,
      secureTextEntry = false,
      textAlignVertical = 'center',
      autofocus = false,
      value,
      onSubmitEditing,
      autoCapitalize = 'sentences',
    }: Props,
    ref,
  ) => {
    return (
      <View style={[containerStyle, styles.container]} testID="input">
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
            style={[styles.inputStyle, inputStyle]}
            onSubmitEditing={onSubmitEditing}
            testID={'inputField'}
          />
        </View>
      </View>
    );
  },
);

export default Input;
