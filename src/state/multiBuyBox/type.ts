export interface nftBalanceItems {
    totalNftMetaRush:number,
    totalNftMetaRun:number,
    totalNftMetaRace:number,
    totalNftMetaRich:number, 
}
export interface nftPriceItems {
    totalNftMetaRush:number,
    totalNftMetaRun:number,
    totalNftMetaRace:number,
    totalNftMetaRich:number, 
}

export interface nftInMarket {
    nftInfo:{
        nftBalance:nftBalanceItems
        nftPrice:nftPriceItems
    }
}

export interface dataUserType {
    dataUser:{
        balanceOf:string,
        allowance:string
    }
}
export interface totalBoxOfUser {
    totalBoxOfUser:number 
}

export interface amountMetaRush {
    totalMetaRush:number 
}
export interface amountMetaRun {
    totalMetaRun:number 
}
export interface amountMetaRace {
    totalMetaRace:number 
}
export interface amountMetaRich {
    totalMetaRich:number 
}
export interface maxNftTransfer {
    maxNftTransfer:number 
}

export type ListBoxByUser  = {
    listBoxByUser:{
        totalBoxMetaRush:number,
        totalBoxMetaRun:number,
        totalBoxMetaRace:number,
        totalBoxMetaRich:number,
    }
}


