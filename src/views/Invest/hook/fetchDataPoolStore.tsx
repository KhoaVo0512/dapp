import BigNumber from "bignumber.js";
import poolProposalAbi from "config/abi/poolProposals.json";
import poolStoreAbi from "config/abi/poolStore.json";
import { useEffect, useState } from "react";
import multicall from "utils/multicall";

export const GetTotalProfitAmount = (contractAddress, refresh, chainId) => {
    const [ totalProfitAmount, setTotalProfitAmount ] = useState(0)
    useEffect(() => {
        const getTotalProfitAmount = async () => {
            try {
                const calls = [
                    {
                    address: contractAddress,
                    name: 'lastTotalProfitAmount ',
                    params: []
                  }
            ]
                const resultTotalProfitAmount = await multicall(poolStoreAbi, calls, chainId)
                setTotalProfitAmount(Number(new BigNumber(resultTotalProfitAmount[0].toString()).dividedBy(1E18)))
            }
            catch(error) {
                console.log(error)
            }
        }
        getTotalProfitAmount()
      }, [contractAddress, refresh, chainId])
    return { totalProfitAmount }
}

export const GetPendingRewardPoolStore = (contractAddress, refresh,callback, account, chainId) => {
    const [ pendingRewardPoolStore, setPendingReward ] = useState(0)
    useEffect(() => {
        const getTotalProfitAmount = async () => {
            try {
                const calls = [
                    {
                        address: contractAddress,
                        name: 'pendingRewardAll',
                        params: [account]
                    },
                ]
                const [ resultPenddingReward ] = await multicall(poolStoreAbi, calls, chainId)
                setPendingReward(Number(new BigNumber(resultPenddingReward.toString()))/1E18)
            }
            catch(error) {
                console.log(error)
            }
        }
        if (account && contractAddress) {
            getTotalProfitAmount()
        }
      }, [ contractAddress, refresh, account,callback, chainId ])

    return { pendingRewardPoolStore }
}

export const GetPendingRewardProposal = (contractAddress,callback, refresh, account, chainId) =>{
    const [pendingProposal,setpendingProposal] = useState(0);
    useEffect(() => {
        const getTotalProposal = async () => {
            try {
                const calls = [
                    {
                        address: contractAddress,
                        name: 'pendingReward',
                        params: [account]
                    },
                ]
                const [ resultPenddingReward ] = await multicall(poolProposalAbi, calls, chainId);
                setpendingProposal(Number((resultPenddingReward.toString()))/1E18)
            }
            catch(error) {
                console.log(error)
            }
        }
        if (account && contractAddress) {
            getTotalProposal()
        }
      }, [ contractAddress, account, callback, refresh])
      return {pendingProposal}
}
export const GetSnapshotCount = (poolStoreAddress, chainId) =>{
    const [snapshotCount,setSnapshotCount] = useState(0);
    useEffect(() => {
        const getSnapshotCount = async () => {
            try {
                const calls = [
                    {
                        address: poolStoreAddress,
                        name: 'snapshotCount',
                        params: []
                    }
                ]
                const [ resultSnapShortCount ] = await multicall(poolStoreAbi, calls, chainId)
                setSnapshotCount(Number((resultSnapShortCount?.toString())))
            }
            catch(error) {
                console.log(error)
                setSnapshotCount(0)
               
            }
        }
        if (poolStoreAddress) {
            getSnapshotCount()
        } else {
            setSnapshotCount(0)
        }
      }, [ poolStoreAddress, chainId ])
      return {snapshotCount}
}

export const GetSnapshotList = (poolStoreAddress, poolLength, chainId) =>{
    const [snapshotList,setSnapshotList] = useState([]);
    useEffect(() => {
        const getSnapshotList = async () => {
            try {
                const calls = []
                const newarr = [];
                for (let i = 0; i < poolLength; i++) {
                    calls.push(
                        {
                            address: poolStoreAddress,
                            name: 'poolInfo',
                            params: [i]
                        }
                    )
                }
                const resultPoolInfo = await multicall(poolStoreAbi, calls, chainId)
                for (let i = 0; i < resultPoolInfo?.length; i++) {     
                    if (resultPoolInfo[i]?.isStopPool === true) {
                        newarr.push({
                            lastRewardBlock:Number(new BigNumber(resultPoolInfo[i].lastRewardBlock.toString())),
                            lastTimestamp:Number(new BigNumber(resultPoolInfo[i].lastTimestamp.toString())),
                            totalProfitAmount:Number(new BigNumber(resultPoolInfo[i].totalProfitAmount.toString()).dividedBy(1E18)),
                        })
                    }       
                   
                }              
                setSnapshotList(newarr);
            }
            catch(error) {
                console.log(error)
                setSnapshotList([])
            }
        }
        if (poolLength && poolStoreAddress) {
            getSnapshotList()
        } else {
            setSnapshotList([])
        }
      }, [ poolStoreAddress, poolLength, chainId])
      return {snapshotList}
}
