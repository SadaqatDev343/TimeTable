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
  headOfDepartment: yup.string().required('Head of Department is required'),
  description: yup.string().optional(),
  email: yup.string().email('Please enter a valid email').optional(),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]*$/, 'Phone number must be numeric')
    .nullable()
    .optional(),
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
  description: Yup.string().optional(),
});

export const sectionSchema = Yup.object().shape({
  name: Yup.string()
    .required('Section name is required')
    .min(3, 'Section name must be at least 3 characters long'),

  code: Yup.string()
    .required('Section code is required')
    .matches(/^[A-Z0-9]+$/, 'Code must be alphanumeric and uppercase'),

  capacity: Yup.number().required('Capacity is required'),
  description: Yup.string().optional(),
});

export const semesterSchema = Yup.object().shape({
  name: Yup.string()
    .required('Semester name is required')
    .min(3, 'Semester name must be at least 3 characters long'),

  code: Yup.string()
    .required('Semester code is required')
    .matches(/^[A-Z0-9]+$/, 'Code must be alphanumeric and uppercase'),

  description: Yup.string().optional(),
});

export const teacherSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name must be less than 50 characters'),

  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format'),

  phoneNumber: Yup.string()
    .required('Phone number is required')
    .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'), // Adjust the format if needed

  subjectTaught: Yup.string()
    .required('Subject taught is required')
    .min(3, 'Subject must be at least 3 characters')
    .max(100, 'Subject must be less than 100 characters'),

  designation: Yup.string()
    .required('Designation is required')
    .min(3, 'Designation must be at least 3 characters')
    .max(100, 'Designation must be less than 100 characters'),

  password: Yup.string()
    .optional() // Password is optional according to the DTO
    .min(6, 'Password must be at least 6 characters') // Add this rule only if password is provided
    .max(50, 'Password must be less than 50 characters'),
});

export const roomSchema = Yup.object().shape({
  buildingName: Yup.string().required('Building Name is required'),
  floorNumber: Yup.string().required('Floor Number is required'),
  roomNumber: Yup.string().required('Room Number is required'),
});

export const subjectSchema = Yup.object().shape({
  courseCode: Yup.string()
    .required('Course Code is required')
    .min(4, 'Course Code must be at least 4 characters')
    .max(10, 'Course Code must not exceed 10 characters'),
  name: Yup.string()
    .required('Subject Name is required')
    .min(3, 'Subject Name must be at least 3 characters')
    .max(50, 'Subject Name must not exceed 50 characters'),
  credits: Yup.number()
    .required('Credits are required')
    .min(1, 'Credits must be at least 1')
    .max(10, 'Credits must not exceed 10'),
});

export const tableSchema = Yup.object().shape({
  day: Yup.string()
    .required('Day is required')
    .min(3, 'Day must be at least 3 characters')
    .max(20, 'Day must not exceed 20 characters'),
  startTime: Yup.string()
    .required('Start time is required')
    .matches(
      /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/,
      'Start time must be in format HH:MM AM/PM',
    ),
  endTime: Yup.string()
    .required('End time is required')
    .matches(
      /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/,
      'End time must be in format HH:MM AM/PM',
    ),
});
