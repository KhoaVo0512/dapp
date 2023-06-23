import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg width="17" height="16" viewBox="0 0 17 16" {...props} style={{fill:"none"}}>
<path d="M12.2233 3.88672H4.04333V12.7934C4.04333 13.5467 4.65667 14.1601 5.41 14.1601H10.85C11.6033 14.1601 12.2167 13.5467 12.2167 12.7934V3.88672H12.2233Z"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M2.77673 3.88672H13.7234"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M10.3033 1.82666H6.19666V3.87999H10.3033V1.82666Z"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M6.87659 6.5V11.4267"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M9.6167 6.5V11.4267"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>

    </Svg>
  );
};

export default Icon;
