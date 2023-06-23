import React, { FC } from 'react'
import MysteryBox from './MysteryBox'

export const MysteryBoxLayout:FC<React.PropsWithChildren<unknown>> = ({children}) => {
  return <MysteryBox>{children}</MysteryBox>
}

