import React, { useCallback, useState } from 'react'
import BigNumber from 'bignumber.js'
import { ToastDescriptionWithTx } from 'components/Toast'
import contract from 'config/constants/contracts'
import { getAddress } from 'utils/addressHelpers'
import { useRunMarketplaceContract } from 'hooks/useContract'
import { useTranslation } from '@pancakeswap/localization'
import { useToast } from '@pancakeswap/uikit'
import { useCallWithMarketGasPrice } from 'hooks/useCallWithMarketGasPrice'

export const useSell = (nftAddress, nftId, price, currencyAddress, chainId: number) => {
  const { t } = useTranslation()
  const [ requestedSell, setRequestSell ] = useState(false)
  const [ isClose, setClose ] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const { callWithMarketGasPrice } = useCallWithMarketGasPrice()
  const [ pendingSell, setPenddingSell ] = useState(false)
  const marketplaceContract = useRunMarketplaceContract(getAddress(contract.runMarketplace, chainId));
  const nftContractAddress = getAddress(nftAddress)
  const currencyContractAddress = getAddress(currencyAddress)
  const priceListing = new BigNumber((price*1E18).toString()).toString();
  const handleSell = useCallback(async () => {
    setPenddingSell(true)
    try {
      const tx = await callWithMarketGasPrice(marketplaceContract, 'sellItem', [nftAddress, nftId, priceListing, currencyAddress])
      const receipt = await tx.wait()
      if (receipt.status) {
        toastSuccess(
          t('Successful sell'),
          <ToastDescriptionWithTx txHash={receipt.transactionHash}/>
        )
        setRequestSell(true)
        setClose(true)
      } else {
        // user rejected tx or didn't go thru
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        setRequestSell(false)
      }
    } catch (e) {
      console.error(e)
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
    } finally {
      setPenddingSell(false)
    }
  }, [
    nftContractAddress, nftId, priceListing, currencyContractAddress,
    marketplaceContract,
    t,
    toastError,
    toastSuccess,
    callWithMarketGasPrice,
  ])
  return { handleSell, requestedSell, pendingSell, isClose }
}
