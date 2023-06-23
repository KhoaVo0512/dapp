import { createAction } from '@reduxjs/toolkit'
import { AllowanceType, countMintoWin, ListVoting, ListVotingData, ProposalInfo } from './type'

export const fetchTotalProposals = createAction<{countProposals:number}>('votingProposals/fetchProposals')
export const fetchListProposals = createAction<ListVoting>('votingProposals/fetchListProposals')
export const fetchAllowanceVoting = createAction<AllowanceType>('votingProposals/fetchAllowanceVoting')
export const fetchSnapShortVoting = createAction<ListVotingData>('votingProposals/fetchSnapShortVoting')
export const fetchCountMintToWin = createAction<{countMinToWin:number}>('votingProposals/fetchCountMintToWin')