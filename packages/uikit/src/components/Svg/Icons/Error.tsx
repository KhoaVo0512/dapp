import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 24 25" {...props} style={{fill:"none"}}>
<path d="M10.29 4.3602L1.82002 18.5002C1.64539 18.8026 1.55299 19.1455 1.55201 19.4947C1.55103 19.8439 1.64151 20.1873 1.81445 20.4907C1.98738 20.7941 2.23675 21.047 2.53773 21.2241C2.83871 21.4012 3.18082 21.4964 3.53002 21.5002H20.47C20.8192 21.4964 21.1613 21.4012 21.4623 21.2241C21.7633 21.047 22.0127 20.7941 22.1856 20.4907C22.3585 20.1873 22.449 19.8439 22.448 19.4947C22.4471 19.1455 22.3547 18.8026 22.18 18.5002L13.71 4.3602C13.5318 4.06631 13.2807 3.82332 12.9812 3.65469C12.6817 3.48605 12.3438 3.39746 12 3.39746C11.6563 3.39746 11.3184 3.48605 11.0188 3.65469C10.7193 3.82332 10.4683 4.06631 10.29 4.3602V4.3602Z" stroke="#FAF1E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M12 9.5V13.5" stroke="#FAF1E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M12 17.5H12.01" stroke="#FAF1E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  );
};

export default Icon;
