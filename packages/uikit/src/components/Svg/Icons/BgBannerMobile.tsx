import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = ({ color, height, ...props }) => {
  return (
    <svg viewBox="0 0 375 400" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M375 344.831V0H-3.05176e-05V334.939C2.88681 355.427 36.0662 397.092 145.689 399.858C255.312 402.624 344.239 364.326 375 344.831Z" fill={color}/>
    </svg>
  )
}

export default Icon
