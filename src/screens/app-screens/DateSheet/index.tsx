import {
  StyleSheet,
  Text,
  View,
  SectionList,
  TextInput,
  Modal,
  Animated,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScreenWrapper} from '../../../components';
import {
  useDeleteDateSheetById,
  useGetAllDateSheet,
} from '../../../api/datesheet';
import AppColors from '../../../utills/Colors';
import {height} from '../../../utills/Diamension';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {FontFamily} from '../../../utills/FontFamily';
import ScreenNames from '../../../routes/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DateSheetView = ({route, navigation}: any) => {
  const sectionId = route.params.sectionId;
  const {data, isLoading, refetch} = useGetAllDateSheet(sectionId);
  const [dataSheet, setDateSheet] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (data?.ok) {
      setDateSheet(data.response.data.data);
    }
  }, [data]);

  // Group data by exam type (Midterm and Final)
  const groupedData = () => {
    const midterm: any[] = [];
    const finalTerm: any[] = [];

    dataSheet.forEach((item: any) => {
      if (item.examType === 'Midterm') {
        midterm.push(item);
      } else if (item.examType === 'Final Term') {
        finalTerm.push(item);
      }
    });

    return [
      {title: 'Midterm', data: midterm},
      {title: 'Final Term', data: finalTerm},
    ];
  };

  // Filter the date sheet items based on the search query (only by subject)
  const filteredData = () => {
    if (!searchQuery) {
      return groupedData();
    }

    const lowerCaseQuery = searchQuery.toLowerCase();
    const midterm = dataSheet.filter(
      (item: any) =>
        item.examType === 'Midterm' &&
        item.subject.name.toLowerCase().includes(lowerCaseQuery),
    );

    const finalTerm = dataSheet.filter(
      (item: any) =>
        item.examType === 'Final Term' &&
        item.subject.name.toLowerCase().includes(lowerCaseQuery),
    );

    return [
      {title: 'Midterm', data: midterm},
      {title: 'Final Term', data: finalTerm},
    ];
  };

  // Render a single date sheet item
  const renderDateSheetItem = ({item}: any) => {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        disabled={userRole === 'admin' ? false : true}
        onLongPress={
          userRole === 'admin' ? () => handleLongPress(item) : undefined
        }>
        <View style={styles.dateSheetItem}>
          <Text style={styles.header}>Subject: {item.subject.name}</Text>
          <Text>Exam Date: {new Date(item.examDate).toDateString()}</Text>
          <Text>Start Time: {item.startTime}</Text>
          <Text>End Time: {item.endTime}</Text>
          <Text>
            Room: {item.room.roomNumber}, Building: {item.room.buildingName}
          </Text>
          <Text>Department: {item.department.name}</Text>
          <Text>Semester: {item.semester.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  // Render section header
  const renderSectionHeader = ({section}: any) => {
    return <Text style={styles.sectionHeader}>{section.title}</Text>;
  };

  const [userRole, setUserRole] = useState<string | null>(null); // State for user role

  useEffect(() => {
    const fetchUserRole = async () => {
      const role = await AsyncStorage.getItem('role'); // Fetch role from AsyncStorage
      setUserRole(role);
    };

    fetchUserRole(); // Call the function to fetch user role
  }, []);

  const [modalVisible, setModalVisible] = useState(false);

  const slideAnim = useState(new Animated.Value(0))[0];

  const {mutate: deleteDiscipline, isPending: isDeleting} =
    useDeleteDateSheetById();

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

  const handleLongPress = (item: any) => {
    setSelectedDepartment(item);
    setModalVisible(true);
  };

  const handleEditDepartment = () => {
    setModalVisible(false);
    // Navigate to edit department screen with selected department data
    navigation.navigate(ScreenNames.CREATE_DATESHEET, {
      datesheetId: selectedDepartment._id,
    });
  };

  const handleDeleteDepartment = () => {
    if (selectedDepartment) {
      deleteDiscipline(selectedDepartment._id, {
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
      <View style={styles.container}>
        <Text style={styles.title}>Date Sheet</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by Subject"
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <SectionList
            refreshing={isLoading}
            onRefresh={refetch}
            sections={filteredData()}
            renderItem={renderDateSheetItem}
            renderSectionHeader={renderSectionHeader}
            keyExtractor={(item, index) => item._id + index}
            contentContainerStyle={styles.list}
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
};

export default DateSheetView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: '#fff',
    color: 'black',
  },
  list: {
    paddingBottom: 16,
  },
  dateSheetItem: {
    padding: 16,
    marginBottom: 16,
    backgroundColor: AppColors.blue10,
    borderRadius: 8,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    backgroundColor: AppColors.blue10,
    padding: 8,
    color: '#fff',
    marginBottom: height(1),
    borderRadius: 8,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContainer: {
    backgroundColor: AppColors.white,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.black,
    width: '90%',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  modalButtonText: {
    color: AppColors.white,
    fontSize: 16,
    marginLeft: 10,
    fontFamily: FontFamily.appFontSemiBold,
  },
});
