import { getFullDecimalMultiplier } from 'utils/getFullDecimalMultiplier'
import { ChainId } from '@pancakeswap/sdk'
import BigNumber from 'bignumber.js'

export const BSC_BLOCK_TIME = 3
export const BASE_BSC_SCAN_URLS = {
    [ChainId.BSC]: 'https://bscscan.com',
    [ChainId.BSC_TESTNET]: 'https://testnet.bscscan.com',
  }
// CAKE_PER_BLOCK details
// 40 CAKE is minted per block
// 20 CAKE per block is sent to Burn pool (A farm just for burning cake)
// 10 CAKE per block goes to CAKE syrup pool
// 9 CAKE per block goes to Yield farms and lottery
// CAKE_PER_BLOCK in config/index.ts = 40 as we only change the amount sent to the burn pool which is effectively a farm.
// CAKE/Block in src/views/Home/components/CakeDataRow.tsx = 15 (40 - Amount sent to burn pool)
export const CAKE_PER_BLOCK = 40
export const BLOCKS_PER_DAY = (60 / BSC_BLOCK_TIME) * 60 * 24
export const BLOCKS_PER_YEAR = BLOCKS_PER_DAY * 365 // 10512000
export const CAKE_PER_YEAR = CAKE_PER_BLOCK * BLOCKS_PER_YEAR

export const CAKE_PER_BLOCKV2 = new BigNumber(0.07)
export const BLOCKS_PER_YEARV2 = new BigNumber((60 / BSC_BLOCK_TIME) * 60 * 24 * 365) // 10512000
export const CAKE_PER_YEARV2 = CAKE_PER_BLOCKV2.times(BLOCKS_PER_YEARV2)

export const BASE_URL = 'https://board.runtogether.net'
export const BASE_ADD_LIQUIDITY_URL = `${BASE_URL}/add`
export const DEFAULT_TOKEN_DECIMAL = getFullDecimalMultiplier(18)
export const DEFAULT_GAS_LIMIT = 250000
export const BOOSTED_FARM_GAS_LIMIT = 500000
export const AUCTION_BIDDERS_TO_FETCH = 500
export const RECLAIM_AUCTIONS_TO_FETCH = 500
export const AUCTION_WHITELISTED_BIDDERS_TO_FETCH = 500
export const startTimeStake = 1662469200000
export const LIMIT_VOTING = 100
export const IPFS_GATEWAY = 'https://ipfs.io/ipfs'
export const AMOUNT_FULL_POOL = "2500000"

export const BASE_BSC_SCAN_URL = BASE_BSC_SCAN_URLS[ChainId.BSC]
export const BASE_BSC_URL = BASE_BSC_SCAN_URLS[ChainId.BSC]
export const URL = process.env.NEXT_PUBLIC_API
export const TRANDING_FEE = 3
export const TRANSFER_FEE = 5