import {useMutation, useQuery} from '@tanstack/react-query';
import {ApiManager} from './api-manager';

export const useGetAllDepartments = () => {
  return useQuery({
    queryKey: ['allDepartments'],
    queryFn: async () => await ApiManager.get<any>('departments'),
  });
};

export const useCreateDepartment = () => {
  return useMutation({
    mutationFn: async ({
      name,
      headOfDepartment,
      description,
      email,
      phoneNumber,
    }: any) =>
      await ApiManager.post<any>('departments', {
        name,
        headOfDepartment,
        description,
        email,
        phoneNumber,
      }),
  });
};
