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

export const useUnStaked = (amount, contract, onUpdateAmount, onRefresh, account, chainId) => {
  const [requestedUnStake, setRequestedUnStake] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const { t } = useTranslation()
  const poolConfig = poolProposalConfig(chainId)
  const poolRunContract = usePoolProposalsContract(contract)
  const { callWithMarketGasPrice } = useCallWithMarketGasPrice()
  const [ pendingUnStaked, setPendingUnStaked ] = useState(false)
  const partAmount = new BigNumber(amount)
  const convertAmount = partAmount.multipliedBy(1E18).toString()
  const dispatch = useDispatch<AppDispatch>()
  const handleUnStaked = useCallback(async () => {
    setPendingUnStaked(true)
    try {
      
      const tx = await callWithMarketGasPrice(poolRunContract, 'withdraw', [convertAmount, account])
      const receipt = await tx.wait()

      if (receipt.status) {
        toastSuccess(
          t('Successful unstake'),
          <ToastDescriptionWithTx txHash={receipt.transactionHash}/>
        )
        setRequestedUnStake(true)
        setPendingUnStaked(false)
        onUpdateAmount(Date.now())
        onRefresh(Date.now())
      } else {
        // user rejected tx or didn't go thru
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        setRequestedUnStake(false)
        setPendingUnStaked(false)
      }
    } catch (e) {
      console.error(e)
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      setPendingUnStaked(false)
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
    convertAmount,
    onUpdateAmount,
    poolConfig,
    chainId,
    callWithMarketGasPrice,
    t,
    account,
    dispatch,
    toastError,
    toastSuccess,
    setPendingUnStaked,
    onRefresh
  ])

  return { handleUnStaked, requestedUnStake, pendingUnStaked }
}
