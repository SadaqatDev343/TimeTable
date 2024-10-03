const enum ScreenNames {
  CREATE_PASSWORD = 'CreatePassword',
  LOGIN = 'Login',
  DASHBOARD = 'Dashboard',
  FORGET_PASSWORD = 'ForgotPassword',
  Admin_LOGIN = 'AdminLogin',
  SIGNUP = 'Signup',
  VERIFY_OTP = 'VerifyOtp',
  CONTACT_US = 'ContactUs',
  USERHOMESCREEN = 'User',
  ADMINHOMESCREEN = 'Admin',
  DESCIPLINESCREEN = 'Descipline',
  SEMESTERSCREEN = 'semester',
  SECTIONSCREEN = 'section',
  DRAWER = 'Drawer',
  PROFILE = 'user_profile',
  ADD_DEPARTMENT = 'Add_department',
  ADD_DISCIPLINE = 'Add_discipline',
  ADD_SECTION = 'Add_section',
  ADD_SEMESTER = 'Add_semester',
  VIEWTABLE = 'View_table',
  ADD_TABLE = 'Add_table',
  VIEW_TABLE = 'VIEW_TABLE',
  CREATE_DATESHEET = 'CREATE_DATESHEET',
  VIEW_DATESHEET = 'VIEW_DATESHEET',
  EDIT_DEPARTMENT = 'EDIT_DEPARTMENT',
  EDIT_DISCIPLINE = 'EDIT_DISCIPLINE',
}

export default ScreenNames;
export type RootStackParamList = {
  [ScreenNames.CREATE_PASSWORD]: {email: string};
  [ScreenNames.LOGIN]: undefined;
  [ScreenNames.DASHBOARD]: undefined;
  [ScreenNames.FORGET_PASSWORD]: undefined;
  [ScreenNames.Admin_LOGIN]: undefined;
  [ScreenNames.SIGNUP]: undefined;
  [ScreenNames.VERIFY_OTP]: {email: string};
  [ScreenNames.CONTACT_US]: undefined;
  [ScreenNames.USERHOMESCREEN]: undefined;
  [ScreenNames.ADMINHOMESCREEN]: undefined;
  [ScreenNames.DESCIPLINESCREEN]: undefined;
  [ScreenNames.SEMESTERSCREEN]: undefined;
  [ScreenNames.SECTIONSCREEN]: undefined;
  [ScreenNames.DRAWER]: {role: 'admin' | 'notAdmin'};
  [ScreenNames.PROFILE]: undefined;
  [ScreenNames.ADD_DEPARTMENT]: undefined;
  [ScreenNames.ADD_DISCIPLINE]: undefined;
  [ScreenNames.ADD_SECTION]: undefined;
  [ScreenNames.ADD_SEMESTER]: undefined;
  [ScreenNames.VIEWTABLE]: undefined;
  [ScreenNames.ADD_TABLE]: undefined;
  [ScreenNames.VIEW_TABLE]: undefined;
  [ScreenNames.CREATE_DATESHEET]: undefined;
  [ScreenNames.VIEW_DATESHEET]: undefined;
};
