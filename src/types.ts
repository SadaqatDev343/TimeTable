import {ViewStyle} from 'react-native';

export interface ISVGComponentProps {
  color?: string;
  height?: number;
  width?: number;
}
type IData = string;
type IState = {name: string};

export type IApbDropDownModal = IData | IState;

export interface ICardProps {
  title: string;
  onPress?: () => void;
  onLongPress?: () => void;
  Icon?: React.ReactElement;
  containerStyle?: ViewStyle | ViewStyle[];
}
