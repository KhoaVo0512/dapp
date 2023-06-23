import React from 'react'
import styled from 'styled-components'
import Svg from '../Svg'
import { SvgProps } from '../types'

const CsSvg = styled(Svg)`
  @media screen and (max-width: 768px) {
  }
`

const Icon: React.FC<SvgProps> = ({ color, height, ...props }) => {
  return (
    // <CsSvg width="100%" height="600px" viewBox="0 0 1440 354" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    //   <path
    //     d="M1460.6 134.9V0.5H-21.0016V95.7399C-9.59583 176.847 121.494 341.799 554.608 352.749C987.721 363.698 1339.07 212.078 1460.6 134.9Z"
    //     fill={color}
    //   />
    // </CsSvg>  

  <Svg width="100%" height="802" viewBox="0 0 2560 802" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M2560 428.417V0H0V364.359C19.7075 497.035 246.212 783.223 994.57 801.134C1742.93 819.045 2350.01 554.666 2560 428.417Z" fill={color}/>
  </Svg>
  
  )
}

export default Icon
