import React from 'react';
import Svg, {Rect} from 'react-native-svg';
import { ISVGComponentProps } from '../../types';

const UnCheckBox: React.FC<ISVGComponentProps> = ({
  height = 16,
  width = 16,
  color = '#FFFFFF',
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 21 21" fill="none">
      <Rect x="0.5" y="0.5" width="20" height="20" stroke={color} />
    </Svg>
  );
};
export default UnCheckBox;
