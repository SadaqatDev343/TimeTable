
import axios from 'axios';
import { ISignUpFormValues } from '../types';

export const signupUser = async (userData: ISignUpFormValues): Promise<any> => {
  const response = await axios.post('http://192.168.100.28:3000/user/register', userData);
  return response.data;
};
