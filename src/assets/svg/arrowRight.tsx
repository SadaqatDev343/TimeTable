import React from 'react';
import Svg, {Path} from 'react-native-svg';
import { ISVGComponentProps } from '../../types';

const ArrowRight: React.FC<ISVGComponentProps> = ({
  height = 24,
  width = 14,
  color = 'white',
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 32" fill="none">
      <Path
        d="M3.8147e-06 3.75169L12.258 15.9647L3.8147e-06 28.1797L3.774 31.9297L19.832 15.9647L3.774 -0.000312805L3.8147e-06 3.75169Z"
        fill={color}
      />
    </Svg>
  );
};
export default ArrowRight;
