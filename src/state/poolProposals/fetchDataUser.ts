import BigNumber from "bignumber.js";
import poolProposalsAbi from "config/abi/poolProposals.json";
import poolStoreAbi from "config/abi/poolStore.json";
import votingProposalsAbi from "config/abi/votingProposals.json";
import contracts from "config/constants/contracts";
import { ERC20_ABI } from 'config/abi/erc20'
import { getAddress } from "utils/addressHelpers";
import multicall from "utils/multicall";
import { poolProposalItem } from "config/constants/poolProposal/constants/type"
import { ListSnapshot, MinAmoutToVoting, SnapshotCount, userStaked } from "./type"; 

export const fetchData = async (account:string, poolProposals:poolProposalItem[], chainId:number): Promise<userStaked> => {
    // sử dụng Promise.all để call
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const fetchStartTime = async (poolProposals:poolProposalItem[], chainId) => {
        const callsStartTime = poolProposals.map((item) => {
            return {
                address: getAddress(item.storeContract, chainId),
                name: 'startTime',
                params: []
            }
        })
        const resultStartTime = await multicall(poolProposalsAbi, callsStartTime, chainId)
        return resultStartTime
    }
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const fetchEndTime = async (poolProposals:poolProposalItem[], chainId) => {
        const callsEndTime = poolProposals.map((item) => {
            return {
                address: getAddress(item.storeContract, chainId),
                name: 'endTime',
                params: []
            }
        })
        const resultEndTime = await multicall(poolProposalsAbi, callsEndTime, chainId)
        return resultEndTime
    }
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const fetchTvl = async (poolProposals:poolProposalItem[], chainId) => {
        const callsTvl = poolProposals.map((item) => {
            return {
                address: item.tokenStake.address,
                name: 'balanceOf',
                params: [getAddress(item.storeContract, chainId)]
            }
        })
        const resultTvl = await multicall(ERC20_ABI, callsTvl, chainId)
        return resultTvl
    }
    const [resultStartTime, resultEndTime, resultTvl] = await Promise.all([
        fetchStartTime(poolProposals, chainId),
        fetchEndTime(poolProposals, chainId),
        fetchTvl(poolProposals, chainId)
    ])
    
    if ( account ) {
        try {
            const callsUserInfo = poolProposals.map((item) => {
                return {
                    address: getAddress(item.storeContract, chainId),
                    name: 'userInfo',
                    params: [account]
                }
            })
            const callsPenddingReward = poolProposals.map((item) => {
                return {
                    address: getAddress(item.storeContract, chainId),
                    name: 'pendingReward',
                    params: [account]
                }
            })
            const resultUserInfo = await multicall(poolProposalsAbi, callsUserInfo, chainId)
            const resultPenddingReward = await multicall(poolProposalsAbi, callsPenddingReward, chainId)
            const result = resultPenddingReward.map((item, key) => {
                return { 
                    ...poolProposals[key],
                    amount:new BigNumber(resultUserInfo[key].amount.toString()).dividedBy(1E18).toString(),
                    stakeBlock:Number(new BigNumber(resultUserInfo[key]?.stakeBlock.toString())),
                    unstakeLockTime:Number(resultUserInfo[key]?.unstakeLockTime.toString()),
                    pendingReward:new BigNumber(resultPenddingReward[key].toString()).dividedBy(1E18).toString(),
                    endTime:Number(resultEndTime[key]?.toString()),
                    startTime:Number(resultStartTime[key]?.toString()),
                    tvl: (new BigNumber(resultTvl[key]).dividedBy(1E18)).toString()
                }
            })
            return {
                userStaked : result
            }
        }
        catch(error) {
            console.log(error)
            const result = resultStartTime.map((item, key) => {
                return { 
                    ...poolProposals[key],
                    amount: "0",
                    stakeBlock:0,
                    unstakeLockTime:0,
                    pendingReward:"0",
                    endTime:Number(resultEndTime[key]?.toString()),
                    startTime:Number(resultStartTime[key]?.toString()),
                    tvl: (new BigNumber(resultTvl[key]).dividedBy(1E18)).toString()
                }
            })
            return {
                userStaked :result
            }
           
        }
    } else {
        const result = resultStartTime.map((item, key) => {
            return { 
                ...poolProposals[key],
                amount: "0",
                stakeBlock:0,
                unstakeLockTime:0,
                pendingReward:"0",
                endTime:Number(resultEndTime[key]?.toString()),
                startTime:Number(resultStartTime[key]?.toString()),
                tvl: (new BigNumber(resultTvl[key]).dividedBy(1E18)).toString()
            }
        })
        return {
            userStaked : result
        }
    }
    
}

export const fetchMinToVote = async (chainId:number): Promise<MinAmoutToVoting> => {
    try {
        const calls = [
            {
                address: getAddress(contracts.votingProposals,chainId),
                name: 'openingAmount',
                params: []
            }
        ]
        const [ resultMinAmount ] = await multicall(votingProposalsAbi,calls,chainId)
        
        return {
            minAmountToVote:Number((resultMinAmount?.toString()))/1E18
        }
    }
    catch(error) {
        console.log(error)
        return {
            minAmountToVote:0
        }
       
    }
    
}

export const fetchDataSnapShorCount = async (poolStoreAddress:string): Promise<SnapshotCount> => {
    try {
        const calls = [
            {
                address: poolStoreAddress,
                name: 'snapshotCount',
                params: []
            }
        ]
        const [ resultSnapShortCount ] = await multicall(poolStoreAbi, calls)
        return {
            snapshotCount:Number((resultSnapShortCount?.toString()))
        }
    }
    catch(error) {
        console.log(error)
        return {
            snapshotCount:0
        }
       
    }
}
export const fetchDataSnapShorList = async (snapshotCount:number, poolStoreAddress:string): Promise<ListSnapshot> => {
    if ( snapshotCount > 0 ) {
        try {
            const listBlockNumber = []
            const listProfit = []
            for (let index = 1; index < snapshotCount; index++) {
                listProfit.push({
                    address: poolStoreAddress,
                    name: 'listProfitAmount',
                    params: [index]
                })
                listBlockNumber.push({
                    address: poolStoreAddress,
                    name: 'blockNumber',
                    params: [index]
                })
            }
            const resultListProfit = await multicall(poolStoreAbi, listProfit)
            const resultListBlock = await multicall(poolStoreAbi, listBlockNumber)
            const result = resultListProfit.map((item, key) => {
                return { 
                    listProfitAmount:Number((resultListProfit[key]?.toString()))/1E18,
                    blockNumber:Number((resultListBlock[key]?.toString()))
                }
            })
            return {
                listSnapShot:result
            }
        }
        catch(error) {
            console.log(error)
            return {
                listSnapShot:[
                    {
                        listProfitAmount:0,
                        blockNumber:0
                    }
                ]
            }
           
        }
    } else {
        return {
            listSnapShot:[
                {
                    listProfitAmount:0,
                    blockNumber:0
                }
            ]
        }
    }
}
