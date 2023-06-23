import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg width="16" height="18" viewBox="0 0 12 14" style={{fill:"none"}} {...props} >
<path d="M10.8648 5.43914C10.8648 8.68414 8.96323 11.6696 5.9324 13C2.98594 11.702 1 8.76851 1 5.43914V3.04433L5.9324 1L10.8648 3.04433V5.43914Z" stroke="#5155F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  );
};

export default Icon;
