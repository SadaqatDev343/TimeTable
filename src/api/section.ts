import {useMutation, useQuery} from '@tanstack/react-query';
import {ApiManager} from './api-manager';

export const useGetAllSections = () => {
  return useQuery({
    queryKey: ['allSections'],
    queryFn: async () => await ApiManager.get<any>('sections'),
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
