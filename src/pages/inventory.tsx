import { ChainId } from '@pancakeswap/sdk'
import Inventory from 'views/Inventory'
import { useRouter } from 'next/router'

const InventoryPage = () => {
  const router = useRouter()
  return (
    <Inventory activeIndex={router?.query?.tabactive?.toString()}/>
  )
}

// InventoryPage.chains = [ChainId.BSC, ChainId.BSC_TESTNET, ChainId.ONUS_TESTNET, ChainId.ONUS, ChainId.ETHW_MAINNET]
InventoryPage.chains = [ChainId.CORE]

export default InventoryPage

