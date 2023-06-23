import React, { useCallback, useState } from 'react'
import { useToast } from '@pancakeswap/uikit'
import { useCallWithMarketGasPrice } from 'hooks/useCallWithMarketGasPrice';
import { ToastDescriptionWithTx } from 'components/Toast'
import contracts from "config/constants/contracts";
import { getAddress } from 'utils/addressHelpers'
import { useERC20 } from 'hooks/useContract'
import { MaxUint256 } from '@ethersproject/constants'
import { useTranslation } from '@pancakeswap/localization';


export const useApproveFee = (tokenRunAddress, chainId) => {
  const [ requestedApproFee, setRequestedApproFee ] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const { callWithMarketGasPrice } = useCallWithMarketGasPrice()
  const { t } = useTranslation()
  const tokenRunContract = useERC20(tokenRunAddress)
  const contractTransfer = getAddress(contracts.withdrawNftRun, chainId)
  const [ pendingFee, setPenddingFee ] = useState(false)
  const handleApproveFee = useCallback(async () => {
    setPenddingFee(true)
    try {
      const tx = await callWithMarketGasPrice(tokenRunContract, 'approve', [contractTransfer, MaxUint256])
      const receipt = await tx.wait()
      if (receipt.status) {
        toastSuccess(
          t('Contract Enabled'),
          <ToastDescriptionWithTx txHash={receipt.transactionHash}/>
        )
        setRequestedApproFee(true)
        setPenddingFee(false)
      } else {
        // user rejected tx or didn't go thru
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        setRequestedApproFee(false)
        setPenddingFee(false)
      }
    } catch (e) {
      console.error(e)
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      setPenddingFee(false)
    }
  }, [
    tokenRunContract,
    contractTransfer,
    t,
    toastError,
    toastSuccess,
    callWithMarketGasPrice,
  ])

  return { handleApproveFee, requestedApproFee, pendingFee }
}
