import { SerializedFarmConfig } from '@pancakeswap/farms'
import { bscTokens } from '@pancakeswap/tokens'

const farms: SerializedFarmConfig[] = [
  /**
   * These 3 farms (PID 0, 2, 3) should always be at the top of the file.
   */

   {
    pid: 0,
    lpSymbol: 'RUN',
    lpAddress: '0xc643E83587818202E0fFf5eD96D10Abbc8Bb48e7',
    token: bscTokens.busd,
    quoteToken: bscTokens.runtogether,
  },
  {
    pid: 1,
    lpSymbol: 'RUN-BUSD LP',
    lpAddress: '0xB3C793C1470d49569A8d189a946dB5bdB7BB6E4B',
    token: bscTokens.runtogether,
    quoteToken: bscTokens.busd,
    boosted: false
  },
  {
    pid: 2,
    lpSymbol: 'RUN-BNB LP',
    lpAddress: '0xb73b2c77052Fd08212865Dc436AE8CeDc200244c',
    token: bscTokens.wbnb,
    quoteToken: bscTokens.runtogether,
    boosted: false
  }
].map((p) => ({ ...p, token: p.token.serialize, quoteToken: p.quoteToken.serialize }))

export default farms
