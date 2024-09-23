import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import {
  Card,
  CustomText,
  Gradient,
  H1,
  ScreenWrapper,
} from '../../../components';
import ScreenNames, {RootStackParamList} from '../../../routes/routes';
import AppColors from '../../../utills/Colors';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {AppLogo} from '../../../assets/images';
import {Add} from '../../../assets/svg';
import {height, width} from '../../../utills/Diamension';
import {FontFamily} from '../../../utills/FontFamily';
import {styles} from './style';
export default function AdminHomeScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, ScreenNames.ADMINHOMESCREEN>) {
  const handleAddDepartment = () => {
    navigation.navigate(ScreenNames.ADD_DEPARTMENT); // Replace 'ADD_DEPARTMENT' with your actual route name
  };

  return (
    <Gradient>
      <ScreenWrapper
        backgroundColor={AppColors.black}
        transclucent
        scrollEnabled
        paddinTop={0}
        paddingBottom={0}
        statusBarColor={AppColors.transparent}
        barStyle="light-content">
        <View style={styles.mainViewContainer}>
          <View
            style={{
              flexDirection: 'row',
              borderBottomColor: AppColors.white,
              borderBottomWidth: 1,
              width: width(100),
              alignItems: 'center',
            }}>
            <TouchableOpacity
              //@ts-ignore
              onPress={() => navigation.openDrawer()}
              style={styles.leftlogo}>
              {/* Replacing text with Drawer Icon */}
              <FontAwesome name="navicon" size={24} color="white" />
            </TouchableOpacity>
            <View style={{marginLeft: -24}}>
              <H1
                color={AppColors.white}
                size={5}
                fontFam={FontFamily.appFontBold}>
                UNIVERSITY OF KOTLI AJ&K
              </H1>
            </View>

            <View style={styles.rightlogo}>
              <Image
                resizeMode="contain"
                source={AppLogo.logo}
                style={styles.imageStyle2}
              />
            </View>
          </View>
          <ScrollView style={{height: height(90)}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 10,
              }}>
              <CustomText
                size={5}
                font={FontFamily.appFontSemiBold}
                color={AppColors.white}>
                Department
              </CustomText>
              <TouchableOpacity onPress={handleAddDepartment}>
                <Add width={20} height={20} color={AppColors.white} />
              </TouchableOpacity>
            </View>

            <View
              style={{
                marginHorizontal: 2,
                alignSelf: 'center',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  marginHorizontal: 2,

                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Card
                  title="BS SE "
                  onPress={() =>
                    navigation.navigate(ScreenNames.DESCIPLINESCREEN)
                  }
                />
                <Card
                  title="BS SE "
                  onPress={() =>
                    navigation.navigate(ScreenNames.DESCIPLINESCREEN)
                  }
                />
                <Card
                  title="BS SE "
                  onPress={() =>
                    navigation.navigate(ScreenNames.DESCIPLINESCREEN)
                  }
                />
              </View>
            </View>
            <View
              style={{
                marginHorizontal: 2,
                alignSelf: 'center',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  marginHorizontal: 2,

                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Card
                  title="BS SE "
                  onPress={() =>
                    navigation.navigate(ScreenNames.DESCIPLINESCREEN)
                  }
                />
                <Card
                  title="BS SE "
                  onPress={() =>
                    navigation.navigate(ScreenNames.DESCIPLINESCREEN)
                  }
                />
                <Card
                  title="BS SE "
                  onPress={() =>
                    navigation.navigate(ScreenNames.DESCIPLINESCREEN)
                  }
                />
              </View>
            </View>
            <View
              style={{
                marginHorizontal: 2,
                alignSelf: 'center',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  marginHorizontal: 2,

                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Card
                  title="BS SE "
                  onPress={() =>
                    navigation.navigate(ScreenNames.DESCIPLINESCREEN)
                  }
                />
                <Card
                  title="BS SE "
                  onPress={() =>
                    navigation.navigate(ScreenNames.DESCIPLINESCREEN)
                  }
                />
                <Card
                  title="BS SE "
                  onPress={() =>
                    navigation.navigate(ScreenNames.DESCIPLINESCREEN)
                  }
                />
              </View>
            </View>
            <View
              style={{
                marginHorizontal: 2,
                alignSelf: 'center',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  marginHorizontal: 2,

                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Card
                  title="BS SE "
                  onPress={() =>
                    navigation.navigate(ScreenNames.DESCIPLINESCREEN)
                  }
                />
                <Card
                  title="BS SE "
                  onPress={() =>
                    navigation.navigate(ScreenNames.DESCIPLINESCREEN)
                  }
                />
                <Card
                  title="BS SE "
                  onPress={() =>
                    navigation.navigate(ScreenNames.DESCIPLINESCREEN)
                  }
                />
              </View>
            </View>
            <View
              style={{
                marginHorizontal: 2,
                alignSelf: 'center',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  marginHorizontal: 2,

                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Card
                  title="BS SE "
                  onPress={() =>
                    navigation.navigate(ScreenNames.DESCIPLINESCREEN)
                  }
                />
                <Card
                  title="BS SE "
                  onPress={() =>
                    navigation.navigate(ScreenNames.DESCIPLINESCREEN)
                  }
                />
                <Card
                  title="BS SE "
                  onPress={() =>
                    navigation.navigate(ScreenNames.DESCIPLINESCREEN)
                  }
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </ScreenWrapper>
    </Gradient>
  );
}
