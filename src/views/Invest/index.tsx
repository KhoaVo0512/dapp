import { useTranslation } from '@pancakeswap/localization'
import { Flex, Input, InputGroup, SearchIcon, Text, Toggle } from '@pancakeswap/uikit'
import HeaderLiquidity from 'components/HeaderLiquidity/HeaderLiquidity'
import PageFullWidth from 'components/Layout/PageFullWidth'
import Select, { OptionProps } from 'components/Select/Select'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import React, { useState, useEffect } from 'react'
import { poolProposalConfig } from 'config/constants/poolProposal'
import { latinise } from 'utils/latinise'
import { usePriceRunBusd } from 'state/farms/hooks'
import { useUserFarmStakedOnly } from 'state/user/hooks'
import { GetPoolProposals } from 'state/poolProposals';
import styled from 'styled-components'
import PoolCard from './PoolCard'
import Nav from './components/SubNav'
import { Container, WrapAppBody } from './styles'

const Invest = () => {
    const { t } = useTranslation()
    const { chainId, account } = useActiveWeb3React()
    const [searchQuery, setSearchQuery] = useState('')
    const [ isFinished, setIsFinished] = useState(false)
    const [stakedOnly, setStakedOnly] = useUserFarmStakedOnly(!false)
    const handleSortOptionChange = (option: OptionProps): void => {
      setIsFinished(option.value)
    }
    const handleChangeSearchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value)
    }
    const poolConfig = poolProposalConfig(chainId)
    const [ poolInfo ] = GetPoolProposals(account, poolConfig, chainId )
    const [ poolStakedOnly, setSetPoolStakeOnly ] = useState([])
    const [ searchPools, setSearchPools ] = useState([]) 
    const [ poolsList, setPoolsList ] = useState([])
    const runPriceBUSD = usePriceRunBusd().toNumber()
    useEffect(() => {
        if ( searchQuery !== "" && poolInfo) {
            const filterData = poolInfo.filter((data) =>{
                return latinise(data.storeName.toLowerCase()).includes(searchQuery.toLowerCase())
            })
            setSearchPools(filterData)
        } 
        if ( searchQuery === "" ){
            setSearchPools(poolInfo)
        }
    }, [searchQuery, poolInfo]) // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        if ( poolsList ) {
            if ( stakedOnly ) {
                const getPoolsStakeOnly = searchPools.filter(data => Number(data?.amount) > 0);
                setSetPoolStakeOnly(getPoolsStakeOnly)
            }
            if (!stakedOnly){
                setSetPoolStakeOnly(searchPools)
            } 
        }
    }, [searchPools, stakedOnly, poolsList])
    const currentTime = Date.now()
    const poolLive = poolStakedOnly.filter(data => currentTime < data?.endTime*1000)
    const poolFinished = poolStakedOnly.filter(data =>  currentTime > data?.endTime*1000 && data.dataUser?.endTime !==0)
    return (
      <PageFullWidth>
        <HeaderLiquidity bgColor='#029DA5' namePlace='Invest Together' nameTitle='run together'/>
        <Nav />
        <Container>
          <WrapAppBodyInvestTogether>
            <WrapperInvestTogether>
              {/* header sort */}
              <Flex padding={window.innerWidth < 600 ? "0 15px" : '0'} mt="1rem" mb="1rem" width="100%" flexWrap="wrap">
                <ViewControls>
                    <Select 
                        options={[
                            {
                                label: t('Live'),
                                value: false,
                            },
                            {
                                label: t('Finished'),
                                value: true,
                            }
                        ]}
                        onOptionChange={handleSortOptionChange}
                    />
                    <Flex mt="1rem" mb="1rem" width="auto" style={{gap:"10px"}} alignItems="center">
                        <Toggle checked={stakedOnly} onChange={() => setStakedOnly(!stakedOnly)} scale="lg" />
                        <Text>Staked only</Text>
                    </Flex>
                </ViewControls>
                <FilterControls>
                    <CustomInputGroup endIcon={<SearchIcon width="24px" />} >
                        <Input placeholder={t("Search Pools")} onChange={handleChangeSearchQuery}/>
                    </CustomInputGroup>
                </FilterControls>
              </Flex>
              {/* list pool card sort */}
                  { !isFinished &&
                        <ListCart width="100%" minHeight="60vh" isCenter={(poolLive.length === 1 || poolLive.length === 0 ) ? !false : false}>
                            { poolLive.length === 0 ? 
                                    <Text mt="1rem">No Data</Text>
                                :
                                    <>
                                        {poolLive.map((item) => (
                                            <PoolCard 
                                                storeName={item.storeName}
                                                tokenStake={item.tokenStake}
                                                tokenEarn={item.tokenEarn}
                                                contractPool={item.storeContract}
                                                penddingReward={item?.pendingReward}
                                                revenue={item.revenue}
                                                apy={item.apy}
                                                depositFee={item.depositFee}
                                                totalStaked={item?.amount}
                                                contractStore={item.poolStoreContract}
                                                storeAddress={item.storeLocation}
                                                endTimePool={item?.endTime*1000}
                                                startTimePool={item?.startTime*1000}
                                                depositFeeDescription={item?.depositFeeDescription}
                                                totalAmountStaked={item.tvl}
                                                account={account}
                                                chainId={chainId}
                                                runPriceUsd={runPriceBUSD}
                                            />
                                        ))}
                                    </>
                            }
                        </ListCart> 
                    }
                    {isFinished &&
                        <ListCart width="100%" minHeight="60vh" isCenter={(poolFinished.length === 1 || poolFinished.length === 0)  ? !false : false}>
                                    { poolFinished.length === 0 ? 
                                        <Text mt="1rem">No Data</Text>
                                    :
                                        <>
                                            {poolFinished.map((item) => (
                                                <PoolCard 
                                                        storeName={item.storeName}
                                                        tokenStake={item.tokenStake}
                                                        tokenEarn={item.tokenEarn}
                                                        contractPool={item.storeContract}
                                                        penddingReward={item?.pendingReward}
                                                        revenue={item.revenue}
                                                        apy={item.apy}
                                                        depositFee={item.depositFee}
                                                        totalStaked={item?.amount}
                                                        contractStore={item.poolStoreContract}
                                                        storeAddress={item.storeLocation}
                                                        endTimePool={item?.endTime*1000}
                                                        startTimePool={item?.startTime*1000}
                                                        depositFeeDescription={item?.depositFeeDescription}
                                                        totalAmountStaked={item.tvl}
                                                        account={account}
                                                        chainId={chainId}
                                                        runPriceUsd={runPriceBUSD}
                                                  />
                                            ))}
                                        </>
                                    }
                        </ListCart>
                    }
              {/* end card item */}
            </WrapperInvestTogether>
          </WrapAppBodyInvestTogether>
        </Container>
      </PageFullWidth>
    )
}

export default Invest

const WrapAppBodyInvestTogether = styled(WrapAppBody)`
  background:${({theme}) => theme.colors.backgroundFCVote}!important;
`
const WrapperInvestTogether = styled.div`
    position: relative;
    padding: 0px 2rem 2rem;
    border-radius: 20px;
    box-shadow: rgb(31 47 70 / 12%) 0px 10px 14px -48px;
    background: ${({ theme }) => theme.colors.background};
    @media (max-width: 768px) {
      padding: 0px 0px 1rem;
    }
`
const PCardInvestTogether = styled(Flex)`
    flex-direction: column;
    width: 544px;
    height: fit-content;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.08);
    border-radius: 16px;
    padding: 25px 20px;
    margin-bottom: 1.25rem;
    @media (max-width: 768px) {
      padding: 25px 15px;
      width: 100%;
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
  const FilterControls = styled(Flex)`
      width: 50%;
      height: 70px;
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
          /* margin-top:1rem; */
          justify-content: flex-start;
      }
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
const ListCart = styled(Flex)<{isCenter:boolean}>`
    flex-wrap:wrap;
    justify-content: ${({ isCenter }) => isCenter ? "center" : "space-between"};
    align-items: start;
    @media screen and (max-width: 1080px) {
        justify-content:center;    
    }

`