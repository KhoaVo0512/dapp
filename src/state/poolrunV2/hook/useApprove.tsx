import React, { useCallback, useState, useEffect } from 'react'
import { useTranslation } from '@pancakeswap/localization'
import { useToast } from '@pancakeswap/uikit'
import { useCallWithMarketGasPrice } from 'hooks/useCallWithMarketGasPrice'
import { ToastDescriptionWithTx } from 'components/Toast'
import { useERC20 } from 'hooks/useContract'
import { MaxUint256 } from '@ethersproject/constants'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { getAddress } from 'utils/addressHelpers'

export const useApprove = (poolContract, tokenStakedAddress, chainId, onRefresh) => {
    const { toastSuccess, toastError } = useToast()
    const { callWithMarketGasPrice } = useCallWithMarketGasPrice()
    const { t } = useTranslation()
    const { account } = useActiveWeb3React()
    const contractAddress = useERC20(tokenStakedAddress)
    const poolAddress = getAddress(poolContract, chainId)
    const [ pendingApprove, setPending ] = useState(false)
    const handleApprove = useCallback(async () => {
        setPending(true)
        try {
            const tx = await callWithMarketGasPrice(contractAddress, 'approve', [poolAddress, MaxUint256])
            const receipt = await tx.wait()
            if (receipt?.status) {
                toastSuccess(
                    t('Contract Enabled'),
                    <ToastDescriptionWithTx txHash={receipt.transactionHash}/>
                  )
                setPending(false)
            }
        } catch (error) {
            toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
            setPending(false)
        } finally {
            setPending(false)
            onRefresh(Date.now())
        }
    }, [
        contractAddress,
        poolAddress,
        chainId,
        onRefresh,
        t,
        toastSuccess,
        callWithMarketGasPrice,
    ])
  
    useEffect(() => {
        setPending(false)
    }, [account]) 

    return { handleApprove, pendingApprove }
  }
