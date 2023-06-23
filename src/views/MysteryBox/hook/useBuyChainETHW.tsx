import { useTranslation } from '@pancakeswap/localization'
import { useToast } from '@pancakeswap/uikit'
import BigNumber from 'bignumber.js'
import { ToastDescriptionWithTx } from 'components/Toast'
import mysteryBoxAbiONUS from "config/abi/mysteryBoxONUS.json"
import contract from 'config/constants/contracts'
import { ethers } from "ethers"
import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useProviderOrSigner } from 'hooks/useProviderOrSigner'
import { fetchMysteryBox } from 'state/mysterybox/actions'
import { fetchBalanceMysteryBox } from 'state/mysterybox/fetchMysteryBox'
import { getAddress } from 'utils/addressHelpers'

export const useBuyChainETHW = (amount, price, onRefresh, account, chainId) => {
    const { toastSuccess, toastError } = useToast()
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const [ pendingBuyETHW, setPendingBuyETHW ] = useState(false)
    const [ isCloseETHW, setCloseETHW ] = useState(false);  
    const [ requestedBuyETHW, setRequestBuyETHW ] = useState(false);
    const providerOrSigner = useProviderOrSigner(true)
    const handleBuyChainETHW = useCallback(async () => {
      setPendingBuyETHW(true)
        try {
          const overrides = {
              value: new BigNumber(amount).multipliedBy(price).multipliedBy(1e18).toString()
          };
          const mysteryContract = getAddress(contract.mysteryBox, chainId)
          const contractAddress = new ethers.Contract(mysteryContract, mysteryBoxAbiONUS, providerOrSigner)
          const result = await contractAddress.buyBox(amount, overrides)
          result.wait().then(async (value) => {
              if(value?.status){
                  toastSuccess(
                    t('Successfully Transfer'),
                    <ToastDescriptionWithTx txHash={value.transactionHash}/>
                  )
                  setCloseETHW(true);
                  setRequestBuyETHW(false);
                  onRefresh(Date.now());
                  const resultData = await fetchBalanceMysteryBox(account, chainId)
                  dispatch(fetchMysteryBox(resultData))
                  setPendingBuyETHW(false)
              }
              else {
                toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
                setPendingBuyETHW(false)
              }
          })
        } catch (e) {
            console.log(e)
            toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
            setPendingBuyETHW(false)
          }
        }, [
            toastError,
            toastSuccess,
            setPendingBuyETHW,
            providerOrSigner,
            amount,
            price,
            account,
            chainId,
            t,
          ])
    return { handleBuyChainETHW, pendingBuyETHW, isCloseETHW, requestedBuyETHW}
}