import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useGetAllTimeTable} from '../../../api/timetable';
import {ScreenWrapper} from '../../../components';

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

const TimeTable = ({route}: any) => {
  const sectionId = route.params.sectionId;
  const {data, isLoading, refetch} = useGetAllTimeTable(sectionId);
  const [groupedTimetable, setGroupedTimetable] = useState<any>([]);

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (data?.ok) {
      const groupedData = groupByDay(data.response.data.data);
      setGroupedTimetable(groupedData);
    }
  }, [data]);

  const renderItem = ({item}: any) => (
    <View>
      <Text style={styles.dayHeader}>{item.day}</Text>
      {item.items.map((entry: any) => (
        <View key={entry._id} style={styles.row}>
          <Text style={styles.cell}>
            {entry.startTime} - {entry.endTime}
          </Text>
          <Text style={styles.cell}>{entry.subject.name}</Text>
          <Text style={styles.cell}>{entry.teacher.name}</Text>
          <Text style={styles.cell}>
            {entry.room.buildingName} Room {entry.room.roomNumber}
          </Text>
        </View>
      ))}
    </View>
  );

  return (
    <ScreenWrapper
      statusBarColor="#3333ff"
      backgroundColor="#3333ff"
      barStyle="light-content">
      <View style={styles.container}>
        <Text style={styles.header}>TimeTable</Text>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : groupedTimetable.length === 0 ? (
          <Text>No Data Available</Text>
        ) : (
          <FlatList
            data={groupedTimetable}
            keyExtractor={item => item.day}
            renderItem={renderItem}
            ListHeaderComponent={() => (
              <View style={styles.headerRow}>
                <Text style={styles.headerCell}>Time</Text>
                <Text style={styles.headerCell}>Subject</Text>
                <Text style={styles.headerCell}>Teacher</Text>
                <Text style={styles.headerCell}>Room</Text>
              </View>
            )}
            contentContainerStyle={{flexGrow: 1}} // Ensure it takes full height for scrolling
          />
        )}
      </View>
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
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    paddingVertical: 8,
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
  },
});
