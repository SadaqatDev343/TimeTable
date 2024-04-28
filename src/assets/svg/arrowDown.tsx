import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {ISVGComponentProps} from '../../types';

const ArrowDown: React.FC<ISVGComponentProps> = ({height = 15, width = 15}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 33 20" fill="none">
      <Path
        d="M29.129 0.0478821L16.916 12.3059L4.701 0.0478821L0.950996 3.82188L16.916 19.8799L32.881 3.82188L29.129 0.0478821Z"
        fill="white"
      />
    </Svg>
  );
};
export default ArrowDown;
