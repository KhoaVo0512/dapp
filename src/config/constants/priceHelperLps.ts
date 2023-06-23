import tokens from './tokens'
import { FarmConfig } from './types'



const priceHelperLps: FarmConfig[] = [
  /**
   * These LPs are just used to help with price calculation for MasterChef LPs (farms.ts).
   * This list is added to the MasterChefLps and passed to fetchFarm. The calls to get contract information about the token/quoteToken in the LP are still made.
   * The absense of a PID means the masterchef contract calls are skipped for this farm.
   * Prices are then fetched for all farms (masterchef + priceHelperLps).
   * Before storing to redux, farms without a PID are filtered out.
   */
  // {
  //   pid: null,
  //   lpSymbol: 'QSD-BNB LP',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x7b3ae32eE8C532016f3E31C8941D937c59e055B9',
  //   },
  //   token: tokens.qsd,
  //   quoteToken: tokens.wbnb,
  //   decimalsToken: 18,
  //   decimalsQuoteToken: 18
  // },
  // {
  //   pid: 500,
  //   lpSymbol: 'KSC-BUSD LP',
  //   lpAddresses: {
  //     97: '',
  //     56: '0xd33e50e444ec22998365aa443d1998e851fc5594',
  //   },
  //   token: tokens.kshark,
  //   quoteToken: tokens.babykshark,
  //   decimalsToken: 18,
  //   decimalsQuoteToken: 9
  // },
  // {
  //   pid: 501,
  //   lpSymbol: 'BKS-WBNB LP',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x6D810eB08FC6852b4a0e524944149154DAdba2b6',
  //   },
  //   token: tokens.babykshark,
  //   quoteToken: tokens.kshark,
  //   decimalsToken: 9,
  //   decimalsQuoteToken: 18
  // },
]

export default priceHelperLps
