import React, { FC } from 'react'
import Marketplace from './Marketplace'

export const MarketplaceLayout:FC<React.PropsWithChildren<unknown>> = ({children}) => {
  return <Marketplace>{children}</Marketplace>
}

