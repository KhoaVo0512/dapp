import multicall from "utils/multicall";
import poolRunAbi from "config/abi/poolRunAbi.json"
import { getAddress } from "utils/addressHelpers";
import BigNumber from "bignumber.js";
import { useState, useEffect } from "react";
import { Address } from "config/constants/types";
import { SerializedToken } from '@pancakeswap/sdk';
import { ERC20_ABI } from "config/abi/erc20";
// @ts-ignore
// eslint-disable-next-line import/extensions
import { PoolRunInfo, PoolConfig } from "./type";


export const fetchData = async (account:string, poolRunConfig:PoolConfig[], chainId:number): Promise<PoolRunInfo> => {
    const callsStartTime = poolRunConfig.map((item) => {
        return {
            address: getAddress(item.poolContract, chainId),
            name: 'startTime',
            params: []
        }
    })
    const callsEndTime = poolRunConfig.map((item) => {
        return {
            address: getAddress(item.poolContract, chainId),
            name: 'endTime',
            params: []
        }
    })
    const resultStartTime = await multicall(poolRunAbi, callsStartTime, chainId)
    const resultEndTime = await multicall(poolRunAbi, callsEndTime, chainId)
    if ( account ) {
        try {
            const callsUserInfo = poolRunConfig.map((item) => {
                return {
                    address: getAddress(item.poolContract, chainId),
                    name: 'userInfo',
                    params: [account]
                }
            })
            const callsPenddingReward = poolRunConfig.map((item) => {
                return {
                    address: getAddress(item.poolContract, chainId),
                    name: 'pendingReward',
                    params: [account]
                }
            })
            const resultUserInfo = await multicall(poolRunAbi, callsUserInfo, chainId)
            // const resultPenddingReward = await multicall(poolRunAbi, callsPenddingReward, chainId)
            const result = resultUserInfo.map((item, key) => {
                return { 
                    poolId:poolRunConfig[key]?.poolId,
                    tokenStake:poolRunConfig[key]?.tokenStake,
                    tokenEarn:poolRunConfig[key]?.tokenEarn,
                    apy:poolRunConfig[key]?.apy,
                    name:poolRunConfig[key]?.name,
                    withdrawFee:poolRunConfig[key]?.withdrawFee,
                    poolContract:poolRunConfig[key]?.poolContract,
                    widthdrawDescription:poolRunConfig[key]?.widthdrawDescription,
                    amount: new BigNumber(resultUserInfo[0]?.amount.toString()).dividedBy(1E18).toString(),
                    // pendingReward:new BigNumber(item).dividedBy(1E18).toString(),
                    pendingReward:"0",
                    startTimeStake:Number(resultStartTime[key]?.toString()),
                    endTimeStake:Number(resultEndTime[key]?.toString()),
                }
            })
            return {
                listPool : result
            }
        }
        catch(error) {
            console.log(error)
            const result = poolRunConfig.map((item, key) => {
                return { 
                    poolId:item.poolId,
                    tokenStake:item?.tokenStake,
                    tokenEarn:item?.tokenEarn,
                    apy:item.apy,
                    name:item.name,
                    withdrawFee:item.withdrawFee,
                    poolContract:item.poolContract,
                    widthdrawDescription:item.widthdrawDescription,
                    amount: "0",
                    pendingReward:"0",
                    startTimeStake:Number(resultStartTime[key]?.toString()),
                    endTimeStake:Number(resultEndTime[key]?.toString()),
                }
            })
            return {
                listPool : result
            }
           
        }
    } else {
        const result = poolRunConfig.map((item, key) => {
            return { 
                poolId:item.poolId,
                tokenStake:item?.tokenStake,
                tokenEarn:item?.tokenEarn,
                apy:item.apy,
                name:item.name,
                withdrawFee:item.withdrawFee,
                poolContract:item.poolContract,
                widthdrawDescription:item.widthdrawDescription,
                amount: "0",
                pendingReward:"0",
                startTimeStake:Number(resultStartTime[key]?.toString()),
                endTimeStake:Number(resultEndTime[key]?.toString()),
            }
        })
        return {
            listPool : result
        }
    }
}

export const GetPendingRewardByContract = (poolContract:Address, account:string|null, chainId:number, refresh:number ) => {
    const [ pendingReward, setPendingReward ] = useState("0")
    useEffect(() => {
      const fetchPendingReward = async () => {
        try {
             const calls = [
                {
                  address: getAddress(poolContract, chainId),
                  name: 'pendingReward',
                  params: [account]
                },
             ]
            const result = await multicall(poolRunAbi, calls, chainId)
            setPendingReward(new BigNumber(result).dividedBy(1E18).toString())
        } catch (e) {
          console.log(e)
        }
      }
      if (account === null) {
        setPendingReward("0")
      } else {
        fetchPendingReward()
      }
    }, [account, refresh, poolContract, account, chainId ])
  
    return { pendingReward }
}

export const GetApprovePoolContract = (tokenStake:SerializedToken, poolContract:Address, account:string|null, chainId:number, refresh:number ) => {
    const [ allowance, setAllowance ] = useState("0")
    useEffect(() => {
      const fetchAllowance = async () => {
        try {
             const calls = [
                {
                  address: tokenStake.address,
                  name: 'allowance',
                  params: [account, getAddress(poolContract, chainId)]
                },
             ]
            const result = await multicall(ERC20_ABI, calls, chainId)
            setAllowance(new BigNumber(result).dividedBy(1E18).toString())
        } catch (e) {
          console.log(e)
        }
      }
      if (account === null) {
        setAllowance("0")
      } else {
        fetchAllowance()
      }
    }, [tokenStake, poolContract, account, chainId, refresh ])
  
    return { allowance }
}

export const GetAmountDeposit = (poolContract:Address, account:string|null, chainId:number, refresh:number ) => {
    const [ amount, setAmount ] = useState("0")
    useEffect(() => {
      const fetchAmountDeposit = async () => {
        try {
             const calls = [
                {
                  address: getAddress(poolContract, chainId),
                  name: 'userInfo ',
                  params: [account]
                },
             ]
            const [result] = await multicall(poolRunAbi, calls, chainId)
            setAmount(new BigNumber(result?.amount.toString()).dividedBy(1E18).toString() )
        } catch (e) {
          console.log(e)
        }
      }
      if (account === null) {
        setAmount("0")
      } else {
        fetchAmountDeposit()
      }
    }, [poolContract, account, chainId, refresh ])
  
    return { amount }
}