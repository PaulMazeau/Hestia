import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg"

interface Props {
    color: string
  }


function AccueilIcon(props: Props) {
  return (
    <Svg
      width="27"
      height="27"
      viewBox="0 0 48 48"
    >
      <Path
        fill="none"
        stroke={props.color}
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="3"
        d="M8.5 41.5h10a1 1 0 001-1v-10a2 2 0 012-2h5a2 2 0 012 2v10a1 1 0 001 1h10a1 1 0 001-1V21.411a6.001 6.001 0 00-2.287-4.713L24 5.5 9.787 16.698A6.001 6.001 0 007.5 21.411V40.5a1 1 0 001 1z"
      ></Path>
    </Svg>
  );
}

export default AccueilIcon;