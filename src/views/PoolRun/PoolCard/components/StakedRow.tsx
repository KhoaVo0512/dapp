import { useTranslation } from "@pancakeswap/localization";
import { Flex, Text } from "@pancakeswap/uikit";
import React from "react";

interface StakedRowProps {
    tvl: string,
    userStaked:string
}
const StakedRow: React.FC<StakedRowProps> = ({tvl, userStaked}) => {
    const percentStaked = Number(tvl) > 0 ?
    ((Number(userStaked)/Number(tvl))*100).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    :
    "0.00"
    return (
        <Flex width="100%" justifyContent="space-between" mt="10px">
            <Text>Staked:</Text>
            <Text>{percentStaked}%</Text>
        </Flex>
    )
}
export default StakedRow