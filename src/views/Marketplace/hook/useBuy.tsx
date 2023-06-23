import { useTranslation } from '@pancakeswap/localization'
import { useToast } from '@pancakeswap/uikit'
import { ToastDescriptionWithTx } from 'components/Toast'
import contract from 'config/constants/contracts'
import { useCallWithMarketGasPrice } from 'hooks/useCallWithMarketGasPrice'
import { useCorePresale } from 'hooks/useContract'
import { useCallback, useState } from 'react'
import { getAddress } from 'utils/addressHelpers'

export const useBuy = (saleId, chainId:number, onRefresh) => {
  const [requestedBuy, setRequestBuy] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const { callWithMarketGasPrice } = useCallWithMarketGasPrice()
  const [ isClose, setClose ] = useState(false)
  const { t } = useTranslation()
  const marketplaceContract = useCorePresale(getAddress(contract.corePresale, chainId));
  const [ pendingBuy, setPendingBuy ] = useState(false)
  const handleBuy = useCallback(async () => {
    setPendingBuy(true)
    try {
      const tx = await callWithMarketGasPrice(marketplaceContract, 'claimPresale', [])
      const receipt = await tx.wait()
      if (receipt.status) {
        toastSuccess(
            t('Successfully claim'),
          <ToastDescriptionWithTx txHash={receipt.transactionHash}/>
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
  }, [callWithMarketGasPrice, marketplaceContract, saleId, toastSuccess, t, toastError])
 

  return { handleBuy, requestedBuy, pendingBuy, isClose }
}
