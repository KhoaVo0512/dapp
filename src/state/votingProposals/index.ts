import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from '../index'
// eslint-disable-next-line import/named
import { fetchProposalsInfo,fetchVoting,fetchVotingData,fetchAllowance } from './fetchDataVoting'
import { fetchTotalProposals, fetchListProposals, fetchSnapShortVoting,fetchAllowanceVoting, fetchCountMintToWin } from './actions'

export const GetProposalsInfo = (chainId:number) => {
    const data = useSelector<AppState, AppState['votingProposals']>((state) => state.votingProposals)
    const totalProposals = data.countProposals
    const minAmountToWin = data.countMinToWin
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const getCountProposals = async () => {
            try {
                const result = await fetchProposalsInfo(chainId)
                dispatch(fetchTotalProposals({countProposals:result.countProposals}))
                dispatch(fetchCountMintToWin({countMinToWin:result.minAmountToWin}))
            } catch (e) {
                console.log(e)
            }
        }
        getCountProposals()
    }, [dispatch, chainId]) 
    return [ totalProposals, minAmountToWin ]
}

export const GetListProposals = (totalProposals:number,chainId:number) => {
    const data = useSelector<AppState, AppState['votingProposals']>((state) => state.votingProposals)
    const listProposals = data.listVoting
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const getListVoting = async () => {
            try {
                const result = await fetchVoting(totalProposals,chainId)                
                dispatch(fetchListProposals(result))
            } catch (e) {
                console.log(e)
            }
        }
        getListVoting()
    }, [dispatch, totalProposals]) 
    return [ listProposals ]
}

export const useListProposals = () => {
    const data = useSelector<AppState, AppState['votingProposals']>((state) => state.votingProposals)
    const listProposals = data.listVoting
    return [ listProposals ]
}

export const GetSnapShortVoting = (votingId:number, voteConfig:string) => {
    const data = useSelector<AppState, AppState['votingProposals']>((state) => state.votingProposals)
    const listVotingData = data.listVotingData
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const getSnapShortVoting = async () => {
            try {
                const result = await fetchVotingData(votingId, voteConfig)              
                dispatch(fetchSnapShortVoting(result))
            } catch (e) {
                console.log(e)
            }
        }
        getSnapShortVoting()
    }, [dispatch, voteConfig, votingId]) 
    return [ listVotingData ]
}
export const GetAllowanceVoting = (account:string,requested:boolean,chainId:number,tokenAddress) => {  
    const data = useSelector<AppState, AppState['votingProposals']>((state) => state.votingProposals)  
    const allowanceVoting = data?.allowance
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const getAllowanceVoting = async () => {
            try {
                const result = await fetchAllowance(account,chainId,tokenAddress)
                dispatch(fetchAllowanceVoting(result))
            } catch (e) {
                console.log(e)
            }
        }
        getAllowanceVoting()
    }, [dispatch, account, requested, chainId, tokenAddress]) 
    return [ allowanceVoting ]
}

