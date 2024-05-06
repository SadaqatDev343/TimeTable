import * as yup from 'yup';

export const authSchema = yup.object().shape({
  name: yup.string().required('Full name is required'),
  email: yup
    .string()
    .required('Email is required')
    .email('Email format is invalid'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password should be atleast 6 characters long'),
});
export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .email('Email format is invalid'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password should be atleast 6 characters long'),
});
export const forgetPassSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .email('Email format is invalid'),
});
export const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password should be atleast 6 characters long'),
  confirmPassword: yup
    .string()
    .required('Confirm passwrod is required')
    //@ts-ignore
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});
export const changePasswordSchema = yup.object().shape({
  currentpassword: yup
    .string()
    .required('Current Password is required')
    .min(6, 'Password should be atleast 6 characters long'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password should be atleast 6 characters long'),
  confirmPassword: yup
    .string()
    .required('Confirm passwrod is required')
    //@ts-ignore
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});
