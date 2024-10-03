import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {ApiManager} from './api-manager';

export const useGetAllDepartments = () => {
  return useQuery({
    queryKey: ['allDepartments'],
    queryFn: async () => await ApiManager.get<any>('departments'),
  });
};

export const useDeleteDepartmentById = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      return await ApiManager.delete<any>(`departments/${id}`);
    },
  });
};

export const useGetDepartmentById = (id: string) => {
  return useQuery({
    queryKey: ['allDepartments', id],
    queryFn: async () => await ApiManager.get<any>(`departments/${id}`),
  });
};

export const useUpdateDepartmentById = () => {
  return useMutation({
    mutationFn: async ({
      name,
      id,
      headOfDepartment,
      description,
      email,
      phoneNumber,
    }: any) => {
      return await ApiManager.put<any>(`departments/${id}`, {
        name,
        headOfDepartment,
        description,
        email,
        phoneNumber,
      });
    },
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
