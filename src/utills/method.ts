import {showMessage} from 'react-native-flash-message';

export const errorMessage = (title: string, msg?: string, right?: boolean) => {
  showMessage({
    message: title,
    description: msg,
    type: 'danger',
  });
};
export const successMessage = (title: string, msg?: string) => {
  showMessage({
    message: title,
    description: msg,
    type: 'success',
  });
};
