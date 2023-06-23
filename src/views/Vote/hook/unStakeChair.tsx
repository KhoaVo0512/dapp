import React, { useCallback, useState } from 'react'
import { useTranslation } from '@pancakeswap/localization'
import {useToast} from '@pancakeswap/uikit'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from 'state'
import BigNumber from 'bignumber.js'
import { useCallWithMarketGasPrice } from 'hooks/useCallWithMarketGasPrice'
import { ToastDescriptionWithTx } from 'components/Toast'
import contract from 'config/constants/contracts'
import { getAddress } from 'utils/addressHelpers'
import { useVotingContract } from 'hooks/useContract'

export const useUnStakeChair = (votingId,chainId) => {
    const [requestedUnStakeChair, setRequestedUnStakeChair] = useState(false)
    const { toastSuccess, toastError } = useToast()
    const { callWithMarketGasPrice } = useCallWithMarketGasPrice()
    const { t } = useTranslation()
    const votingContract = useVotingContract(getAddress(contract.votingProposals,chainId))
    const [ pendingUnStakeChair, setPendingUnStakeChair ] = useState(false)
    const handleUnStakeChair = useCallback(async () => {
        setPendingUnStakeChair(true)
        try {
        const tx = await callWithMarketGasPrice(votingContract, 'unstakeChair', [votingId])
        const receipt = await tx.wait()
        if (receipt.status) {
            toastSuccess(
            t('UnStake successful'),
            <ToastDescriptionWithTx txHash={receipt.transactionHash}/>
            )
            setRequestedUnStakeChair(true)
            setPendingUnStakeChair(false)
        } else {
            // user rejected tx or didn't go thru
            toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
            setRequestedUnStakeChair(false)
            setPendingUnStakeChair(false)
        }
        } catch (e) {
        console.error(e)
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        setPendingUnStakeChair(false)
        } finally {
            setPendingUnStakeChair(false)
        }
    }, [callWithMarketGasPrice, votingContract, votingId, toastSuccess, t, toastError])

  return { handleUnStakeChair, requestedUnStakeChair, pendingUnStakeChair }
}
