import { Address } from "config/constants/types"
import { SerializedToken } from '@pancakeswap/sdk'

export interface poolProposalItem {
    storeID:number,
    storeName:string,
    revenue:string,
    apy:string,
    depositFee:string,
    tokenStake:SerializedToken,
    tokenEarn:SerializedToken,
    storeLocation:string,
    storeContract:Address,
    poolStoreContract:Address,
    depositFeeDescription:any
}