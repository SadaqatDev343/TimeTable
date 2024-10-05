import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
  Animated,
  TextInput, // Import TextInput for the search
} from 'react-native';
import {Card, CustomText, H1, ScreenWrapper} from '../../../components';
import ScreenNames from '../../../routes/routes';
import AppColors from '../../../utills/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  useGetAllDepartments,
  useDeleteDepartmentById,
} from '../../../api/department';
import {AppLogo} from '../../../assets/images';
import {Add} from '../../../assets/svg';
import {width} from '../../../utills/Diamension';
import {FontFamily} from '../../../utills/FontFamily';
import {styles} from './style';

export default function AdminHomeScreen({navigation}: any) {
  const [department, setDepartments] = useState<any[]>([]);
  const [filteredDepartments, setFilteredDepartments] = useState<any[]>([]); // State for filtered departments
  const [selectedDepartment, setSelectedDepartment] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState(''); // State for search text

  const {data: allDepartments, isLoading, refetch} = useGetAllDepartments();
  const {mutate: deleteDepartment, isPending: isDeleting} =
    useDeleteDepartmentById();

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

  useEffect(() => {
    if (allDepartments?.ok) {
      const departmentData = allDepartments.response.data.map(
        (department: any) => ({
          name: department.name,
          id: department._id,
        }),
      );
      setDepartments(departmentData);
      setFilteredDepartments(departmentData); // Initialize filteredDepartments
    }
  }, [allDepartments]);

  // Handle search input change
  const handleSearch = (text: string) => {
    setSearchText(text);
    const filteredData = department.filter(dept =>
      dept.name.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredDepartments(filteredData);
  };

  const handleAddDepartment = () => {
    navigation.navigate(ScreenNames.ADD_DEPARTMENT);
  };

  const handleLongPress = (item: any) => {
    setSelectedDepartment(item);
    setModalVisible(true);
  };

  const handleEditDepartment = () => {
    setModalVisible(false);
    // Navigate to edit department screen with selected department data
    navigation.navigate(ScreenNames.ADD_DEPARTMENT, {
      departmentId: selectedDepartment.id,
    });
  };

  const handleDeleteDepartment = () => {
    if (selectedDepartment) {
      deleteDepartment(selectedDepartment.id, {
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
        {/* Header */}
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

        {/* Departments and Add Button */}
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
          <TouchableOpacity onPress={handleAddDepartment}>
            <Add width={20} height={20} color={AppColors.white} />
          </TouchableOpacity>
        </View>

        {/* Search Input */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search departments..."
          placeholderTextColor="#ccc"
          value={searchText}
          onChangeText={handleSearch} // Handle input changes
        />

        {/* Content (List or Loading) */}
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
            data={filteredDepartments} // Use filtered departments
            refreshing={isLoading}
            onRefresh={refetch}
            numColumns={3}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <Card
                title={item.name}
                onLongPress={() => handleLongPress(item)}
                onPress={() =>
                  navigation.navigate(ScreenNames.DESCIPLINESCREEN, {
                    departmentId: item.id,
                  })
                }
              />
            )}
          />
        )}

        {/* Cool Sliding Modal for Edit/Delete */}
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
      </View>
    </ScreenWrapper>
  );
}
