export interface ProposalInfo{
    countProposals:number,
    minAmountToWin:number
}

export interface VotingProposalsType{
    ownerAddress:string,
    startTime:number,
    endTime:number,
    votingId:number,
    agree?:string,
    disagrees?:string
}

export interface ListVoting{
    listVoting:VotingProposalsType[]
}

export interface AllowanceType{
    allowance:number
}

export interface votingData{
    transactionHash:string,
    amount:string,
    option:boolean,
    voter:string
}

export interface ListVotingData{
    listVotingData:votingData[]
}

export interface countMintoWin{
    countMinToWin:number
}