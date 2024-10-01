import {yupResolver} from '@hookform/resolvers/yup';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Image, TouchableOpacity, View} from 'react-native';
import {useCreateTimeTable} from '../../../api/timetable'; // Import the create timetable API hook
import {useGetAllTeachers} from '../../../api/teacher'; // Import the teacher fetching API hook
import {AppLogo} from '../../../assets/images';
import {Back} from '../../../assets/svg';
import {
  Button,
  DropDownButton,
  Gradient,
  H1,
  ScreenWrapper,
  TextField,
} from '../../../components';
import AppColors from '../../../utills/Colors';
import {CommonStyles} from '../../../utills/CommonStyle';
import {FontFamily} from '../../../utills/FontFamily';
import {errorMessage, successMessage} from '../../../utills/method';
import {tableSchema} from '../../../utills/YupSchemaEditProfile'; // Update to your actual Yup schema for the table
import styles from './style';
import DropDownModal from '../../../components/drop-down-modal';
import {useGetAllSubjects} from '../../../api/subject';
import {useGetAllRooms} from '../../../api/room';

// Define a type for the teacher data
type Teacher = {
  _id: string;
  name: string;
};

type Subject = {
  _id: string;
  name: string;
};

type Room = {
  _id: string;
  name: string;
};

export default function AddTableScreen({navigation, route}: any) {
  const departmentId = route?.params?.departmentId;
  const disciplineId = route?.params?.disciplineId;
  const semesterId = route?.params?.semesterId;
  const sectionId = route?.params?.sectionId;
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [teacherModalVisible, setTeacherModalVisible] = useState(false);
  const [subjectModalVisible, setSubjectModalVisible] = useState(false);
  const [roomModalVisible, setRoomModalVisible] = useState(false);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);

  // Fetch all teachers
  const {data: teachersData, isLoading: loadingTeachers} = useGetAllTeachers();

  // Fetch all subjects
  const {data: subjectsData, isLoading: loadingSubjects} = useGetAllSubjects();

  // Fetch all rooms
  const {data: roomsData, isLoading: loadingRooms} = useGetAllRooms();

  useEffect(() => {
    if (roomsData?.ok) {
      setRooms(roomsData.response.data.data);
    }
    if (teachersData?.ok) {
      setTeachers(teachersData.response.data.data);
    }
    if (subjectsData?.ok) {
      setSubjects(subjectsData.response.data.data);
    }
  }, [teachersData, subjectsData, roomsData]);

  const toggleTeacherModal = () => setTeacherModalVisible(!teacherModalVisible);
  const toggleSubjectModal = () => setSubjectModalVisible(!subjectModalVisible);
  const toggleRoomModal = () => setRoomModalVisible(!roomModalVisible);

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    mode: 'all',
    defaultValues: {
      day: '',
      startTime: '',
      endTime: '',
    },
    resolver: yupResolver(tableSchema), // Update to your actual Yup schema for the table
  });

  const {mutate, isPending} = useCreateTimeTable();

  const onSubmit = (data: any) => {
    if (!selectedTeacher || !selectedSubject || !selectedRoom) {
      errorMessage('Select teacher, subject, and room first');
      return;
    }

    const payload = {
      department: departmentId,
      discipline: disciplineId,
      semester: semesterId,
      teacher: selectedTeacher._id, // Pass the selected teacher ID
      subject: selectedSubject._id, // Pass the selected subject ID
      room: selectedRoom._id, // Pass the selected room ID
      section: sectionId,
      day: data.day,
      startTime: data.startTime,
      endTime: data.endTime,
    };

    mutate(payload, {
      onSuccess: response => {
        if (response.ok) {
          successMessage('Table created successfully');
          navigation.goBack();
        } else {
          errorMessage('Something went wrong');
        }
      },
    });
  };

  return (
    <Gradient>
      <ScreenWrapper
        paddinTop={0}
        paddingBottom={0}
        scrollEnabled
        transclucent
        statusBarColor={AppColors.transparent}
        barStyle="light-content">
        {/* Back button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Back width={24} height={24} color={AppColors.white} />
        </TouchableOpacity>

        <View style={styles.mainViewContainer}>
          <View style={styles.logo}>
            <Image
              resizeMode="contain"
              source={AppLogo.logo}
              style={styles.imageStyle}
            />
          </View>
          <H1
            center={true}
            textStyles={styles.heading}
            color={AppColors.white}
            size={5}
            fontFam={FontFamily.appFontMedium}>
            Add Table
          </H1>

          {/* Teacher Dropdown */}
          <DropDownButton
            placeHolder="Select Teacher"
            title="Teacher"
            placeholderColor={AppColors.grey10}
            containerStyle={styles.dropdown}
            onPress={toggleTeacherModal}
            value={selectedTeacher?.name || 'Select Teacher'}
          />

          {/* Subject Dropdown */}
          <DropDownButton
            placeHolder="Select Subject"
            title="Subject"
            placeholderColor={AppColors.grey10}
            containerStyle={styles.dropdown}
            onPress={toggleSubjectModal}
            value={selectedSubject?.name || 'Select Subject'}
          />

          {/* Room Dropdown */}
          <DropDownButton
            placeHolder="Select Room"
            title="Room"
            placeholderColor={AppColors.grey10}
            containerStyle={styles.dropdown}
            onPress={toggleRoomModal}
            value={
              selectedRoom
                ? //@ts-ignore
                  `${selectedRoom?.buildingName} - Floor: ${selectedRoom?.floorNumber}, Room: ${selectedRoom?.roomNumber}`
                : 'Select Room'
            }
          />

          {/* Day Input */}
          <TextField
            title="Day"
            control={control}
            name="day"
            returnKeyType="next"
            placeholder="Enter day (e.g., Monday)"
          />

          {/* Start Time Input */}
          <TextField
            title="Start Time"
            control={control}
            name="startTime"
            returnKeyType="next"
            placeholder="Enter start time (e.g., 10:00 AM)"
          />

          {/* End Time Input */}
          <TextField
            title="End Time"
            control={control}
            name="endTime"
            returnKeyType="next"
            placeholder="Enter end time (e.g., 11:00 AM)"
          />

          {/* Submit Button */}
          <Button
            title="Add Table"
            containerStyle={CommonStyles.marginTop_2}
            onPress={handleSubmit(onSubmit)}
            isLoading={isPending}
          />
        </View>

        {/* Teacher Dropdown Modal */}
        <DropDownModal
          isVisible={teacherModalVisible}
          Data={teachers} // Pass teacher data to the dropdown modal
          onClose={toggleTeacherModal}
          onPress={teacher => {
            setSelectedTeacher(teacher);
            toggleTeacherModal();
          }}
        />

        {/* Subject Dropdown Modal */}
        <DropDownModal
          isVisible={subjectModalVisible}
          Data={subjects} // Pass subject data to the dropdown modal
          onClose={toggleSubjectModal}
          onPress={subject => {
            setSelectedSubject(subject);
            toggleSubjectModal();
          }}
        />

        {/* Room Dropdown Modal */}
        <DropDownModal
          isVisible={roomModalVisible}
          Data={rooms} // Pass room data to the dropdown modal
          onClose={toggleRoomModal}
          onPress={room => {
            setSelectedRoom(room);
            toggleRoomModal();
          }}
        />
      </ScreenWrapper>
    </Gradient>
  );
}
