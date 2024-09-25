import * as yup from 'yup';

export const authSchema = yup.object().shape({
  name: yup.string().required('Full name is required'),

  contact: yup
    .string()
    .required('Enter Contact Number')
    .matches(
      /^[0-9+()-\s]*$/,
      'Contact number must be valid and can include digits, spaces, and symbols like +, -, ()',
    ),

  email: yup
    .string()
    .required('Email is required')
    .email('Email format is invalid'),

  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password should be at least 6 characters long'),
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
export const resetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
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
export const departmentSchema = yup.object().shape({
  name: yup.string().required('Department name is required'),
  headOfDepartment: yup.string().required('Head of Department is required'),
  description: yup.string(),
  email: yup.string().email('Please enter a valid email'),
  phoneNumber: yup.string().matches(/^[0-9]+$/, 'Phone number must be numeric'),
});
import * as Yup from 'yup';

// Discipline schema validation
export const disciplineSchema = Yup.object().shape({
  name: Yup.string()
    .required('Discipline name is required')
    .min(3, 'Discipline name must be at least 3 characters long'),

  code: Yup.string()
    .required('Discipline code is required')
    .matches(/^[A-Z0-9]+$/, 'Code must be alphanumeric and uppercase'),

  teacher: Yup.string()
    .required('Teacher name is required')
    .min(3, 'Teacher name must be at least 3 characters long'),

  description: Yup.string().optional(), // Description is optional

  department: Yup.string().required('Department selection is required'),

  // Add discipline field validation
  discipline: Yup.string().required('Discipline selection is required'), // Adjust validation as necessary
});
