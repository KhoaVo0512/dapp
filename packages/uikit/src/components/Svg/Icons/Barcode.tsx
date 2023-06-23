import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fill="#fff"
        d="M2.29169 6.58341V4.85841C2.29169 3.43341 3.44168 2.29175 4.85834 2.29175H15.1334C16.5584 2.29175 17.7 3.44175 17.7 4.85841V6.58341"
        stroke="#777E90"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fill="#fff"
        d="M17.7083 13.3999V15.1416C17.7083 16.5666 16.5583 17.7082 15.1417 17.7082H4.86664C3.44164 17.7082 2.29999 16.5582 2.29999 15.1416V13.4166"
        stroke="#777E90"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M10 5.7168V14.2835" stroke="#777E90" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M7.43335 5.7417V12.5917"
        stroke="#777E90"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.85828 5.7168V14.2835"
        stroke="#777E90"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5334 5.7417V12.5917"
        stroke="#777E90"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M15.1 5.7168V14.2835" stroke="#777E90" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  )
}

export default Icon
