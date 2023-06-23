import React, { useRef, useEffect } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Box, Flex, Text, IconButton, CheckmarkIcon, PencilIcon, Input } from '@pancakeswap/uikit'
import useTheme from 'hooks/useTheme'
import { useTranslation } from '@pancakeswap/localization'
import { CalculatorMode, RoiCalculatorReducerState } from './useRoiCalculatorReducer'



const MILLION = 1000000
const TRILLION = 1000000000000

const RoiCardWrapper = styled(Box)`
  background: #e2e2e299 !important;
  padding: 1px;
  width: 100%;
  border-radius: 5px;
`

const RoiCardInner = styled(Box)`
  height: 120px;
  padding: 24px;
`

const RoiInputContainer = styled(Box)`
  position: relative;
  & > input {
    padding-left: 28px;
  }
  &::after {
    position: absolute;
    content: 'RUN';
    color: ${({ theme }) => theme.colors.text};
    right: 16px;
    top: 8px;
  }
`
const RoiDollarAmount = styled(Text)<{ fadeOut: boolean }>`
  position: relative;
  overflow-x: auto;
  &::-webkit-scrollbar {
    height: 0px;
  }

  ${({ fadeOut, theme }) =>
    fadeOut &&
    `
      &:after {
        background: linear-gradient(
          to right,
          ${theme.colors.background}00,
          ${theme.colors.background}E6
        );
        content: '';
        height: 100%;
        pointer-events: none;
        position: absolute;
        right: 0;
        top: 0;
        width: 40px;
      }
  `}
`

interface RoiCardProps {
  earningTokenSymbol: string
  totalEarning:number
  calculatorState: RoiCalculatorReducerState
  setTargetRoi: (amount: string) => void
  setCalculatorMode: (mode: CalculatorMode) => void
  onUpdateAmount?:(newValue) => void
  stakeAmount?:string
  stakingDay?:number
}

const RoiCardPoolFooter: React.FC<RoiCardProps> = ({ earningTokenSymbol,totalEarning, calculatorState, stakingDay, stakeAmount,  onUpdateAmount, setTargetRoi, setCalculatorMode }) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { roiUSD, roiTokens, roiPercentage } = calculatorState.data
  const { mode } = calculatorState.controls

  const { t } = useTranslation()
  const runPriceUsd = 0.1
  useEffect(() => {
    if (mode === CalculatorMode.PRINCIPAL_BASED_ON_ROI && inputRef.current) {
      inputRef.current.focus()
    }
  }, [mode])
  const { theme } = useTheme()
  const onExitRoiEditing = () => {
    setCalculatorMode(CalculatorMode.ROI_BASED_ON_PRINCIPAL)
  }
  function handleChangeInput (event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value
    const newStakingAmount = Number(value)/(1.000000019025875**(28800*stakingDay))
    onUpdateAmount(newStakingAmount)
  }
  return (
    <RoiCardWrapper>
      <RoiCardInner>
        <Text fontSize="12px" color={theme.isDark ? theme.colors.white : theme.colors.text} bold textTransform="uppercase">
          {t('ROI at current rates')}
        </Text>
        <Flex justifyContent="space-between" mt="4px" height="36px">
          {mode === CalculatorMode.PRINCIPAL_BASED_ON_ROI ? (
            <>
              <RoiInputContainer>
                <Input
                  ref={inputRef}
                  type="number"
                  inputMode="decimal"
                  pattern="\d*"
                  scale="sm"
                  value={stakeAmount}
                  placeholder="0.0"
                  onChange={handleChangeInput}
                  style={{color:theme.colors.text}}
                />
              </RoiInputContainer>
              <IconButton scale="sm" variant="text" onClick={onExitRoiEditing}>
                <CheckmarkIcon color="text" />
              </IconButton>
            </>
          ) : (
            <>
              <Flex alignItems="center" style={{gap:"10px"}}>               
                <RoiDollarAmount fontSize="24px" color="primaryBright" bold fadeOut={roiUSD > TRILLION}>
                  {(totalEarning*runPriceUsd).toLocaleString('en', {
                    minimumFractionDigits: roiUSD > MILLION ? 0 : 2,
                    maximumFractionDigits: roiUSD > MILLION ? 0 : 2,
                  })}
                </RoiDollarAmount>
                <Text fontSize="24px" bold color="primaryBright">
                    {earningTokenSymbol}
                </Text>
              </Flex>
            </>
          )}
        </Flex>
        <Text fontSize="12px" color="textSubtle">
          ~ {totalEarning.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} RUN
        </Text>
      </RoiCardInner>
    </RoiCardWrapper>
  )
}

export default RoiCardPoolFooter
