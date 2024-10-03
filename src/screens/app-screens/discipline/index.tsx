import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Image,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Card, CustomText, H1, ScreenWrapper} from '../../../components';
import ScreenNames from '../../../routes/routes';
import AppColors from '../../../utills/Colors';

import {
  useDeleteDisciplineById,
  useGetAllDisciplines,
} from '../../../api/discipline';
import {AppLogo} from '../../../assets/images';
import {Add, Back} from '../../../assets/svg';
import {width} from '../../../utills/Diamension';
import {FontFamily} from '../../../utills/FontFamily';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import {styles} from './style';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function DisciplineScreen({navigation, route}: any) {
  const [role, setRole] = useState<string | null>(null); // State for user role
  const handleAddDiscipline = () => {
    navigation.navigate(ScreenNames.ADD_DISCIPLINE, {departmentId});
  };
  const departmentId = route.params.departmentId;
  const {
    data: allDisciplines,
    isLoading,
    refetch,
  } = useGetAllDisciplines(departmentId);
  const [discipline, setDisciplines] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const slideAnim = useState(new Animated.Value(0))[0];

  const {mutate: deleteDiscipline, isPending: isDeleting} =
    useDeleteDisciplineById();

  const [selectedDepartment, setSelectedDepartment] = useState<any>(null);

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

  const handleLongPress = (item: any) => {
    setSelectedDepartment(item);
    setModalVisible(true);
  };

  const handleEditDepartment = () => {
    setModalVisible(false);
    // Navigate to edit department screen with selected department data
    navigation.navigate(ScreenNames.EDIT_DEPARTMENT, {
      departmentId: selectedDepartment.id,
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
            refreshing={isLoading}
            onRefresh={refetch}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <Card
                title={item.name}
                onLongPress={
                  role === 'admin' ? () => handleLongPress(item) : undefined
                }
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
