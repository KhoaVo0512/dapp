import { ChainId } from '@pancakeswap/sdk'
import Invest from '../views/Invest'

const InvestTogetherPage = () => <Invest />

InvestTogetherPage.chains = [ChainId.BSC, ChainId.BSC_TESTNET]

export default InvestTogetherPage