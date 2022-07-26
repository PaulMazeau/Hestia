import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg"

interface Props {
    color: string
  }

function CourseIcon(props: Props) {
  return (
    <Svg
      width='23'
      height='23'
      fill="none"
      viewBox="0 0 18 18"
    >
      <Path
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M4.396 4.396l-.813-3.25H1.146m3.25 3.25h12.458l-1.774 7.538a2.167 2.167 0 01-2.109 1.67h-4.47a2.167 2.167 0 01-2.095-1.612l-2.01-7.596z"
      ></Path>
      <Path
        fill={props.color}
        d="M6.833 17.667a1.083 1.083 0 100-2.167 1.083 1.083 0 000 2.167zM14.417 17.667a1.083 1.083 0 100-2.167 1.083 1.083 0 000 2.167z"
      ></Path>
    </Svg>
  );
}

export default CourseIcon;
