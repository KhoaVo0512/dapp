import { useTranslation } from '@pancakeswap/localization'
import { useToast } from '@pancakeswap/uikit'
import BigNumber from 'bignumber.js'
import { ToastDescriptionWithTx } from 'components/Toast'
import { poolProposalConfig } from 'config/constants/poolProposal'
import { useCallWithMarketGasPrice } from 'hooks/useCallWithMarketGasPrice'
import { usePoolProposalsContract } from 'hooks/useContract'
import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'state'
import { fetchDataPool } from "state/poolProposals/actions"
import { fetchData } from "state/poolProposals/fetchDataUser"

export const useStaked = (amount, contract, onUpdateAmount, onRefresh, account, chainId) => {
  const [requestedStake, setRequestedStake] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const { callWithMarketGasPrice } = useCallWithMarketGasPrice()
  const { t } = useTranslation()
  const poolRunContract = usePoolProposalsContract(contract)
  const [ pendingStaked, setPendingStaked ] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const poolConfig = poolProposalConfig(chainId)
  const partAmount = new BigNumber(amount)
  const convertAmountDeposit = partAmount.multipliedBy(1E18).toString()
  const handleStaked = useCallback(async () => {
    setPendingStaked(true)
    try {
      const tx = await callWithMarketGasPrice(poolRunContract, 'deposit', [convertAmountDeposit, account])
      const receipt = await tx.wait()
      if (receipt.status) {
        toastSuccess(
          t('Successful staking'),
          <ToastDescriptionWithTx txHash={receipt.transactionHash}/>
        )
        setRequestedStake(true)
        setPendingStaked(false)
        onUpdateAmount(Date.now())
        onRefresh(Date.now())
        
      } else {
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        setRequestedStake(false)
        setPendingStaked(false)
      }
    } catch (e) {
      console.error(e)
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      setPendingStaked(false)
    } finally {
        try {
          const result = await fetchData(account, poolConfig, chainId)
            dispatch(fetchDataPool(result))
        } catch (e) {
            console.log(e)
        }
    }
  }, [
    poolRunContract,
    t,
    dispatch,
    account,
    poolConfig,
    chainId,
    convertAmountDeposit,
    toastError,
    toastSuccess,
    callWithMarketGasPrice,
    setPendingStaked,
    onUpdateAmount,
    onRefresh
  ])

  return { handleStaked, requestedStake, pendingStaked }
}
