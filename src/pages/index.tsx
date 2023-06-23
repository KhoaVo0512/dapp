import { ChainId } from '@pancakeswap/sdk'
import MyBalancePage from './flyingdoge'

const IndexPage = () => {
  return <MyBalancePage />
}
IndexPage.chains = [ChainId.CORE]

export default IndexPage
