import { useTranslation } from '@pancakeswap/localization'
import { Text, TokenPairImage } from '@pancakeswap/uikit'
import React from 'react'
import { useFarmUser } from 'state/farms/hooks'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'



export interface FarmProps {
  label: string
  pid: number
  token: string
  quoteToken: string
}

const Container = styled.div`
  padding-left: 16px;
  display: flex;
  align-items: center;
  ${({ theme }) => theme.mediaQueries.sm} {
     padding-left: 12px;
  }
`

const TokenWrapper = styled.div`
  padding-right: 8px;
  width: 60px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 50px;
  }
`

const StyledText = styled(Text)`
  font-size: 16px;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 16px;
 }
`
const StyledTextEarn = styled(Text)`
  font-size: 14px;
  color: #B1B5C3;
  font-weight: 600;
  line-height: 21px;
  font-family: 'Poppins';
  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 16px;
 }
`

const getImageUrlFromToken = (token:any) => {  
  return `/images/coins/${token?.address.toString()}.png`
}
const Farm: React.FunctionComponent<FarmProps> = ({ token, quoteToken, label, pid }) => {
  const { stakedBalance } = useFarmUser(pid)
  const { t } = useTranslation()
  const rawStakedBalance = getBalanceNumber(stakedBalance)

  const handleRenderFarming = (): JSX.Element => {
    if (rawStakedBalance) {
      return (
        <></>
      )
    }

    return null
  }

  return (
    <Container>
      <TokenWrapper>
        <TokenPairImage variant="inverted" primarySrc={getImageUrlFromToken(token)} secondarySrc={getImageUrlFromToken(quoteToken)} thirdSrc="/images/Run_Logo.svg" width={120} height={95} />
      </TokenWrapper>
      <div style={{marginLeft:"45px"}}>
        {handleRenderFarming()}
        <StyledText bold>{label} LP</StyledText>
        <StyledTextEarn>Earn RUN</StyledTextEarn>
      </div>
    </Container>
  )
}

export default Farm
