import React from "react";
import { Text, Flex, CoreTagIcon } from "@pancakeswap/uikit";
import styled from "styled-components";

interface CardHeadingProps {
    tokenStakeAddress?:string
    tokenEarnAddress?:string
    tokenStakeSymbol?:string
    tokenEarnSymbol?:string
} 
const HeaderListView: React.FC<CardHeadingProps> = ({
    tokenStakeAddress, 
    tokenEarnAddress, 
    tokenEarnSymbol, 
    tokenStakeSymbol
}) => {
    const imgTokenStaked = `/images/coins/${tokenStakeAddress}.png`
    const imgTokenEarn = `/images/coins/${tokenEarnAddress}.png`
    return (
        <ContainerHeaer>
            <ContainerImg>
                <TokenStake src={imgTokenStaked} alt="token staked"/>
                <TokenEarn src={imgTokenEarn} alt="token earn"/>
            </ContainerImg>
            <Flex flexDirection="column">
                <Text bold fontSize="20px">Stake {tokenStakeSymbol}</Text>
                <Text>Earn {tokenEarnSymbol}</Text>
            </Flex>
            <CoreTagIcon/>
        </ContainerHeaer>
    )
}
export default HeaderListView

const ContainerHeaer = styled(Flex)`
    width: 35%;
    justify-content: center;
    align-items: center;
    height:70px;
    gap:20px;
    @media screen and (min-width: 600px) and (max-width: 1000px) {
        width:40%;
    }
    @media screen and (max-width: 600px) {
        width:100%;
    }
`
const ContainerImg = styled(Flex)`
    width: 70px;
    height: 70px;
    position:relative;
`
const TokenStake = styled.img`
    width: 70px;
    height: 70px;
`
const TokenEarn = styled.img`
    width: 30px;
    height: 30px;
    position: absolute;
    right: 0px;
    bottom:0px;
`