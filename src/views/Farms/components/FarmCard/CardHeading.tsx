import React from 'react'
import styled from 'styled-components'
import { Tag, Flex, Heading, useMatchBreakpoints, TokenPairImage } from '@pancakeswap/uikit'
import { CommunityTag, CoreTag } from 'components/Tags'
import { getAddress } from 'utils/addressHelpers'
import tokens from 'config/constants/tokens'

export interface ExpandableSectionProps {
  lpLabel?: string
  multiplier?: string
  isCommunityFarm?: boolean
  token: string
  quoteToken: string
}
const MultiplierTag = styled(Tag)`
  margin-left: 4px;
  color: #FFFFFF !important;
  background: ${({theme}) => theme.colors.gold};
`
const Wrapper = styled(Flex)`
  height: 150px;
  background: url('/images/farms/bg_card_heading.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 30px 10px 10px 10px;
    svg {
    margin-right: 4px;
  }
`
const CustomHeading = styled(Heading)`
  color: #fff;
  font-size:14px;
  font-weight: 400;
`
const getImageUrlFromToken = (token: string) => {
  return `/images/coins/${token}.png`
}
const CardHeading: React.FC<ExpandableSectionProps> = ({ lpLabel, multiplier, isCommunityFarm, token, quoteToken }) => {
  const { isXl } = useMatchBreakpoints()
  const isMobile = isXl === false

  return (
    <Wrapper justifyContent="space-between" alignItems="start">
      <TokenPairImage variant="default" primarySrc={getImageUrlFromToken(token)} secondarySrc={getImageUrlFromToken(quoteToken)} thirdSrc="/images/Run_Logo.svg" width={100} height={100} />
      <Flex width='60%' flexDirection="column" alignItems="start" style={{marginTop:isMobile ? "5px" : "0px"}}>
        <Flex justifyContent="start">
          {isCommunityFarm ? <CommunityTag /> : <CoreTag />}
          {/* <MultiplierTag variant="primary">{multiplier}</MultiplierTag> */}
        </Flex>
        <Heading mt="4px" color='#fff'>{lpLabel.split(' ')[0]}</Heading>
        <CustomHeading mt="5px">Earn RUN</CustomHeading>
      </Flex>
    </Wrapper>
  )
}

export default CardHeading
