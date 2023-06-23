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

export const useBuyChainOnus = (amount, price, onRefresh, account, chainId) => {
    const { toastSuccess, toastError } = useToast()
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const [ pendingBuyOnus, setPendingBuyOnus ] = useState(false)
    const [ isCloseOnus, setCloseOnus ] = useState(false);  
    const [ requestedBuyOnus, setRequestBuyOnus ] = useState(false);
    const providerOrSigner = useProviderOrSigner(true)
    const handleBuyChainOnus = useCallback(async () => {
      setPendingBuyOnus(true)
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
                  setCloseOnus(true);
                  setRequestBuyOnus(false);
                  onRefresh(Date.now());
                  const resultData = await fetchBalanceMysteryBox(account, chainId)
                  dispatch(fetchMysteryBox(resultData))
                  setPendingBuyOnus(false)
              }
              else {
                toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
                setPendingBuyOnus(false)
              }
          })
        } catch (e) {
            console.log(e)
            toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
            setPendingBuyOnus(false)
          }
        }, [
            toastError,
            toastSuccess,
            setPendingBuyOnus,
            providerOrSigner,
            amount,
            price,
            account,
            chainId,
            t,
          ])
    return { handleBuyChainOnus, pendingBuyOnus, isCloseOnus, requestedBuyOnus}
}