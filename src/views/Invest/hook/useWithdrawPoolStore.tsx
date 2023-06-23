import React, { useCallback, useState } from 'react'
import { useTranslation } from '@pancakeswap/localization'
import { useToast } from '@pancakeswap/uikit'
import BigNumber from 'bignumber.js'
import { poolProposalConfig } from 'config/constants/poolProposal'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'state'
import { useCallWithMarketGasPrice } from 'hooks/useCallWithMarketGasPrice'
import { ToastDescriptionWithTx } from 'components/Toast'
import { usePoolStoreContract } from 'hooks/useContract'
import { fetchData } from 'state/poolProposals/fetchDataUser'
import { fetchDataPool } from 'state/poolProposals/actions'

export const useWithdrawPoolStore = (userAddress, contractAddress, onRefresh, chainId) => {
  const [requestedWithdraw, setRequestedWithdraw] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const { callWithMarketGasPrice } = useCallWithMarketGasPrice()
  const { t } = useTranslation()
  const poolConfig = poolProposalConfig(chainId)
  const poolStoreContract = usePoolStoreContract(contractAddress)
  const [ pendingWithdraw, setPendingWithdraw ] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const handleWithdraw = useCallback(async () => {
    setPendingWithdraw(true)
    try {
      
      const tx = await callWithMarketGasPrice(poolStoreContract, 'withdrawAll', [])
      const receipt = await tx.wait()
      if (receipt.status) {
        toastSuccess(
          t('Successful Withdraw'),
          <ToastDescriptionWithTx txHash={receipt.transactionHash}/>
        )
        setRequestedWithdraw(true)
        setPendingWithdraw(false)
        onRefresh(Date.now())
      } else {
        // user rejected tx or didn't go thru
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        setRequestedWithdraw(false)
        setPendingWithdraw(false)
      }
    } catch (e) {
      console.error(e)
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      setPendingWithdraw(false)
    } finally {
      try {
        const result = await fetchData(userAddress, poolConfig, chainId)
          dispatch(fetchDataPool(result))
      } catch (e) {
          console.log(e)
      }
    }
  }, [
    poolStoreContract,
    t,
    dispatch,
    userAddress,
    toastError,
    toastSuccess,
    callWithMarketGasPrice,
    setPendingWithdraw,
    onRefresh
  ])

  return { handleWithdraw, requestedWithdraw, pendingWithdraw }
}
