import { ChainId } from '@pancakeswap/sdk'
import Launchpad from '../views/Launchpad'

const MyBalancePage = () => <Launchpad />

MyBalancePage.chains = [ChainId.CORE]

export default MyBalancePage