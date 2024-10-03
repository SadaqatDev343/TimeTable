import {useMutation, useQuery} from '@tanstack/react-query';
import {ApiManager} from './api-manager';

export const useGetAllTimeTable = (id: string) => {
  return useQuery({
    queryKey: ['allTimeTable', id],
    queryFn: async () =>
      await ApiManager.get<any>(`timetable/by-section/${id}`),
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
