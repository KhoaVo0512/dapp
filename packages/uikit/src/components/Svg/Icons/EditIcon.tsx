import React from "react";
import styled from "styled-components";
import Svg from "../Svg";
import { SvgProps } from "../types";

const CsSvg = styled(Svg)`
  fill: transparent;
`

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <CsSvg width="25" height="24" viewBox="0 0 25 24" fill="transparent" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M11.7896 2H9.78961C4.78961 2 2.78961 4 2.78961 9V15C2.78961 20 4.78961 22 9.78961 22H15.7896C20.7896 22 22.7896 20 22.7896 15V13" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16.8296 3.01928L8.94961 10.8993C8.64961 11.1993 8.34961 11.7893 8.28961 12.2193L7.85961 15.2293C7.69961 16.3193 8.46961 17.0793 9.55961 16.9293L12.5696 16.4993C12.9896 16.4393 13.5796 16.1393 13.8896 15.8393L21.7696 7.95928C23.1296 6.59928 23.7696 5.01928 21.7696 3.01928C19.7696 1.01928 18.1896 1.65928 16.8296 3.01928Z"
        stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15.6996 4.15039C16.3696 6.54039 18.2396 8.41039 20.6396 9.09039" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    </CsSvg>
  );
};

export default Icon;
