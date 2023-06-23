import React from "react";
import styled from "styled-components";
import { Text, Flex } from "@pancakeswap/uikit";

interface Props {
    idRow:number
    level:string
    commision:string
    coefficient:string
}
const Row:React.FC<Props> = ({
    idRow,
    level,
    commision,
    coefficient
}) =>{
    return(
        <ContainerRow isBackground={idRow%2 === 0 ? !false : false}>
            <Col>
                <CustomFlex>
                    <CustomTitle>LEVEL</CustomTitle>
                    <Text bold textTransform="uppercase">{level}</Text>
                </CustomFlex>
            </Col>
            <Col>
                <CustomFlex>
                    <CustomTitle>COMMISSION PER NFT BOX</CustomTitle>
                    <Text bold textTransform="uppercase">{commision}</Text>
                </CustomFlex>
            </Col>
            <Col>
                <CustomFlex>
                    <CustomTitle>CONDITION</CustomTitle>
                    <Text bold textTransform="uppercase">{coefficient}</Text>
                </CustomFlex>
            </Col>
        </ContainerRow>
    )
}
export default Row

const ContainerRow = styled(Flex)<{isBackground:boolean}>`
    width: 100%;
    height:100px;
    background: ${({ isBackground, theme }) => isBackground ? theme.colors.dropdown : "transparent" }; 
    padding-left:0px;
    // box-shadow: inset 0px -1px 0px #E4E4E4;
    border-radius: 15px;
    &:nth-child(2) {
        border-radius: 2px!important;
      }
    flex-wrap: wrap;
    @media screen and (max-width: 600px) {
        height:auto;
        padding-top:10px;
        padding-bottom:10px;
        border-radius:10px;
        background:${({ theme }) => theme.colors.dropdown}; 
        margin-bottom:1rem;
    }
`
const CustomTitle = styled(Text)`
  @media screen and (min-width: 600px) {
    display: none;
  }
`

const Col = styled(Flex)`
    width:33.33%;
    height: 100%;
    align-items: center;
    justify-content: center;
    @media screen and (max-width: 600px) {
        width: 100%;
        height: 60px;
        justify-content: flex-start;
        padding:0px 15px 0px 15px;
    }
`
const CustomFlex = styled(Flex)`
    justify-content:center;
    width: 100%;
    align-items: center;
    @media screen and (max-width: 600px) {
        justify-content:space-between;
    }
`