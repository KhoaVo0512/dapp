import { ChainId, Token } from '@pancakeswap/sdk'

export const onusMainnetTokens = {
    busd: new Token(
        ChainId.ONUS,
        '0xdfB5E8a4AC08E46258A12AbE737bba5D8c452508',
        18,
        'BUSD',
        'BUSD Token',
        'https://www.paxos.com/busd/',
    ),
    usdt: new Token(
        ChainId.ONUS,
        '0xff276c6bca1F66Fd54a8915e830735D6ab0C7B09',
        18,
        'USDT',
        'USDT Token',
        'https://tether.to/',
    ),
    eth: new Token(
        ChainId.ONUS,
        '0xB4373ebB073A4DcbA47e567d075a9583Fa3C763e',
        18,
        'ETH',
        'ETH Token',
        'https://ethereum.org/en/',
    ),
    mia: new Token(
        ChainId.ONUS,
        '0x5Df107F23d3Ec5efA926B999Ce285A88955Ae56B',
        18,
        'MIA',
        'MIA Token',
        'https://miaswap.io/',
    ),
    runtogether: new Token(
        ChainId.ONUS,
        '0x9e3d30d7808C8E64dB360Abf2f32B44eB03F55d4',
        18,
        'RUN',
        'RUN Token',
    ),
    runtogetherBoxNft: new Token(
        ChainId.ONUS,
        '0x1291e12CAE4E140847Ac548D5ce79f82036DF3f5',
        0,
        'RTBN',
        'Run Together Box NFT',
        'https://runtogether.net/',
      ),
    vndc: new Token(
        ChainId.ONUS,
        '0xC1D3A18C32c42D5c033C2d4bfc151dB8fd2c9D81',
        0,
        'VNDC',
        'ONUS-peg VNDC Token',
    ),
}
