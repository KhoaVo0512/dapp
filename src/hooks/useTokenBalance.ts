import { useState,useMemo, useEffect} from 'react'
import { useWeb3React } from '@pancakeswap/wagmi'
import BigNumber from 'bignumber.js'
import { CAKE } from '@pancakeswap/tokens'
import { FAST_INTERVAL } from 'config/constants'
import { BigNumber as EthersBigNumber } from '@ethersproject/bignumber'
import { Zero } from '@ethersproject/constants'
import { ChainId } from '@pancakeswap/sdk'
import axios from 'axios'
import useSWR from 'swr'
import { getTokenPrice } from 'state/pools/helpers'
import { BIG_ZERO } from 'utils/bigNumber'
import { bscRpcProvider } from 'utils/providers'
import { useTokenContract } from './useContract'
import { useSWRContract } from './useSWRContract'
import useRefresh from './useRefresh'

const useTokenBalance = (tokenAddress: string, forceBSC?: boolean) => {
  const { account } = useWeb3React()

  const contract = useTokenContract(tokenAddress, false)

  const key = useMemo(
    () =>
      account
        ? {
            contract: forceBSC ? contract.connect(bscRpcProvider) : contract,
            methodName: 'balanceOf',
            params: [account],
          }
        : null,
    [account, contract, forceBSC],
  )

  const { data, status, ...rest } = useSWRContract(key as any, {
    refreshInterval: FAST_INTERVAL,
  })

  return {
    ...rest,
    fetchStatus: status,
    balance: data ? new BigNumber(data.toString()) : BIG_ZERO,
  }
}

export const useGetTokenPrice = (tokenAddress: string) => {
  const [tokenPrice, setTokenPrice] = useState(BIG_ZERO)
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    const source = axios.CancelToken.source()
    const fetchBalance = async () => {
      try {
        const tokenPriceObject = await getTokenPrice(tokenAddress)
        setTokenPrice(new BigNumber(tokenPriceObject?.usdPrice.toString()))
      } catch (e) {
        if (axios.isCancel(e)) {
          console.log(e)
        } else {
          console.log(e)
        }
      }
    }

    fetchBalance()
    return () => {
      source.cancel()
    }
  }, [tokenAddress, setTokenPrice, slowRefresh])
  return tokenPrice
}



export const useGetBnbBalance = () => {
  const { account } = useWeb3React()
  const { status, data, mutate } = useSWR([account, 'bnbBalance'], async () => {
    return bscRpcProvider.getBalance(account)
  })

  return { balance: data || Zero, fetchStatus: status, refresh: mutate }
}

export const useGetCakeBalance = () => {
  const { chainId } = useWeb3React()
  const { balance, fetchStatus } = useTokenBalance(CAKE[chainId]?.address || CAKE[ChainId.BSC]?.address, true)

  // TODO: Remove ethers conversion once useTokenBalance is converted to ethers.BigNumber
  return { balance: EthersBigNumber.from(balance.toString()), fetchStatus }
}

export default useTokenBalance
