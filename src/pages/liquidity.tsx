import { CHAIN_IDS } from 'utils/wagmi'
import { ChainId } from '@pancakeswap/sdk'
import ComingSoon from 'views/ComingSoon'
import Liquidity from '../views/Pool'

const LiquidityPage = () => <Liquidity />
// const ComingSoonPage = () => <ComingSoon />
LiquidityPage.chains = CHAIN_IDS
export default LiquidityPage
