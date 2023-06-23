import { ChainId, Token } from '@pancakeswap/sdk'

export const onusTestnetTokens = {
    busd: new Token(
        ChainId.ONUS_TESTNET,
        '0xeBaC619E4c0fD83124dA549c834eC52A6e1521AA',
        18,
        'BUSD',
        'BUSD Token',
        'https://www.paxos.com/busd/',
    ),
    usdt: new Token(
        ChainId.ONUS_TESTNET,
        '0xDDc9E10c8BC2F554116e005B496fDD20e0083E19',
        18,
        'USDT',
        'USDT Token',
        'https://tether.to/',
    ),
    eth: new Token(
        ChainId.ONUS_TESTNET,
        '0xBAFf607A82941F383a623CcfB75783f248f43065',
        18,
        'ETH',
        'ETH Token',
        'https://ethereum.org/en/',
    ),
    mia: new Token(
        ChainId.ONUS_TESTNET,
        '0xd34aDB75D7FaE5e73a0e7f0Fe93e0CF98a808C65',
        18,
        'MIA',
        'MIA Token',
        'https://miaswap.io/',
    ),
    runtogether: new Token(
        ChainId.ONUS_TESTNET,
        '0x6fd04d2f42c5AB3635220f6ecf54825e084bf870',
        18,
        'RUN',
        'RUN Token',
    ),
    runtogetherBoxNft: new Token(
        ChainId.ONUS_TESTNET,
        '0x5a7FB300084ceeED3E85c70E059bc9Fb1bAC5942',
        0,
        'RTBN',
        'Run Together Box NFT',
        'https://runtogether.net/',
      ),

}

