import { useEffect, useState } from "react";
import { ERC20_ABI } from "config/abi/erc20";
import { useFastRefreshEffect } from "hooks/useRefreshEffect";
import BigNumber from "bignumber.js";
import multicall from '../../../utils/multicall';
import { getAddress } from "../../../utils/addressHelpers";
import contracts from "../../../config/constants/contracts";
import corePresaleAbi from '../../../config/abi/corePresaleAbi.json';


export const GetSimpleSellItem = (chainId:number, saleId, refresh) => {
    const [ sellItems, setSellItems ] = useState([])
    useFastRefreshEffect(() => {
        const getSimpleSellIetms = async () => {
            try {
                const calls = [
                    {
                        address: getAddress(contracts.corePresale, chainId),
                        name: 'saleItems',
                        params: [saleId]
                    }
                ]
                const result = await multicall(corePresaleAbi, calls, chainId);
                setSellItems(result)
            }
            catch(error) {
                console.log(error)
            }
        }
        if (saleId) {
            getSimpleSellIetms()
        }
      }, [saleId, refresh, chainId])
    return { sellItems }
}

export const GetPaidToken = (chainId:number, account , refresh) => {
    const [ paidToken, setPaidToken ] = useState({})
    useFastRefreshEffect(() => {
        const getSimpleSellIetms = async () => {
            try {
                const calls = [
                    {
                        address: getAddress(contracts.corePresale, chainId),
                        name: 'paidIdoMap',
                        params: [account]
                    },
                    {
                        address: getAddress(contracts.corePresale, chainId),
                        name: 'vestingAmountMap',
                        params: [account]
                    },
                    {
                        address: getAddress(contracts.corePresale, chainId),
                        name: 'whitelistMap',
                        params: [account] 
                    },
                    {
                        address: getAddress(contracts.corePresale, chainId),
                        name: 'totalOfPaid',
                        params: []
                    },
                    {
                        address: getAddress(contracts.corePresale, chainId),
                        name: 'nextStageIndex',
                        params: [account]
                    },
                    {
                        address: getAddress(contracts.corePresale, chainId),
                        name: 'startBuyTime',
                        params: []
                    },
                    {
                        address: getAddress(contracts.corePresale, chainId),
                        name: 'endBuyTime',
                        params: []
                    },
                    {
                        address: getAddress(contracts.corePresale, chainId),
                        name: 'maxAllocation',
                        params: []
                    }
                ]
                const result = await multicall(corePresaleAbi, calls, chainId);
                const paidBalance = new BigNumber(result[0]).multipliedBy(80).dividedBy(1E18).toNumber();
                const vestingBalance = new BigNumber(result[1]).dividedBy(1E18).toNumber();
                const isWhitelist = Boolean(result[2][0]);
                const totalPaid = new BigNumber(result[3]).multipliedBy(80).dividedBy(1E18).toNumber();
                const nextStageIndex = new BigNumber(result[4]).toNumber();
                const startBuyTime = new BigNumber(result[5]).toNumber();
                const endBuyTime = new BigNumber(result[6]).toNumber();
                const maxAllocation = new BigNumber(result[7]).multipliedBy(80).dividedBy(1E18).toNumber();

                setPaidToken({paidBalance,vestingBalance,isWhitelist,totalPaid,nextStageIndex,startBuyTime,endBuyTime,maxAllocation})
            }
            catch(error) {
                console.log(error)
            }
        }
        if (account?.length && chainId) {
            getSimpleSellIetms()
        } else {
            setPaidToken({})
        }
      }, [account, refresh, chainId])

    return { paidToken }
}

export const GetPresaleInfo = (chainId:number , refresh) => {
    const [ presaleInfo, setPresaleInfo ] = useState({})
    useFastRefreshEffect(() => {
        const getSimpleSellIetms = async () => {
            try {
                const calls = [
                    {
                        address: getAddress(contracts.corePresale, chainId),
                        name: 'totalOfPaid',
                        params: []
                    },
                    {
                        address: getAddress(contracts.corePresale, chainId),
                        name: 'startBuyTime',
                        params: []
                    },
                    {
                        address: getAddress(contracts.corePresale, chainId),
                        name: 'endBuyTime',
                        params: []
                    },
                    {
                        address: getAddress(contracts.corePresale, chainId),
                        name: 'maxAllocation',
                        params: []
                    }
                ]
                const result = await multicall(corePresaleAbi, calls, chainId);
                const totalOfPaid = new BigNumber(result[0]).multipliedBy(80).dividedBy(1E18).toNumber();
                const startBuyTime = new BigNumber(result[1]).toNumber();
                const endBuyTime = new BigNumber(result[2]).toNumber();
                const maxAllocation = new BigNumber(result[3]).multipliedBy(80).dividedBy(1E18).toNumber();

                setPresaleInfo({totalOfPaid,startBuyTime,endBuyTime,maxAllocation})
            }
            catch(error) {
                console.log(error)
            }
        }
        getSimpleSellIetms()
      }, [refresh, chainId])

    return { presaleInfo }
}

export const GetStageList = (chainId:number, index: number, refresh) => {
    const [ stagelist, setStageList ] = useState({})
    useFastRefreshEffect(() => {
        const getSimpleSellIetms = async () => {
            try {
                const calls = [
                    {
                        address: getAddress(contracts.corePresale, chainId),
                        name: 'stageList',
                        params: [index]
                    }
                ]
                const [result] = await multicall(corePresaleAbi, calls, chainId);
                const item = {
                    index:  Number(result[0]),
                    percent:  Number(result[1]),
                    timestamp:  Number(result[2])
                }
                setStageList(item)
            }
            catch(error) {
                console.log(error)
            }
        }
        getSimpleSellIetms()
      }, [refresh, chainId,index])

    return { stagelist }
}

export const FetchDataUser = (requestedApproval, chainId:number, tokenAddress:string, account:string|undefined) => {
    const [ dataBalance, setDataBalance ] = useState({
        balanceOf:"0",
        isApprove:0
    })
    useEffect(() => {
      const fetchBalance = async () => {
        try {
             const calls = [
                {
                    address: tokenAddress,
                    name: 'balanceOf',
                    params: [account]
                },
                {
                    address: tokenAddress,
                    name: 'allowance',
                    params: [account, getAddress(contracts.runMarketplace, chainId)]
                },
             ]
            const [ resultBalance, allowance ] = await multicall(ERC20_ABI, calls, chainId)
            setDataBalance({
                balanceOf: (new BigNumber(resultBalance).dividedBy(1E18).toString()),
                isApprove: Number(new BigNumber(allowance).toJSON())
            })
        } catch (e) {
          console.log(e)
        }
      }
  
      if (account) {
        fetchBalance()
      }
    }, [account, chainId, requestedApproval, tokenAddress])
    return { dataBalance }
}