import {useMutation, useQuery} from '@tanstack/react-query';
import {ApiManager} from './api-manager';

export const useGetAllRooms = () => {
  return useQuery({
    queryKey: ['allRooms'],
    queryFn: async () => await ApiManager.get<any>('rooms'),
  });
};

export const useCreateRoom = () => {
  return useMutation({
    mutationFn: async ({buildingName, floorNumber, roomNumber}: any) =>
      await ApiManager.post<any>('rooms', {
        buildingName,
        floorNumber,
        roomNumber,
      }),
  });
};
