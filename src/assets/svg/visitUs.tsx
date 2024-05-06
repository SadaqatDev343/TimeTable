import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {ISVGComponentProps} from '../../types';

const VisitUs: React.FC<ISVGComponentProps> = ({
  color = '#fff',
  height = 31.69,
  width = 31.69,
}) => {
  return (
    <Svg
      id="near_me-filled"
      width={width}
      height={height}
      viewBox="0 0 31.69 31.69">
      <Path
        id="Path_6230"
        data-name="Path 6230"
        d="M26.768,3a,3,12.943v1.294l9.032,3.5,3.486,9.032h1.294Z"
        transform="translate(0.961 0.961)"
        fill={color}
      />
    </Svg>
  );
};
export default VisitUs;
