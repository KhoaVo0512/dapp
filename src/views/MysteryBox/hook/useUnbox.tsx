import { useTranslation } from '@pancakeswap/localization'
import { useModal, useToast } from '@pancakeswap/uikit'
import { ToastDescriptionWithTx } from 'components/Toast'
import contract from 'config/constants/contracts'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useCallWithMarketGasPrice } from 'hooks/useCallWithMarketGasPrice'
import { useMysteryBoxContract } from 'hooks/useContract'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchMysteryBox } from 'state/mysterybox/actions'
import { fetchBalanceMysteryBox } from 'state/mysterybox/fetchMysteryBox'
import { getAddress } from 'utils/addressHelpers'
import ModalUnboxSuccess from 'views/Inventory/components/ModalUnboxSuccess'
import { FetchDataRunBoxIsOpen } from 'views/Inventory/hook/fetchDataMysteryBox'

export const useUnbox = (nftId) => {
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const { account, chainId } = useActiveWeb3React()
  const [ requestedUnBox, setRequestUnBox ] = useState(false);
  const [ isAnimation, setAnimation ] = useState(false);
  const { toastSuccess, toastError } = useToast();
  const { callWithMarketGasPrice } = useCallWithMarketGasPrice()
  const [ isClose, setClose ] = useState(false);  
  const mysteryBoxContract = useMysteryBoxContract(getAddress(contract.mysteryBox, chainId));
  const [ pendingUnBox, setPendingUnBox ] = useState(false)
  const [ dataUnBox, setDataUnBox ] = useState({
    boxID: null,
    tokenID: null,
    boxType: null
  });  

  const [ OpenModalUnboxSuccess ] = useModal(
    <ModalUnboxSuccess 
      nftId={nftId} 
      chainId={chainId} 
    />    
);

  const handleUnBox = useCallback(async () => {
    setPendingUnBox(true)
    try {
      const tx = await callWithMarketGasPrice(mysteryBoxContract, 'openBox', [nftId]);
      const receipt:any = await tx.wait();
      setDataUnBox({
        boxID: Number(receipt.events[4].args.boxId._hex.toString()),
        tokenID: Number(receipt.events[4].args.tokenId._hex.toString()),
        boxType: Number(receipt.events[4].args.boxType._hex.toString())
      })
      setAnimation(true)
      if (receipt.status) {
        toastSuccess(
          t('Successfully purchase'),
          <ToastDescriptionWithTx txHash={receipt.transactionHash}/>
        )
        // dispatch(fetchIDMysteryBox())
        setClose(true);
        setRequestUnBox(false);
        OpenModalUnboxSuccess();
      } else {
        // user rejected tx or didn't go thru
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        setRequestUnBox(false);
      }
    } catch (e) {
      console.error(e)
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'));
    } finally {
      const result = await fetchBalanceMysteryBox(account, chainId)
        dispatch(fetchMysteryBox(result))
      setPendingUnBox(false);
      setAnimation(false)
    }
  }, [
    nftId,
    mysteryBoxContract,
    t,
    toastError,
    toastSuccess,
    callWithMarketGasPrice,
    setPendingUnBox,
  ]);
 

  return { handleUnBox, requestedUnBox, pendingUnBox, isClose, dataUnBox, isAnimation }
}
