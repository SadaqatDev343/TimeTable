import React from 'react';
import Svg, {Circle, G, Path} from 'react-native-svg';
import {ISVGComponentProps} from '../../types';
import AppColors from '../../utills/Colors';

const Close: React.FC<ISVGComponentProps> = ({
  height = 29,
  width = 29,
  color = AppColors.black,
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 29 29" fill="none">
      <Path
        d="M20.9489 9.59553L19.7511 8.39771L15.0023 13.1465L10.2535 8.39771L9.05566 9.59553L13.8045 14.3443L9.05566 19.0931L10.2535 20.291L15.0023 15.5422L19.7511 20.291L20.9489 19.0931L16.2001 14.3443L20.9489 9.59553Z"
        fill={color}
      />
    </Svg>
  );
};
export default Close;
