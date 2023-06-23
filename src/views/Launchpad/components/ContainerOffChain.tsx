import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Text, Flex, Button  } from "@pancakeswap/uikit";
import { useTranslation } from "@pancakeswap/localization";
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { GetAllTransaction } from "state/mybalance";
import { useClaimPresale } from '../hook/useBuy';
import Row from "./Row"

interface Props {
    allowanceVesting?:Array<any>
    currentIndex?:number
}
const ContainerOnChain:React.FC<Props> = ({allowanceVesting,currentIndex}) => {
    const itemsPerPage = 9
    const { t } = useTranslation()
    const { account, chainId } = useActiveWeb3React()
    const [ refresh, setRefresh ] = useState(0)
    function onRefresh(newValue:number){
        setRefresh(newValue)
    }
    const { handleClaim, requestedClaim, pendingClaim, isClose } = useClaimPresale(chainId, onRefresh)    

    return (
        <Flex width="100%" flexDirection="column" height="auto" mb="1.5rem">
            <ContainerRow>
                <ContainerChain>
                    <CsText>Index</CsText>
                </ContainerChain>
                <ContainerTime>
                    <CsText>Time</CsText>
                </ContainerTime>
                <ContainerType>
                    <CsText>Percent</CsText>
                </ContainerType>
                <ContainerBalance>
                   <CsText>Amount</CsText>
                </ContainerBalance>
            </ContainerRow>
            <Flex width="100%" flexDirection="column" mt="1rem" height="100%" minHeight="50vh" >
                {allowanceVesting.length !== 0 ?
                    <>
                        {allowanceVesting.map((item) => {
                            return (
                                <Row 
                                    index={item.index}
                                    vesting={item.vesting}
                                    time={item.time}
                                    amount={item.amount}
                                    name={item.name}
                                    claimable={item.claimable}
                                    currentIndex={currentIndex}
                                />
                            )
                        })}
                    </>
                :
                    <Flex width="100%" justifyContent="center" mt="1rem" alignItems="center">
                        <Text mt="2rem">{t("No Data")}</Text>
                    </Flex>
                }
            </Flex>
        </Flex>
    )
}
export default ContainerOnChain

const ContainerRow = styled(Flex)`
    width: 100%;
    height:100px;
    padding-left:12px;
    box-shadow: inset 0px -1px 0px #E4E4E4;
    flex-wrap: wrap;
    @media screen and (max-width: 600px) {
        display: none;
    }
    background: linear-gradient(139.73deg, #E5FDFF 0%, #F3EFFF 100%);
    border-radius: 10px;
    
`
const Tags = styled.div<{backgroundColor:string}>`
    width: 146px;
    height: 42px;
    background: ${({ backgroundColor }) => backgroundColor};
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    color:#fff;
    @media screen and (max-width: 600px) {
        width: 110px;
        font-size:14px;
    }
`
const ContainerChain = styled(Flex)`
    width:15%;
    height: 100%;
    align-items: center;
    padding-left: 1rem;
    @media screen and (max-width: 600px) {
        width:100%;
        padding-left: 0rem;
        height:50px;
        justify-content: space-between;
    }
`
const ContainerType = styled(Flex)`
    width:29%;
    height: 100%;
    align-items: center;
    padding-left: 1rem;
    @media screen and (max-width: 600px) {
        width:100%;
        height:50px;
        padding-left: 0rem;
        justify-content: space-between;
    }
`
const ContainerTime = styled(Flex)`
    width:31%;
    height: 100%;
    align-items: center;
    padding-left: 1rem;
    @media screen and (max-width: 600px) {
        width:100%;
        padding-left: 0rem;
        height:50px;
        justify-content: space-between;
    }
`
const ContainerBalance = styled(Flex)`
    width:25%;
    height: 100%;
    align-items: center;
    padding-left: 1rem;
    @media screen and (max-width: 600px) {
        width:100%;
        padding-left: 0rem;
        height:50px;
        justify-content: space-between;
    }
`
const ContainerTitle = styled(Flex)`
     @media screen and (min-width: 600px) {
        display: none;
    }
`
const CustomFlex = styled(Flex)`
margin-bottom:1.5rem;
.pagination{
    display:flex;
    flex-direction: row;
    width:500px;
    justify-content:space-around;
    align-items:center;
    @media screen and (max-width: 600px){
        width: 100%;
    }
    *{
        list-style-type: none;
    }
}
.page-link {
    background:${({ theme }) => theme.colors.tertiary};
    padding:12px;
    border-radius:5px !important;
    border:none !important;
    color:${({ theme }) => theme.colors.text};
    &:focus {
        box-shadow:none !important;
    }
    &:hover{
        background:${({ theme }) => theme.colors.backgroundDisabled};
    }
}
.page-item.disabled .page-link{
    background:${({ theme }) => theme.colors.disabled};
    cursor: not-allowed! important;
    opacity: 0.7;
    pointer-events:none;
}
.page-item.active .page-link{
    background:${({ theme }) => theme.colors.primaryBright};
    color:#fff;
}
`
const CsText = styled(Text)`
    color: ${({ theme }) => theme.colors.black};
`