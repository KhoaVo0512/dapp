import { useEffect, useMemo, useState } from 'react'
import { ChainId, Currency } from '@pancakeswap/sdk'
import { Box, Flex, BottomDrawer, useMatchBreakpoints } from '@pancakeswap/uikit'
import Footer from 'components/Menu/Footer'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { EXCHANGE_DOCS_URLS } from 'config/constants'
import { useDefaultsFromURLSearch } from 'state/limitOrders/hooks'
import { AppBody } from 'components/App'
import HeaderLiquidity from 'components/HeaderLiquidity/HeaderLiquidity'
import PageFullWidth from 'components/Layout/PageFullWidth'
import Nav from 'components/Menu/SubNav'
import styled from 'styled-components'
import { useTranslation } from '@pancakeswap/localization'
import { useCurrency } from '../../hooks/Tokens'
import { Field } from '../../state/swap/actions'
import { useSwapState, useSingleTokenSwapInfo } from '../../state/swap/hooks'
import { useExchangeChartManager } from '../../state/user/hooks'
import Page from '../Page'
import PriceChartContainer from './components/Chart/PriceChartContainer'
import SwapForm from './components/SwapForm'
import StableSwapFormContainer from './StableSwap'
import { StyledInputCurrencyWrapper, StyledSwapContainer } from './styles'
import SwapTab, { SwapType } from './components/SwapTab'
import { Wrapper } from './components/styleds'
// eslint-disable-next-line import/named
import AppHeader from './components/AppHeader'

const CHART_SUPPORT_CHAIN_IDS = [ChainId.BSC]
export const ACCESS_TOKEN_SUPPORT_CHAIN_IDS = [ChainId.BSC]

const STABLE_SUPPORT_CHAIN_IDS = [ChainId.BSC_TESTNET, ChainId.BSC]

export default function Swap() {
  const { isMobile } = useMatchBreakpoints()
  const [isChartExpanded, setIsChartExpanded] = useState(false)
  const [userChartPreference, setUserChartPreference] = useExchangeChartManager(isMobile)
  const [isChartDisplayed, setIsChartDisplayed] = useState(userChartPreference)

  useDefaultsFromURLSearch()

  useEffect(() => {
    setUserChartPreference(isChartDisplayed)
  }, [isChartDisplayed, setUserChartPreference])

  const { chainId } = useActiveWeb3React()

  // swap state & price data
  const {
    [Field.INPUT]: { currencyId: inputCurrencyId },
    [Field.OUTPUT]: { currencyId: outputCurrencyId },
  } = useSwapState()
  const inputCurrency = useCurrency(inputCurrencyId)
  const outputCurrency = useCurrency(outputCurrencyId)

  const currencies: { [field in Field]?: Currency } = {
    [Field.INPUT]: inputCurrency ?? undefined,
    [Field.OUTPUT]: outputCurrency ?? undefined,
  }

  const singleTokenPrice = useSingleTokenSwapInfo(inputCurrencyId, inputCurrency, outputCurrencyId, outputCurrency)

  const isChartSupported = useMemo(
    () =>
      // avoid layout shift, by default showing
      !chainId || CHART_SUPPORT_CHAIN_IDS.includes(chainId),
    [chainId],
  )

  const isStableSupported = useMemo(() => !chainId || STABLE_SUPPORT_CHAIN_IDS.includes(chainId), [chainId])

  const isAccessTokenSupported = useMemo(() => ACCESS_TOKEN_SUPPORT_CHAIN_IDS.includes(chainId), [chainId])
  const { t } = useTranslation()
  return (  
    <PageFullWidth>
    <HeaderLiquidity bgColor="#4B19F5" namePlace="Exchange" nameTitle="run together" />
    <Nav />
    <Container>
      <WrapAppBody>
      <Wrapper id="swap-page">
      <AppHeader title={t('Swap')} subtitle={t('Swap tokens easily with one click')} /> 

      <Flex width="100%" justifyContent="center" position="relative">
        {/* {!isMobile && isChartSupported && (
          <PriceChartContainer
            inputCurrencyId={inputCurrencyId}
            inputCurrency={currencies[Field.INPUT]}
            outputCurrencyId={outputCurrencyId}
            outputCurrency={currencies[Field.OUTPUT]}
            isChartExpanded={isChartExpanded}
            setIsChartExpanded={setIsChartExpanded}
            isChartDisplayed={isChartDisplayed}
            currentSwapPrice={singleTokenPrice}
          />
        )} */}
        {/* {isChartSupported && (
          <BottomDrawer
            content={
              <PriceChartContainer
                inputCurrencyId={inputCurrencyId}
                inputCurrency={currencies[Field.INPUT]}
                outputCurrencyId={outputCurrencyId}
                outputCurrency={currencies[Field.OUTPUT]}
                isChartExpanded={isChartExpanded}
                setIsChartExpanded={setIsChartExpanded}
                isChartDisplayed={isChartDisplayed}
                currentSwapPrice={singleTokenPrice}
                isMobile
              />
            }
            isOpen={isChartDisplayed}
            setIsOpen={setIsChartDisplayed}
          />
        )} */}
        <Flex flexDirection="column" width="100%">
          <StyledSwapContainer $isChartExpanded={isChartExpanded}>
            <StyledInputCurrencyWrapper mt={isChartExpanded ? '24px' : '0'}>
            <SwapForm
                        isAccessTokenSupported={isAccessTokenSupported}
                        setIsChartDisplayed={setIsChartDisplayed}
                        isChartDisplayed={isChartDisplayed}
                      />
              {/* <AppBody>
                <SwapTab showStable={isStableSupported}>
                  {(swapTypeState) =>
                    swapTypeState === SwapType.STABLE_SWAP ? (
                      <StableSwapFormContainer
                        setIsChartDisplayed={setIsChartDisplayed}
                        isChartDisplayed={isChartDisplayed}
                      />
                    ) : (
                      <SwapForm
                        isAccessTokenSupported={isAccessTokenSupported}
                        setIsChartDisplayed={setIsChartDisplayed}
                        isChartDisplayed={isChartDisplayed}
                      />
                    )
                  }
                </SwapTab>
              </AppBody> */}
            </StyledInputCurrencyWrapper>
          </StyledSwapContainer>
          {isChartExpanded && (
            <Box display={['none', null, null, 'block']} width="100%" height="100%">
              <Footer variant="side" helpUrl={EXCHANGE_DOCS_URLS} />
            </Box>
          )}
        </Flex>      
          
      </Flex> 

     </Wrapper>
     </WrapAppBody>
     </Container>
     </PageFullWidth>       
  )
}

const Container = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -18px;
  /* flex-direction: column; */
  /* @media screen and (max-width: 600px) {
    padding: 0 16px;    
  } */
`

export const CustomToken = styled(Flex)`
  margin: 20px 0;
`

export const WrapIcon = styled.div`
  padding: 0 5px;
`

export const CustomFlex = styled(Flex)`
  justify-content: space-around;
  padding-left: 20px;
`

const WrapAppBody = styled.div`
  position: relative;
  max-width: 600px;
  width: 100%;
  z-index: 5;
  background: ${({ theme }) => theme.colors.background};
  backdrop-filter: blur(20px);
  border-radius: 20px;
  margin-bottom: 30px;
  box-shadow: 0px 54px 54px -48px rgba(31, 47, 70, 0.12);
  @media only screen and (max-width: 600px) {
    margin-left: 16px;
    margin-right: 16px;
    width: 98%;
    padding: 0px;
  }
`
