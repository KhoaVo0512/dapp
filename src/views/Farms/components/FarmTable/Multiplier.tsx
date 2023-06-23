import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { useLpTokenPrice } from 'state/farms/hooks'

import { Text, HelpIcon, Skeleton, useTooltip } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'

const ReferenceElement = styled.div`
  display: inline-block;
`

export interface MultiplierProps {
  multiplier?: string,
  userStaked?:any,
  liquidity?:any,
  lpSymbol?:string
}

const MultiplierWrapper = styled.div`
  color: ${({ theme }) => theme.colors.text};
  min-width:80px;
  width: 100%;
  text-align: right;
  margin-right: 14px;

  ${({ theme }) => theme.mediaQueries.lg} {
    text-align: left;
    margin-right: 0;
  }
`

const Container = styled.div`
  display: flex;
  align-items: center;
`

const Multiplier: React.FunctionComponent<React.PropsWithChildren<MultiplierProps>> = ({ multiplier, userStaked, liquidity, lpSymbol }) => {
  
  const lpPrice = useLpTokenPrice(lpSymbol)

  const convertStakedBalance = Number(userStaked.dividedBy(1E18).toString())*Number(lpPrice.toString())

  const convertLiquidity = Number(liquidity?.liquidity?.toString()) > 0
  
  const percentUserStaked = 
  convertLiquidity
    ? `${(convertStakedBalance/Number(liquidity?.liquidity?.toString())*100).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`
    : '0.00%'

  return (
    <Container>
      <MultiplierWrapper>{percentUserStaked}</MultiplierWrapper>
    </Container>
  )
}

export default Multiplier
