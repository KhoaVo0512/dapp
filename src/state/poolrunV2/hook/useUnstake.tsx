import React, { useCallback, useState, useEffect } from 'react'
import { useTranslation } from '@pancakeswap/localization'
import { useToast } from '@pancakeswap/uikit'
import { useCallWithMarketGasPrice } from 'hooks/useCallWithMarketGasPrice'
import { ToastDescriptionWithTx } from 'components/Toast'
import { usePoolRun } from 'hooks/useContract'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'state'
import { fetchData } from "state/poolrunV2/fetchData"
import { fetchPoolInfo } from "state/poolrunV2/actions"
import BigNumber from 'bignumber.js'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { getPoolConfig } from 'config/constants/poolRun/constants'
import { PoolConfig } from 'config/constants/poolRun/constants/type'


export const useUnStake = (poolAddress, totalStakeAmount, onRefresh, onChangeIndex) => {
    const { toastSuccess, toastError } = useToast()
    const { callWithMarketGasPrice } = useCallWithMarketGasPrice()
    const { t } = useTranslation()
    const { chainId, account } = useActiveWeb3React()
    const contractAddress = usePoolRun(poolAddress)
    const [ pendingUnStake, setPendingUnstake ] = useState(false)
    const convertAmountWithdraw = new BigNumber(totalStakeAmount).multipliedBy(1E18).toString()
    
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
    const handleUnStake = useCallback(async () => {
        setPendingUnstake(true)
        try {
            const tx = await callWithMarketGasPrice(contractAddress, 'withdraw', [convertAmountWithdraw])
            const receipt = await tx.wait()
            if (receipt?.status) {
                toastSuccess(
                    t('Successful unstake'),
                    <ToastDescriptionWithTx txHash={receipt.transactionHash}/>
                  )
                  setPendingUnstake(false)
            }
        } catch (error: any) {
            if(error?.reason === "execution reverted") {
                const tx = await callWithMarketGasPrice(contractAddress, 'emergencyWithdraw', [])
                const receipt = await tx.wait()
                if (receipt?.status) {
                    toastSuccess(
                        t('Successful unstake'),
                        <ToastDescriptionWithTx txHash={receipt.transactionHash}/>
                    )
                    setPendingUnstake(false)
                }
            }
            else {
                toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
            }
            setPendingUnstake(false)
            console.log('errorUnstake', error?.reason)
        } finally {
            setPendingUnstake(false)
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
        convertAmountWithdraw,
        t,
        toastSuccess,
        callWithMarketGasPrice,
    ])
    useEffect(() => {
        setPendingUnstake(false)
    }, [account]) 
    return { handleUnStake, pendingUnStake }
  }
