import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg"

interface Props {
    color: string
  }

function DepenseIcon(props: Props) {
  return (
    <Svg
    width='23'
    height='23'
      fill="none"
      viewBox="0 0 22 21"
    >
      <Path
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M15.333 1.25v4.12a6.52 6.52 0 012.88 3.463h1.453a1.083 1.083 0 011.083 1.084v2.166a1.083 1.083 0 01-1.083 1.084h-1.454a6.507 6.507 0 01-1.796 2.679v2.196a1.625 1.625 0 11-3.25 0v-.632c-.358.06-.72.09-1.084.09H7.75c-.363 0-.725-.03-1.083-.09v.632a1.625 1.625 0 01-3.25 0V15.845A6.5 6.5 0 017.75 4.5h2.708l4.875-3.25h.001z"
      ></Path>
    </Svg>
  );
}

export default DepenseIcon;
