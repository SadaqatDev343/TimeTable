import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {AxiosError, AxiosResponse} from 'axios';
import {getBaseUrl} from '../utills/configuration';

const BASE_URL = getBaseUrl();
axios.defaults.baseURL = BASE_URL;
axios.interceptors.response.use(
  // @ts-ignore
  function (response) {
    return {ok: true, response};
  },
  function (error) {
    if (error?.response?.status === 401) {
      console.log('error occur');
    }
    return {ok: false, data: error?.response?.data, error};
  },
);

axios.interceptors.request.use(
  async config => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers['x-auth-access'] = token;
      }
    } catch (error) {
      console.error('Error retrieving user token:', error);
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  },
);
type ErrorData = {
  message: string | undefined;
  error: string;
};
type IResponse<R> =
  | {ok: true; response: AxiosResponse<R>}
  | {ok: false; error: AxiosError<R>; data: ErrorData};

export const ApiManager = {
  get: async <R>(endpoint: string, params: Record<string, any> = {}) => {
    return axios.get(endpoint, {params}) as unknown as IResponse<R>;
  },
  post: async <R>(
    endpoint: string,
    body: Record<string, any>,
    params: Record<string, any> = {},
  ) => {
    return axios.post(endpoint, body, {params}) as unknown as IResponse<R>;
  },
  put: async <R>(
    endpoint: string,
    body: Record<string, any>,
    params: Record<string, any> = {},
    headers: Record<string, string> = {},
  ) => {
    return axios.put(endpoint, body, {
      params,
      headers,
    }) as unknown as IResponse<R>;
  },
  patch: async <R>(
    endpoint: string,
    body?: Record<string, any>,
    params: Record<string, any> = {},
  ) => {
    return axios.patch(endpoint, body, {params}) as unknown as IResponse<R>;
  },
  delete: async <R>(endpoint: string, params: Record<string, any> = {}) => {
    return axios.delete(endpoint, {params}) as unknown as IResponse<R>;
  },
};
