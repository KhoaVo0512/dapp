import React from "react";
import { Text, Flex, Button } from "@pancakeswap/uikit";
import { Address } from "config/constants/types";
import { SerializedToken } from '@pancakeswap/sdk'
import { getAddress } from "utils/addressHelpers";
import { GetTokenBalance } from "utils/getTokenBalance";
import { usePriceRunBusd } from "state/farms/hooks";

interface TvlRowProps {
    poolContract:Address,
    tokenStake:SerializedToken,
    chainId:number,
    refresh:number,
    tvl:string,
    runPriceUsd:number
}
const TvlRow: React.FC<TvlRowProps> = ({
    poolContract,
    tokenStake,
    chainId,
    refresh,
    tvl,
    runPriceUsd
}) => {
    return (
        <Flex width="100%" justifyContent="space-between" mt="10px">
            <Text>TVL</Text>
            <Text>${(Number(tvl)*runPriceUsd).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
        </Flex>
    )
}
export default TvlRow