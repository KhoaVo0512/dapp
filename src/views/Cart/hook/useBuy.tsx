import React, { useCallback, useEffect, useState } from 'react'
import { ToastDescriptionWithTx } from 'components/Toast'
import { useTranslation } from '@pancakeswap/localization'
import { useCallWithMarketGasPrice } from 'hooks/useCallWithMarketGasPrice'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useToast } from '@pancakeswap/uikit'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'state'
import { useMarketMultiBuy } from 'hooks/useContract'
import { fetchAMountListBoxByUser, fetchBalanceNftInMarket, fetchDataUser, fetchTotalBoxofUserBuy, selectAmountMetaRace, selectAmountMetaRich, selectAmountMetaRun, selectAmountMetaRush } from 'state/multiBuyBox/actions'
import { getAddress } from 'utils/addressHelpers'
import contracts from 'config/constants/contracts'
import { fetchAllowanceMarketMultiBuy, fetchBalanceNftInMarkeMultiBuy, fetchTotalBoxOfUser, fetchUserBuyBox } from 'state/multiBuyBox'

export const useBuy = (listItems, onRefresh) => {
  const { chainId, account } = useActiveWeb3React()
  const [requestedBuy, setRequestedBuy] = useState(false)
  const { toastSuccess, toastError } = useToast()
    const { callWithMarketGasPrice } = useCallWithMarketGasPrice()
  const { t } = useTranslation()
  const marketMultiContract = useMarketMultiBuy(getAddress(contracts.runMarketplaceMultiByBox, chainId))
  const [ pendingBuy, setPendingBuy ] = useState(false)
  useEffect(()=>{
    setPendingBuy(false)
  },[account])
  const dispatch = useDispatch<AppDispatch>()
  const handleBuy = useCallback(async () => {
    setPendingBuy(true)
    try {
      const tx = await callWithMarketGasPrice(marketMultiContract, 'buyItem', [listItems])
      const receipt = await tx.wait()
      if (receipt.status) {
        toastSuccess(
            t('Successfully purchase'),
          <ToastDescriptionWithTx txHash={receipt.transactionHash}/>
        )
        setRequestedBuy(true)
        onRefresh(Date.now())
        setPendingBuy(false)
      } else {
        // user rejected tx or didn't go thru
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        setRequestedBuy(false)
        setPendingBuy(false)
      }
    } catch (e) {
      console.error(e)
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      setPendingBuy(false)
    } finally {
      setPendingBuy(false)
      const resultBoxOfMarket = await fetchBalanceNftInMarkeMultiBuy(chainId) 
      const resultUserBuyBox = await fetchUserBuyBox(account, chainId)
  
      const result = await fetchTotalBoxOfUser(account, chainId)
      dispatch(fetchTotalBoxofUserBuy(result))

      dispatch(fetchAMountListBoxByUser(resultUserBuyBox))
      dispatch(fetchBalanceNftInMarket(resultBoxOfMarket))
      dispatch(selectAmountMetaRush({totalMetaRush:0}))
      dispatch(selectAmountMetaRun({totalMetaRun:0}))
      dispatch(selectAmountMetaRace({totalMetaRace:0}))
      dispatch(selectAmountMetaRich({totalMetaRich:0}))

      const resultBalanceBusd = await fetchAllowanceMarketMultiBuy(account, chainId)
      dispatch(fetchDataUser(resultBalanceBusd))
    }
  }, [callWithMarketGasPrice, marketMultiContract, listItems, toastSuccess, t, onRefresh, toastError, chainId, account, dispatch])
 

  return { handleBuy, requestedBuy, pendingBuy }
}