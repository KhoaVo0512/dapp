import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

interface ListViewProps extends SvgProps {
  color?:string
}
const Icon: React.FC<ListViewProps> = ({ color,...props}) => {
  return (
        <Svg width="21" height="19" viewBox="0 0 21 19" fill="none" {...props}>
          <path d="M1.80351 3.66101C2.79334 3.66101 3.6069 2.83389 3.6069 1.8305C3.6069 0.827114 2.79334 0 1.80351 0C0.800122 0 0.00012207 0.827114 0.00012207 1.8305C0.00012207 2.83389 0.813681 3.66101 1.80351 3.66101Z" fill={color}/>
          <path d="M1.80351 7.32227C0.800122 7.32227 0.00012207 8.14938 0.00012207 9.15277C0.00012207 10.1562 0.813681 10.9833 1.80351 10.9833C2.79334 10.9833 3.6069 10.1562 3.6069 9.15277C3.6069 8.14938 2.8069 7.32227 1.80351 7.32227Z" fill={color}/>
          <path d="M1.80351 14.6445C0.800122 14.6445 0.00012207 15.4716 0.00012207 16.475C0.00012207 17.4784 0.813681 18.3055 1.80351 18.3055C2.79334 18.3055 3.6069 17.4784 3.6069 16.475C3.62046 15.4716 2.8069 14.6445 1.80351 14.6445Z" fill={color}/>
          <path d="M7.34924 16.4746H20.0001" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7.34912 1.83008H19.9999" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7.34912 9.15234H19.9999" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </Svg>
  );
};

export default Icon;
