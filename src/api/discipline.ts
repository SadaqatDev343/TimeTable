import {useMutation, useQuery} from '@tanstack/react-query';
import {ApiManager} from './api-manager';

export const useGetAllDisciplines = () => {
  return useQuery({
    queryKey: ['allDisciplines'],
    queryFn: async () => await ApiManager.get<any>('disciplines'),
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
