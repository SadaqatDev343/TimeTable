import {StyleSheet, Text, View, SectionList, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScreenWrapper} from '../../../components';
import {useGetAllDateSheet} from '../../../api/datesheet';
import AppColors from '../../../utills/Colors';
import {height} from '../../../utills/Diamension';

const DateSheetView = ({route}: any) => {
  const sectionId = route.params.sectionId;
  const {data, isLoading} = useGetAllDateSheet(sectionId);
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
    );
  };

  // Render section header
  const renderSectionHeader = ({section}: any) => {
    return <Text style={styles.sectionHeader}>{section.title}</Text>;
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
            sections={filteredData()}
            renderItem={renderDateSheetItem}
            renderSectionHeader={renderSectionHeader}
            keyExtractor={(item, index) => item._id + index}
            contentContainerStyle={styles.list}
          />
        )}
      </View>
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
});
