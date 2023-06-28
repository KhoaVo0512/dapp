import { useTranslation } from '@pancakeswap/localization'
import { useToast } from '@pancakeswap/uikit'
import { ToastDescriptionWithTx } from 'components/Toast'
import contract from 'config/constants/contracts'
import { useCallWithMarketGasPrice } from 'hooks/useCallWithMarketGasPrice'
import { useCoreMarketPlace } from 'hooks/useContract'
import { useCallback, useState } from 'react'
import { getAddress } from 'utils/addressHelpers'

export const useBuyNFT = (chainId: number, onRefresh, balance, listTotalSupplyNft: any, totalSelectItem: any) => {
  const [requestedBuy, setRequestBuy] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const { callWithMarketGasPrice } = useCallWithMarketGasPrice()
  const [isCloseBuy, setClose] = useState(false)
  const { t } = useTranslation()
  const [totalNfts, setTotalNfts] = useState(listTotalSupplyNft)
  const marketplaceContract = useCoreMarketPlace(getAddress(contract.coreMarketPlace, chainId))
  const [pendingBuy, setPendingBuy] = useState([false, false, false])
  const handleBuy = useCallback(async () => {
    const newArray = []
    for (let i = 0; i < 3; i++) {
      if (pendingBuy[i]) newArray[i] = true
      else if (i === balance) newArray[i] = true
      else newArray[i] = false
    }
    setPendingBuy(newArray)
    try {
      if (balance > -1) {
        const tx = await callWithMarketGasPrice(marketplaceContract, 'buyItems', [balance, totalSelectItem])
        const receipt = await tx.wait()
        if (receipt.status) {
          toastSuccess(
            t(`You have successfully purchased`),
            <ToastDescriptionWithTx txHash={receipt.transactionHash} />,
          )
          setClose(true)
          setRequestBuy(true)
          // eslint-disable-next-line no-param-reassign
          listTotalSupplyNft[balance] += totalSelectItem
          setTotalNfts(listTotalSupplyNft)

          onRefresh(Date.now())
        } else {
          // user rejected tx or didn't go thru
          toastError(t('Error'), t('Please try again. Your amount is not enough to pay!'))
          setRequestBuy(false)
        }
      } else {
        toastError(t('Error'), t('Please try again. Your amount is not enough to pay!'))
        setRequestBuy(false)
      }
    } catch (e) {
      console.error(e)
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
    } finally {
      setClose(false)
      setPendingBuy([false, false, false])
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callWithMarketGasPrice, marketplaceContract, balance, toastSuccess, t, toastError])
  return { handleBuy, requestedBuy, pendingBuy, isCloseBuy, totalNfts }
}
