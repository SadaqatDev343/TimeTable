import * as yup from 'yup';

export const SchemaForEMS = yup.object().shape({
  longitude: yup.string().required('Longitude is required'),
  latitude: yup.string().required('Latitude is required'),
  city: yup.string().required('City is required'),
  name: yup.string().required('Name is required'),
  zipcode: yup.number().required('ZipCode is required').positive().integer(),
  telePhone: yup.string().required('TelePhone No is required'),
});

export const SchemaForHospital = yup.object().shape({
  longitude: yup.string().required('Longitude is required'),
  latitude: yup.string().required('Latitude is required'),
  city: yup.string().required('City is required'),
  name: yup.string().required('Name is required'),
  zipcode: yup.number().required('ZipCode is required').positive().integer(),
  fips: yup.string().required('fips is required'),
  cbsa2020: yup.string().required('cbsa2020 is required'),
  rucaCode: yup.string().required('rucaCode is required'),
  forhpRural_Urban2020: yup
    .string()
    .required('forhpRural_Urban2020 is required'),
  phoneNumber: yup.string().required('phoneNumber is required'),
  certifiedBeds_POS: yup.string().required('certifiedBeds_POS is required'),
  totalBeds_POSL: yup.string().required('totalBeds_POSL is required'),
  beds_PSF: yup.string().required('beds_PSF is required'),
  acuteBeds_HCRIS: yup.string().required('acuteBeds_HCRIS is required'),
});

export const SchemaForNursingHome = yup.object().shape({
  longitude: yup.string().required('Longitude is required'),
  latitude: yup.string().required('Latitude is required'),
  city: yup.string().required('City is required'),
  name: yup.string().required('Name is required'),
  zipcode: yup.number().required('ZipCode is required').positive().integer(),
  phoneNumber: yup.string().required('phoneNumber is required'),
  certifiedBeds: yup.string().required('certified Beds is required'),
});
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
