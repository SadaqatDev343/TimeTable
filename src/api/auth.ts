import {useMutation, useQuery} from '@tanstack/react-query';
import {ApiManager} from './api-manager';

export const useUserLogin = () => {
  return useMutation({
    mutationFn: async ({email, password}: any) =>
      await ApiManager.post<any>('user/login', {
        email,
        password,
      }),
  });
};

export const useAdminLogin = () => {
  return useMutation({
    mutationFn: async ({email, password}: any) =>
      await ApiManager.post<any>('user/adminLogin', {
        email,
        password,
      }),
  });
};

export const useGetUserByEmail = (email: string) => {
  return useQuery({
    queryKey: ['user', email],
    queryFn: async () => await ApiManager.get<any>(`user/${email}`),
  });
};

export const useUpdateUserById = () => {
  return useMutation({
    mutationFn: async ({id, name, password, email, contact, role}: any) => {
      return await ApiManager.patch<any>(`user/update/${id}`, {
        name,
        password,
        email,
        contact,
        role,
      });
    },
  });
};

export const useForgetPassword = () => {
  return useMutation({
    mutationFn: async ({email}: any) =>
      await ApiManager.post<any>('user/fogetPassword', {
        email,
      }),
  });
};

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: async ({OTP, email}: any) =>
      await ApiManager.post<any>('user/verifyOTP', {
        OTP,
        email,
      }),
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: async ({email, newPassword}: any) =>
      await ApiManager.post<any>('user/resetPassword', {
        email,
        newPassword,
      }),
  });
};

export const useUserRegister = () => {
  return useMutation({
    mutationFn: async ({name, password, email, contact, role}: any) =>
      await ApiManager.post<any>('user/register', {
        name,
        password,
        email,
        contact,
        role,
      }),
  });
};
