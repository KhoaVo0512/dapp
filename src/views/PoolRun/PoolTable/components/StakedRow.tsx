import React, {useState} from "react";
import { Text, Flex } from "@pancakeswap/uikit";
import styled from "styled-components";
import { Address } from "config/constants/types";
import { SerializedToken } from '@pancakeswap/sdk'
import { bscTokens } from "@pancakeswap/tokens";
import { getAddress } from "utils/addressHelpers";
import { GetTokenBalance } from "utils/getTokenBalance";
import { usePriceRunBusd } from "state/farms/hooks";

interface StakedRowProps {
    tvl:string,
    userStaked:string
} 
const StakedRow: React.FC<StakedRowProps> = ({
    tvl,
    userStaked
}) => {
    const percentStaked = Number(tvl) > 0 ?
    ((Number(userStaked)/Number(tvl))*100).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    :
    "0.00"
    return (
        <ContainerStaked>
            <Text>Staked:</Text>
            <Text>{percentStaked}%</Text>
        </ContainerStaked>
    )
}
export default StakedRow

const ContainerStaked = styled(Flex)`
    width:12.5%;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    height:70px;
    @media screen and (min-width: 600px) and (max-width: 1000px) {
        width: 33.3%;
    }
    @media screen and (max-width: 600px) {
        width:50%;
    }
`