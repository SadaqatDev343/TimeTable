import {useMutation, useQuery} from '@tanstack/react-query';
import {ApiManager} from './api-manager';

export const useGetAllSemesters = (id: string) => {
  return useQuery({
    queryKey: ['allSemesters', id],
    queryFn: async () =>
      await ApiManager.get<any>(`semesters/by-discipline/${id}`),
  });
};

export const useDeleteSemesterById = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      return await ApiManager.delete<any>(`semesters/${id}`);
    },
  });
};

export const useGetSemesterById = (id: string) => {
  return useQuery({
    queryKey: ['allSemester', id],
    queryFn: async () => await ApiManager.get<any>(`semesters/${id}`),
  });
};

export const useUpdateSemesterById = () => {
  return useMutation({
    mutationFn: async ({id, payload}: any) => {
      const {name, code, discipline, description, department} = payload;
      return await ApiManager.patch<any>(`semesters/${id}`, {
        name,
        code,
        discipline,
        description,
        department,
      });
    },
  });
};

export const useCreateSemester = () => {
  return useMutation({
    mutationFn: async ({
      name,
      code,
      discipline,
      description,
      department,
    }: any) =>
      await ApiManager.post<any>('semesters', {
        name,
        code,
        description,
        department,
        discipline,
      }),
  });
};
