import { SerializedFarmConfig } from '@pancakeswap/farms'
import { onusTestnetTokens } from '@pancakeswap/tokens'

const farms: SerializedFarmConfig[] = [
  /**
   * These 3 farms (PID 0, 2, 3) should always be at the top of the file.
   */

   {
    pid: 0,
    lpSymbol: 'RUN',
    lpAddress: '0x6fd04d2f42c5AB3635220f6ecf54825e084bf870',
    token: onusTestnetTokens.busd,
    quoteToken: onusTestnetTokens.runtogether,
  },
  {
    pid: 1,
    lpSymbol: 'RUN-BUSD LP',
    lpAddress: '0x0Af9D763EC6A33cf79f18785C6a31248aCCb0dC2',
    token: onusTestnetTokens.runtogether,
    quoteToken: onusTestnetTokens.busd,
    boosted: false
  }

].map((p) => ({ ...p, token: p.token.serialize, quoteToken: p.quoteToken.serialize }))

export default farms
