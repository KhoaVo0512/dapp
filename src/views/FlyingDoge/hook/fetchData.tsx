import { useEffect, useState } from "react";
import { ERC20_ABI } from "config/abi/erc20";
import { useFastRefreshEffect } from "hooks/useRefreshEffect";
import BigNumber from "bignumber.js";
import multicall from '../../../utils/multicall';
import { getAddress } from "../../../utils/addressHelpers";
import contracts from "../../../config/constants/contracts";
import CoreDogePresaleAbi from '../../../config/abi/RunMarketplaceAbi.json';

export const GetSimpleSellItem = (chainId:number, account, refresh) => {
    const [ sellItems, setSellItems ] = useState([])
    useFastRefreshEffect(() => {
        const getSimpleSellIetms = async () => {
            try {
                const calls = [
                    {
                        address: getAddress(contracts.corePresale, chainId),
                        name: 'saleItems',
                        params: [account]
                    }
                ]
                const result = await multicall(CoreDogePresaleAbi, calls, chainId);
                setSellItems(result)
            }
            catch(error) {
                console.log(error)
            }
        }
        if (account) {
            getSimpleSellIetms()
        }
      }, [account, refresh, chainId])
    return { sellItems }
}

export const GetPaidToken = (chainId:number, account , refresh) => {
    const [ paidToken, setPaidToken ] = useState([])
    useFastRefreshEffect(() => {
        const getSimpleSellIetms = async () => {
            try {
                const calls = [
                    {
                        address: getAddress(contracts.corePresale, chainId),
                        name: 'paidIdoMap',
                        params: [account]
                    }
                ]
                const result = await multicall(CoreDogePresaleAbi, calls, chainId);
                setPaidToken(result)
            }
            catch(error) {
                console.log(error)
            }
        }
        if (account) {
            getSimpleSellIetms()
        }
      }, [account, refresh, chainId])
    return { paidToken }
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