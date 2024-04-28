import React from 'react';
import Svg, {G, Path} from 'react-native-svg';
import AppColors from '../../utills/Colors';
import {ISVGComponentProps} from '../../types';

const Back: React.FC<ISVGComponentProps> = ({
  height = 22,
  width = 22,
  color = AppColors.black,
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 26.000000 26.000000"
      preserveAspectRatio="xMidYMid meet">
      <G
        transform="translate(0.000000,26.000000) scale(0.100000,-0.100000)"
        fill={color}
        stroke="none">
        <Path
          d="M105 190 l-59 -60 59 -60 c63 -64 72 -69 82 -44 4 10 -9 31 -38 60
l-43 44 43 44 c29 29 42 50 38 60 -10 25 -19 20 -82 -44z"
        />
      </G>
    </Svg>
  );
};
export default Back;
