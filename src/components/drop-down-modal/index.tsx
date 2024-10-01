import React from 'react';
import {TouchableOpacity, View, ViewStyle} from 'react-native';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';
import {IApbDropDownModal} from '../../types';
import styles from './styles';
import Input from '../input';
import {CustomText} from '../texts';
import ModalWrapper from '../modal-wrapper';

interface Props {
  isVisible: boolean;
  Data: IApbDropDownModal[] | undefined;
  onClose: () => void;
  onPress: (val?: string | any) => void;
  Search?: boolean;
  onChangeText?: (val: string) => void;
  onEndReached?: () => void;
  ListFooterComponent?: React.ReactElement | null;
  container?: ViewStyle;
  modalContainer?: ViewStyle;
  modalStyling?: ViewStyle;
  maincontainer?: ViewStyle;
}

const DropDownModal: React.FC<Props> = ({
  modalContainer,
  modalStyling,
  maincontainer,
  isVisible,
  container,
  onChangeText = () => {},
  Search = false,
  Data = [],
  onClose,
  onPress,
  onEndReached,
  ListFooterComponent,
}) => {
  return (
    <ModalWrapper
      containerStyle={modalStyling}
      isVisible={isVisible}
      onClose={onClose}
      mainContainer={modalContainer}>
      <View style={[maincontainer ?? styles.mainContainer, container]}>
        <KeyboardAwareFlatList
          data={Data}
          ListHeaderComponent={
            Search
              ? () => (
                  <View style={styles.inputContainer}>
                    <Input title="Search" onChange={onChangeText} />
                  </View>
                )
              : null
          }
          style={Search ? styles.autoFlat : styles.flatStyle}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            // Determine how to display the item
            const displayValue =
              item?.name ?? // For subjects and teachers that have a 'name' field
              `${item?.buildingName ?? ''} - Floor: ${
                item?.floorNumber ?? ''
              }, Room: ${item?.roomNumber ?? ''}`; // For rooms

            return (
              <TouchableOpacity
                style={styles.viewStyle}
                onPress={() => onPress(item)}>
                <CustomText>{displayValue}</CustomText>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={ListFooterComponent}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
        />
      </View>
    </ModalWrapper>
  );
};

export default DropDownModal;
