import {useMutation, useQuery} from '@tanstack/react-query';
import {ApiManager} from './api-manager';

export const useGetAllDisciplines = (id: string) => {
  return useQuery({
    queryKey: ['allDisciplines'],
    queryFn: async () =>
      await ApiManager.get<any>(`disciplines/by-department/${id}`),
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
