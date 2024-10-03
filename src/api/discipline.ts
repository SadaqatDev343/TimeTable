import {useMutation, useQuery} from '@tanstack/react-query';
import {ApiManager} from './api-manager';

export const useGetAllDisciplines = (id: string) => {
  return useQuery({
    queryKey: ['allDisciplines', id],
    queryFn: async () =>
      await ApiManager.get<any>(`disciplines/by-department/${id}`),
  });
};

export const useDeleteDisciplineById = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      return await ApiManager.delete<any>(`disciplines/${id}`);
    },
  });
};

export const useGetDisciplineById = (id: string) => {
  return useQuery({
    queryKey: ['allDiscipline', id],
    queryFn: async () => await ApiManager.get<any>(`disciplines/${id}`),
  });
};

export const useUpdateDisciplineById = () => {
  return useMutation({
    mutationFn: async ({
      id,
      name,
      code,
      teacher,
      description,
      department,
    }: any) => {
      return await ApiManager.patch<any>(`disciplines/${id}`, {
        name,
        code,
        teacher,
        description,
        department,
      });
    },
  });
};

export const useCreateDiscipline = () => {
  return useMutation({
    mutationFn: async ({name, code, teacher, description, department}: any) =>
      await ApiManager.post<any>('disciplines', {
        name,
        code,
        teacher,
        description,
        department,
      }),
  });
};
