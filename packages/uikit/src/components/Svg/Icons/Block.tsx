import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 24 25" {...props} style={{fill:"none"}}>
<path d="M7.86 2.5H16.14L22 8.36V16.64L16.14 22.5H7.86L2 16.64V8.36L7.86 2.5Z" stroke="#FAF1E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M15 9.5L9 15.5" stroke="#FAF1E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M9 9.5L15 15.5" stroke="#FAF1E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  );
};

export default Icon;
