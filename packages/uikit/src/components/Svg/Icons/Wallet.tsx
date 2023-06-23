import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

interface Props extends SvgProps {
    filterColor:string
}

const Icon: React.FC<Props> = ({filterColor, ...props}) => {
  return (
    <Svg width="40" height="40" viewBox="0 0 40 40" fill="none" {...props}>
            <rect width="40" height="40" rx="20" fill={filterColor}/>
            <path fillRule="evenodd" clipRule="evenodd" d="M25.7273 14.5556H14.2727C13.369 14.5556 12.6364 15.252 12.6364 16.1111V23.8889C12.6364 24.748 13.369 25.4444 14.2727 25.4444H25.7273C26.631 25.4444 27.3636 24.748 27.3636 23.8889V16.1111C27.3636 15.252 26.631 14.5556 25.7273 14.5556ZM14.2727 13C12.4653 13 11 14.3929 11 16.1111V23.8889C11 25.6071 12.4653 27 14.2727 27H25.7273C27.5347 27 29 25.6071 29 23.8889V16.1111C29 14.3929 27.5347 13 25.7273 13H14.2727Z" fill="#FCFCFD"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M20 20C20 17.7909 22.0147 16 24.5 16H28.1C28.5971 16 29 16.3582 29 16.8C29 17.2418 28.5971 17.6 28.1 17.6H24.5C23.0088 17.6 21.8 18.6745 21.8 20C21.8 21.3255 23.0088 22.4 24.5 22.4H28.1C28.5971 22.4 29 22.7582 29 23.2C29 23.6418 28.5971 24 28.1 24H24.5C22.0147 24 20 22.2091 20 20Z" fill="#FCFCFD"/>
            <path d="M25 20C25 20.5523 24.7761 21 24.5 21C24.2239 21 24 20.5523 24 20C24 19.4477 24.2239 19 24.5 19C24.7761 19 25 19.4477 25 20Z" fill="#FCFCFD"/>
    </Svg>
  );
};

export default Icon;
