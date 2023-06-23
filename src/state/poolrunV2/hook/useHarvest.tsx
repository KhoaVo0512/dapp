import { useTranslation } from '@pancakeswap/localization'
import { useToast } from '@pancakeswap/uikit'
import { ToastDescriptionWithTx } from 'components/Toast'
import { useCallWithMarketGasPrice } from 'hooks/useCallWithMarketGasPrice'
import { usePoolRun } from 'hooks/useContract'
import React, { useCallback, useState, useEffect } from 'react'
import { getAddress } from 'utils/addressHelpers'


export const useHarvest = (poolContract, useAddress, chainId,  onRefresh) => {
  const { toastSuccess, toastError } = useToast()
  const { callWithMarketGasPrice } = useCallWithMarketGasPrice()
  const { t } = useTranslation()
  const poolAddress = getAddress(poolContract, chainId)
  const contractAddress = usePoolRun(poolAddress)
  const [ pendingHarvestd, setPendingHarvestd ] = useState(false)
  const handleHarvest = useCallback(async () => {
    setPendingHarvestd(true)
    try {
      
      const tx = await callWithMarketGasPrice(contractAddress, 'withdraw', [0])
      const receipt = await tx.wait()

      if (receipt.status) {
        toastSuccess(
          t('Successful harvest'),
          <ToastDescriptionWithTx txHash={receipt.transactionHash}/>
        )
        setPendingHarvestd(false)
        onRefresh(Date.now())
      } else {
        // user rejected tx or didn't go thru
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        setPendingHarvestd(false)
      }
    } catch (e) {
      console.log(e)
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      setPendingHarvestd(false)
    }
  }, [
    poolAddress,
    useAddress,
    t,
    toastError,
    toastSuccess,
    callWithMarketGasPrice,
    setPendingHarvestd,
    onRefresh
  ])

  useEffect(() => {
    setPendingHarvestd(false)
  }, [useAddress]) 

  return { handleHarvest, pendingHarvestd }

}
