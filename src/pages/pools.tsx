import { ChainId } from '@pancakeswap/sdk'
import PoolRun from '../views/PoolRun'

const PoolRunPage = () => <PoolRun />

PoolRunPage.chains = [ ChainId.BSC, ChainId.BSC_TESTNET, ChainId.ONUS_TESTNET ]

export default PoolRunPage