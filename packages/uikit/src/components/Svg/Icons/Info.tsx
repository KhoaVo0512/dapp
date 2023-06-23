import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.86 2.5H16.14L22 8.36V16.64L16.14 22.5H7.86L2 16.64V8.36L7.86 2.5Z" stroke="#FAF1E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M12 8.5V12.5" stroke="#FAF1E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M12 16.5H12.01" stroke="#FAF1E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
    </Svg>
  );
};

export default Icon;
