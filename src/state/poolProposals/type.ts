import { poolProposalItem } from "config/constants/poolProposal/constants/type"

export interface userProps {
    balanceOf:number
    allowance:number
} 
export interface user {
    dataUser:userProps[]
}

export interface userStakedProps extends poolProposalItem {
    amount:string
    stakeBlock:number
    unstakeLockTime:number
    pendingReward:string
    endTime:number
    startTime:number,
    tvl:string
}
export interface userStaked {
    userStaked:userStakedProps[]
}

export interface MinAmoutToVoting {
    minAmountToVote:number
}
export interface SnapShotItem {
    listProfitAmount:number
    blockNumber:number
}
export interface SnapshotCount {
    snapshotCount:number
}
export interface ListSnapshot {
    listSnapShot:SnapShotItem[]
}