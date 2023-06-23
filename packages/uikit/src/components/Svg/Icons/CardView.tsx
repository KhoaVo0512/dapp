import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'


interface CardViewProps extends SvgProps {
  color?:string
}

const Icon: React.FC<SvgProps> = ({ color,...props}) => {
  return (
    <Svg  width="22" height="22" viewBox="0 0 22 22" fill="none" {...props}>
<path fill="none" d="M7.02871 9.03826H3.00958C1.89714 9.03826 1 8.14113 1 7.02869V3.00956C1 1.89712 1.89714 1 3.00958 1H7.02871C8.14115 1 9.03829 1.89712 9.03829 3.00956V7.02869C9.03829 8.14113 8.14115 9.03826 7.02871 9.03826Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path fill="none" d="M18.9905 9.03826H14.9714C13.8589 9.03826 12.9618 8.14113 12.9618 7.02869V3.00956C12.9618 1.89712 13.8589 1 14.9714 1H18.9905C20.1029 1 21.0001 1.89712 21.0001 3.00956V7.02869C21.0001 8.14113 20.1029 9.03826 18.9905 9.03826Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path fill="none" d="M7.02871 20.9992H3.00958C1.89714 20.9992 1 20.1021 1 18.9896V14.9705C1 13.8581 1.89714 12.9609 3.00958 12.9609H7.02871C8.14115 12.9609 9.03829 13.8581 9.03829 14.9705V18.9896C9.03829 20.1021 8.14115 20.9992 7.02871 20.9992Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path fill="none" d="M18.9905 20.9992H14.9714C13.8589 20.9992 12.9618 20.1021 12.9618 18.9896V14.9705C12.9618 13.8581 13.8589 12.9609 14.9714 12.9609H18.9905C20.1029 12.9609 21.0001 13.8581 21.0001 14.9705V18.9896C21.0001 20.1021 20.1029 20.9992 18.9905 20.9992Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  )
}

export default Icon
