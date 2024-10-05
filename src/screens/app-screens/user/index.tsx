import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Card, CustomText, H1, ScreenWrapper} from '../../../components';
import ScreenNames from '../../../routes/routes';
import AppColors from '../../../utills/Colors';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useGetAllDepartments} from '../../../api/department';
import {AppLogo} from '../../../assets/images';
import {width} from '../../../utills/Diamension';
import {FontFamily} from '../../../utills/FontFamily';
import {styles} from './style';

export default function AdminHomeScreen({navigation}: any) {
  const {data: allDepartments, isLoading, refetch} = useGetAllDepartments();
  const [department, setDepartments] = useState<any[]>([]);

  useEffect(() => {
    if (allDepartments?.ok) {
      const departmentData = allDepartments.response.data.map(
        (department: any) => ({
          name: department.name,
          id: department._id,
        }),
      );
      setDepartments(departmentData);
      setFilteredDepartments(departmentData);
    }
  }, [allDepartments]);

  const [filteredDepartments, setFilteredDepartments] = useState<any[]>([]); // State for filtered departments

  const [searchText, setSearchText] = useState(''); // State for search text
  const handleSearch = (text: string) => {
    setSearchText(text);
    const filteredData = department.filter(dept =>
      dept.name.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredDepartments(filteredData);
  };

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
            onPress={() => navigation.openDrawer()}
            style={styles.leftlogo}>
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
            Department
          </CustomText>
        </View>

        {/* Search Input */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search departments..."
          placeholderTextColor="#ccc"
          value={searchText}
          onChangeText={handleSearch} // Handle input changes
        />
        {isLoading ? (
          <ActivityIndicator size="large" color={AppColors.white} />
        ) : filteredDepartments.length === 0 ? (
          <View style={{alignItems: 'center', marginTop: 20}}>
            <Text style={{color: AppColors.white, fontSize: 16}}>
              No Data Available
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredDepartments}
            refreshing={isLoading}
            onRefresh={refetch}
            numColumns={3}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <Card
                title={item.name}
                onPress={() =>
                  navigation.navigate(ScreenNames.DESCIPLINESCREEN, {
                    departmentId: item.id,
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
