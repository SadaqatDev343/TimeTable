import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Image,
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Card, CustomText, H1, ScreenWrapper} from '../../../components';
import ScreenNames from '../../../routes/routes';
import AppColors from '../../../utills/Colors';

import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDeleteSemesterById, useGetAllSemesters} from '../../../api/semester';
import {AppLogo} from '../../../assets/images';
import {Add, Back} from '../../../assets/svg';
import {width} from '../../../utills/Diamension';
import {FontFamily} from '../../../utills/FontFamily';
import {styles} from './style';

export default function SemesterScreen({navigation, route}: any) {
  const departmentId = route.params.departmentId;
  const disciplineId = route.params.disciplineId;

  const handleAddDiscipline = () => {
    navigation.navigate(ScreenNames.ADD_SEMESTER, {
      departmentId,
      disciplineId,
    });
  };

  const {
    data: allSemesters,
    isLoading,
    refetch,
  } = useGetAllSemesters(disciplineId);
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
      setFilteredDepartments(semesterNames);
    }
  }, [allSemesters]);

  const [modalVisible, setModalVisible] = useState(false);

  const {mutate: deleteDiscipline, isPending: isDeleting} =
    useDeleteSemesterById();

  const [selectedDepartment, setSelectedDepartment] = useState<any>(null);

  const slideAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    if (modalVisible) {
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [modalVisible]);

  const handleLongPress = (item: any) => {
    setSelectedDepartment(item);
    setModalVisible(true);
  };

  const handleEditDepartment = () => {
    setModalVisible(false);
    // Navigate to edit department screen with selected department data
    navigation.navigate(ScreenNames.ADD_SEMESTER, {
      semesterId: selectedDepartment.id,
      departmentId,
      disciplineId,
    });
  };

  const handleDeleteDepartment = () => {
    if (selectedDepartment) {
      deleteDiscipline(selectedDepartment.id, {
        onSuccess: () => {
          setModalVisible(false);
          refetch(); // Refetch the department list after deletion
        },
        onError: error => {
          console.error('Error deleting department:', error);
          setModalVisible(false); // Close the modal if deletion fails
        },
      });
    }
  };

  const [filteredDepartments, setFilteredDepartments] = useState<any[]>([]); // State for filtered departments

  const [searchText, setSearchText] = useState(''); // State for search text
  const handleSearch = (text: string) => {
    setSearchText(text);
    const filteredData = semester.filter(dept =>
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

        {/* Search Input */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search semesters..."
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
                onLongPress={
                  userRole === 'admin' ? () => handleLongPress(item) : undefined
                }
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
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalBackground}>
          <Animated.View
            style={[
              styles.modalContainer,
              {
                transform: [
                  {
                    translateY: slideAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [300, 0],
                    }),
                  },
                ],
              },
            ]}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleEditDepartment}>
              <FontAwesome name="edit" size={20} color={AppColors.white} />
              <Text style={styles.modalButtonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleDeleteDepartment}
              disabled={isDeleting}>
              <FontAwesome name="trash" size={20} color={AppColors.white} />
              <Text style={styles.modalButtonText}>
                {isDeleting ? 'Deleting...' : 'Delete'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, {backgroundColor: 'red'}]}
              onPress={() => setModalVisible(false)}>
              <FontAwesome name="times" size={20} color={AppColors.white} />
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </ScreenWrapper>
  );
}
