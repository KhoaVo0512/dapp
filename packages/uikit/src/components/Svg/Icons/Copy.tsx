import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <Svg viewBox="0 0 16 16" {...props}>
      <path d="M11 12H1C0.447 12 0 11.553 0 11V1C0 0.448 0.447 0 1 0H11C11.553 0 12 0.448 12 1V11C12 11.553 11.553 12 11 12Z"/>
      <path d="M15 16H4V14H14V4H16V15C16 15.553 15.553 16 15 16Z"/>
    </Svg>
  );
};

export default Icon;
