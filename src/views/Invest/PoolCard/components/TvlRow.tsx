import React from "react";
import { Text, Flex } from "@pancakeswap/uikit";
import styled from "styled-components";
import { useTranslation } from '@pancakeswap/localization';

interface TvlProps {
    tvl:string,
    tokenStakeAddress:string
}

const TvlRow: React.FC<TvlProps> = ({
    tvl,
    tokenStakeAddress
}) => {
    const { t } = useTranslation()
    const imgTokenStaked = `/images/tokens/${tokenStakeAddress}.png`
    return (
        <Flex width="100%" justifyContent="space-between" mt="1rem">
            <Text>{t('TVL')}</Text>
            <Flex>
                <Text mr='6px'>{tvl}</Text>
                <TokenStake src={imgTokenStaked} alt="token staked"/>
            </Flex>
        </Flex>
    )
}
export default TvlRow

const TokenStake = styled.img`
    width:24px;
    height: 24px;
`