import { Price, Currency } from '@pancakeswap/sdk'
import { Text, AutoRenewIcon, Flex } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { StyledBalanceMaxMini } from './styleds'

interface TradePriceProps {
  price?: Price<Currency, Currency>
  showInverted: boolean
  setShowInverted: (showInverted: boolean) => void
}

export default function TradePrice({ price, showInverted, setShowInverted }: TradePriceProps) {
  const formattedPrice = showInverted ? price?.toSignificant(6) : price?.invert()?.toSignificant(6)
  const show = Boolean(price?.baseCurrency && price?.quoteCurrency)
  const label = showInverted
    ? `${price?.quoteCurrency?.symbol} per ${price?.baseCurrency?.symbol}`
    : `${price?.baseCurrency?.symbol} per ${price?.quoteCurrency?.symbol}`

  return (
    <Text style={{ justifyContent: 'flex-end', alignItems: 'center', display: 'flex', flexWrap: 'wrap'}}>
      {show ? (
        <Flex flexDirection='row'>
          <CsFlex>
            {formattedPrice ?? '-'} {label}
          </CsFlex>          
          <StyledBalanceMaxMini onClick={() => setShowInverted(!showInverted)}>
            <AutoRenewIcon width="14px" />
          </StyledBalanceMaxMini>
        </Flex>
      ) : (
        '-'
      )}
    </Text>
  )
}

const CsFlex = styled.div`
  display: flex;
  overflow-wrap: anywhere;
  width: 100%;
  justify-content: flex-end;
`
