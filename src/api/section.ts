import {useMutation, useQuery} from '@tanstack/react-query';
import {ApiManager} from './api-manager';

export const useGetAllSections = (id: string) => {
  return useQuery({
    queryKey: ['allSections', id],
    queryFn: async () =>
      await ApiManager.get<any>(`sections/by-semester/${id}`),
  });
};

export const useDeleteSectionById = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      return await ApiManager.delete<any>(`sections/${id}`);
    },
  });
};

export const useCreateSection = () => {
  return useMutation({
    mutationFn: async ({
      name,
      code,
      description,
      discipline,
      department,
      semester,
      teacher,
      capacity,
    }: any) =>
      await ApiManager.post<any>('sections', {
        name,
        code,
        description,
        discipline,
        department,
        semester,
        teacher,
        capacity,
      }),
  });
};
