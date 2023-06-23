import { useMemo } from 'react'
import styled from 'styled-components'
import { Text, Flex, CardBody, CardFooter, Button, AddIcon } from '@pancakeswap/uikit'
import Link from 'next/link'
import { useWeb3React } from '@pancakeswap/wagmi'
import { useTranslation } from '@pancakeswap/localization'
import { useLPTokensWithBalanceByAccount } from 'views/Swap/StableSwap/hooks/useStableConfig'
import PageFullWidth from 'components/Layout/PageFullWidth'
import HeaderLiquidity from 'components/HeaderLiquidity/HeaderLiquidity'
import Nav from 'components/Menu/SubNav'
import FullPositionCard, { StableFullPositionCard } from '../../components/PositionCard'
import { useTokenBalancesWithLoadingIndicator } from '../../state/wallet/hooks'
import { usePairs, PairState } from '../../hooks/usePairs'
import { toV2LiquidityToken, useTrackedTokenPairs } from '../../state/user/hooks'
import Dots from '../../components/Loader/Dots'
import { AppHeader, AppBody } from '../../components/App'




const Body = styled(CardBody)``
export default function Pool() {
  const { account } = useWeb3React()
  const { t } = useTranslation()

  // fetch the user's balances of all tracked V2 LP tokens
  const trackedTokenPairs = useTrackedTokenPairs()
  const tokenPairsWithLiquidityTokens = useMemo(
    () => trackedTokenPairs.map((tokens) => ({ liquidityToken: toV2LiquidityToken(tokens), tokens })),
    [trackedTokenPairs],
  )
  const liquidityTokens = useMemo(
    () => tokenPairsWithLiquidityTokens.map((tpwlt) => tpwlt.liquidityToken),
    [tokenPairsWithLiquidityTokens],
  )
  const [v2PairsBalances, fetchingV2PairBalances] = useTokenBalancesWithLoadingIndicator(
    account ?? undefined,
    liquidityTokens,
  )

  const stablePairs = useLPTokensWithBalanceByAccount(account)

  // fetch the reserves for all V2 pools in which the user has a balance
  const liquidityTokensWithBalances = useMemo(
    () =>
      tokenPairsWithLiquidityTokens.filter(({ liquidityToken }) =>
        v2PairsBalances[liquidityToken.address]?.greaterThan('0'),
      ),
    [tokenPairsWithLiquidityTokens, v2PairsBalances],
  )

  const v2Pairs = usePairs(liquidityTokensWithBalances.map(({ tokens }) => tokens))
  const v2IsLoading =
    fetchingV2PairBalances ||
    v2Pairs?.length < liquidityTokensWithBalances.length ||
    (v2Pairs?.length && v2Pairs.every(([pairState]) => pairState === PairState.LOADING))
  const allV2PairsWithLiquidity = v2Pairs
    ?.filter(([pairState, pair]) => pairState === PairState.EXISTS && Boolean(pair))
    .map(([, pair]) => pair)

  const renderBody = () => {
    if (!account) {
      return (
        <Text color="#000" textAlign="center">
          {t('Connect to a wallet to view your liquidity.')}
        </Text>
      )
    }
    if (v2IsLoading) {
      return (
        <Text color="textSubtle" textAlign="center">
          <Dots>{t('Loading')}</Dots>
        </Text>
      )
    }

    let positionCards = []

    if (allV2PairsWithLiquidity?.length > 0) {
      positionCards = allV2PairsWithLiquidity.map((v2Pair, index) => (
        <FullPositionCard
          key={v2Pair.liquidityToken.address}
          pair={v2Pair}
          mb={Boolean(stablePairs?.length) || index < allV2PairsWithLiquidity.length - 1 ? '16px' : 0}
        />
      ))
    }

    if (stablePairs?.length > 0) {
      positionCards = [
        ...positionCards,
        ...stablePairs?.map((stablePair, index) => (
          <StableFullPositionCard
            key={`stable-${stablePair.liquidityToken.address}`}
            pair={stablePair}
            mb={index < stablePairs.length - 1 ? '16px' : 0}
          />
        )),
      ]
    }

    if (positionCards?.length > 0) {
      return positionCards
    }

    return (
      <Text color="#000" textAlign="center">
        {t('No liquidity found.')}
      </Text>
    )
  }

  return (
    <PageFullWidth>
    <HeaderLiquidity bgColor="#4B19F5" namePlace="Exchange" nameTitle="run together" />
    <Nav />
    <Container>
      <WrapAppBody>
     <Wrapper id="liquidity-page">
       <AppHeader title={t('Liquidity')} subtitle={t('Add liquidity to receive LP tokens')} />
       <CardFooter style={{ textAlign: 'center' }}>
         <Link href="/add" passHref >
           <Button id="join-pool-button" as="a">
             {t('Add Liquidity')}
           </Button>
         </Link>
       </CardFooter>
       <Body>      
         {renderBody()}   
         {account && !v2IsLoading && (
           <Flex flexDirection="column" alignItems="center" mt="24px">
             <Text color="#000" mb="8px">
               {t("Don't see a pool you joined?")}
             </Text>
             <Link href="/find" passHref>
               <Button id="import-pool-link"  as="a">
                 {t('Find other LP tokens')}
               </Button>
             </Link>
           </Flex>
         )}
       </Body>
     
     </Wrapper>
      </WrapAppBody>
     </Container>
     </PageFullWidth> 
  )
}

export const Wrapper = styled.div`
position: relative;
padding: 2rem;
border-radius: 20px;
box-shadow: 0px 10px 14px -48px rgb(31 47 70 / 12%);
background: #FCFCFD;

@media screen and (max-width: 600px) {
  padding: 1rem 0px;    
}
`
const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -18px;
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

