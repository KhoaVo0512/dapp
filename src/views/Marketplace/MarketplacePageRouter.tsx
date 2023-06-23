import { useRouter } from 'next/router'
import PageLoader from '../../components/Loader/PageLoader'
import BuyPage from './BuyPage'

const MarketplacePageRouter = () => {
  const router = useRouter()
  if (router.isFallback) {
    return <PageLoader />
  }

  return <BuyPage saleIdItems={router?.query?.saleId.toString()}/>
}

export default MarketplacePageRouter
