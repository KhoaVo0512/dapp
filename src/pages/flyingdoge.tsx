import { ChainId } from '@pancakeswap/sdk'
import FlyingDoge from '../views/FlyingDoge'

const MyBalancePage = () => <FlyingDoge />

MyBalancePage.chains = [ChainId.CORE]

export default MyBalancePage