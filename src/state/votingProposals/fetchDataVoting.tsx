
import BigNumber from "bignumber.js";

import axios from "axios";
import { ERC20_ABI } from "config/abi/erc20";
import votingProposalsAbi from "config/abi/votingProposals.json";
import contracts from "config/constants/contracts";
import { getAddress } from "utils/addressHelpers";
import multicall from "utils/multicall";
import { AllowanceType, ProposalInfo, ListVoting, ListVotingData, countMintoWin } from "./type";

export const fetchProposalsInfo = async (chainId:number): Promise<ProposalInfo> => {
    try {
        const calls = [
            {
                address: getAddress(contracts.votingProposals,chainId),
                name: 'getCountProposal',
                params: []
            },
            {
                address: getAddress(contracts.votingProposals,chainId),
                name: 'minAmountToWin',
                params: []
            }
        ]
        const [ resultCountProposal, resultMinAmountToWin ] = await multicall(votingProposalsAbi,calls,chainId)
        return {
            countProposals:Number(new BigNumber(resultCountProposal).toJSON()),
            minAmountToWin:Number(new BigNumber(resultMinAmountToWin).dividedBy(1E18).toString())
        }
    }
    catch(error) {
        console.log(error)
        return {
            countProposals:0,
            minAmountToWin:0
        }
    }
}

export const fetchVoting = async (totalVoting:number,chainId:number): Promise<ListVoting> => {
    const convertData = []
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const fetchProposals = async (totalVoting, chainId) => {
        const callsProposals = [];
        for (let index = 0; index < totalVoting; index++) {
            callsProposals.push(
                {
                    address: getAddress(contracts.votingProposals,chainId),
                    name: 'proposals',
                    params: [index]
                },
            )
        }
        const resultProposals = await multicall(votingProposalsAbi, callsProposals, chainId)
        // eslint-disable-next-line @typescript-eslint/no-shadow
        return resultProposals
    }
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const fetchCounterAgree = async (totalVoting, chainId) => {
        const callVoteCounterAgree = [];
        for (let index = 0; index < totalVoting; index++) {
            callVoteCounterAgree.push(
                {
                    address: getAddress(contracts.votingProposals,chainId),
                    name: 'voteCounter',
                    params: [index, true]
                },
            )
        }
        const resultVoteCounterAgree = await multicall(votingProposalsAbi, callVoteCounterAgree, chainId)
        // eslint-disable-next-line @typescript-eslint/no-shadow
        return resultVoteCounterAgree
    }
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const fetchCounterDisagree = async (totalVoting, chainId) => {
        const callVoteCounterDisAgree = [];
        for (let index = 0; index < totalVoting; index++) {
            callVoteCounterDisAgree.push(
                {
                    address: getAddress(contracts.votingProposals,chainId),
                    name: 'voteCounter',
                    params: [index, false]
                },
            )
        }
        const resultVoteCounterDisAgree = await multicall(votingProposalsAbi, callVoteCounterDisAgree, chainId)
        return resultVoteCounterDisAgree
    }
    if ( totalVoting > 0 ) {
       
        try {
            const [resultProposals, resultVoteCounterAgree, resultVoteCounterDisAgree] = await Promise.all([
                fetchProposals(totalVoting, chainId),
                fetchCounterAgree(totalVoting, chainId),
                fetchCounterDisagree(totalVoting, chainId)
            ])
            for( let index = 0; index < resultProposals.length; index++ ){
                convertData.push(
                    {
                        votingId:index,
                        ownerAddress:resultProposals[index].chairPerson,
                        startTime:Number(resultProposals[index].startTime.toString()),
                        endTime:Number(resultProposals[index].endTime.toString()),
                        agree:(new BigNumber(resultVoteCounterAgree[index]).dividedBy(1E18)).toString(),
                        disagrees:(new BigNumber(resultVoteCounterDisAgree[index]).dividedBy(1E18)).toString(),
                    }
                ) 
            }
            return {
                listVoting:convertData
            }
        }
        catch(error) {
            console.log(error)
            return {
                listVoting:convertData
            }
        }
    } else {
            return {
                listVoting:convertData
            }
    }
}



export const fetchVotingData = async (votingId:number, voteConfig:string): Promise<ListVotingData> => {
    if ( voteConfig.length ) {
        try {
            const {data: response} = await axios({
                method: 'GET',
                url: `${voteConfig}id=${votingId}`,
            });
            const listVotingSnapShort = response?.result
            const result = listVotingSnapShort.map((item, key) => {
                const partAmount = new BigNumber(item?.amount)
                const convertAmountVote = partAmount.dividedBy(1E18).toString()
                return {
                    transactionHash:item?.transaction_hash,
                    amount:convertAmountVote,
                    option:item?.option,
                    voter:item?.voter
                }
            })
            .sort((item1,item2) => item2.amount - item1.amount)
            return {
                listVotingData:result
            }
        }
        catch(error) {
            console.log(error)
            return {
                listVotingData:[
                    {
                        transactionHash:"",
                        amount:"0",
                        option:false,
                        voter:""
                    }
                ]
            } 
        }
    } else {
        return {
            listVotingData:[
                {
                    transactionHash:"",
                    amount:"0",
                    option:false,
                    voter:""
                }
            ]
        } 
    }
}

export const fetchAllowance = async (account:string,chainId:number,tokenAdress:any): Promise<AllowanceType> => {
    
    if ( account ) {
        try {
            const calls = [
                {
                    address: tokenAdress,
                    name: 'allowance',
                    params: [account, getAddress(contracts.votingProposals,chainId)]
                }
            ]           
            const [ result ] = await multicall(ERC20_ABI,calls,chainId)           
            return {
                allowance:Number(new BigNumber(result).toString())/1E18
            }
        }
        catch(error) {          
            console.log(error)
            return {
                allowance:0
            }
           
        }
    } else {       
        return {
            
            allowance:0
        }
    }
}
