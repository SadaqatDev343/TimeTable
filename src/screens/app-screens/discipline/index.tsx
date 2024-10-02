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

import {useGetAllDisciplines} from '../../../api/discipline';
import {AppLogo} from '../../../assets/images';
import {Add, Back} from '../../../assets/svg';
import {width} from '../../../utills/Diamension';
import {FontFamily} from '../../../utills/FontFamily';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import {styles} from './style';

export default function DisciplineScreen({navigation, route}: any) {
  const [role, setRole] = useState<string | null>(null); // State for user role
  const handleAddDiscipline = () => {
    navigation.navigate(ScreenNames.ADD_DISCIPLINE, {departmentId});
  };
  const departmentId = route.params.departmentId;
  const {data: allDisciplines, isLoading} = useGetAllDisciplines(departmentId);
  const [discipline, setDisciplines] = useState<any[]>([]);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const storedRole = await AsyncStorage.getItem('role'); // Fetch role from local storage
        setRole(storedRole); // Store the role in state
      } catch (error) {
        console.error('Failed to fetch role from local storage:', error);
      }
    };

    fetchRole(); // Call the function to fetch the role
  }, []);

  useEffect(() => {
    if (allDisciplines?.ok) {
      const disciplineNames = allDisciplines.response.data.data.map(
        (discipline: any) => ({
          name: discipline.name,
          id: discipline._id,
        }),
      );
      setDisciplines(disciplineNames);
    }
  }, [allDisciplines]);

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
            Discipline
          </CustomText>
          {role === 'admin' && ( // Conditionally render the "+" button
            <TouchableOpacity onPress={handleAddDiscipline}>
              <Add width={20} height={20} color={AppColors.white} />
            </TouchableOpacity>
          )}
        </View>
        {isLoading ? (
          <ActivityIndicator size="large" color={AppColors.white} />
        ) : discipline.length === 0 ? (
          <View style={{alignItems: 'center', marginTop: 20}}>
            <Text style={{color: AppColors.white, fontSize: 16}}>
              No Data Available
            </Text>
          </View>
        ) : (
          <FlatList
            data={discipline}
            numColumns={3}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <Card
                title={item.name}
                onPress={() =>
                  navigation.navigate(ScreenNames.SEMESTERSCREEN, {
                    departmentId,
                    disciplineId: item.id,
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
