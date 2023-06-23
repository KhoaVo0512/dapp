import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <Svg width="16" height="15" viewBox="0 0 16 15" {...props}>
      <path fill="none" d="M14.2312 9.375V5.625C14.2312 2.5 12.9812 1.25 9.8562 1.25H6.1062C2.9812 1.25 1.7312 2.5 1.7312 5.625V9.375C1.7312 12.5 2.9812 13.75 6.1062 13.75H9.8562C12.9812 13.75 14.2312 12.5 14.2312 9.375Z" stroke="#777E91" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12.825 2.03125L2.5437 12.3125" stroke="#777E91" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10.5376 11.25V8.125" stroke="#777E91" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12.0625 9.6875H8.9375" stroke="#777E91" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7.0625 4.6875H3.9375" stroke="#777E91" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  );
};

export default Icon;
