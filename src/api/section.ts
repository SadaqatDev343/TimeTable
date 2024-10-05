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

export const useGetSectionById = (id: string) => {
  return useQuery({
    queryKey: ['allSection', id],
    queryFn: async () => await ApiManager.get<any>(`sections/${id}`),
  });
};

export const useUpdateSectionById = () => {
  return useMutation({
    mutationFn: async ({id, payload}: any) => {
      const {
        name,
        code,
        description,
        discipline,
        department,
        semester,
        teacher,
        capacity,
      } = payload;

      return await ApiManager.patch<any>(`sections/${id}`, {
        name,
        code,
        description,
        discipline,
        department,
        semester,
        teacher,
        capacity,
      });
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
