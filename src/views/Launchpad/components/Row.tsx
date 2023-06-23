import { useCallback, useEffect, useState } from 'react'
import styled from "styled-components";
import { Text, Flex, Button } from "@pancakeswap/uikit";
import { ChainId } from '@pancakeswap/sdk'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useTheme from "hooks/useTheme";
import {useClaimPresale} from "../hook/useBuy"
import { GetStageList } from "../hook/fetchData"

interface Props {
    index?: string
    name?:number
    time?:string
    amount?:number
    vesting?: string
    claimable?: boolean
    currentIndex?: number
}
const Row:React.FC<Props> = ({
    index,
    name,
    time,
    amount,
    vesting,
    claimable,
    currentIndex
}) => {
    const { theme } = useTheme()
    const { account, chainId } = useActiveWeb3React()
    const [ refresh, setRefresh ] = useState(0)
    function onRefresh(newValue:number){
        setRefresh(newValue)
        console.log(newValue);
    }

    const { handleClaim, requestedClaim, pendingClaim, isClose } = useClaimPresale(ChainId.CORE, onRefresh)
    const { stagelist } = GetStageList(chainId,currentIndex,setRefresh)
    const currentTimeStamp = Math.floor(Date.now() / 1000);

    return (
        <ContainerRow>
            <ContainerChain>
                <ContainerTitle>
                    <CsText>Index</CsText>                    
                </ContainerTitle>
                <CsText>{ name}</CsText>
            </ContainerChain>
            <ContainerType>
                <ContainerTitle>
                    <CsText>Time</CsText>                      
                </ContainerTitle>
                <CsText>{time}</CsText>
            </ContainerType>
            <ContainerTime>
                <ContainerTitle>
                    <CsText>Percent</CsText>                       
                </ContainerTitle>
                <Text style={{ marginLeft: "32px" }}>{vesting}</Text>
            </ContainerTime>
            <ContainerBalance>
                <ContainerTitle>
                    <CsText>Amount</CsText>
                </ContainerTitle>
                {
                    claimable && amount  ?
                    <Button disabled={pendingClaim || (currentTimeStamp < stagelist?.timestamp)} onClick={handleClaim}>{claimable ? `Claim ${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })} $CDC` : "---"}</Button> 
                    :
                    <Text>{amount > 0 ? `${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : '---'}{currentIndex > stagelist?.index ? ' Claimed' : '' }</Text>

                }
            </ContainerBalance>
        </ContainerRow>
    )
}
export default Row

const ContainerRow = styled(Flex)`
    width: 100%;
    height:100px;
    padding-left:12px;
    box-shadow: inset 0px -1px 0px #E4E4E4;
    flex-wrap: wrap;
    @media screen and (max-width: 600px) {
        height:auto;
        padding-top:20px;
        padding-bottom:20px;
        padding-left:12px;
        padding-right:12px;
    }
`
const Tags = styled.div`
    width:190px;
    min-width:120px;
    height: 42px;
    background: ${({ theme }) => theme.colors.secondary};
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    color:#fff;
    font-size:14px;
    font-weight:500;
    @media screen and (max-width: 600px) {
        width:190px;
        min-width:120px;
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
    width: 31%;
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
const ContainerUserBalance = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items:center;
    width:120px;
    @media screen and (max-width: 600px) {
        width: auto !important;
    }
`
const ContainerTitle = styled(Flex)`
     @media screen and (min-width: 600px) {
        display: none;
    }
`
const CsText = styled(Text)`
    color: ${({ theme }) => theme.colors.black};
`