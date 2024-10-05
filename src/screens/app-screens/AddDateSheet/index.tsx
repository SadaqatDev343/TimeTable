import {yupResolver} from '@hookform/resolvers/yup';
import React, {useEffect, useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {useForm} from 'react-hook-form';
import {useGetAllSubjects} from '../../../api/subject';
import {useGetAllRooms} from '../../../api/room';
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
import {dateSheetSchema} from '../../../utills/YupSchemaEditProfile'; // Updated Yup schema for the date sheet
import styles from './style';
import DropDownModal from '../../../components/drop-down-modal';
import {
  useCreateDateSheet,
  useGetDateSheetById,
  useUpdateDateSheetById,
} from '../../../api/datesheet';

// Define a type for the data
type Subject = {
  _id: string;
  name: string;
};

type Room = {
  _id: string;
  name: string;
};

const formattedDate = (dateString: string) => {
  const date = new Date(dateString); // Convert to Date object
  const year = date.getFullYear(); // Get full year
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month and pad it
  const day = String(date.getDate()).padStart(2, '0'); // Get day and pad it
  return `${year}-${month}-${day}`; // Return formatted date
};

export default function AddDateSheetScreen({navigation, route}: any) {
  const departmentId = route?.params?.departmentId;
  const disciplineId = route?.params?.disciplineId;
  const semesterId = route?.params?.semesterId;
  const sectionId = route?.params?.sectionId;
  const datesheetId = route?.params?.datesheetId;

  const {data, isLoading} = useGetDateSheetById(datesheetId);

  const {mutate: useUpdateDateSheet, isPending: isUpdating} =
    useUpdateDateSheetById();

  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [selectedExamType, setSelectedExamType] = useState<string | null>(null);

  const [subjectModalVisible, setSubjectModalVisible] = useState(false);
  const [roomModalVisible, setRoomModalVisible] = useState(false);
  const [examTypeModalVisible, setExamTypeModalVisible] = useState(false);

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);

  const examTypes = [
    {_id: 'midterm', name: 'Midterm'},
    {_id: 'final', name: 'Final Term'},
  ];

  // Fetch all subjects and rooms
  const {data: subjectsData, isLoading: loadingSubjects} = useGetAllSubjects();
  const {data: roomsData, isLoading: loadingRooms} = useGetAllRooms();

  useEffect(() => {
    if (roomsData?.ok) {
      setRooms(roomsData.response.data.data);
    }
    if (subjectsData?.ok) {
      setSubjects(subjectsData.response.data.data);
    }
  }, [subjectsData, roomsData]);

  const toggleSubjectModal = () => setSubjectModalVisible(!subjectModalVisible);
  const toggleRoomModal = () => setRoomModalVisible(!roomModalVisible);
  const toggleExamTypeModal = () =>
    setExamTypeModalVisible(!examTypeModalVisible);

  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors, isValid},
  } = useForm({
    mode: 'all',
    defaultValues: {
      examDate: '',
      startTime: '',
      endTime: '',
    },
    resolver: yupResolver(dateSheetSchema), // Updated Yup schema for date sheet
  });

  useEffect(() => {
    if (data?.ok) {
      const datesheet = data.response.data;
      setSelectedSubject(datesheet.subject);
      setSelectedExamType(datesheet.examType);
      setSelectedRoom(datesheet.room);
      setValue('examDate', formattedDate(datesheet.examDate));
      setValue('startTime', datesheet.startTime);
      setValue('endTime', datesheet.endTime);
    }
  }, [data]);

  const {mutate, isPending} = useCreateDateSheet();

  const onSubmit = (data: any) => {
    if (!selectedSubject || !selectedRoom || !selectedExamType) {
      errorMessage('Select subject, room, and exam type first');
      return;
    }

    const payload = {
      department: departmentId,
      discipline: disciplineId,
      semester: semesterId,
      section: sectionId,
      subject: selectedSubject._id,
      room: selectedRoom._id,
      examDate: data.examDate,
      startTime: data.startTime,
      endTime: data.endTime,
      examType: selectedExamType,
    };

    if (datesheetId) {
      // If disciplineId exists, update the discipline
      useUpdateDateSheet(
        {id: datesheetId, payload},
        {
          onSuccess: response => {
            if (response.ok) {
              successMessage('Discipline updated successfully');
              navigation.goBack();
            } else {
              errorMessage('Something went wrong');
            }
          },
        },
      );
    } else {
      mutate(payload, {
        onSuccess: response => {
          if (response.ok) {
            successMessage('Date sheet created successfully');
            navigation.goBack();
          } else {
            errorMessage('Something went wrong');
          }
        },
      });
    }
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
            {datesheetId ? 'Update Date Sheet' : 'Add Date Sheet'}
          </H1>

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

          {/* Exam Type Dropdown */}
          <DropDownButton
            placeHolder="Select Exam Type"
            title="Exam Type"
            placeholderColor={AppColors.grey10}
            containerStyle={styles.dropdown}
            onPress={toggleExamTypeModal}
            value={selectedExamType || 'Select Exam Type'}
          />

          {/* Exam Date Input */}
          <TextField
            title="Exam Date"
            control={control}
            name="examDate"
            returnKeyType="next"
            placeholder="Enter exam date (e.g., 2023-05-20)"
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
            title={datesheetId ? 'Update Date Sheet' : 'Add Date Sheet'}
            containerStyle={CommonStyles.marginVertical_2}
            onPress={handleSubmit(onSubmit)}
            isLoading={isPending || isUpdating}
          />
        </View>

        {/* Subject Dropdown Modal */}
        <DropDownModal
          isVisible={subjectModalVisible}
          Data={subjects}
          onClose={toggleSubjectModal}
          onPress={subject => {
            setSelectedSubject(subject);
            toggleSubjectModal();
          }}
        />

        {/* Room Dropdown Modal */}
        <DropDownModal
          isVisible={roomModalVisible}
          Data={rooms}
          onClose={toggleRoomModal}
          onPress={room => {
            setSelectedRoom(room);
            toggleRoomModal();
          }}
        />

        {/* Exam Type Dropdown Modal */}
        <DropDownModal
          isVisible={examTypeModalVisible}
          Data={examTypes}
          onClose={toggleExamTypeModal}
          onPress={examType => {
            setSelectedExamType(examType.name);
            toggleExamTypeModal();
          }}
        />
      </ScreenWrapper>
    </Gradient>
  );
}
