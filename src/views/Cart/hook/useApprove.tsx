import { MaxUint256 } from '@ethersproject/constants'
import { useCallback, useState } from 'react'
import { useTranslation } from '@pancakeswap/localization'
import { ChainId } from '@pancakeswap/sdk'
import { bscTestnetTokens, bscTokens, ethwTokens } from '@pancakeswap/tokens'
import { useToast } from '@pancakeswap/uikit'
import { ToastDescriptionWithTx } from 'components/Toast'
import contracts from 'config/constants/contracts'
import { useERC20 } from 'hooks/useContract'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'state'
import { fetchAllowanceMarketMultiBuy } from 'state/multiBuyBox'
import { fetchDataUser } from "state/multiBuyBox/actions"
import { getAddress } from 'utils/addressHelpers'
import { useCallWithMarketGasPrice } from "hooks/useCallWithMarketGasPrice"


function renderTokenByChain(chainId){
    if( chainId === ChainId.BSC ) {
        return bscTokens.busd.address
    } if (chainId === ChainId.BSC_TESTNET) {
        return bscTestnetTokens.busd.address
    }
    return ""
}

export const useApprove = (chainId:number, account:string|undefined) => {
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const { callWithMarketGasPrice } = useCallWithMarketGasPrice()
  const { t } = useTranslation()
  const tokenAddress = renderTokenByChain(chainId)
  const tokenContract = useERC20(tokenAddress)
  const marketMultiContract = getAddress(contracts.runMarketplaceMultiByBox, chainId)
  const [ pendingTx, setPendingTx ] = useState(false)
  const dispatch = useDispatch<AppDispatch>()

  const handleApprove = useCallback(async () => {
    setPendingTx(true)
    try {
      const tx = await callWithMarketGasPrice(tokenContract, 'approve', [marketMultiContract, MaxUint256])
      const receipt = await tx.wait()
      if (receipt.status) {
        toastSuccess(
          t('Contract Enabled'),
          <ToastDescriptionWithTx txHash={receipt.transactionHash}/>
        )
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
    } finally {
      setPendingTx(false)
      const result = await fetchAllowanceMarketMultiBuy(account, chainId)
      dispatch(fetchDataUser(result))
    }
  }, [callWithMarketGasPrice, tokenContract, marketMultiContract, toastSuccess, t, toastError, account, chainId, dispatch])

  return { handleApprove, requestedApproval, pendingTx }
}
