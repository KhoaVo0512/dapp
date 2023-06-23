import styled from 'styled-components'
import { HelpIcon, Text, Skeleton, useTooltip } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import BigNumber from 'bignumber.js'
import { ChainId } from '@pancakeswap/sdk'
import useActiveWeb3React from 'hooks/useActiveWeb3React'

const ReferenceElement = styled.div`
  display: inline-block;
`

export interface LiquidityProps {
  liquidity: BigNumber
}

const LiquidityWrapper = styled.div`
  font-weight: 600;
  text-align: right;
  ${({ theme }) => theme.mediaQueries.lg} {
    text-align: right;
    margin-right: 0;
  }
`

const Container = styled.div`
  display: flex;
  gap:8px;
  align-items: center;
`

const Liquidity: React.FunctionComponent<React.PropsWithChildren<LiquidityProps>> = ({ liquidity }) => { 
  const { chainId } = useActiveWeb3React()
  function convertTvn ( liquidityData:number ){
    if ( chainId === ChainId.ONUS ) {
      return `${liquidityData.toLocaleString('en', { maximumFractionDigits: 0 })} VNDC`
    }
    return `$${liquidity.toNumber().toLocaleString('en', { maximumFractionDigits: 0 })}`
}
  const displayLiquidity =
    liquidity && liquidity.gt(0) ? (
      // `$${Number(liquidity).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
      convertTvn(Number(liquidity.toString()))
    ) : (
      <Skeleton width={60} />
    )
  const { t } = useTranslation()
  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    t('Total value of the funds in this farm’s liquidity pool'),
    { placement: 'top-end', tooltipOffset: [20, 10] },
  )

  return (
    <Container>
      <LiquidityWrapper>
        <Text>{displayLiquidity}</Text>
      </LiquidityWrapper>
      <ReferenceElement ref={targetRef}>
        <HelpIcon color="secondary100" />
      </ReferenceElement>
      {tooltipVisible && tooltip}
    </Container>
  )
}

export default Liquidity
