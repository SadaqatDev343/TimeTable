import {useMutation, useQuery} from '@tanstack/react-query';
import {ApiManager} from './api-manager';

export const useGetAllSubjects = () => {
  return useQuery({
    queryKey: ['allSubjects'],
    queryFn: async () => await ApiManager.get<any>('subjects'),
  });
};

export const useCreateSubject = () => {
  return useMutation({
    mutationFn: async ({courseCode, name, credits}: any) =>
      await ApiManager.post<any>('subjects', {
        courseCode,
        name,
        credits,
      }),
  });
};
