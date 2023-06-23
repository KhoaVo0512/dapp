import React, { useCallback, useState } from 'react'
import { ToastDescriptionWithTx } from 'components/Toast'
import contracts from "config/constants/contracts";
import { getAddress } from 'utils/addressHelpers'
import { useToast } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { useRunBoxNft } from 'hooks/useContract'
import { useCallWithMarketGasPrice } from 'hooks/useCallWithMarketGasPrice';

export const useApproveContractTransfer = (runNftBoxContractAddress, chainId) => {
  const [ requestedApprovalForAll, setRequestedApproval] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const { callWithMarketGasPrice } = useCallWithMarketGasPrice()
  const { t } = useTranslation()
  const contractTransfer = getAddress(contracts.withdrawNftRun, chainId)
  const runBoxNftContract = useRunBoxNft(runNftBoxContractAddress)
  const [ pendingForAll, setPendingTx ] = useState(false)

  const handleApprovedTransfer = useCallback(async () => {
    setPendingTx(true)
    try {
      setRequestedApproval(true)
      const tx = 	await callWithMarketGasPrice(runBoxNftContract, 'setApprovalForAll', [contractTransfer, true])
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
    contractTransfer,
    t,
    toastError,
    toastSuccess,
    callWithMarketGasPrice,
  ])

  return { handleApprovedTransfer, requestedApprovalForAll, pendingForAll }
}
