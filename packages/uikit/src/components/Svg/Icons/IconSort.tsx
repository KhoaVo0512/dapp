import React from 'react'
import styled from 'styled-components'
import useTheme from 'hooks/useTheme'
import Svg from '../Svg'
import { SvgProps } from '../types'

const CsSvg = styled(Svg)`
  border: 1px solid #ccc;
  width: 25px;
  border-radius: 50%;

  &:hover {
    background: #ccc;
  }
`

const Icon: React.FC<SvgProps> = (props) => {
  const { theme } = useTheme()
  return (
    <CsSvg viewBox="0 0 24 24" {...props}>
      <path
        fill={theme.isDark ? '#fff' : '#000'}
        d="M8.71005 11.71L11.3001 14.3C11.6901 14.69 12.3201 14.69 12.7101 14.3L15.3001 11.71C15.9301 11.08 15.4801 10 14.5901 10H9.41005C8.52005 10 8.08005 11.08 8.71005 11.71Z"
      />
    </CsSvg>
  )
}

export default Icon
