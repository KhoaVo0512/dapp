import { Address } from "config/constants/types"
import { SerializedToken } from '@pancakeswap/sdk'

export interface PoolConfig {
    poolId:number,
    name:string,
    tokenStake:SerializedToken,
    tokenEarn:SerializedToken,
    apy:string,
    withdrawFee:string
    poolContract:Address
    widthdrawDescription:any
}