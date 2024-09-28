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

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useGetAllDisciplines} from '../../../api/discipline';
import {AppLogo} from '../../../assets/images';
import {Add, Back} from '../../../assets/svg';
import {width} from '../../../utills/Diamension';
import {FontFamily} from '../../../utills/FontFamily';
import {styles} from './style';

export default function DisciplineScreen({navigation}: any) {
  const handleAddDiscipline = () => {
    navigation.navigate(ScreenNames.ADD_DISCIPLINE);
  };

  const {data: allDisciplines, isLoading} = useGetAllDisciplines();
  const [discipline, setDisciplines] = useState<any[]>([]);

  useEffect(() => {
    if (allDisciplines?.ok) {
      const disciplineNames = allDisciplines.response.data.data.map(
        (discipline: any) => discipline.name,
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
          <TouchableOpacity onPress={handleAddDiscipline}>
            <Add width={20} height={20} color={AppColors.white} />
          </TouchableOpacity>
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
                title={item}
                onPress={() => navigation.navigate(ScreenNames.SEMESTERSCREEN)}
              />
            )}
          />
        )}
      </View>
    </ScreenWrapper>
  );
}
