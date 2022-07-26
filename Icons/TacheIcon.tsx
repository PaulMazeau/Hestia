import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg"

interface Props {
    color: string
  }

function TacheIcon(props: Props) {
  return (
    <Svg
      width='23'
      height='23'
      fill="none"
      viewBox="0 0 16 18"
    >
      <Path
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M4.75 3.313H3.396c-1.197 0-2.167.97-2.167 2.166v9.209c0 1.196.97 2.166 2.167 2.166h9.208c1.197 0 2.167-.97 2.167-2.166V5.479c0-1.196-.97-2.167-2.167-2.167H11.25"
      ></Path>
      <Path
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M10.167 4.937H5.833A1.083 1.083 0 014.75 3.854V2.23c0-.598.485-1.083 1.083-1.083h4.334c.598 0 1.083.485 1.083 1.083v1.625c0 .598-.485 1.083-1.083 1.083zM5.563 9.27h4.875M5.563 12.52h4.875"
      ></Path>
    </Svg>
  );
}

export default TacheIcon;
