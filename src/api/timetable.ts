import {useMutation, useQuery} from '@tanstack/react-query';
import {ApiManager} from './api-manager';

export const useGetAllTimeTable = () => {
  return useQuery({
    queryKey: ['allTimeTable'],
    queryFn: async () => await ApiManager.get<any>('timetable'),
  });
};

export const useCreateTimeTable = () => {
  return useMutation({
    mutationFn: async ({
      department,
      discipline,
      semester,
      section,
      teacher,
      subject,
      room,
      day,
      startTime,
      endTime,
    }: any) =>
      await ApiManager.post<any>('timetable', {
        department,
        discipline,
        semester,
        section,
        teacher,
        subject,
        room,
        day,
        startTime,
        endTime,
      }),
  });
};
