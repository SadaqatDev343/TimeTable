import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, TouchableOpacity, View} from 'react-native';
import {AppLogo} from '../../../assets/images';
import {Back} from '../../../assets/svg';
import {Card, CustomText, H1, ScreenWrapper} from '../../../components';
import ScreenNames from '../../../routes/routes';
import AppColors from '../../../utills/Colors';
import {CommonStyles} from '../../../utills/CommonStyle';
import {width} from '../../../utills/Diamension';
import {FontFamily} from '../../../utills/FontFamily';
import {styles} from './style';

export default function ViewTable({navigation, route}: any) {
  const departmentId = route.params.departmentId;
  const disciplineId = route.params.disciplineId;
  const semesterId = route.params.semesterId;
  const sectionId = route.params.sectionId;

  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const storedRole = await AsyncStorage.getItem('role');
        setRole(storedRole);
      } catch (error) {
        console.error('Error fetching role:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, []);

  // Loading state
  if (loading) {
    return (
      <ScreenWrapper
        statusBarColor="#3333ff"
        backgroundColor="#3333ff"
        barStyle="light-content">
        <View style={styles.mainViewContainer}>
          <ActivityIndicator size="large" color="white" />
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper
      statusBarColor="#3333ff"
      backgroundColor="#3333ff"
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
            onPress={() => navigation.goBack()}
            style={styles.leftlogo}>
            <Back color="white" />
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
        <View style={CommonStyles.marginTop_2} />
        <CustomText
          size={5}
          style={CommonStyles.marginVertical_1}
          font={FontFamily.appFontSemiBold}
          color={AppColors.white}>
          Select One
        </CustomText>
        <View style={CommonStyles.marginTop_2} />

        {/* Render cards based on role */}
        <Card
          title="View Timetable"
          onPress={() =>
            navigation.navigate(ScreenNames.VIEW_TABLE, {
              sectionId,
            })
          }
        />
        {role === 'admin' && (
          <>
            <Card
              title="Create Timetable"
              onPress={() =>
                navigation.navigate(ScreenNames.ADD_TABLE, {
                  departmentId,
                  disciplineId,
                  sectionId,
                  semesterId,
                })
              }
            />
            <Card
              title="Create Datesheet"
              onPress={() =>
                navigation.navigate(ScreenNames.CREATE_DATESHEET, {
                  departmentId,
                  disciplineId,
                  sectionId,
                  semesterId,
                })
              }
            />
          </>
        )}
        <Card
          title="View Datesheet"
          onPress={() =>
            navigation.navigate(ScreenNames.VIEW_DATESHEET, {
              sectionId,
            })
          }
        />
      </View>
    </ScreenWrapper>
  );
}
