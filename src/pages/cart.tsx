import HomeDemo from 'views/HomeDemo'
import { ChainId } from '@pancakeswap/sdk'
import Cart from 'views/Cart'

const CartPage = () => {
  return <Cart />
}
CartPage.chains = [ChainId.BSC, ChainId.CORE, ChainId.ETHW_MAINNET]

export default CartPage
