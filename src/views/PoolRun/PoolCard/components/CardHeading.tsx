import React from "react";
import { Flex, Text, CoreTagIcon } from "@pancakeswap/uikit";
import styled from "styled-components";

interface CardHeadingProps {
    tokenStakeAddress?:string
    tokenEarnAddress?:string
    tokenStakeSymbol?:string
    tokenEarnSymbol?:string
}

const CardHeading: React.FC<CardHeadingProps> = ({tokenStakeAddress, tokenEarnAddress, tokenEarnSymbol, tokenStakeSymbol}) => {
    const imgTokenStaked = `/images/coins/${tokenStakeAddress}.png`
    const imgTokenEarn = `/images/coins/${tokenEarnAddress}.png`
    return(
        <Container>
            <Flex width="40%" justifyContent="center">
                <ContainerImg>
                    <TokenStake src={imgTokenStaked} alt="token staked"/>
                    <TokenEarn src={imgTokenEarn} alt="token earn"/>
                </ContainerImg>
            </Flex>
            <Flex width="60%" flexDirection="column" justifyContent="flex-start">
                <Flex width="100%">
                    <CoreTagIcon/>
                </Flex>
                <Text color="white" bold fontSize="20px">Stake {tokenStakeSymbol}</Text>
                <Text color="white" >Earn {tokenEarnSymbol}</Text>
            </Flex>
        </Container>
    )
}  
export default CardHeading

const Container = styled(Flex)`
    flex-direction:row;
    height: 140px;
    width: 100%;
    align-items:center;
    justify-content:center;
    background:url("/images/Pools/bg_card_heading.png");
    background-size:cover;
    background-repeat:no-repeat;
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