import { useEffect, useState } from 'react'
import { Currency, Pair } from '@pancakeswap/sdk'
import { Button, ChevronDownIcon, Text, useModal, Flex, Box,CopyIcon } from '@pancakeswap/uikit'
import styled, { css } from 'styled-components'
import { isAddress } from 'utils'
import { useTranslation } from '@pancakeswap/localization'
import { WrappedTokenInfo } from '@pancakeswap/tokens'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { StablePair } from 'views/AddLiquidity/AddStableLiquidity/hooks/useStableLPDerivedMintInfo'

import { useBUSDCurrencyAmount } from 'hooks/useBUSDPrice'
import { formatNumber } from 'utils/formatBalance'
import { useCurrencyBalance } from '../../state/wallet/hooks'
import CurrencySearchModal from '../SearchModal/CurrencySearchModal'
import { CurrencyLogo, DoubleCurrencyLogo } from '../Logo'

import { Input as NumericalInput } from './NumericalInput'
import AddToWalletButton from '../AddToWallet/AddToWalletButton'

const InputRow = styled.div<{ selected: boolean }>`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-end;
  width: 40%;
  padding: ${({ selected }) => (selected ? '0.75rem 0.5rem 0.75rem 0rem' : '0.75rem 0.75rem 0.75rem 0rem')};
`
const CurrencySelectButton = styled(Button).attrs({ variant: 'text', scale: 'sm' })<{ zapStyle?: ZapStyle }>`
  border-bottom:none!important;
  padding:0px !important;
  ${({ zapStyle, theme }) =>
    zapStyle &&
    css`
      padding: 8px;
      height: auto;
    `};
`
const LabelRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 0.75rem 1rem 0 1rem;
  justify-content:space-between;
`
const CsLabelRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.75rem;
  line-height: 1rem;
  /* padding: 0.75rem 1rem 0 0rem; */
  justify-content:flex-end;
  width: 60%;
`
const InputPanel = styled.div`
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  z-index: 1;
`
const Container = styled.div<{ zapStyle?: ZapStyle; error?: boolean }>`
  display: flex;
  flex-direction:row;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
`

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.6;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
`
const CustomIconCopy = styled(CopyIcon)`
  fill:#6C5DD3!important;
  width: 12px;
  height: 12px;
`
const Tooltip = styled.div<{ isTooltipDisplayed: boolean }>`
  display: ${({ isTooltipDisplayed }) => (isTooltipDisplayed ? 'inline-block' : 'none')};
  position: absolute;
  padding: 8px;
  top: -35px;
  right: -15px;
  text-align: center;
  background-color: #fff;
  color: #000;
  border-radius: 16px;
  width: 100px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.1);
`
const CsButton = styled.button`
  border:none;
  color:${({ theme }) => theme.colors.text};
  font-weight:bold;
  text-transform:uppercase;
  background:transparent;
  font-size:16px;
  cursor: pointer;
`
const ContainerIcon = styled.label`
`
const Relative = styled.div`
  position: relative;
`




type ZapStyle = 'noZap' | 'zap'

interface CurrencyInputPanelProps {
  value: string
  onUserInput: (value: string) => void
  onInputBlur?: () => void
  onPercentInput?: (percent: number) => void
  onMax?: () => void
  showQuickInputButton?: boolean
  showMaxButton: boolean
  label?: string
  onCurrencySelect?: (currency: Currency) => void
  currency?: Currency | null
  disableCurrencySelect?: boolean
  hideBalance?: boolean
  pair?: Pair | StablePair | null
  otherCurrency?: Currency | null
  id: string
  showCommonBases?: boolean
  commonBasesType?: string
  zapStyle?: ZapStyle
  beforeButton?: React.ReactNode
  disabled?: boolean
  error?: boolean
  showBUSD?: boolean
}
export default function CurrencyInputPanel({
  value,
  onUserInput,
  onInputBlur,
  onPercentInput,
  onMax,
  showQuickInputButton = false,
  showMaxButton,
  label,
  onCurrencySelect,
  currency,
  disableCurrencySelect = false,
  hideBalance = false,
  zapStyle,
  beforeButton,
  pair = null, // used for double token logo
  otherCurrency,
  id,
  showCommonBases,
  commonBasesType,
  disabled,
  error,
  showBUSD,
}: CurrencyInputPanelProps) {
  const { account } = useActiveWeb3React()
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined)
  const { t } = useTranslation()

  const token = pair ? pair.liquidityToken : currency?.isToken ? currency : null
  const tokenAddress:any = token ? isAddress(token.address) : null
  const translatedLabel = label || t('Input')
  const amountInDollar = useBUSDCurrencyAmount(
    showBUSD ? currency : undefined,
    Number.isFinite(+value) ? +value : undefined,
  )

  const [onPresentCurrencyModal] = useModal(
    <CurrencySearchModal
      onCurrencySelect={onCurrencySelect}
      selectedCurrency={currency}
      otherSelectedCurrency={otherCurrency}
      showCommonBases={showCommonBases}
      commonBasesType={commonBasesType}
    />,
  )
  const [isTooltipDisplayed, setIsTooltipDisplayed] = useState(false)
  const handleCopy = () => {
    if (navigator.clipboard && navigator.permissions) {
        navigator.clipboard.writeText(tokenAddress).then(() => displayTooltip())
      } else if (document.queryCommandSupported('copy')) {
        const ele = document.createElement('textarea')
        ele.value = tokenAddress
        document.body.appendChild(ele)
        ele.select()
        document.execCommand('copy')
        document.body.removeChild(ele)
        displayTooltip()
      }
  }
  function displayTooltip() {
    setIsTooltipDisplayed(true)
    setTimeout(() => {
      setIsTooltipDisplayed(false)
    }, 2000)
}



  return (
    <Box position="relative" id={id}>
      <Flex alignItems="center" justifyContent="space-between">
        {/* <Flex>
          {beforeButton}
          <CurrencySelectButton
            zapStyle={zapStyle}
            className="open-currency-select-button"
            selected={!!currency}
            onClick={() => {
              if (!disableCurrencySelect) {
                onPresentCurrencyModal()
              }
            }}
          >
            <Flex alignItems="center" justifyContent="space-between">
              {pair ? (
                <DoubleCurrencyLogo currency0={pair.token0} currency1={pair.token1} size={16} margin />
              ) : currency ? (
                <CurrencyLogo currency={currency} size="24px" style={{ marginRight: '8px' }} />
              ) : null}
              {pair ? (
                <Text id="pair" bold>
                  {pair?.token0.symbol}:{pair?.token1.symbol}
                </Text>
              ) : (
                <Text id="pair" bold>
                  {(currency && currency.symbol && currency.symbol.length > 20
                    ? `${currency.symbol.slice(0, 4)}...${currency.symbol.slice(
                        currency.symbol.length - 5,
                        currency.symbol.length,
                      )}`
                    : currency?.symbol) || t('Select a currency')}
                </Text>
              )}
              {!disableCurrencySelect && <ChevronDownIcon />}
            </Flex>
          </CurrencySelectButton>
          {token && tokenAddress ? (
            <Flex style={{ gap: '5px' }} ml="5px" alignItems="center">
              <Relative>
              <ContainerIcon>
                <CustomIconCopy onClick={handleCopy} />
                <Tooltip isTooltipDisplayed={isTooltipDisplayed}>Copied</Tooltip>
              </ContainerIcon>
              </Relative>
              <AddToWalletButton
                variant="text"
                p="0"
                height="auto"
                width="fit-content"
                tokenAddress={tokenAddress}
                tokenSymbol={token.symbol}
                tokenDecimals={token.decimals}
                tokenLogo={token instanceof WrappedTokenInfo ? token.logoURI : undefined}
              />
            </Flex>
          ) : null}
        </Flex> */}
        <Flex>
          <Text color="textSubtle">{translatedLabel}</Text>
        </Flex>
        {account && (
          <Text
            onClick={!disabled && onMax}
            color="text"
            fontSize="14px"
            style={{ display: 'inline', cursor: 'pointer' }}
          >
            {!hideBalance && !!currency
              ? t('Balance: %balance%', { balance: selectedCurrencyBalance?.toSignificant(6) ?? t('Loading') })
              : ' -'}
          </Text>
        )}
      </Flex>
      <InputPanel>
        <Container as="label" zapStyle={zapStyle} error={error}>
          <CsLabelRow>
            <NumericalInput
              error={error}
              disabled={disabled}
              className="token-amount-input"
              value={value}
              onBlur={onInputBlur}
              onUserInput={(val) => {
                onUserInput(val)
              }}
            />
          </CsLabelRow>
          <InputRow selected={disableCurrencySelect}>
            {!!currency && showBUSD && Number.isFinite(amountInDollar) && (
              <Text fontSize="12px" color="textSubtle" mr="12px">
                ~{formatNumber(amountInDollar)} USD
              </Text>
            )}
            <Flex alignItems="right" justifyContent="flex-end" width="100%">
               {account && currency && selectedCurrencyBalance?.greaterThan(0) && !disabled && label !== 'To' && (
                  <Flex>
                      {showMaxButton && (
                          <CsButton 
                              onClick={onMax} 
                              // variant="text" 
                              // style={{ textTransform: 'uppercase' }}
                          >
                            {t('Max')}
                          </CsButton>
                      )}
                  </Flex>
                )}
                <CurrencySelectButton
                    zapStyle={zapStyle}
                    className="open-currency-select-button"
                    selected={!!currency}
                    onClick={() => {
                      if (!disableCurrencySelect) {
                        onPresentCurrencyModal()
                      }
                    }}
                  >
                    <Flex alignItems="center" justifyContent="space-between">
                      {pair ? (
                        <DoubleCurrencyLogo currency0={pair.token0} currency1={pair.token1} size={16} margin />
                      ) : currency ? (
                        <CurrencyLogo currency={currency} size="24px" style={{ marginRight: '8px' }} />
                      ) : null}
                      {pair ? (
                        <Text id="pair" bold>
                          {pair?.token0.symbol}:{pair?.token1.symbol}
                        </Text>
                      ) : (
                        <Text id="pair" bold>
                          {(currency && currency.symbol && currency.symbol.length > 20
                            ? `${currency.symbol.slice(0, 4)}...${currency.symbol.slice(
                                currency.symbol.length - 5,
                                currency.symbol.length,
                              )}`
                            : currency?.symbol) || t('Select a currency')}
                        </Text>
                      )}
                      {!disableCurrencySelect && <ChevronDownIcon />}
                    </Flex>
                  </CurrencySelectButton>
            </Flex>
            {/* {account && currency && selectedCurrencyBalance?.greaterThan(0) && !disabled && label !== 'To' && (
              <Flex>
                {showMaxButton && (
                  <CsButton 
                      onClick={onMax} 
                      // variant="text" 
                      // style={{ textTransform: 'uppercase' }}
                  >
                    {t('Max')}
                  </CsButton>
                )}
                  
              </Flex>
            )} */}
          </InputRow>
        </Container>
        {disabled && <Overlay />}
      </InputPanel>
    </Box>
  )
}
