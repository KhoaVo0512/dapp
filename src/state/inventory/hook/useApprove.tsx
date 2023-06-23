import React, { useCallback, useState } from 'react'
import { ToastDescriptionWithTx } from 'components/Toast'
import { getAddress } from 'utils/addressHelpers'
import { useToast } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { useRunBoxNft } from 'hooks/useContract'
import { useCallWithMarketGasPrice } from 'hooks/useCallWithMarketGasPrice'


export const useApproveForAll = (chainId: number, runMarketPlaceContractAddress, runNftBoxContractAddress) => {
  const [ requestedApprovalForAll, setRequestedApproval ] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const { callWithMarketGasPrice } = useCallWithMarketGasPrice()
  const { t } = useTranslation()
  const runBoxNftContract = useRunBoxNft(runNftBoxContractAddress)
  const marketPlaceContract = getAddress(runMarketPlaceContractAddress, chainId)
  const [ pendingForAll, setPendingTx ] = useState(false)
  const handleApproveForAll = useCallback(async () => {
    setPendingTx(true)
    try {
      setRequestedApproval(true)
      const tx = 	await callWithMarketGasPrice(runBoxNftContract, 'setApprovalForAll', [marketPlaceContract, 'true'])
      const receipt = await tx.wait()
      if (receipt.status) {
        toastSuccess(
          t('Contract Enabled'),
          <ToastDescriptionWithTx txHash={receipt.transactionHash}/>
        )
        setRequestedApproval(false)
      } else {
        // user rejected tx or didn't go thru
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        setRequestedApproval(false)
      }
    } catch (e) {
      console.error(e)
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
    } finally{
        setPendingTx(false)
    }
  }, [
    runBoxNftContract,
    marketPlaceContract,
    t,
    toastError,
    toastSuccess,
    callWithMarketGasPrice,
  ])
  return { handleApproveForAll, requestedApprovalForAll, pendingForAll }
}
