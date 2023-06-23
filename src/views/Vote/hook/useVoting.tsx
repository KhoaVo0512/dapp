import { useTranslation } from '@pancakeswap/localization'
import { useToast } from '@pancakeswap/uikit'
import BigNumber from 'bignumber.js'
import { ToastDescriptionWithTx } from 'components/Toast'
import contract from 'config/constants/contracts'
/* eslint-disable camelcase */
import { GetURL_SNAPSHORT } from "config/constants/votingSnapshort"
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { useCallWithMarketGasPrice } from 'hooks/useCallWithMarketGasPrice'
import { useVotingContract } from 'hooks/useContract'
import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'state'
import { fetchListProposals, fetchSnapShortVoting } from 'state/votingProposals/actions'
import { fetchProposalsInfo, fetchVoting, fetchVotingData } from 'state/votingProposals/fetchDataVoting'
import { getAddress } from 'utils/addressHelpers'

export const useVoting = (votingId, amount, options, onRefresh,chainId) => {
  const [requestedVoting, setRequestedVoting] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const { callWithMarketGasPrice } = useCallWithMarketGasPrice()
  const { t } = useTranslation()
  const partAmount = new BigNumber(amount)
  const converAmount = partAmount.multipliedBy(1E18).toString()
  const votingContract = useVotingContract(getAddress(contract.votingProposals,chainId))
  const [ pendingVoting, setPendingVoting ] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const handleVoting = useCallback(async () => {
    setPendingVoting(true)
    try {
      const tx = await callWithMarketGasPrice(votingContract, 'stakeToVote', [votingId, converAmount, options])
      const receipt = await tx.wait()
      if (receipt.status) {
        toastSuccess(
          t('Voting successful'),
          <ToastDescriptionWithTx txHash={receipt.transactionHash}/>
        )
        setRequestedVoting(true)
        setPendingVoting(false)
        onRefresh(Date.now())
       
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
    } finally {
        try { 
          const voteUrlSnapShort = GetURL_SNAPSHORT(chainId)
          const result = await fetchVotingData(Number(votingId), voteUrlSnapShort)
          const resultVotingCount = await fetchProposalsInfo(chainId)
          const resultVoting = await fetchVoting(resultVotingCount.countProposals,chainId)
          dispatch(fetchSnapShortVoting(result))
          dispatch(fetchListProposals(resultVoting))
        } catch (e) {
            console.log(e)
        }
        setPendingVoting(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    converAmount,
    votingId,
    options,
    votingContract,
    dispatch,
    onRefresh,
    t,
    toastError,
    toastSuccess,
    useCallWithGasPrice,
    setPendingVoting,
  ])

  return { handleVoting, requestedVoting, pendingVoting }
}
