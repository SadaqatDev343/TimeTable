import {useMutation, useQuery} from '@tanstack/react-query';
import {ApiManager} from './api-manager';

export const useGetAllSemesters = (id: string) => {
  return useQuery({
    queryKey: ['allSemesters'],
    queryFn: async () =>
      await ApiManager.get<any>(`semesters/by-discipline/${id}`),
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
