import { Address } from "config/constants/types"
import { SerializedToken } from '@pancakeswap/sdk'


export interface userProps {
    balanceOf:number
    allowance:number
} 
export interface userStakedProps {
    amount:number
    stakeBlock:number
    unstakeLockTime:number
    pendingReward:number
}
export interface userStaked {
    userStaked:userStakedProps
 }
export interface user {
   dataUser:userProps
}
export interface tvlProps {
    tvl:number
 }
export interface endTimeProps{
    endTime:number
}
export interface endBlockProps{
    endBlock:number
}
 
export interface startTimeProps{
    startTime:number
}
 
export interface PoolItemsProps {
    poolId:number,
    tokenStake:SerializedToken,
    tokenEarn:SerializedToken,
    apy:string,
    name:string,
    withdrawFee:string
    poolContract:Address
    widthdrawDescription:any
    amount:string,
    pendingReward:string
    startTimeStake:number,
    endTimeStake:number
}

export interface PoolRunInfo {
    listPool: PoolItemsProps[]
}

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