
import BigNumber from 'bignumber.js'
import { ERC20_ABI } from 'config/abi/erc20'
import multicall from 'utils/multicall'
import { tokenBalance } from "./types"

export const fetchTokenBlance = async (tokenAddress:string, account: string, chainId:number): Promise<tokenBalance> => {
    try {
        const calls = [
           {
             address: tokenAddress,
             name: 'balanceOf',
             params: [account]
           },
        ]
       const [resultBalance] = await multicall(ERC20_ABI, calls, chainId)
      return {
        balance:(new BigNumber(resultBalance).dividedBy(1E18)).toString(),
      }
   } catch (e) {
     return {
        balance:"0"
      }
   }
}