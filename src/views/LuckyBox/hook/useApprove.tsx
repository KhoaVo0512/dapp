import { useTranslation } from "@pancakeswap/localization"
import { useToast } from "@pancakeswap/uikit"
import { MaxUint256 } from '@ethersproject/constants'
import { ToastDescriptionWithTx } from "components/Toast"
import contracts from "config/constants/contracts"
import { useDemoUseContract, useERC20 } from "hooks/useContract"
import { useCallback, useState } from "react"
import { getAddress } from "utils/addressHelpers"
import { useCallWithMarketGasPrice } from "hooks/useCallWithMarketGasPrice"


export const useApprove = (chainId: number, contractAddress: string, approved: any) => {
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const { callWithMarketGasPrice } = useCallWithMarketGasPrice()
  const { t } = useTranslation()
  const tokenAddress = useDemoUseContract(contractAddress)
  const runMarketplaceContract = getAddress(contracts.coreMarketPlace, chainId)
  const [pendingTx, setPendingTx] =  useState([false, false, false])
  const handleApprove = useCallback(async () => {
    setPendingTx([true, true, true])
    try {
      if (approved) {
        const tx = await callWithMarketGasPrice(tokenAddress, 'approve', [runMarketplaceContract, MaxUint256])
        const receipt = await tx.wait()

        if (receipt.status) {
          toastSuccess(
            t('successful approve'),
            <ToastDescriptionWithTx txHash={receipt.transactionHash} />
          )
          setRequestedApproval(true)
        
        } else {
          // user rejected tx or didn't go thru
          toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
          setRequestedApproval(false)
        }
      } else {
        setRequestedApproval(false);
      }
    } catch (e) {
      console.error(e)
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
    }finally {
      setPendingTx([false,false,false])
    }

  }, [callWithMarketGasPrice, tokenAddress, runMarketplaceContract, toastSuccess, t, toastError, approved])

  return { handleApprove, requestedApproval, pendingTx }
}
