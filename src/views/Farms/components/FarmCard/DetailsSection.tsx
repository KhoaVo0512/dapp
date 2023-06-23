import { useTranslation } from '@pancakeswap/localization'
import styled from 'styled-components'
import { Text, Flex, LinkExternal, Skeleton } from '@pancakeswap/uikit'

export interface ExpandableSectionProps {
  bscScanAddress?: string
  infoAddress?: string
  removed?: boolean
  totalValueFormatted?: string
  lpLabel?: string
  addLiquidityUrl?: string
  isCommunity?: boolean
  auctionHostingEndDate?: string
}

const Wrapper = styled.div`
  margin-top: 24px;
`

const StyledLinkExternal = styled(LinkExternal)`
  font-weight: 700;
`

const DetailsSection: React.FC<React.PropsWithChildren<ExpandableSectionProps>> = ({
  bscScanAddress,
  infoAddress,
  removed,
  totalValueFormatted,
  lpLabel,
  addLiquidityUrl,
  isCommunity,
  auctionHostingEndDate,
}) => {
  const {
    t,
    currentLanguage: { locale },
  } = useTranslation()

  return (
    <Wrapper>
      {isCommunity && auctionHostingEndDate && (
        <Flex justifyContent="space-between">
          <Text>{t('Auction Hosting Ends')}:</Text>
          <Text>
            {new Date(auctionHostingEndDate).toLocaleString(locale, {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </Text>
        </Flex>
      )}
      {/* <Flex justifyContent="space-between">
        <Text bold color='text'>{t('Total Liquidity')}:</Text>
        {totalValueFormatted ? <Text>{totalValueFormatted}</Text> : <Skeleton width={75} height={25} />}
      </Flex> */}
     <Flex width='100%' flexDirection='column' alignItems='center'>
        {!removed && (
          <StyledLinkExternal color='secondary100' href={addLiquidityUrl}>{t('Get %symbol%', { symbol: lpLabel })}</StyledLinkExternal>
        )}
        <StyledLinkExternal color='secondary100' href={bscScanAddress}>{t('View Contract')}</StyledLinkExternal>
        {/* <StyledLinkExternal href={infoAddress}>{t('See Pair Info')}</StyledLinkExternal> */}
     </Flex>
    </Wrapper>
  )
}

export default DetailsSection
