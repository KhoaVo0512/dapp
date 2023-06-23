import { useCallback, useState } from 'react'
import { useTranslation } from '@pancakeswap/localization'
import { useToast } from '@pancakeswap/uikit'
import { ToastDescriptionWithTx } from 'components/Toast'
import contract from 'config/constants/contracts'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useCallWithMarketGasPrice } from 'hooks/useCallWithMarketGasPrice'
import { useMysteryBoxContract } from 'hooks/useContract'
import { fetchMysteryBox, fetchMysteryToken } from 'state/mysterybox/actions'
import { fetchBalanceMysteryBox, fetchBalanceMysteryToken } from 'state/mysterybox/fetchMysteryBox'
import { getAddress } from 'utils/addressHelpers'
import { useDispatch } from 'react-redux'

export const useBuyBSC = (amount, onRefresh, account, chainId) => {
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const [ requestedBuyBSC, setRequestBuyBSC ] = useState(false);
  const { toastSuccess, toastError } = useToast();
  const { callWithMarketGasPrice } = useCallWithMarketGasPrice()
  const [ isCloseBSC, setCloseBSC ] = useState(false);  
  const mysteryBoxContract = useMysteryBoxContract(getAddress(contract.mysteryBox, chainId));
  const [ pendingBuyBSC, setPendingBuyBSC ] = useState(false)
  const handleBuyBSC = useCallback(async () => {
    setPendingBuyBSC(true)
    try {
      const tx = await callWithMarketGasPrice(mysteryBoxContract, 'buyBox', [amount]);
      const receipt = await tx.wait();

      if (receipt.status) {
        toastSuccess(
          t('Successfully purchase'),
          <ToastDescriptionWithTx txHash={receipt.transactionHash}/>
        )
        setCloseBSC(true);
        setRequestBuyBSC(false);
        onRefresh(Date.now());
      } else {
        // user rejected tx or didn't go thru
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        setRequestBuyBSC(false);
        
      }
    } catch (e) {
      console.error(e)
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'));
    } finally {
        const result = await fetchBalanceMysteryBox(account, chainId)
        dispatch(fetchMysteryBox(result))
        const resultBalanceBUSD = await fetchBalanceMysteryToken(account, chainId)
        dispatch(fetchMysteryToken(resultBalanceBUSD))
        setPendingBuyBSC(false);
    }
  }, [
    amount,
    mysteryBoxContract,
    t,
    toastError,
    toastSuccess,
    callWithMarketGasPrice,
    setPendingBuyBSC,
    onRefresh
  ]);
 

  return { handleBuyBSC, requestedBuyBSC, pendingBuyBSC, isCloseBSC }
}
