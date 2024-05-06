const enum ScreenNames {
  CREATE_PASSWORD = 'CreatePassword',
  LOGIN = 'Login',
  DASHBOARD = 'Dashboard',
  FORGET_PASSWORD = 'ForgotPassword',
  Admin_LOGIN = 'AdminLogin',
  SIGNUP = 'Signup',
  VERIFY_OTP = 'VerifyOtp',
  CONTACT_US = 'contactUs',
  USER = 'user',
  ADMIN = 'admin',
}

export default ScreenNames;
export type RootStackParamList = {
  [ScreenNames.CREATE_PASSWORD]: undefined;
  [ScreenNames.LOGIN]: undefined;
  [ScreenNames.DASHBOARD]: undefined;
  [ScreenNames.FORGET_PASSWORD]: undefined;
  [ScreenNames.Admin_LOGIN]: undefined;
  [ScreenNames.SIGNUP]: undefined;
  [ScreenNames.VERIFY_OTP]: undefined;
  [ScreenNames.CONTACT_US]: undefined;
  [ScreenNames.USER]: undefined;
  [ScreenNames.ADMIN]: undefined;
};
