import { useTranslation } from '@pancakeswap/localization'
import { Button, Flex, Heading, TooltipText, useToast, useTooltip } from '@pancakeswap/uikit'
import { useWeb3React } from '@pancakeswap/wagmi'
import BigNumber from 'bignumber.js'
import Balance from 'components/Balance'
import { ChainId } from '@pancakeswap/sdk'
import { ToastDescriptionWithTx } from 'components/Toast'
import useCatchTxError from 'hooks/useCatchTxError'
import { TransactionResponse } from '@ethersproject/providers'
import { usePriceRunBusd } from 'state/farms/hooks'
import { BIG_ZERO } from 'utils/bigNumber'
import { getBalanceAmount } from 'utils/formatBalance'
import styled from 'styled-components'
import useActiveWeb3React from 'hooks/useActiveWeb3React'

interface FarmCardActionsProps {
  earnings?: BigNumber
  pid?: number
  onReward?: () => Promise<TransactionResponse>
  proxyCakeBalance?: number
  onDone?: () => void
}

const HarvestAction: React.FC<React.PropsWithChildren<FarmCardActionsProps>> = ({
  earnings,
  onReward,
  proxyCakeBalance,
  onDone,
}) => {
  const { account } = useWeb3React()
  const { toastSuccess } = useToast()
  const { chainId } = useActiveWeb3React()

  const { fetchWithCatchTxError, loading: pendingTx } = useCatchTxError()
  const { t } = useTranslation()
  const cakePrice = usePriceRunBusd()
  const rawEarningsBalance = account ? getBalanceAmount(earnings) : BIG_ZERO
  const displayBalance = rawEarningsBalance.toFixed(5, BigNumber.ROUND_DOWN)
  const earningsBusd = rawEarningsBalance ? rawEarningsBalance.multipliedBy(cakePrice).toNumber() : 0
  const tooltipBalance = rawEarningsBalance.isGreaterThan(new BigNumber(0.00001)) ? displayBalance : '< 0.00001'
  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    `${tooltipBalance} ${t(
      `CAKE has been harvested to the farm booster contract and will be automatically sent to your wallet upon the next harvest.`,
    )}`,
    {
      placement: 'bottom',
    },
  )
  function renderCurenccySymbol(){
    if ( chainId === ChainId.ONUS ) {
      return ` VNDC`
    }
    return ` USD`
  }
  return (
    <Flex mb="8px" justifyContent="space-between" alignItems="center">
      <Flex flexDirection="column" alignItems="flex-start">
        {proxyCakeBalance ? (
          <>
            <TooltipText ref={targetRef} decorationColor="secondary">
              <Heading color={rawEarningsBalance.eq(0) ? 'textDisabled' : 'text'}>{displayBalance}</Heading>
            </TooltipText>
            {tooltipVisible && tooltip}
          </>
        ) : (
          <Heading color={rawEarningsBalance.eq(0) ? 'textDisabled' : 'text'}>{displayBalance}</Heading>
        )}
        {earningsBusd > 0 && (
          <Balance fontSize="12px" color="textSubtle" decimals={2} value={earningsBusd} unit={renderCurenccySymbol()} prefix="~" />
        )}
      </Flex>
      <ButtonHarvest
        disabled={rawEarningsBalance.eq(0) || pendingTx}
        onClick={async () => {
          const receipt = await fetchWithCatchTxError(() => {
            return onReward()
          })
          if (receipt?.status) {
            toastSuccess(
              `${t('Harvested')}!`,
              <ToastDescriptionWithTx txHash={receipt.transactionHash}>
                {t('Your %symbol% earnings have been sent to your wallet!', { symbol: 'CAKE' })}
              </ToastDescriptionWithTx>,
            )
            onDone?.()
          }
        }}
      >
        {pendingTx ? t('Harvesting') : t('Harvest')}
      </ButtonHarvest>
    </Flex>
  )
}

export default HarvestAction

const ButtonHarvest = styled(Button)`
    background: none;
    color: ${({ theme }) => theme.colors.text};
    border: 2px solid #E6E8EC;
    border-radius: 90px;
`