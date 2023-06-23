import React from "react";
import { Flex, Text } from "@pancakeswap/uikit";
import styled from "styled-components";
import { SerializedToken } from '@pancakeswap/sdk'

interface CardHeadingProps {
    tokenStake:SerializedToken
    tokenEarn:SerializedToken
    storeName:string
}

const CardHeading: React.FC<CardHeadingProps> = ({
    tokenStake,
    tokenEarn,
    storeName
}) => {
    const imgTokenStaked = `/images/tokens/${tokenStake.address}.png`
    const imgTokenEarn = `/images/tokens/${tokenEarn.address}.png`
    return(
        <Container>
            <CardHeadingWrapper>
                <Flex justifyContent="center">
                    <ContainerImg>
                        <TokenStake src={imgTokenStaked} alt="token staked"/>
                        <TokenEarn src={imgTokenEarn} alt="token earn"/>
                    </ContainerImg>
                </Flex>
                <Flex flexDirection="column" justifyContent="flex-start">
                    <Text color="white" bold fontSize="20px" lineHeight="30px">{storeName}</Text>
                    <Text color="white" mt="4px" bold fontSize="14px" lineHeight="21px">Stake {tokenStake.symbol}</Text>
                    <Text color="white" mt="6px" fontSize="14px" lineHeight="21px" >Earn {tokenEarn.symbol} and more</Text>
                </Flex>
            </CardHeadingWrapper>
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
    background: url("/images/invest/bg_card_heading.png") 0% 0% / 100% 100% no-repeat;
    background-repeat:no-repeat;
    @media (max-width: 600px) {
        height: 160px;
    }
`
const CardHeadingWrapper = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 25% 75%;
    margin-bottom: 20px;
    @media (max-width: 600px) {
        gap: 20px;
    }
    @media (max-width: 900px) {
        gap: 10px;
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