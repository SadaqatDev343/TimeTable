import {useMutation, useQuery} from '@tanstack/react-query';
import {ApiManager} from './api-manager';

export const useGetAllDateSheet = (id: string) => {
  return useQuery({
    queryKey: ['allDateSheet', id],
    queryFn: async () =>
      await ApiManager.get<any>(`datesheet/by-section/${id}`),
  });
};

export const useDeleteDateSheetById = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      return await ApiManager.delete<any>(`datesheet/${id}`);
    },
  });
};

export const useGetDateSheetById = (id: string) => {
  return useQuery({
    queryKey: ['allDateSheet', id],
    queryFn: async () => await ApiManager.get<any>(`datesheet/${id}`),
  });
};

export const useUpdateDateSheetById = () => {
  return useMutation({
    mutationFn: async ({id, payload}: any) => {
      const {
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
      } = payload;

      return await ApiManager.patch<any>(`datesheet/${id}`, {
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
      });
    },
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
