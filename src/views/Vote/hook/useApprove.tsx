import React, { useCallback, useState } from 'react'
import { ChainId } from '@pancakeswap/sdk'
import { bscTestnetTokens, bscTokens, ethwTokens } from '@pancakeswap/tokens'
import { ethers } from 'ethers'
import { useTranslation } from '@pancakeswap/localization'
import { useToast } from '@pancakeswap/uikit'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { ToastDescriptionWithTx } from 'components/Toast'
import { getAddress } from 'utils/addressHelpers'
import { useERC20 } from 'hooks/useContract'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import contracts from 'config/constants/contracts'
import { useCallWithMarketGasPrice } from 'hooks/useCallWithMarketGasPrice'

function renderTokenByChain(chainId) {
  if (chainId === ChainId.BSC) {
    return bscTokens.runtogether.address
  }
  if (chainId === ChainId.ETHW_MAINNET) {
    return ethwTokens.runtogether.address
  }
  if (chainId === ChainId.BSC_TESTNET) {
    return bscTestnetTokens.runtogether.address
  }
  return ''
}
export const useApprove = (chainId: number) => {
  
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const { callWithMarketGasPrice } = useCallWithMarketGasPrice()
  const { t } = useTranslation()
  const tokenAddress = renderTokenByChain(chainId)
  console.log(tokenAddress)
  const tokenContract = useERC20(tokenAddress)
  const votingContract = getAddress(contracts.coreMarketPlace, chainId)
  const [pendingTx, setPendingTx] = useState(false)
  const handleApprove = useCallback(async () => {
    setPendingTx(true)
    try {
      const tx = await callWithMarketGasPrice(tokenContract, 'approve', [votingContract, ethers.constants.MaxUint256])
      const receipt = await tx.wait()
      if (receipt.status) {
        toastSuccess(t('Contract Enabled'), <ToastDescriptionWithTx txHash={receipt.transactionHash} />)
        setRequestedApproval(true)
        setPendingTx(false)
      } else {
        // user rejected tx or didn't go thru
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        setRequestedApproval(false)
        setPendingTx(false)
      }
    } catch (e) {
      console.error(e)
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      setPendingTx(false)
    }
  }, [tokenContract, votingContract, t, toastError, toastSuccess, callWithMarketGasPrice, setPendingTx])

  return { handleApprove, requestedApproval, pendingTx }
}
