import React, { useCallback, useState } from 'react'
import { MaxUint256 } from '@ethersproject/constants'
import { ChainId } from '@pancakeswap/sdk'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { bscTestnetTokens, bscTokens, ethwTokens } from '@pancakeswap/tokens'
import { useTranslation } from '@pancakeswap/localization'
import { useCallWithMarketGasPrice } from 'hooks/useCallWithMarketGasPrice'
import { ToastDescriptionWithTx } from 'components/Toast'
import { getAddress } from 'utils/addressHelpers'
import { useERC20, useMarketMultiBuy } from 'hooks/useContract'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'state'
import { fetchAMountListBoxByUser, fetchTotalBoxofUserBuy } from 'state/multiBuyBox/actions'
import { useToast } from '@pancakeswap/uikit'
import { fetchTotalBoxOfUser, fetchUserBuyBox } from 'state/multiBuyBox'
import contracts from 'config/constants/contracts'

function renderTokenByChain(chainId){
    if( chainId === ChainId.BSC ) {
        return bscTokens.runtogether.address
    } if (chainId === ChainId.ETHW_MAINNET) {
        return ethwTokens.runtogether.address
    } if (chainId === ChainId.BSC_TESTNET) {
        return bscTestnetTokens.runtogether.address
    }
    return ""
}

export const useClaimNft = () => {
  const [requestedClaimNft, setRequestedClaimNft] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const { callWithMarketGasPrice } = useCallWithMarketGasPrice()
  const { t } = useTranslation()
    const { account, chainId } = useActiveWeb3React()
  const tokenAddress = renderTokenByChain(chainId)
  const tokenContract = useERC20(tokenAddress)
  const marketMultiContract = useMarketMultiBuy(getAddress(contracts.runMarketplaceMultiByBox, chainId))
  const [ pendingClaimNft, setPendingClaimNft ] = useState(false)
  
  const dispatch = useDispatch<AppDispatch>()
  const handleClaimNft = useCallback(async () => {
    setPendingClaimNft(true)
    try {
      const tx = await callWithMarketGasPrice(marketMultiContract, 'claimItem', [])
      const receipt = await tx.wait()
      if (receipt.status) {
        toastSuccess(
            t('Successfully Claim'),
          <ToastDescriptionWithTx txHash={receipt.transactionHash}/>
        )
        setRequestedClaimNft(true)
        setPendingClaimNft(false)
      } else {
        // user rejected tx or didn't go thru
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        setRequestedClaimNft(false)
        setPendingClaimNft(false)
      }
    } catch (e) {
      console.error(e)
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      setPendingClaimNft(false)
    } finally {
        setPendingClaimNft(false)
        const resultUserBuyBox = await fetchUserBuyBox(account, chainId)
        dispatch(fetchAMountListBoxByUser(resultUserBuyBox))
        const result = await fetchTotalBoxOfUser(account, chainId)
        dispatch(fetchTotalBoxofUserBuy(result))
    }
  }, [callWithMarketGasPrice, tokenContract, marketMultiContract, toastSuccess, t, toastError, account, chainId, dispatch])

  return { handleClaimNft, requestedClaimNft, pendingClaimNft }
}
