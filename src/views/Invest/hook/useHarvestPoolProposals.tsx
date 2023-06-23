import React, { useCallback, useState } from 'react'
import { useTranslation } from '@pancakeswap/localization'
import BigNumber from 'bignumber.js'
import { useToast } from '@pancakeswap/uikit'
import { useCallWithMarketGasPrice } from 'hooks/useCallWithMarketGasPrice'
import { ToastDescriptionWithTx } from 'components/Toast'
import contract from 'config/constants/contracts'
import { getAddress } from 'utils/addressHelpers'
import { usePoolProposalsContract } from 'hooks/useContract'

export const useHavest = (contractAddress,useAddress, onRefresh) => {
  const [requestedHarvest, setRequestedHarvest] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const { callWithMarketGasPrice } = useCallWithMarketGasPrice()
  const { t } = useTranslation()
  const poolProposalsContract = usePoolProposalsContract(contractAddress)
  const [ pendingHarvestd, setPendingHarvestd ] = useState(false)
  const handleHarvest = useCallback(async () => {
    setPendingHarvestd(true)
    try {
      const tx = await callWithMarketGasPrice(poolProposalsContract, 'withdraw', [0, useAddress])
      const receipt = await tx.wait()

      if (receipt.status) {
        toastSuccess(
          t('Successful harvest'),
          <ToastDescriptionWithTx txHash={receipt.transactionHash}/>
        )
        setRequestedHarvest(true)
        setPendingHarvestd(false)
        onRefresh(Date.now())
      } else {
        // user rejected tx or didn't go thru
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        setRequestedHarvest(false)
        setPendingHarvestd(false)
      }
    } catch (e) {
      console.error(e)
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      setPendingHarvestd(false)
    } finally {
      setPendingHarvestd(false)
    }
  }, [
    poolProposalsContract,
    useAddress,
    t,
    toastError,
    toastSuccess,
    callWithMarketGasPrice,
    setPendingHarvestd,
    onRefresh
  ])

  return { handleHarvest, requestedHarvest, pendingHarvestd }
}