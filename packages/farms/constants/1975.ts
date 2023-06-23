import { SerializedFarmConfig } from '@pancakeswap/farms'
import { onusMainnetTokens } from '@pancakeswap/tokens'

const farms: SerializedFarmConfig[] = [
  /**
   * These 3 farms (PID 0, 2, 3) should always be at the top of the file.
   */

   {
    pid: 0,
    lpSymbol: 'RUN',
    lpAddress: '0x9e3d30d7808C8E64dB360Abf2f32B44eB03F55d4',
    token: onusMainnetTokens.vndc,
    quoteToken: onusMainnetTokens.runtogether,
  },
  {
    pid: 1,
    lpSymbol: 'RUN-VNDC LP',
    lpAddress: '0x6600E83aEd427895e5513aC79613e36E2E71198E',
    token: onusMainnetTokens.runtogether,
    quoteToken: onusMainnetTokens.vndc,
    boosted: false
  }

].map((p) => ({ ...p, token: p.token.serialize, quoteToken: p.quoteToken.serialize }))

export default farms
