import React, {useState} from "react";
import { Text, Flex } from "@pancakeswap/uikit";
import styled from "styled-components";
import { Address } from "config/constants/types";
import { SerializedToken } from '@pancakeswap/sdk'
import { bscTokens } from "@pancakeswap/tokens";
import { getAddress } from "utils/addressHelpers";
import { GetTokenBalance } from "utils/getTokenBalance";
import { usePriceRunBusd } from "state/farms/hooks";

interface TVLRowProps {
    poolContract:Address,
    tokenStake:SerializedToken,
    chainId:number,
    refresh:number
    tvl:string,
    runPriceUsd:number
} 
const TVLRow: React.FC<TVLRowProps> = ({
    poolContract,
    tokenStake,
    chainId,
    refresh,
    tvl,
    runPriceUsd
}) => {
    return (
        <ContainerApy>
            <Text>TVL</Text>
            <Flex style={{gap:"15px"}}>
                <Text bold>${(Number(tvl)*runPriceUsd).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
            </Flex>
        </ContainerApy>
    )
}
export default TVLRow

const ContainerApy = styled(Flex)`
    width:17.5%;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    height:70px;
    @media screen and (min-width: 600px) and (max-width: 1000px) {
        width: 30%;
    }
    @media screen and (max-width: 600px) {
        width:50%;
    }
`