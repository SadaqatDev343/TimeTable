import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Image, ScrollView, View} from 'react-native';
import {
  Card,
  CustomText,
  Gradient,
  H1,
  ScreenWrapper,
} from '../../../components';
import ScreenNames, {RootStackParamList} from '../../../routes/routes';
import AppColors from '../../../utills/Colors';

import {AppLogo} from '../../../assets/images';
import {CommonStyles} from '../../../utills/CommonStyle';
import {height, width} from '../../../utills/Diamension';
import {FontFamily} from '../../../utills/FontFamily';
import {styles} from './style';

export default function AdminHomeScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, ScreenNames.ADMINHOMESCREEN>) {
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
            <View style={styles.leftlogo}>
              <Image
                resizeMode="contain"
                source={AppLogo.logo}
                style={styles.imageStyle1}
              />
            </View>
            <View style={{marginLeft: -24}}>
              <H1
                color={AppColors.white}
                size={5}
                fontFam={FontFamily.appFontBold}>
                UNIVERSITY OF KOTLI AJ&K
              </H1>
            </View>

            <View style={styles.rightlogo}>
              {/* <Image
                resizeMode="contain"
                source={AppLogo.logo}
                style={styles.imageStyle2}
              /> */}
            </View>
          </View>
          <ScrollView style={{height: height(90)}}>
            <CustomText
              size={5}
              textStyles={[CommonStyles.marginTop_2, CommonStyles.marginLeft_3]}
              font={FontFamily.appFontSemiBold}
              color={AppColors.white}>
              Department
            </CustomText>
            <ScrollView horizontal style={{height: height(11)}}>
              <Card
                title="BS SE "
                onPress={() =>
                  navigation.navigate(ScreenNames.DESCIPLINESCREEN)
                }
              />

              <Card
                title="CS "
                onPress={() =>
                  navigation.navigate(ScreenNames.DESCIPLINESCREEN)
                }
              />
              <Card
                title="IT  "
                onPress={() =>
                  navigation.navigate(ScreenNames.DESCIPLINESCREEN)
                }
              />
              <Card
                title="IR "
                onPress={() =>
                  navigation.navigate(ScreenNames.DESCIPLINESCREEN)
                }
              />
              <Card
                title="LAW "
                onPress={() =>
                  navigation.navigate(ScreenNames.DESCIPLINESCREEN)
                }
              />
              <Card
                title="ECONOMICS "
                onPress={() =>
                  navigation.navigate(ScreenNames.DESCIPLINESCREEN)
                }
              />
              <Card
                title="ENGLISH "
                onPress={() =>
                  navigation.navigate(ScreenNames.DESCIPLINESCREEN)
                }
              />
              <Card
                title="URDU"
                onPress={() =>
                  navigation.navigate(ScreenNames.DESCIPLINESCREEN)
                }
              />
              <Card
                title="ISLAMYAT"
                onPress={() =>
                  navigation.navigate(ScreenNames.DESCIPLINESCREEN)
                }
              />
              <Card
                title="PHYSICS"
                onPress={() =>
                  navigation.navigate(ScreenNames.DESCIPLINESCREEN)
                }
              />
              <Card
                title="CHEMISTRY"
                onPress={() =>
                  navigation.navigate(ScreenNames.DESCIPLINESCREEN)
                }
              />
              <Card
                title="ACCOUNTING "
                onPress={() =>
                  navigation.navigate(ScreenNames.DESCIPLINESCREEN)
                }
              />
              <Card
                title="BOTANY "
                onPress={() =>
                  navigation.navigate(ScreenNames.DESCIPLINESCREEN)
                }
              />
              <Card
                title="MANAGEMENT"
                onPress={() =>
                  navigation.navigate(ScreenNames.DESCIPLINESCREEN)
                }
              />
              <Card
                title="ARCHITECTURE"
                onPress={() =>
                  navigation.navigate(ScreenNames.DESCIPLINESCREEN)
                }
              />
            </ScrollView>
            <CustomText
              size={5}
              textStyles={[CommonStyles.marginTop_2, CommonStyles.marginLeft_3]}
              font={FontFamily.appFontSemiBold}
              color={AppColors.white}>
              Discipline
            </CustomText>
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
                  title="BS SE  A "
                  onPress={() => console.log('BS SE ')}
                  containerStyle={{
                    marginRight: width(5),
                  }}
                />
                <Card
                  title="CS  A"
                  onPress={() => console.log('CS ')}
                  containerStyle={{alignSelf: 'flex-end'}}
                />
                <Card title="IT  A " onPress={() => console.log('IT  ')} />
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
                  title="IR  A "
                  onPress={() => console.log('BS SE ')}
                  containerStyle={{
                    marginRight: width(5),
                  }}
                />
                <Card
                  title="LAW  A"
                  onPress={() => console.log('CS ')}
                  containerStyle={{alignSelf: 'flex-end'}}
                />
                <Card
                  title="ECONOMICS  A "
                  onPress={() => console.log('IT  ')}
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
                  title="ENGLISH  A "
                  onPress={() => console.log('BS SE ')}
                  containerStyle={{
                    marginRight: width(5),
                  }}
                />
                <Card
                  title="URDU  A"
                  onPress={() => console.log('CS ')}
                  containerStyle={{alignSelf: 'flex-end'}}
                />
                <Card
                  title="ISLAMYAT  A "
                  onPress={() => console.log('IT  ')}
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
                  title="PHYSICS  A "
                  onPress={() => console.log('BS SE ')}
                  containerStyle={{
                    marginRight: width(5),
                  }}
                />
                <Card
                  title="CHEMISTRY  A"
                  onPress={() => console.log('CS ')}
                  containerStyle={{alignSelf: 'flex-end'}}
                />
                <Card title="BBA A " onPress={() => console.log('IT  ')} />
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
                  title="ACCOUNTING A "
                  onPress={() => console.log('BS SE ')}
                  containerStyle={{
                    marginRight: width(5),
                  }}
                />
                <Card
                  title="BOTANY A"
                  onPress={() => console.log('CS ')}
                  containerStyle={{alignSelf: 'flex-end'}}
                />
                <Card
                  title="MANAGEMENT A "
                  onPress={() => console.log('IT  ')}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </ScreenWrapper>
    </Gradient>
  );
}
