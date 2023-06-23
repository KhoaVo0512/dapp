export interface balanceMysteryBox {
    balanceOfRunBox: number,
}
export interface idMysteryBox {
    mysteryBoxID: []
}
export interface balanceMysteryToken {
    balanceOfBUSD: number,
    balanceOfApprove: number,
    balanceOfRun: number,
}
export interface balanceMysteryCoinChain {
    balanceCoinChain: number,
}
export interface startEndTime {
    startIn: number,
    endIn: number
}
export interface amountSold {
    sold: number,
    maxSell: number
}
export interface inforSoldMystery {
    inforSold: amountSold[]
}
export interface startEndTimeMystery {
    startEndTime: startEndTime[]
}