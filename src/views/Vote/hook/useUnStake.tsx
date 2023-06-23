import React, { useCallback, useState } from 'react'
import { useTranslation } from '@pancakeswap/localization'
import {useToast} from '@pancakeswap/uikit'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from 'state'
import BigNumber from 'bignumber.js'
import { ToastDescriptionWithTx } from 'components/Toast'
import contract from 'config/constants/contracts'
import { getAddress } from 'utils/addressHelpers'
import { useVotingContract } from 'hooks/useContract'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useCallWithMarketGasPrice } from 'hooks/useCallWithMarketGasPrice'

export const useUnStake = (votingId,chainId) => {
    const [requestedUnStake, setRequestedUnStake] = useState(false)
    const { toastSuccess, toastError } = useToast()
    const { callWithMarketGasPrice } = useCallWithMarketGasPrice()
    const { t } = useTranslation()
    const votingContract = useVotingContract(getAddress(contract.votingProposals,chainId))
    const [ pendingUnStake, setPendingUnStake ] = useState(false)
    const handleUnStake = useCallback(async () => {
        setPendingUnStake(true)
        try {
        const tx = await callWithMarketGasPrice(votingContract, 'unstakeVoter', [votingId])
        const receipt = await tx.wait()
        if (receipt.status) {
            toastSuccess(
            t('UnStake successful'),
            <ToastDescriptionWithTx txHash={receipt.transactionHash}/>
            )
            setRequestedUnStake(true)
            setPendingUnStake(false)
        } else {
            // user rejected tx or didn't go thru
            toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
            setRequestedUnStake(false)
            setPendingUnStake(false)
        }
        } catch (e) {
        console.error(e)
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        setPendingUnStake(false)
        } finally {
            setPendingUnStake(false)
        }
    }, [callWithMarketGasPrice, votingContract, votingId, toastSuccess, t, toastError])

  return { handleUnStake, requestedUnStake, pendingUnStake }
}
