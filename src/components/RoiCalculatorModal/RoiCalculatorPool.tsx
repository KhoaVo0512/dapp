import { useTranslation } from '@pancakeswap/localization'
import { BalanceInput, Box, Button, Flex, Text, Modal } from '@pancakeswap/uikit'
import useTheme from 'hooks/useTheme'
import React, { useState } from 'react'
import styled, { ThemeConsumer } from 'styled-components'
// import { usePriceRunBusd } from "state/farms/hooks";
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import AnimatedArrow from './AnimatedArrow'
import RoiCalculatorFooter from './RoiCalculatorFooter'
import RoiCardPoolFooter from './RoiCardPoolFooter'
import useRoiCalculatorReducer, { RoiCalculatorReducerState } from './useRoiCalculatorReducer'



interface RoiCardProps {
  onDismiss?: () => void
  stakingTokenSymbol:string
  earningTokenSymbol: string
  tokenBalance?:number
  initialState?: any
  apr: number
  displayApr?: string
  linkLabel: string
  linkHref: string
  stakingTokenPrice: number
  earningTokenPrice: number
  autoCompoundFrequency?: number
  isFarm?: boolean,
  multiplier?: string
  performanceFee?: number
}

const ScrollableContainer = styled.div`
  padding: 24px;
  max-height: 600px;
  height: 100%;
  overflow-y: auto;
  ${({ theme }) => theme.mediaQueries.sm} {
    max-height: none;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.input};
    border-radius: 8px;
}
`
const CustomButtonItem = styled(Button)<{isActive?:boolean}>`
    width: 70px;
    height: 40px;
    border-radius: 20px;
    box-shadow:none;
    background: ${({ isActive, theme }) => isActive ? theme.colors.primaryBright : "none"};
    color: ${({ isActive, theme }) => isActive ? theme.colors.white : theme.colors.text};
`
const ButtonMenuItem = styled(Flex)`
    border-radius: 90px;
    height: 40px;
    border:1px solid ${({ theme }) => theme.colors.cardBorder};
`
const StyledModal = styled(Modal)`
  width: 500px;
  padding: 0;
  & > :nth-child(2) {
    padding: 0;
  }

`

const RoiCalculatorPool: React.FC<React.PropsWithChildren<RoiCardProps>> = ({
  onDismiss,
  earningTokenSymbol,
  stakingTokenSymbol,
  tokenBalance,
  stakingTokenPrice,
  earningTokenPrice,
  autoCompoundFrequency,
  initialState,
  isFarm=false,
  apr,
  displayApr,
  linkLabel,
  linkHref,
  multiplier,
  performanceFee
}) => {
  const { t } = useTranslation()
  const { account } = useActiveWeb3React()
  const [ stakingDay, setStakingDay ] = useState(1)
  const { theme } = useTheme()

  const CustomButton = styled(Button)<{isActive?: boolean}>`
    background: ${({ isActive }) => isActive ? theme.colors.primaryBright: "transparent"};
    border: 2px solid ${({ isActive }) => isActive ? "transparent" : theme.colors.cardBorder};
    border-radius: 90px;
    color:${({ isActive }) => isActive ? theme.colors.white : theme.colors.text};
    box-shadow:none;
    height: 30px;
  `
  
    const [stakeAmount, setStakeAmount] = useState('')
    const handleStakeInputChange = (input: string) => {
        setStakeAmount(input)
    }
  const renderStakingAmount = Number(stakeAmount)*((28800*stakingDay)/10512000)*0.2
  const [hasReachedStakeLimit, setHasReachedStakedLimit] = useState(false)
  const runPriceUsd = 0.1

  const {
    state,
    setCalculatorMode,
    setTargetRoi,
  } = useRoiCalculatorReducer({ stakingTokenPrice, earningTokenPrice, autoCompoundFrequency }, initialState)

  const currencyValueRun = `${(Number(stakeAmount)*runPriceUsd).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} BUSD`
  return (
    <StyledModal
      title=""
      onDismiss={onDismiss}
    >
      <ScrollableContainer>
        <Text fontSize='22px' mb="1rem" bold textAlign="center">ROI Calculator</Text>
        <Flex flexDirection="column" mb="8px">
            <Text color={theme.isDark ? theme.colors.white : theme.colors.text} bold fontSize="12px" textTransform="uppercase">
                {t('%asset% staked', { asset: stakingTokenSymbol })}
            </Text>
            <BalanceInput
                value={stakeAmount}
                onUserInput={handleStakeInputChange}
                currencyValue={currencyValueRun} 
                isWarning={hasReachedStakeLimit}
                decimals={18}
            />
            <Flex justifyContent="space-between" mt="8px">
                <CustomButton
                scale="xs"
                width="88px"
                isActive={stakeAmount==='100'}
                onClick={() => setStakeAmount('100')}
                >
                100 RUN
                </CustomButton>
                <CustomButton
                    scale="xs"
                    width="88px"
                    isActive={stakeAmount==='1000'}
                    onClick={() => setStakeAmount('1000')}
                >
                    1000 RUN
                </CustomButton>
                <CustomButton
                    disabled={!account || tokenBalance === 0 }
                    scale="xs"
                    width="128px"
                    isActive={Number(stakeAmount) === tokenBalance }
                    onClick={() =>
                        setStakeAmount(tokenBalance.toString())
                    }
                >
                    {t('My Balance').toLocaleUpperCase()}
                </CustomButton>
            </Flex>
            <Text mt="24px" color={theme.isDark ? theme.colors.white : theme.colors.text} bold fontSize="12px" textTransform="uppercase">
                {t('Staked for')}
            </Text>
            <ButtonMenuItem width="100%" flexWrap="wrap" justifyContent="space-between">
                <CustomButtonItem onClick={()=>setStakingDay(1)} isActive={stakingDay===1 ? !false : false}>{t('1D')}</CustomButtonItem>
                <CustomButtonItem onClick={()=>setStakingDay(7)} isActive={stakingDay===7 ? !false : false}>{t('7D')}</CustomButtonItem>
                <CustomButtonItem onClick={()=>setStakingDay(30)} isActive={stakingDay===30 ? !false : false}>{t('30D')}</CustomButtonItem>
                <CustomButtonItem onClick={()=>setStakingDay(365)} isActive={stakingDay===365 ? !false : false}>{t('1Y')}</CustomButtonItem>
            </ButtonMenuItem>
            </Flex>
            <AnimatedArrow calculatorState={state} />
            <Flex>
            <RoiCardPoolFooter
                earningTokenSymbol={earningTokenSymbol}
                totalEarning={renderStakingAmount}
                calculatorState={state}
                setTargetRoi={setTargetRoi}
                setCalculatorMode={setCalculatorMode}
                onUpdateAmount={(newValue)=>setStakeAmount(newValue)}
                stakingDay={stakingDay}
            />
            </Flex>
        </ScrollableContainer>
        <RoiCalculatorFooter
            isFarm={isFarm}
            apr={apr}
            displayApr={displayApr}
            autoCompoundFrequency={autoCompoundFrequency}
            multiplier={multiplier}
            linkLabel={linkLabel}
            linkHref={linkHref}
            performanceFee={performanceFee}
        />
    </StyledModal>
  )
}

export default RoiCalculatorPool
