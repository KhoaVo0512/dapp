import { ChainId } from '@pancakeswap/sdk'
import LuckyBox from 'views/LuckyBox'
import { useRouter } from 'next/router'

const InventoryPage = () => {
  const router = useRouter()
  return (
    <LuckyBox activeIndex={router?.query?.tabactive?.toString()}/>
  )
}

// InventoryPage.chains = [ChainId.BSC, ChainId.BSC_TESTNET, ChainId.ONUS_TESTNET, ChainId.ONUS, ChainId.ETHW_MAINNET]
InventoryPage.chains = [ChainId.CORE]

export default InventoryPage

