import {useMutation, useQuery} from '@tanstack/react-query';
import {ApiManager} from './api-manager';

export const useGetAllTeachers = () => {
  return useQuery({
    queryKey: ['allTeachers'],
    queryFn: async () => await ApiManager.get<any>('teachers'),
  });
};

export const useCreateTeacher = () => {
  return useMutation({
    mutationFn: async ({
      name,
      email,
      phoneNumber,
      subjectTaught,
      designation,
      password = '123456',
    }: any) =>
      await ApiManager.post<any>('teachers', {
        name,
        email,
        phoneNumber,
        subjectTaught,
        designation,
        password,
      }),
  });
};
