import {useMutation, useQuery} from '@tanstack/react-query';
import {ApiManager} from './api-manager';

export const useGetAllDateSheet = (id: string) => {
  return useQuery({
    queryKey: ['allDateSheet'],
    queryFn: async () =>
      await ApiManager.get<any>(`datesheet/by-section/${id}`),
  });
};

export const useCreateDateSheet = () => {
  return useMutation({
    mutationFn: async ({
      department,
      discipline,
      semester,
      section,
      subject,
      room,
      examDate,
      startTime,
      endTime,
      examType,
    }: any) =>
      await ApiManager.post<any>('datesheet', {
        department,
        discipline,
        semester,
        section,
        subject,
        room,
        examDate,
        startTime,
        endTime,
        examType,
      }),
  });
};
