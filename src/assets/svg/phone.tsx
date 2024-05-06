import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {ISVGComponentProps} from '../../types';

const Phone: React.FC<ISVGComponentProps> = ({
  color = '#fff',
  height = 31.69,
  width = 31.69,
}) => {
  return (
    <Svg
      id="call-filled"
      width={width}
      height={height}
      viewBox="0 0 31.69 31.69">
      <Path
        id="Path_6226"
        data-name="Path 6226"
        d="M25.46,19.347a15.109,15.109,0,0,1-4.661-.739,1.29,1.29,0,0,0-1.334.317l-2.073,2.6a20.048,20.048,0,0,1-9.1-9.018l2.575-2.192a1.348,1.348,0,0,0,.317-1.347,14.726,14.726,0,0,1-.739-4.661A1.319,1.319,0,0,0,9.14,3H4.571C3.858,3,3,3.317,3,4.307a22.648,22.648,0,0,0,22.46,22.46,1.386,1.386,0,0,0,1.307-1.558V20.654a1.319,1.319,0,0,0-1.307-1.307Z"
        transform="translate(0.961 0.961)"
        fill={color}
      />
    </Svg>
  );
};
export default Phone;
