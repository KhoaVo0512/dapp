import React, { useCallback, useState, useEffect } from 'react'
import { useTranslation } from '@pancakeswap/localization'
import { useToast } from '@pancakeswap/uikit'
import { useCallWithMarketGasPrice } from 'hooks/useCallWithMarketGasPrice'
import { ToastDescriptionWithTx } from 'components/Toast'
import { usePoolRun } from 'hooks/useContract'
import { getAddress } from 'utils/addressHelpers'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'state'
import { fetchData } from "state/poolrunV2/fetchData"
import { fetchPoolInfo } from "state/poolrunV2/actions"
import BigNumber from 'bignumber.js'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { getPoolConfig } from 'config/constants/poolRun/constants'
import { PoolConfig } from 'config/constants/poolRun/constants/type'


export const useStake = (poolAddress, stakeAmount, onRefresh, onChangeIndex) => {
    const { toastSuccess, toastError } = useToast()
    const { callWithMarketGasPrice } = useCallWithMarketGasPrice()
    const { t } = useTranslation()
    const { chainId, account } = useActiveWeb3React()
    const contractAddress = usePoolRun(poolAddress)
    const [ pendingStake, setPending ] = useState(false)
    const convertAmountDeposit = new BigNumber(stakeAmount).multipliedBy(1E18).toString()
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-shadow
    const getActivePool = async (chainId: number) => {
        const poolConfig = await getPoolConfig(chainId)
        return poolConfig
    }
    const [ poolConfig, setPoolConfig ] =  useState<PoolConfig[]>([])
    useEffect(
    () => {
        const fetchPools = async () => {
            const activePools = await getActivePool(chainId)
            setPoolConfig(activePools)
        }
        fetchPools()
    },[chainId],
    )
    const dispatch = useDispatch<AppDispatch>()
    const handleStake = useCallback(async () => {
        setPending(true)
        try {
            const tx = await callWithMarketGasPrice(contractAddress, 'deposit', [convertAmountDeposit])
            const receipt = await tx.wait()
            if (receipt?.status) {
                toastSuccess(
                    t('Successful staking'),
                    <ToastDescriptionWithTx txHash={receipt.transactionHash}/>
                  )
                setPending(false)
            }
        } catch (error) {
            toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
            setPending(false)
            console.log(error)
        } finally {
            setPending(false)
            onRefresh(Date.now())
            onChangeIndex(Date.now())
            const result = await fetchData(account, poolConfig, chainId )
            dispatch(fetchPoolInfo(result))
        }
    }, [
        contractAddress,
        chainId,
        poolConfig,
        onRefresh,
        convertAmountDeposit,
        t,
        toastSuccess,
        callWithMarketGasPrice,
    ])
    
    useEffect(() => {
        setPending(false)
    }, [account]) 

    return { handleStake, pendingStake }
  }
