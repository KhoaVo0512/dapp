import styled from 'styled-components'
import { Flex, Image, Input, InputGroup, Link, SearchIcon, Text, Toggle } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { useWeb3React } from '@pancakeswap/wagmi'
import BigNumber from 'bignumber.js'
import FlexLayout from 'components/Layout/Flex'
import Page from 'components/Layout/Page'
import PageFullWidth from 'components/Layout/PageFullWidth'
import PageHeader from 'components/Layout/PageHeader'
import Loading from 'components/Loading'
import ScrollToTopButton from 'components/ScrollToTopButton/ScrollToTopButtonV2'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useIntersectionObserver from 'hooks/useIntersectionObserver'
import useTheme from 'hooks/useTheme'
import orderBy from 'lodash/orderBy'
import { useRouter } from 'next/router'
import { createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useFarms, usePollFarmsWithUserData, usePriceRunBusd } from 'state/farms/hooks'
import { useCakeVaultUserData } from 'state/pools/hooks'
import { DeserializedFarm } from 'state/types'
import { ViewMode } from 'state/user/actions'
import { useUserFarmStakedOnly, useUserFarmsViewMode } from 'state/user/hooks'
import { ChainId } from '@pancakeswap/sdk'
import { getFarmApr } from 'utils/apr'
import { latinise } from 'utils/latinise'
import ToggleView from 'views/Farms/components/ToggleView'
import FarmTabButtons from './components/FarmTabButtons'
import Table from './components/FarmTable/FarmTable'
import { FarmWithStakedValue } from './components/types'

const ControlContainer = styled.div`
   display: flex;
  width: 100%;
  align-items: center;
  position: relative;
  box-sizing: border-box;
  border-radius: 10px;
  background:transparent;
  justify-content: space-between;
  flex-direction: column;
  padding: 10px 20px;
  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
  }
  
  @media only screen and (max-width: 480px){
    width: 100%;
    padding-left:2px;
    padding-right:2px;
    justify-content: center;
  }
  @media only screen and (max-width: 768px){
    justify-content: center;
  }

  @media only screen and (min-width: 481px) and (max-width: 1269px){
    justify-content: center;
    
  }
`
const FilterContainer = styled.div`
    width: 50%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-wrap:wrap;
    @media screen and (min-width: 600px) and (max-width: 1080px) {
        width: 30%;
        height: auto;
        padding-left:1rem;
    }
    @media screen and (max-width: 600px) {
        width: 100%;
        height: auto;
        margin-top:1rem;
        justify-content: flex-start;
    }
`

const ViewControls = styled(Flex)`
    width: 50%;
    height: 70px;
    align-items: center;
    justify-content: space-between;
    flex-wrap:wrap;
    @media screen and (min-width: 600px) and (max-width: 1080px) {
        width: 70%;
        height: auto;
    }
    @media screen and (max-width: 600px) {
        width: 100%;
        height: auto;
    }
`

const StyledImage = styled(Image)`
  margin-left: auto;
  margin-right: auto;
  margin-top: 58px;
`

const FinishedTextContainer = styled(Flex)`
  padding-bottom: 32px;
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
  }
`

const FinishedTextLink = styled(Link)`
  font-weight: 400;
  white-space: nowrap;
  text-decoration: underline;
`
const CustomInputGroup = styled(InputGroup)`
    width: 305px;
    border-radius:12px;
    background: transparent !important;
    > input {
        background: transparent !important;
        border: none;
        height: 48px;
    }
    @media screen and (max-width: 600px) {
        width: 100%;
    }
`
const CsPage = styled(Page)`
    @media screen and (max-width: 1280px) and (min-width: 600px) {
      padding-left:20px;
      padding-right:20px;
    }
`

const NUMBER_OF_FARMS_VISIBLE = 12

const Farms: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { pathname, query: urlQuery } = useRouter()
  const { t } = useTranslation()
  const { theme } = useTheme()
  const { chainId } = useActiveWeb3React()
  const { data: farmsLP, userDataLoaded, poolLength, regularCakePerBlock } = useFarms()
  const cakePrice = usePriceRunBusd()
  const [_query, setQuery] = useState('')
  const normalizedUrlSearch = useMemo(() => (typeof urlQuery?.search === 'string' ? urlQuery.search : ''), [urlQuery])
  const query = normalizedUrlSearch && !_query ? normalizedUrlSearch : _query
  const [viewMode, setViewMode] = useUserFarmsViewMode()
  const { account } = useWeb3React()
  const [sortOption, setSortOption] = useState('hot')
  const { observerRef, isIntersecting } = useIntersectionObserver()
  const chosenFarmsLength = useRef(0)
  const isArchived = pathname.includes('archived')
  const isInactive = pathname.includes('history')
  const isActive = !isInactive && !isArchived

  useCakeVaultUserData()

  usePollFarmsWithUserData()

  // Users with no wallet connected should see 0 as Earned amount
  // Connected users should see loading indicator until first userData has loaded
  const userDataReady = !account || (!!account && userDataLoaded)

  const [stakedOnly, setStakedOnly] = useUserFarmStakedOnly(isActive)
  const [boostedOnly, setBoostedOnly] = useState(false)

  const activeFarms = farmsLP.filter(
    (farm) => farm.pid !== 0 && farm.multiplier !== '0X' && (!poolLength || poolLength > farm.pid),
  )
  const inactiveFarms = farmsLP.filter((farm) => farm.pid !== 0 && farm.multiplier === '0X')
  const archivedFarms = farmsLP

  const stakedOnlyFarms = activeFarms.filter(
    (farm) =>
      farm.userData &&
      (new BigNumber(farm.userData.stakedBalance).isGreaterThan(0) ||
        new BigNumber(farm.userData.proxy?.stakedBalance).isGreaterThan(0)),
  )

  const stakedInactiveFarms = inactiveFarms.filter(
    (farm) =>
      farm.userData &&
      (new BigNumber(farm.userData.stakedBalance).isGreaterThan(0) ||
        new BigNumber(farm.userData.proxy?.stakedBalance).isGreaterThan(0)),
  )

  const stakedArchivedFarms = archivedFarms.filter(
    (farm) =>
      farm.userData &&
      (new BigNumber(farm.userData.stakedBalance).isGreaterThan(0) ||
        new BigNumber(farm.userData.proxy?.stakedBalance).isGreaterThan(0)),
  )

  const farmsList = useCallback(
    (farmsToDisplay: DeserializedFarm[]): FarmWithStakedValue[] => {
      let farmsToDisplayWithAPR: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
        if (!farm.lpTotalInQuoteToken || !farm.quoteTokenPriceBusd) {
          return farm
        }

        const totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(farm.quoteTokenPriceBusd)
        
        const { cakeRewardsApr, lpRewardsApr } = isActive
          ? getFarmApr(
              chainId,
              new BigNumber(farm.poolWeight),
              cakePrice,
              totalLiquidity,
              farm.lpAddress,
              regularCakePerBlock,
            )
          : { cakeRewardsApr: 0, lpRewardsApr: 0 }

        return { ...farm, apr: cakeRewardsApr, lpRewardsApr, liquidity: totalLiquidity }
      })

      if (query) {
        const lowercaseQuery = latinise(query.toLowerCase())
        farmsToDisplayWithAPR = farmsToDisplayWithAPR.filter((farm: FarmWithStakedValue) => {
          return latinise(farm.lpSymbol.toLowerCase()).includes(lowercaseQuery)
        })
      }

      return farmsToDisplayWithAPR
    },
    [query, isActive, chainId, cakePrice, regularCakePerBlock],
  )

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const [numberOfFarmsVisible, setNumberOfFarmsVisible] = useState(NUMBER_OF_FARMS_VISIBLE)

  const chosenFarms = useMemo(() => {
    let chosenFs = []
    if (isActive) {
      chosenFs = stakedOnly ? farmsList(stakedOnlyFarms) : farmsList(activeFarms)
    }
    if (isInactive) {
      chosenFs = stakedOnly ? farmsList(stakedInactiveFarms) : farmsList(inactiveFarms)
    }
    if (isArchived) {
      chosenFs = stakedOnly ? farmsList(stakedArchivedFarms) : farmsList(archivedFarms)
    }

    if (boostedOnly) {
      chosenFs = chosenFs.filter((f) => f.boosted)
    }

    return chosenFs
  }, [
    activeFarms,
    farmsList,
    inactiveFarms,
    archivedFarms,
    isActive,
    isInactive,
    isArchived,
    stakedArchivedFarms,
    stakedInactiveFarms,
    stakedOnly,
    stakedOnlyFarms,
    boostedOnly,
  ])

  const chosenFarmsMemoized = useMemo(() => {
    const sortFarms = (farms: FarmWithStakedValue[]): FarmWithStakedValue[] => {
      switch (sortOption) {
        case 'apr':
          return orderBy(farms, (farm: FarmWithStakedValue) => farm.apr + farm.lpRewardsApr, 'desc')
        case 'multiplier':
          return orderBy(
            farms,
            (farm: FarmWithStakedValue) => (farm.multiplier ? Number(farm.multiplier.slice(0, -1)) : 0),
            'desc',
          )
        case 'earned':
          return orderBy(
            farms,
            (farm: FarmWithStakedValue) => (farm.userData ? Number(farm.userData.earnings) : 0),
            'desc',
          )
        case 'liquidity':
          return orderBy(farms, (farm: FarmWithStakedValue) => Number(farm.liquidity), 'desc')
        case 'latest':
          return orderBy(farms, (farm: FarmWithStakedValue) => Number(farm.pid), 'desc')
        default:
          return farms
      }
    }

    return sortFarms(chosenFarms).slice(0, numberOfFarmsVisible)
  }, [chosenFarms, sortOption, numberOfFarmsVisible])

  chosenFarmsLength.current = chosenFarmsMemoized.length

  useEffect(() => {
    if (isIntersecting) {
      setNumberOfFarmsVisible((farmsCurrentlyVisible) => {
        if (farmsCurrentlyVisible <= chosenFarmsLength.current) {
          return farmsCurrentlyVisible + NUMBER_OF_FARMS_VISIBLE
        }
        return farmsCurrentlyVisible
      })
    }
  }, [isIntersecting])

  return (
    <FarmsContext.Provider value={{ chosenFarmsMemoized }}>
     <PageHeader
        nameTitle="RUN TOGETHER"
        namePlace="Farms"
        imgIcon="/images/Pools/bg_header.png"
        bgColor="#A95EEA"
      />
      <CsPage>
        <ControlContainer>
          <Flex mt="1rem" width="100%" flexWrap="wrap">
            <ViewControls>
                <ToggleView viewMode={viewMode} onToggle={(mode: ViewMode) => setViewMode(mode)} />
                <Flex width="auto" style={{gap:"10px"}} alignItems="center">
                    <Toggle checked={stakedOnly} onChange={() => setStakedOnly(!stakedOnly)} scale="lg" />
                    <Text>Staked only</Text>
                </Flex>
                <FarmTabButtons hasStakeInFinishedFarms={stakedInactiveFarms.length > 0} />
              </ViewControls>
              <FilterContainer>
                <CustomInputGroup endIcon={<SearchIcon width="24px" />} >
                  <Input placeholder={t("Search Farms")} onChange={handleChangeQuery}/>
                </CustomInputGroup>
              </FilterContainer>
          </Flex>
        </ControlContainer>
 
        {
          (chainId === ChainId.ONUS || chainId === ChainId.BSC) ? (
            !isInactive && (
              <FinishedTextContainer>
                <Flex width='100%' justifyContent='center'>
                    <Text> {t("No Data")} </Text>
                </Flex>
              </FinishedTextContainer>
            )
          ) :
          (
            isInactive && (
              <FinishedTextContainer>
                <Flex width='100%' justifyContent='center'>
                    <Text> {t("No Data")} </Text>
                </Flex>
              </FinishedTextContainer>
            )
          )
        }
        {viewMode === ViewMode.TABLE ? (
          <Table farms={chosenFarmsMemoized} cakePrice={cakePrice} userDataReady={userDataReady} />
        ) : (
          <FlexLayout>{children}</FlexLayout>
        )}
        {account && !userDataLoaded && stakedOnly && (
          <Flex justifyContent="center">
            <Loading />
          </Flex>
        )}
        {poolLength && <div ref={observerRef} />}
      </CsPage>
      {createPortal(<ScrollToTopButton />, document.body)}
    </FarmsContext.Provider>
  )
}

export const FarmsContext = createContext({ chosenFarmsMemoized: [] })

export default Farms
