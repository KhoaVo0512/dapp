import { ChainId } from '@pancakeswap/sdk'
import { useRouter } from 'next/router'
import BuyPage from 'views/Marketplace/BuyPage'

const DetailbuyPage = () => {
  const router = useRouter()
  const { saleId } = router.query
  return (
    <BuyPage saleIdItems={saleId}/>
  )
}

DetailbuyPage.chains = [ ChainId.BSC, ChainId.BSC_TESTNET ]

export default DetailbuyPage


