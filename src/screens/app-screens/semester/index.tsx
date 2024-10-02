import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Card, CustomText, H1, ScreenWrapper} from '../../../components';
import ScreenNames from '../../../routes/routes';
import AppColors from '../../../utills/Colors';

import {useGetAllSemesters} from '../../../api/semester';
import {AppLogo} from '../../../assets/images';
import {Add, Back} from '../../../assets/svg';
import {width} from '../../../utills/Diamension';
import {FontFamily} from '../../../utills/FontFamily';
import {styles} from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SemesterScreen({navigation, route}: any) {
  const departmentId = route.params.departmentId;
  const disciplineId = route.params.disciplineId;

  const handleAddDiscipline = () => {
    navigation.navigate(ScreenNames.ADD_SEMESTER, {
      departmentId,
      disciplineId,
    });
  };

  const {data: allSemesters, isLoading} = useGetAllSemesters(disciplineId);
  const [semester, setSemesters] = useState<any[]>([]);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      const role = await AsyncStorage.getItem('role'); // Adjust this key according to how you stored the role
      setUserRole(role);
    };

    fetchUserRole();
  }, []);

  useEffect(() => {
    if (allSemesters?.ok) {
      const semesterNames = allSemesters.response.data.map((semester: any) => ({
        name: semester.name,
        id: semester._id,
      }));

      setSemesters(semesterNames);
    }
  }, [allSemesters]);

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
            paddingHorizontal: 10,
          }}>
          <Pressable onPress={() => navigation.goBack()}>
            <Back width={24} height={24} color={AppColors.white} />
          </Pressable>
          <View style={{marginLeft: 35}}>
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 10,
            width: width(90),
          }}>
          <CustomText
            size={5}
            font={FontFamily.appFontSemiBold}
            color={AppColors.white}>
            Semester
          </CustomText>
          {userRole === 'admin' && ( // Check if userRole is 'admin'
            <TouchableOpacity onPress={handleAddDiscipline}>
              <Add width={20} height={20} color={AppColors.white} />
            </TouchableOpacity>
          )}
        </View>
        {isLoading ? (
          <ActivityIndicator size="large" color={AppColors.white} />
        ) : semester.length === 0 ? (
          <View style={{alignItems: 'center', marginTop: 20}}>
            <Text style={{color: AppColors.white, fontSize: 16}}>
              No Data Available
            </Text>
          </View>
        ) : (
          <FlatList
            data={semester}
            numColumns={3}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <Card
                title={item.name}
                onPress={() =>
                  navigation.navigate(ScreenNames.SECTIONSCREEN, {
                    departmentId,
                    disciplineId,
                    semesterId: item.id,
                  })
                }
              />
            )}
          />
        )}
      </View>
    </ScreenWrapper>
  );
}
