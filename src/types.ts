export interface ISVGComponentProps {
  color?: string;
  height?: number;
  width?: number;
}

type IData = string;
type IState = { name: string };

export type IApbDropDownModal = IData | IState;

// Define IUserInformation if it's not already defined
export interface IUserInformation {
  name: string;
  email: string;
  password: string;
  contact: string;
  category: string;
}

// Define the other response types if not already defined
export interface IResponseUser {
  user: {
    email: string;
    password: string;
  };
  token: string;
}

export interface IResponseUserUpdate {
  // Define the fields returned after updating a user
  success: boolean;
  updatedUser: IUserInformation;
}

export interface ISignUpFormValues {
  name: string;
  email: string;
  contact: string;
  password: string;
  role?: string; // Add the role if needed
}