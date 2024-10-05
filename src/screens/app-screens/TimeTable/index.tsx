import React, {useEffect, useState} from 'react';
import {
  Animated,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  useDeleteTimeTableById,
  useGetAllTimeTable,
} from '../../../api/timetable';
import {ScreenWrapper} from '../../../components';
import ScreenNames from '../../../routes/routes';
import AppColors from '../../../utills/Colors';
import {FontFamily} from '../../../utills/FontFamily';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the correct order of weekdays
const weekdayOrder = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

// Group data by weekday
const groupByDay = (data: any) => {
  const groupedData: any = {};

  data.forEach((item: any) => {
    if (!groupedData[item.day]) {
      groupedData[item.day] = [];
    }
    groupedData[item.day].push(item);
  });

  // Sort grouped data according to weekday order
  const sortedGroupedData = weekdayOrder
    .map(day => ({
      day,
      items: groupedData[day] || [],
    }))
    .filter(group => group.items.length > 0); // Remove days with no items

  return sortedGroupedData;
};

const TimeTable = ({route, navigation}: any) => {
  const sectionId = route.params.sectionId;
  const {data, isLoading, refetch} = useGetAllTimeTable(sectionId);
  const [groupedTimetable, setGroupedTimetable] = useState<any>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (data?.ok) {
      const groupedData = groupByDay(data.response.data.data);
      setGroupedTimetable(groupedData);
    }
  }, [data]);

  // Function to filter the grouped timetable based on the search query
  const filteredTimetable = () => {
    if (!searchQuery) {
      return groupedTimetable;
    }

    const lowerCaseQuery = searchQuery.toLowerCase();
    return groupedTimetable
      .map((group: {day: string; items: any[]}) => ({
        day: group.day,
        items: group.items.filter(
          (entry: {subject: {name: string}}) =>
            entry.subject.name.toLowerCase().includes(lowerCaseQuery) ||
            group.day.toLowerCase().includes(lowerCaseQuery),
        ),
      }))
      .filter((group: {items: string | any[]}) => group.items.length > 0); // Remove empty groups
  };

  const renderItem = ({item}: any) => (
    <View>
      <Text style={styles.dayHeader}>{item.day}</Text>
      {/* Render header for subjects, teachers, and rooms only once */}
      <View style={styles.headerRow}>
        <Text style={styles.headerCell}>Time</Text>
        <Text style={styles.headerCell}>Subject</Text>
        <Text style={styles.headerCell}>Teacher</Text>
        <Text style={styles.headerCell}>Room</Text>
      </View>
      {item.items.map((entry: any) => (
        <TouchableOpacity
          key={entry._id}
          activeOpacity={0.6}
          disabled={userRole === 'admin' ? false : true}
          onLongPress={
            userRole === 'admin' ? () => handleLongPress(entry) : undefined
          }>
          <View style={styles.row}>
            <Text style={styles.cell}>
              {entry.startTime} - {entry.endTime}
            </Text>
            <Text style={styles.cell}>{entry.subject.name}</Text>
            <Text style={styles.cell}>{entry.teacher.name}</Text>
            <Text style={styles.cell}>
              {entry.room.buildingName} Room {entry.room.roomNumber}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
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

  const {mutate: deleteTimeTable, isPending: isDeleting} =
    useDeleteTimeTableById();

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
    navigation.navigate(ScreenNames.ADD_TABLE, {
      timetableId: selectedDepartment._id,
    });
  };

  const handleDeleteDepartment = () => {
    if (selectedDepartment) {
      deleteTimeTable(selectedDepartment._id, {
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
        <Text style={styles.header}>TimeTable</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by Subject or Day"
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {isLoading ? (
          <Text>Loading...</Text>
        ) : filteredTimetable().length === 0 ? (
          <Text>No Data Available</Text>
        ) : (
          <FlatList
            data={filteredTimetable()}
            refreshing={isLoading}
            onRefresh={refetch}
            keyExtractor={item => item.day}
            renderItem={renderItem}
            contentContainerStyle={{flexGrow: 1}} // Ensure it takes full height for scrolling
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

export default TimeTable;

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensure it can expand to fill available space
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 8,
    backgroundColor: AppColors.blue10,
    borderRadius: 8,
    marginVertical: 8,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    fontWeight: 'bold',
    backgroundColor: AppColors.blue10,
    borderRadius: 8,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dayHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    padding: 8,
    textAlign: 'center',
    borderRadius: 8,
    backgroundColor: AppColors.blue10,
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
