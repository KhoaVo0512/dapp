
import { useTranslation } from '@pancakeswap/localization'
import { Text, Flex, Toggle, SearchIcon, InputGroup, Input } from '@pancakeswap/uikit'
import Page from 'components/Layout/Page'
import styled from 'styled-components'
import PageHeader from 'components/Layout/PageHeader'
import { latinise } from 'utils/latinise'
import useTheme from 'hooks/useTheme'
import { usePriceRunBusd } from 'state/farms/hooks'
import Select, { OptionProps } from 'components/Select/Select'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useEffect, useState } from "react";
import { PoolConfig } from 'config/constants/poolRun/constants/type'
import { GetPoolInfo } from 'state/poolrunV2'
import { getPoolConfig } from 'config/constants/poolRun/constants'
import { useUserFarmsViewMode, useUserFarmStakedOnly } from 'state/user/hooks'
import ToggleView, { ViewMode } from './components/ToggleView'
import PoolCard from './PoolCard'
import PoolTable from './PoolTable'

const PoolRun = () => {
    const { t } = useTranslation()
    const { theme } = useTheme()
    const { chainId, account } = useActiveWeb3React()
    // view && filter mode 
    const [searchQuery, setSearchQuery] = useState('')
    const [ isFinished, setIsFinished] = useState(false)
    const [stakedOnly, setStakedOnly] = useUserFarmStakedOnly(!false)
    const [viewMode, setViewMode] = useUserFarmsViewMode()
    const [ searchPools, setSearchPools ] = useState([])
    const [ poolStakedOnly, setSetPoolStakeOnly ] = useState([...searchPools])
    const handleSortOptionChange = (option: OptionProps): void => {
        setIsFinished(option.value)
    }
    const handleChangeSearchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value)
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-shadow
    const getActivePool = async (chainId: number) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-shadow
        const poolConfig = await getPoolConfig(chainId)
        return poolConfig
    }
    const [ poolConfig, setPoolConfig ] =  useState<PoolConfig[]>([])
    useEffect(
        () => {
          const fetchPools = async () => {
            const activePools = await getActivePool(chainId)
            setPoolConfig(activePools)
          }
          fetchPools()
        },
        [chainId],
    )
    const [ poolInfo ] = GetPoolInfo(account, poolConfig, chainId)

    // search
    useEffect(() => {
        if ( searchQuery !== "" && poolInfo) {
            const filterData = poolInfo.filter((data) =>{
                return latinise(data.name.toLowerCase()).includes(searchQuery.toLowerCase())
            })
            setSearchPools(filterData)
        } 
        if ( searchQuery === "" ){
            setSearchPools(poolInfo)
        }
     }, [poolInfo, searchQuery])
    //  stake only
    useEffect(() => {
        if ( poolInfo ) {
            if ( stakedOnly ) {
                const getPoolsStakeOnly = searchPools.filter(data => data.amount > 0);
                setSetPoolStakeOnly(getPoolsStakeOnly)
            }
            if (!stakedOnly){
                setSetPoolStakeOnly(searchPools)
            } 
        }
    }, [searchPools, stakedOnly, poolInfo])
    const currentTime = Date.now()
    const poolLive = poolStakedOnly.filter(data => data.endTimeStake*1000 > currentTime)
    const poolFinished = poolStakedOnly.filter(data => data.endTimeStake*1000 < currentTime && data.endTimeStake !==0)
    const runPriceBUSD = usePriceRunBusd().toNumber()
    return (
        <>
            <PageHeader 
                    nameTitle="RUN TOGETHER"
                    namePlace="Pools"
                    imgIcon="/images/Pools/bg_header.png"
                    bgColor="#6C5DD3"
            />
            <Page>
                <Flex mt="1rem" width="100%" flexWrap="wrap">
                    <ViewControls>
                        <ToggleView viewMode={viewMode} onToggle={(mode: ViewMode) => setViewMode(mode)} />
                        <Flex width="auto" style={{gap:"10px"}} alignItems="center">
                            <Toggle checked={stakedOnly} onChange={() => setStakedOnly(!stakedOnly)} scale="lg" />
                            <Text>Staked only</Text>
                        </Flex>
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
                        
                    </ViewControls>
                    <FilterControls>
                        <CustomInputGroup endIcon={<SearchIcon width="24px" />} >
                            <Input placeholder={t("Search Pools")} onChange={handleChangeSearchQuery}/>
                        </CustomInputGroup>
                    </FilterControls>
                </Flex>
                <Flex width="100%" justifyContent='space-around' flexWrap="wrap" mt="1rem" minHeight="60vh">
                    { viewMode === "CARD" &&
                        <Flex width="100%" justifyContent="space-around" flexWrap="wrap">
                            { !isFinished  ?
                                <>
                                    { poolLive.length === 0 ? 
                                        <Text mt="1rem">No data</Text>
                                    :
                                        <>
                                            {poolLive.map((item) => {
                                                    return (
                                                        <PoolCard
                                                            poolInfo={item}
                                                            runPriceUsd={runPriceBUSD}
                                                        />
                                                    )
                                            })}
                                        </>
                                    }
                                </>
                            :
                            <>
                                { poolFinished.length === 0 ? 
                                        <Text mt="1rem">No data</Text>
                                    :
                                        <>
                                            {poolFinished.map((item) => {
                                                    return (
                                                        <PoolCard
                                                            poolInfo={item}
                                                            runPriceUsd={runPriceBUSD}
                                                        />
                                                    )
                                            })}
                                        </>
                                    }
                                </>
                            }
                        </Flex> 
                    }
                    { viewMode === "TABLE" &&
                        <ContainerList>
                            { !isFinished  ?
                                <>
                                    { poolLive.length === 0 ? 
                                        <Flex width="100%" justifyContent="center" alignItems="center">
                                            <Text width="100%" textAlign="center" mt="1rem">No data</Text>
                                        </Flex>
                                    :
                                        <>
                                            {poolLive.map((item) => {
                                                    return (
                                                        <PoolTable
                                                            poolInfo={item}
                                                            runPriceUsd={runPriceBUSD}
                                                        />
                                                    )
                                            })}
                                        </>
                                    }
                                </>
                            :
                            <>
                                { poolFinished.length === 0 ? 
                                        <Flex width="100%" justifyContent="center" alignItems="center">
                                            <Text width="100%" textAlign="center" mt="1rem">No data</Text>
                                        </Flex>
                                    :
                                        <>
                                            {poolFinished.map((item) => {
                                                    return (
                                                        <PoolTable
                                                            poolInfo={item}
                                                            runPriceUsd={runPriceBUSD}
                                                        />
                                                    )
                                            })}
                                        </>
                                    }
                                </>
                            }          
                        </ContainerList> 
                    }
                </Flex>
            </Page>
        </>
    )
}
export default PoolRun

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
        margin-top:1rem;
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
const ContainerList = styled(Flex)`
    width:100%;
    flex-direction: column;
    height: auto;
    flex-wrap:wrap;
`