import { useTranslation } from '@pancakeswap/localization'
import { useToast } from '@pancakeswap/uikit'
import { ToastDescriptionWithTx } from 'components/Toast'
import contract from 'config/constants/contracts'
import { useCallWithMarketGasPrice } from 'hooks/useCallWithMarketGasPrice'
import { useCorePresale } from 'hooks/useContract'
import { useCallback, useState } from 'react'
import { getAddress } from 'utils/addressHelpers'
import BigNumber from 'bignumber.js'

export const useClaimPresale = (chainId: number, onRefresh) => {
  const [requestedClaim, setRequestClaim] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const { callWithMarketGasPrice } = useCallWithMarketGasPrice()
  const [isClose, setClose] = useState(false)
  const { t } = useTranslation()
  const presaleContract = useCorePresale(getAddress(contract.corePresale, chainId));
  const [pendingClaim, setPendingClaim] = useState(false)
  const handleClaim = useCallback(async () => {
    setPendingClaim(true)
    try {
      const tx = await callWithMarketGasPrice(presaleContract, 'claimPresale', [])
      const receipt = await tx.wait()
      if (receipt.status) {
        toastSuccess(
          t('Successfully claim'),
          <ToastDescriptionWithTx txHash={receipt.transactionHash} />
        )
        setClose(true)
        setRequestClaim(true)
        onRefresh(Date.now())
      } else {
        // user rejected tx or didn't go thru
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        setRequestClaim(false)
      }
    } catch (e) {
      console.error(e)
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
    } finally {
      setPendingClaim(false)

    }
  }, [callWithMarketGasPrice, presaleContract, toastSuccess, t, toastError])


  return { handleClaim, requestedClaim, pendingClaim, isClose }
}



export const useBuyPresale = (chainId: number, onRefresh) => {
  const [requestedBuy, setRequestBuy] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const { callWithMarketGasPrice } = useCallWithMarketGasPrice()
  const [isCloseBuy, setClose] = useState(false)
  const { t } = useTranslation()
  const presaleContract = useCorePresale(getAddress(contract.corePresale, chainId));
  const [pendingBuy, setPendingBuy] = useState(false)
  const handleBuy = useCallback(async () => {
    setPendingBuy(true)
    try {
      const tx = await callWithMarketGasPrice(presaleContract, 'buyPresale', [], { value: new BigNumber('100000000000000000').toString() })
      const receipt = await tx.wait()
      if (receipt.status) {
        toastSuccess(
          t('Successfully buy'),
          <ToastDescriptionWithTx txHash={receipt.transactionHash} />
        )
        setClose(true)
        setRequestBuy(true)
        onRefresh(Date.now())
      } else {
        // user rejected tx or didn't go thru
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        setRequestBuy(false)
      }
    } catch (e) {
      console.error(e)
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
    } finally {
      setPendingBuy(false)

    }
  }, [callWithMarketGasPrice, presaleContract, toastSuccess, t, toastError])


  return { handleBuy, requestedBuy, pendingBuy, isCloseBuy }
}
