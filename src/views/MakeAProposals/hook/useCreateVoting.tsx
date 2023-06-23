import React, { useCallback, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import { useTranslation } from "@pancakeswap/localization";
import {useToast}  from "@pancakeswap/uikit";
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { ToastDescriptionWithTx } from 'components/Toast'
import contracts from 'config/constants/contracts';
import { getAddress } from 'utils/addressHelpers'
import { useCallWithMarketGasPrice } from 'hooks/useCallWithMarketGasPrice';
import { useVotingContract } from 'hooks/useContract'


export const useCreateVoting = (chainId:number) => {
  const [requestedVoting, setRequestedVoting] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const { callWithMarketGasPrice } = useCallWithMarketGasPrice()
  const { t } = useTranslation()
  const tokenContract = useVotingContract(getAddress(contracts.votingProposals,chainId))
  const [ pendingVoting, setPendingVoting ] = useState(false)
  const handleVoting = useCallback(async () => {
    setPendingVoting(true)
    try {
      const tx = await callWithMarketGasPrice(tokenContract, 'stakeToOpenProposal', [])     
      const receipt = await tx.wait()
      if (receipt.status) {
        toastSuccess(
          t('Successful voting creation'),
          <ToastDescriptionWithTx txHash={receipt.transactionHash}/>
        )
        setRequestedVoting(true)
        setPendingVoting(false)
      } else {
        // user rejected tx or didn't go thru
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        setRequestedVoting(false)
        setPendingVoting(false)
      }
    } catch (e) {
      console.error(e)
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      setPendingVoting(false)
    }
  }, [
    tokenContract,
    t,
    toastError,
    toastSuccess,
    callWithMarketGasPrice,
    setPendingVoting,
  ])

  return { handleVoting, requestedVoting, pendingVoting }
}
