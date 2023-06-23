import { SUPPORT_ONLY_BSC } from 'config/constants/supportChains'
import { ChainId } from '@pancakeswap/sdk'
import React from 'react'
import { MarketplaceLayout } from 'views/Marketplace'

const MarketplacePage = () => {
  return (
    <>
      <MarketplaceLayout />
    </>
  )
}

MarketplacePage.Layout = MarketplaceLayout

MarketplacePage.chains = [ChainId.BSC, ChainId.BSC_TESTNET]



export default MarketplacePage
