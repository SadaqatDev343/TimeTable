import React from 'react';
import Svg, {Path} from 'react-native-svg';
import { ISVGComponentProps } from '../../types';

const RightArrowSvg: React.FC<ISVGComponentProps> = ({
  color = '#fff',
  height = 31.69,
  width = 31.69,
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 7 12" fill="none">
      <Path
        d="M1 0.5L6 6L1 11.5"
        stroke="white"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
export default RightArrowSvg;
