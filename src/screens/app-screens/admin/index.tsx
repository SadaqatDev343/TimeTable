import {View, Text, Image, ScrollView} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import ScreenNames, {RootStackParamList} from '../../../routes/routes';
import {
  Card,
  CustomText,
  Gradient,
  H1,
  ScreenWrapper,
} from '../../../components';
import AppColors from '../../../utills/Colors';
import Header from '../../../components/header';
import styles from './style';
import {AppLogo} from '../../../assets/images';
import {CommonStyles} from '../../../utills/CommonStyle';
import {FontFamily} from '../../../utills/FontFamily';
import {height, width} from '../../../utills/Diamension';

export default function ({
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
              <Card title="BS SE " onPress={() => console.log('BS SE ')} />

              <Card title="CS " onPress={() => console.log('CS ')} />
              <Card title="IT  " onPress={() => console.log('IT  ')} />
              <Card title="IR " onPress={() => console.log('IR ')} />
              <Card title="LAW " onPress={() => console.log('LAW ')} />
              <Card
                title="ECONOMICS "
                onPress={() => console.log('ECONOMICS ')}
              />
              <Card title="ENGLISH " onPress={() => console.log('ENGLISH  ')} />
              <Card title="URDU" onPress={() => console.log('URDU ')} />
              <Card title="ISLAMYAT" onPress={() => console.log('ISLAMYAT')} />
              <Card title="PHYSICS" onPress={() => console.log('PHYSICS ')} />
              <Card
                title="CHEMISTRY"
                onPress={() => console.log('CHEMISTRY ')}
              />
              <Card
                title="ACCOUNTING "
                onPress={() => console.log('ACCOUNTING ')}
              />
              <Card title="BOTANY " onPress={() => console.log('BOTANY  ')} />
              <Card
                title="MANAGEMENT"
                onPress={() => console.log('MANAGEMENT')}
              />
              <Card
                title="ARCHITECTURE"
                onPress={() => console.log('ARCHITECTURE')}
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
