import { useTranslation } from '@pancakeswap/localization'
import { Card, Flex, Skeleton, Text } from '@pancakeswap/uikit'
import BigNumber from 'bignumber.js'
import { ChainId } from '@pancakeswap/sdk'
import ExpandableSectionButton from 'components/ExpandableSectionButton'
import { BASE_ADD_LIQUIDITY_URL } from 'config'
import { useLpTokenPrice } from 'state/farms/hooks'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useCallback, useState } from 'react'
import { GetTokenBalance } from 'utils/getTokenBalance'
import styled from 'styled-components'
import { getBlockExploreLink } from 'utils'
import { getBalanceNumber } from 'utils/formatBalance'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { multiChainPaths } from 'state/info/constant'
import { FarmWithStakedValue } from '../types'
import ApyButton from './ApyButton'
import CardActionsContainer from './CardActionsContainer'
import CardHeading from './CardHeading'
import DetailsSection from './DetailsSection'

import BoostedApr from '../YieldBooster/components/BoostedApr'

const StyledCard = styled.div`
  align-self: baseline;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({theme}) => theme.radii.card};
  box-shadow: 0px 1px 4px rgba(25, 19, 38, 0.15);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: relative;
  text-align: center;
  max-width: 400px;
  width: 100%;
  min-width: 300px;
  overflow: hidden;
`

const FarmCardInnerContainer = styled(Flex)`
  flex-direction: column;
  justify-content: space-around;
  padding: 24px;
`

const ExpandingWrapper = styled.div`
  padding: 24px;
  border-top: 2px solid ${({ theme }) => theme.colors.cardBorder};
  overflow: hidden;
`

interface FarmCardProps {
  farm: FarmWithStakedValue
  displayApr: string
  removed: boolean
  cakePrice?: BigNumber
  account?: string
  originalLiquidity?: BigNumber
}

const FarmCard: React.FC<React.PropsWithChildren<FarmCardProps>> = ({
  farm,
  displayApr,
  removed,
  cakePrice,
  account,
  originalLiquidity,
}) => {
  const { t } = useTranslation()
  const { chainId } = useActiveWeb3React()

  const [showExpandableSection, setShowExpandableSection] = useState(false)

  const liquidity =
    farm?.liquidity && originalLiquidity?.gt(0) ? farm.liquidity.plus(originalLiquidity) : farm.liquidity
  
  const lpPrice = useLpTokenPrice(farm?.lpSymbol)
  function convertTvn ( liquidityData:number ){
      if ( chainId === ChainId.ONUS ) {
        return `${liquidityData.toLocaleString('en', { maximumFractionDigits: 0 })} VNDC`
      }
      return `$${liquidity.toNumber().toLocaleString('en', { maximumFractionDigits: 0 })}`
  }
  const totalValueFormatted = 
    liquidity && liquidity.gt(0)
      ? convertTvn(liquidity.toNumber())
      : ''
  
  const lpLabel = farm.lpSymbol && farm.lpSymbol.toUpperCase().replace('PANCAKE', '')
  const earnLabel = farm.dual ? farm.dual.earnLabel : t('RUN + Fees')

  const liquidityUrlPathParts = getLiquidityUrlPathParts({
    quoteTokenAddress: farm.quoteToken.address,
    tokenAddress: farm.token.address
  })

  const addLiquidityUrl = `/add/${liquidityUrlPathParts}` 
  const { lpAddress } = farm
  const isPromotedFarm = farm.token.symbol === 'RUN'
  const { stakedBalance, proxy, tokenBalance } = farm.userData

  const convertStakedBalance = Number(stakedBalance.dividedBy(1E18).toString())*Number(lpPrice.toString())

  const percentUserStaked = 
  liquidity && liquidity.gt(0)
    ? `${(convertStakedBalance/Number(liquidity.toString())*100).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`
    : '0.00%'
  
  const toggleExpandableSection = useCallback(() => {
    setShowExpandableSection((prev) => !prev)
  }, [])
  
  return (
    <StyledCard>
      <FarmCardInnerContainer>
      <CardHeading
          lpLabel={lpLabel}
          multiplier={farm.multiplier}
          isCommunityFarm={farm.isCommunity}
          token={farm.token.address}
          quoteToken={farm.quoteToken.address}
        />
        {!removed && (
          <Flex justifyContent="space-between" alignItems="center" mt={2}>
            <Text>{t('APR')}:</Text>
            <Text bold style={{ display: 'flex', alignItems: 'center' }}>
              {farm.apr ? (
                <>
                  {farm.boosted ? (
                    <BoostedApr
                      mr="4px"
                      lpRewardsApr={farm.lpRewardsApr}
                      apr={farm.apr}
                      pid={farm?.pid}
                      lpTotalSupply={farm.lpTotalSupply}
                      userBalanceInFarm={
                        (stakedBalance.plus(tokenBalance).gt(0)
                          ? stakedBalance?.plus(tokenBalance)
                          : proxy?.stakedBalance.plus(proxy?.tokenBalance)) ?? new BigNumber(0)
                      }
                    />
                  ) : null}
                  <ApyButton
                    variant="text-and-button"
                    pid={farm.pid}
                    lpSymbol={farm.lpSymbol}
                    multiplier={farm.multiplier}
                    lpLabel={lpLabel}
                    addLiquidityUrl={addLiquidityUrl}
                    cakePrice={cakePrice}
                    apr={farm.apr}
                    displayApr={displayApr}
                  />
                </>
              ) : (
                <Skeleton height={24} width={80} />
              )}
            </Text>
          </Flex>
        )}
        <Flex justifyContent="space-between">
          <Text color='text'>{t('TVL')}:</Text>
          {totalValueFormatted ? <Text bold>{totalValueFormatted}</Text> : <Skeleton width={75} height={25} />}
        </Flex>
        <Flex justifyContent="space-between">
          <Text>{t('Earn')}:</Text>
          <Text>{earnLabel}</Text>
        </Flex>
        <CardActionsContainer
          farm={farm}
          lpLabel={lpLabel}
          account={account}
          addLiquidityUrl={addLiquidityUrl}
          displayApr={displayApr}
          percentUserStaked={percentUserStaked}
        />
      </FarmCardInnerContainer>
      <ExpandingWrapper>
        <ExpandableSectionButton onClick={toggleExpandableSection} expanded={showExpandableSection} />
        {showExpandableSection && (
          <DetailsSection
            removed={removed}
            bscScanAddress={getBlockExploreLink(lpAddress, 'address', chainId)}
            infoAddress={`/info${multiChainPaths[chainId]}/pools/${lpAddress}`}
            totalValueFormatted={totalValueFormatted}
            lpLabel={lpLabel}
            addLiquidityUrl={addLiquidityUrl}
            isCommunity={farm.isCommunity}
            auctionHostingEndDate={farm.auctionHostingEndDate}
          />
        )}
      </ExpandingWrapper>
    </StyledCard>
  )
}

export default FarmCard
