import React, { useState } from "react";
import { Text, Flex } from "@pancakeswap/uikit";
import styled from "styled-components";
import { PoolItemsProps } from "state/poolrunV2/type";
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { getAddress } from "utils/addressHelpers";
import { GetTokenBalance } from "utils/getTokenBalance";
import HeaderListView from "./components/Header";
import ListFooter from "./PoolFooter/index";
import ApyRow from "./components/APYRow"
import TVLRow from "./components/TVLRow"
import EndsInRow from "./components/EndInCRow"
import DetailsRow from "./components/DetailsRow"
import ContainerStaked from "./components/StakedRow"

interface ListViewProps {
    poolInfo:PoolItemsProps
    runPriceUsd:number
}

const PoolTable: React.FC<ListViewProps> = ({
    poolInfo,
    runPriceUsd
}) => {
    const [ isExpanded, setIsExpanded ] = useState(false)
    const [ refresh, setRefresh ] = useState(0)
    function onRefresh(newValue){
        setRefresh(newValue)
    }
    const { chainId, account } = useActiveWeb3React()
    const { balance } = GetTokenBalance(poolInfo.tokenStake.address, getAddress(poolInfo.poolContract, chainId), chainId, refresh)
    const currentTime = Date.now()
    const finished = poolInfo.endTimeStake*1000 < currentTime && poolInfo.endTimeStake !==0
    return (
        <ContainerRow>
            <Flex width="100%" height="100%" flexWrap="wrap">
                <HeaderListView
                    tokenStakeAddress={poolInfo.tokenStake.address}
                    tokenEarnAddress={poolInfo.tokenEarn.address}
                    tokenStakeSymbol={poolInfo.tokenStake.symbol}
                    tokenEarnSymbol={poolInfo.tokenEarn.symbol}
                />
                <ApyRow
                    apy={poolInfo.apy}
                />
                <TVLRow
                    poolContract={poolInfo.poolContract}
                    tokenStake={poolInfo.tokenStake}
                    chainId={chainId}
                    refresh={refresh}
                    tvl={balance.toString()}
                    runPriceUsd={runPriceUsd}
                />
                {
                    finished ? 
                    <></>
                    :
                    <EndsInRow 
                        endDate={poolInfo.endTimeStake*1000}
                    />
                }                
                <DetailsRow 
                    expanded={isExpanded} 
                    onExpanded={(newValue)=>setIsExpanded(newValue)}
                />
            </Flex>
            { isExpanded &&
                <ListFooter
                    poolInfo={poolInfo}
                    onRefresh={(newValue) => onRefresh(newValue)}
                    refresh={refresh}
                    runPriceBUSD={runPriceUsd}
                    tvl={balance.toString()}
                />
            }
        </ContainerRow>
    )
}
export default PoolTable

const ContainerRow = styled(Flex)`
    width: 100%;
    flex-direction: column;
    box-shadow: inset 0px -1px 0px ${({ theme }) => theme.colors.backgroundDisabled};
    padding:1rem 0rem 1rem 0rem;
    height: auto;
    @media screen and (min-width: 600px) and (max-width: 1000px) {
        height: auto;
    }
    @media screen and (max-width: 600px) {
       height: auto;
    }
`
