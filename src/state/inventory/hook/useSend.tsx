import { useCallback, useState } from 'react'

import { useTranslation } from '@pancakeswap/localization'
import { ChainId } from '@pancakeswap/sdk'
import { bscTestnetTokens, bscTokens, onusMainnetTokens, onusTestnetTokens, ethwTokens } from '@pancakeswap/tokens'
import { useToast } from '@pancakeswap/uikit'
import { ToastDescriptionWithTx } from 'components/Toast'
import tokens from 'config/constants/tokens'
import { useCallWithMarketGasPrice } from 'hooks/useCallWithMarketGasPrice'
import { useRunBoxNft } from 'hooks/useContract'
import { useDispatch } from 'react-redux'
import { AppDispatch } from "state/index"
import { fetchBalance } from "state/marketplace/actions"
import { fetchBalanceNft } from 'state/marketplace/hook/fetchDataMarketPlace'
import { getAddress } from 'utils/addressHelpers'

export const useTransferAnotherWallet = (account, targetWallet, nftId, onRefresh, onDismiss,  chainId: number) => {
    function renderTokenByChain(chain){
        if( chain === ChainId.BSC ) {
            return bscTokens.runtogetherBoxNft.address
        } if (chain === ChainId.ETHW_MAINNET) {
            return ethwTokens.runtogetherBoxNft.address
        } if (chain === ChainId.BSC_TESTNET) {
            return bscTestnetTokens.runtogetherBoxNft.address
        } if (chain === ChainId.ONUS) {
            return onusMainnetTokens.runtogetherBoxNft.address
        }
        if (chain === ChainId.ONUS_TESTNET) {
            return onusTestnetTokens.runtogetherBoxNft.address
        }
        return ""
    }
    const tokenAddress = renderTokenByChain(chainId)
    const [requested, setRequested] = useState(false)
    const { toastSuccess, toastError } = useToast()
    const { callWithMarketGasPrice } = useCallWithMarketGasPrice()
    const { t } = useTranslation()
    const runBoxContract = useRunBoxNft(getAddress(tokens.RunTogetherBox.address, chainId)) 
    const [pendingTx, setPendingTx] = useState(false)
    const [isClose, setClose] = useState(false)
    const dispatch = useDispatch<AppDispatch>()
    const handleTransferToAnotherWallet = useCallback(async () => {
        setPendingTx(true)
        try {
            const tx = 	await callWithMarketGasPrice(runBoxContract, 'transferFrom', [account, targetWallet, nftId])
            const receipt = await tx.wait()
            if (receipt.status) {
                toastSuccess(
                t('Successfully'),
                <ToastDescriptionWithTx txHash={receipt.transactionHash}>
                    {t('You successfully transfer boxes to another wallet')}
                </ToastDescriptionWithTx>,
                )
                setRequested(true)
                setClose(true)
                onRefresh(Date.now())
            } else {
                // user rejected tx or didn't go thru
                toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
                setRequested(false)
            }
        } catch (e) {
            console.error(e)
            toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        } finally{
            setPendingTx(false);
            onDismiss()
            try {
                const result = await fetchBalanceNft(tokenAddress, account, chainId)
                dispatch(fetchBalance(result))
            } catch (e) {
                console.log(e)
            }
        }
  }, [
    runBoxContract,
    t,
    toastError,
    toastSuccess,
    callWithMarketGasPrice,
    dispatch,
    account,
    targetWallet,
    nftId,
    onRefresh
  ])

  return { handleTransferToAnotherWallet, requested, pendingTx, isClose }
}
