import React, { useCallback, useState } from 'react'
import { ethers } from 'ethers'
import { ToastDescriptionWithTx } from 'components/Toast'
import tokens from 'config/constants/tokens'
import contract from 'config/constants/contracts'
import { getAddress } from 'utils/addressHelpers'
import { useERC20 } from 'hooks/useContract'
import { useTranslation } from '@pancakeswap/localization'
import { useToast } from '@pancakeswap/uikit'
import { useCallWithMarketGasPrice } from 'hooks/useCallWithMarketGasPrice'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useDispatch } from 'react-redux'
import { fetchBalanceMysteryBox } from 'state/mysterybox/fetchMysteryBox'
import { fetchMysteryBox } from 'state/mysterybox/actions'

export const useApprove = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const { account, chainId } = useActiveWeb3React()
  const [ requestedApproval, setRequestedApproval ] = useState(false);
  const { toastSuccess, toastError } = useToast();
  const { callWithMarketGasPrice } = useCallWithMarketGasPrice()
  const tokenContract = useERC20(getAddress(tokens.busd.address, chainId));
  const mysteryBoxContract = getAddress(contract.mysteryBox, chainId);
  const [ pendingTx, setPendingTx ] = useState(false);
  const handleApprove = useCallback(async () => {
    setPendingTx(true)
    try {
      setRequestedApproval(true)
      const tx = await callWithMarketGasPrice(tokenContract, 'approve', [mysteryBoxContract, ethers.constants.MaxUint256])
      const receipt = await tx.wait();
      if (receipt.status) {
        toastSuccess(
          t('Contract Enabled'),
          <ToastDescriptionWithTx txHash={receipt.transactionHash}/>
        )
        setRequestedApproval(false)
        setPendingTx(false)
        const result = await fetchBalanceMysteryBox(account, chainId)
        dispatch(fetchMysteryBox(result))

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
  }, [
    tokenContract,
    mysteryBoxContract,
    t,
    toastError,
    toastSuccess,
    callWithMarketGasPrice,
    setPendingTx,
  ]);

  return { handleApprove, requestedApproval, pendingTx }
}
