import { rinkeby, mainnet, goerli } from 'wagmi/chains'
import { Chain } from 'wagmi'

export const avalandche: Chain = {
  id: 43114,
  name: 'Avalanche C-Chain',
  network: 'avalanche',
  rpcUrls: {
    default: 'https://rpc.ankr.com/avalanche',
  },
  nativeCurrency: { name: 'Avalanche', symbol: 'AVAX', decimals: 18 },
  blockExplorers: {
    default: {
      name: 'snowtrace',
      url: 'https://snowtrace.io/',
    },
  },
}

export const avalandcheFuji: Chain = {
  id: 43113,
  name: 'Avalanche Fuji',
  network: 'avalanche-fuji',
  rpcUrls: {
    default: 'https://rpc.ankr.com/avalanche_fuji',
  },
  nativeCurrency: { name: 'Avalanche', symbol: 'AVAX', decimals: 18 },
  blockExplorers: {
    default: {
      name: 'snowtrace',
      url: 'https://testnet.snowtrace.io/',
    },
  },
  testnet: true,
}

export const fantomOpera: Chain = {
  id: 250,
  name: 'Fantom Opera',
  network: 'fantom',
  nativeCurrency: { name: 'Fantom', symbol: 'FTM', decimals: 18 },
  rpcUrls: {
    default: 'https://rpc.ftm.tools',
  },
  blockExplorers: {
    default: {
      name: 'FTMScan',
      url: 'https://ftmscan.com',
    },
  },
}

export const fantomTestnet: Chain = {
  id: 4002,
  name: 'Fantom Testnet',
  network: 'fantom-testnet',
  nativeCurrency: { name: 'Fantom', symbol: 'FTM', decimals: 18 },
  rpcUrls: {
    default: 'https://rpc.testnet.fantom.network',
  },
  blockExplorers: {
    default: {
      name: 'FTMScan',
      url: 'https://testnet.ftmscan.com',
    },
  },
  testnet: true,
}
// add ethw mainnet
export const ethwMainnet: Chain = {
  id: 10001,
  name: 'ETHW Chain',
  network: 'ethw-mainnet',
  nativeCurrency: { name: 'ETHW', symbol: 'ETHW', decimals: 18 },
  rpcUrls: {
    default: 'https://mainnet.ethereumpow.org',
  },
  blockExplorers: {
    default: {
      name: 'ETHWScan',
      url: 'https://www.oklink.com/en/ethw',
    },
  },
  multicall: {
    address: '0xcd7791e8dd276c04cdfa92b412ea8e1edae0d08e',
    blockCreated: 15727173,
  },
  testnet: true,
}

// add ounus testnet

export const onusTestnet: Chain = {
  id: 1945,
  name: 'ONUS Testnet',
  network: 'onus-testnet',
  nativeCurrency: { name: 'ONUS', symbol: 'ONUS', decimals: 18 },
  rpcUrls: {
    default: 'https://rpc-testnet.onuschain.io',
  },
  blockExplorers: {
    default: {
      name: 'ONUSExplorer',
      url: 'https://explorer-testnet.onuschain.io',
    },
  },
  multicall: {
    address: '0xcd7791e8dd276c04cdfa92b412ea8e1edae0d08e',
    blockCreated: 276598,
  },
  testnet: true,
}

// add ounus mainnet

export const onusMainnet: Chain = {
  id: 1975,
  name: 'ONUS Chain',
  network: 'onus-mainnet',
  nativeCurrency: { name: 'ONUS', symbol: 'ONUS', decimals: 18 },
  rpcUrls: {
    default: 'https://rpc.onuschain.io/',
  },
  blockExplorers: {
    default: {
      name: 'ONUSExplorer',
      url: 'https://explorer.onuschain.io/',
    },
  },
  multicall: {
    address: '0x74135AC864f98520e4cb5f0B39772C64958f5eF9',
    blockCreated: 431242,
  }
}

export const coreMainnet: Chain = {
  id: 1116,
  name: 'CORE Chain',
  network: 'core-mainnet',
  nativeCurrency: { name: 'CORE', symbol: 'CORE', decimals: 18 },
  rpcUrls: {
    default: 'https://rpc.coredao.org/',
  },
  blockExplorers: {
    default: {
      name: 'CoreExplorer',
      url: 'https://scan.coredao.org',
    },
  },
  multicall: {
    address: '0xf1cD0A82A85292d282aAB45F0516Dc0e12a083Be',
    blockCreated: 2546469,
  }
}

const bscExplorer = { name: 'BscScan', url: 'https://bscscan.com' }

export const bsc: Chain = {
  id: 56,
  name: 'BNB Smart Chain',
  network: 'bsc',
  rpcUrls: {
    public: 'https://bsc-dataseed1.binance.org',
    default: 'https://bsc-dataseed1.binance.org',
  },
  blockExplorers: {
    default: bscExplorer,
    etherscan: bscExplorer,
  },
  nativeCurrency: {
    name: 'Binance Chain Native Token',
    symbol: 'BNB',
    decimals: 18,
  },
  multicall: {
    address: '0xcA11bde05977b3631167028862bE2a173976CA11',
    blockCreated: 15921452,
  },
}

export const bscTest: Chain = {
  id: 97,
  name: 'BNB Testnet',
  network: 'bsc-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Binance Chain Native Token',
    symbol: 'tBNB',
  },
  rpcUrls: {
    public: 'https://data-seed-prebsc-2-s2.binance.org:8545', 
    default: 'https://data-seed-prebsc-2-s2.binance.org:8545',
  },
  blockExplorers: {
    default: { name: 'BscScan', url: 'https://testnet.bscscan.com' },
  },
  multicall: {
    address: '0x8F3273Fb89B075b1645095ABaC6ed17B2d4Bc576',
    blockCreated: 17422483,
  },
  testnet: true,
}

export { rinkeby, mainnet, goerli }
