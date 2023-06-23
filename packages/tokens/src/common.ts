
import { ChainId, Token } from '@pancakeswap/sdk'

export const CAKE_MAINNET = new Token(
  ChainId.BSC,
  '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
  18,
  'CAKE',
  'PancakeSwap Token',
  'https://pancakeswap.finance/',
)

export const RUN_MAINNET = new Token(
  ChainId.BSC,
  '0xc643E83587818202E0fFf5eD96D10Abbc8Bb48e7',
  18,
  'RUN',
  'Runtogether token',
  'https://runtogether.net/',
)

export const RUN_TESTNET = new Token(
  ChainId.BSC_TESTNET,
  '0x242a227B38f704983FF101DC7De573ED8111601e',
  18,
  'RUN',
  'Runtogether token',
  'https://runtogether.net/',
)

export const RUN_ONUS_MAINNET = new Token(
  ChainId.ONUS,
  '0x9e3d30d7808C8E64dB360Abf2f32B44eB03F55d4',
  18,
  'RUN',
  'Runtogether token',
  'https://runtogether.net/',
)

export const RUN_ONUS_TESTNET = new Token(
  ChainId.ONUS_TESTNET,
  '0x6fd04d2f42c5AB3635220f6ecf54825e084bf870',
  18,
  'RUN',
  'Runtogether token',
)

export const CAKE_TESTNET = new Token(
  ChainId.BSC_TESTNET,
  '0xFa60D973F7642B748046464e165A65B7323b0DEE',
  18,
  'CAKE',
  'PancakeSwap Token',
  'https://pancakeswap.finance/',
)

export const USDC_BSC = new Token(
  ChainId.BSC,
  '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
  18,
  'USDC',
  'Binance-Peg USD Coin',
  'https://www.centre.io/usdc',
)

export const USDC_TESTNET = new Token(
  ChainId.BSC_TESTNET,
  '0x64544969ed7EBf5f083679233325356EbE738930',
  18,
  'USDC',
  'Binance-Peg USD Coin',
  'https://www.centre.io/usdc',
)

export const USDC_ETH = new Token(ChainId.ETHEREUM, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6, 'USDC', 'USD Coin')

export const USDC_RINKEBY = new Token(
  ChainId.RINKEBY,
  '0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b',
  6,
  'tUSDC',
  'test USD Coin',
)

export const USDC_GOERLI = new Token(
  ChainId.GOERLI,
  '0x07865c6E87B9F70255377e024ace6630C1Eaa37F',
  6,
  'tUSDC',
  'test USD Coin',
)

export const USDT_BSC = new Token(
  ChainId.BSC,
  '0x55d398326f99059fF775485246999027B3197955',
  18,
  'USDT',
  'Tether USD',
  'https://tether.to/',
)

export const USDT_ETH = new Token(
  ChainId.ETHEREUM,
  '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  6,
  'USDT',
  'Tether USD',
  'https://tether.to/',
)

export const BUSD_BSC = new Token(
  ChainId.BSC,
  '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
  18,
  'BUSD',
  'Binance USD',
  'https://www.paxos.com/busd/',
)

export const BUSD_TESTNET = new Token(
  ChainId.BSC_TESTNET,
  '0x280b2e8B297E15467bC1929941b5439eC67fC145',
  18,
  'BUSD',
  'Binance USD',
  'https://www.paxos.com/busd/',
)
// add busd ETHW
export const BUSD_ETHW = new Token(
  ChainId.ETHW_MAINNET,
  '0x4Fabb145d64652a948d72533023f6E7A623C7C53',
  18,
  'BUSD',
  'Binance USD',
  'https://www.paxos.com/busd/',
)
export const USDT_ETHW = new Token(
  ChainId.ETHW_MAINNET,
  '0xdac17f958d2ee523a2206206994597c13d831ec7',
  18,
  'USDT',
  'Tether USD',
  'https://www.binance.com/en/trade/BNB_USDT',
)


export const BUSD_ETH = new Token(
  ChainId.ETHEREUM,
  '0x4Fabb145d64652a948d72533023f6E7A623C7C53',
  18,
  'BUSD',
  'Binance USD',
  'https://www.paxos.com/busd/',
)

export const BUSD_RINKEBY = new Token(
  ChainId.RINKEBY,
  '0x4e2442A6f7AeCE64Ca33d31756B5390860BF973E',
  18,
  'BUSD',
  'Binance USD',
  'https://www.paxos.com/busd/',
)

export const BUSD_GOERLI = new Token(
  ChainId.GOERLI,
  '0xb809b9B2dc5e93CB863176Ea2D565425B03c0540',
  18,
  'BUSD',
  'Binance USD',
  'https://www.paxos.com/busd/',
)

// add busd ONUS
export const VNDC_ONUS = new Token( 
  ChainId.ONUS,
  '0xC1D3A18C32c42D5c033C2d4bfc151dB8fd2c9D81',
  0,
  'VNDC',
  'ONUS-peg VNDC Token',
  '',
)

// add busd ONUS
export const BUSD_ONUS_TESTNET = new Token(
  ChainId.ONUS_TESTNET,
  '0xeBaC619E4c0fD83124dA549c834eC52A6e1521AA',
  18,
  'BUSD',
  'ONUS BUSD',
  'https://www.paxos.com/busd/',
)

// add run ethw
export const RUN_ETHW_MAINNET = new Token(
  ChainId.ETHW_MAINNET,
  '0x753439cB2c0af49983898f54659109105558f8c2',
  18,
  'RUN',
  'Runtogether token',
  'https://runtogether.net/',
)


export const BUSD: Record<ChainId, Token> = {
  [ChainId.ETHEREUM]: BUSD_ETH,
  [ChainId.RINKEBY]: BUSD_RINKEBY,
  [ChainId.GOERLI]: BUSD_GOERLI,
  [ChainId.BSC]: BUSD_BSC,
  [ChainId.BSC_TESTNET]: BUSD_TESTNET,
  [ChainId.ETHW_MAINNET]: BUSD_ETHW,
  [ChainId.ONUS_TESTNET]: BUSD_ONUS_TESTNET, 
  [ChainId.ONUS]: VNDC_ONUS
}


export const CAKE = {
  [ChainId.BSC]: CAKE_MAINNET,
  [ChainId.BSC_TESTNET]: CAKE_TESTNET,
}

export const RUN = {
  [ChainId.BSC]: RUN_MAINNET,
  [ChainId.BSC_TESTNET]: RUN_TESTNET,
  [ChainId.ONUS_TESTNET]: RUN_ONUS_TESTNET,
  [ChainId.ONUS]: RUN_ONUS_MAINNET ,
  [ChainId.ETHW_MAINNET]: RUN_ETHW_MAINNET,
}

export const USDC = {
  [ChainId.BSC]: USDC_BSC,
  [ChainId.BSC_TESTNET]: USDC_TESTNET,
  [ChainId.ETHEREUM]: USDC_ETH,
  [ChainId.RINKEBY]: USDC_RINKEBY,
  [ChainId.GOERLI]: USDC_GOERLI,
}

export const USDT = {
  [ChainId.BSC]: USDT_BSC,
  [ChainId.ETHEREUM]: USDT_ETH,
}

export const WBTC_ETH = new Token(
  ChainId.ETHEREUM,
  '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
  8,
  'WBTC',
  'Wrapped BTC',
)
