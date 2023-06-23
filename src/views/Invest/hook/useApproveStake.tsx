import { useTranslation } from '@pancakeswap/localization'
import { useToast } from '@pancakeswap/uikit'
import { ToastDescriptionWithTx } from 'components/Toast'
import { MaxUint256 } from '@ethersproject/constants'
import { useCallWithMarketGasPrice } from 'hooks/useCallWithMarketGasPrice'
import { useERC20 } from 'hooks/useContract'
import { useCallback, useState } from 'react'

export const useApprove = (tokenStakeAddress, contractAddress, onRefresh) => {
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const { callWithMarketGasPrice } = useCallWithMarketGasPrice()
  const { t } = useTranslation()
  const token = useERC20(tokenStakeAddress)
  const [ pendingTxApproval, setPendingTxApproval ] = useState(false)
  const handleApprove = useCallback(async () => {
    setPendingTxApproval(true)
    try {
      
      const tx = await callWithMarketGasPrice(token, 'approve', [contractAddress, MaxUint256])
      const receipt = await tx.wait()

      if (receipt.status) {
        toastSuccess(
          t('Contract Enabled'),
          <ToastDescriptionWithTx txHash={receipt.transactionHash}/>
        )
        setRequestedApproval(true)
        setPendingTxApproval(false)
        onRefresh(Date.now())
      } else {
        // user rejected tx or didn't go thru
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        setRequestedApproval(false)
        setPendingTxApproval(false)
      }
    } catch (e) {
      console.error(e)
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      setPendingTxApproval(false)
    } finally {
        setPendingTxApproval(false)
    }
  }, [
    contractAddress,
    t,
    token,
    toastError,
    toastSuccess,
    callWithMarketGasPrice,
    setPendingTxApproval,
    onRefresh
  ])

  return { handleApprove, requestedApproval, pendingTxApproval }
}
