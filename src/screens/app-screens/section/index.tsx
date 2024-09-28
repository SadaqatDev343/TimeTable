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

import {useGetAllSections} from '../../../api/section';
import {AppLogo} from '../../../assets/images';
import {Add, Back} from '../../../assets/svg';
import {width} from '../../../utills/Diamension';
import {FontFamily} from '../../../utills/FontFamily';
import {styles} from './style';

export default function SectionScreen({navigation, route}: any) {
  const departmentId = route.params.departmentId;
  const disciplineId = route.params.disciplineId;
  const semesterId = route.params.semesterId;

  const handleAddDiscipline = () => {
    navigation.navigate(ScreenNames.ADD_SECTION, {
      departmentId,
      semesterId,
      disciplineId,
    });
  };

  const {data: allSections, isLoading} = useGetAllSections(semesterId);
  const [section, setSections] = useState<any[]>([]);

  useEffect(() => {
    console.log(allSections);

    if (allSections?.ok) {
      console.log(allSections.response.data);

      const sectionNames = allSections.response.data.data.map(
        (section: any) => section.name,
      );
      setSections(sectionNames);
    }
  }, [allSections]);

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
            Section
          </CustomText>
          <TouchableOpacity onPress={handleAddDiscipline}>
            <Add width={20} height={20} color={AppColors.white} />
          </TouchableOpacity>
        </View>
        {isLoading ? (
          <ActivityIndicator size="large" color={AppColors.white} />
        ) : section.length === 0 ? (
          <View style={{alignItems: 'center', marginTop: 20}}>
            <Text style={{color: AppColors.white, fontSize: 16}}>
              No Data Available
            </Text>
          </View>
        ) : (
          <FlatList
            data={section}
            numColumns={3}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => <Card title={item} />}
          />
        )}
      </View>
    </ScreenWrapper>
  );
}
