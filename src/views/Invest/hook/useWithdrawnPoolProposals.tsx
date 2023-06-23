import { useTranslation } from '@pancakeswap/localization'
import { useToast } from '@pancakeswap/uikit'
import { ToastDescriptionWithTx } from 'components/Toast'
import { poolProposalConfig } from 'config/constants/poolProposal'
import { useCallWithMarketGasPrice } from 'hooks/useCallWithMarketGasPrice'
import { usePoolProposalsContract } from 'hooks/useContract'
import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'state'
import { fetchDataPool } from 'state/poolProposals/actions'
import { fetchData } from 'state/poolProposals/fetchDataUser'

export const useWithdrawProposalsPoolProposals = (userAddress, contractAddress, onRefresh, chainId) => {
  const [requestedWithdrawProposals, setRequestedWithdrawProposals] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const { callWithMarketGasPrice } = useCallWithMarketGasPrice()
  const { t } = useTranslation()
  const poolConfig = poolProposalConfig(chainId)
  const PoolProposalsContract = usePoolProposalsContract(contractAddress)
  const [ pendingWithdrawProposals, setPendingWithdrawProposals ] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const handleWithdrawProposals = useCallback(async () => {
    setPendingWithdrawProposals(true)
    try {
      
      const tx = await callWithMarketGasPrice(PoolProposalsContract, 'withdraw', [0, userAddress])
      const receipt = await tx.wait()
      if (receipt.status) {
        toastSuccess(
          t('Successful withdraw'),
          <ToastDescriptionWithTx txHash={receipt.transactionHash}/>
        )
        setRequestedWithdrawProposals(true)
        setPendingWithdrawProposals(false)
        onRefresh(Date.now())
      } else {
        // user rejected tx or didn't go thru
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        setRequestedWithdrawProposals(false)
        setPendingWithdrawProposals(false)
      }
    } catch (e) {
      console.error(e)
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      setPendingWithdrawProposals(false)
    } finally {
      try {
          const result = await fetchData(userAddress, poolConfig, chainId)
          dispatch(fetchDataPool(result))
      } catch (e) {
          console.log(e)
      }
    }
  }, [
    PoolProposalsContract,
    poolConfig,
    chainId,
    t,
    dispatch,
    userAddress,
    toastError,
    toastSuccess,
    callWithMarketGasPrice,
    setPendingWithdrawProposals,
    onRefresh
  ])

  return { handleWithdrawProposals, requestedWithdrawProposals, pendingWithdrawProposals }
}
